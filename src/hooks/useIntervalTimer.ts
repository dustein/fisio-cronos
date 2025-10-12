// hooks/useIntervalTimer.ts
import { useState, useEffect, useRef } from 'react';
import { useAudio } from './useAudio';

interface TimeFormatted {
  minutes: string;
  seconds: string;
  milliseconds: string;
  full: string;
}

interface IntervalSettings {
  activityTime: number; // em ms
  restTime: number;     // em ms
  totalTime: number;    // em ms
}

interface UseIntervalTimerReturn {
  currentTime: number;
  totalElapsed: number;
  isRunning: boolean;
  isActivity: boolean; // true = atividade, false = descanso
  formattedCurrentTime: TimeFormatted;
  formattedTotalTime: TimeFormatted;
  remainingActivity: number;
  remainingRest: number;
  remainingTotal: number;
  cycleCount: number;
  isCompleted: boolean;
  isCountingDown: boolean;
  countdownValue: number;
  settings: IntervalSettings;
  start: () => void;
  stop: () => void;
  reset: () => void;
  toggle: () => void;
  updateSettings: (settings: IntervalSettings) => void;
}

interface WakeLockFunctions {
  requestWakeLock: () => Promise<void>;
  releaseWakeLock: () => void;
}

export const useIntervalTimer = (
  initialSettings?: IntervalSettings,
  wakeLockFunctions?: WakeLockFunctions
): UseIntervalTimerReturn => {
  const defaultSettings: IntervalSettings = {
    activityTime: 10000, // 10s
    restTime: 10000,    // 10s
    totalTime: 60000    // 1min
  };

  const [settings, setSettings] = useState<IntervalSettings>(initialSettings || defaultSettings);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalElapsed, setTotalElapsed] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isActivity, setIsActivity] = useState<boolean>(true);
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
  const [countdownValue, setCountdownValue] = useState<number>(3);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Hook de áudio
  const { playStartSound, playEndSound, playRestSound } = useAudio();

  // Timer principal
  useEffect(() => {
    if (isRunning && !isCompleted) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prevTime => prevTime + 10);
        setTotalElapsed(prevTotal => {
          const newTotal = prevTotal + 10;
          
          if (newTotal >= settings.totalTime) {
            setIsRunning(false);
            setIsCompleted(true);
            playEndSound();
            
            // Liberar Wake Lock quando completar
            if (wakeLockFunctions?.releaseWakeLock) {
              wakeLockFunctions.releaseWakeLock();
            }
            
            return settings.totalTime;
          }
          
          return newTotal;
        });
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isCompleted, settings.totalTime, playEndSound, wakeLockFunctions]);

  // Lógica de alternância entre atividade e descanso
  useEffect(() => {
    const targetTime = isActivity ? settings.activityTime : settings.restTime;
    
    if (currentTime >= targetTime && isRunning) {
      if (isActivity) {
        // Atividade → Descanso
        playRestSound();
      } else {
        // Descanso → Atividade
        playStartSound();
        setCycleCount(prev => prev + 1);
      }
      
      setIsActivity(prev => !prev);
      setCurrentTime(0);
    }
  }, [currentTime, isActivity, settings.activityTime, settings.restTime, isRunning, playStartSound, playRestSound]);

  // Listener para visibilidade da página - reativar Wake Lock
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && isRunning && wakeLockFunctions?.requestWakeLock) {
        try {
          await wakeLockFunctions.requestWakeLock();
          console.log('Wake Lock reativado após voltar à página');
        } catch (error) {
          console.warn('Não foi possível reativar Wake Lock:', error);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRunning, wakeLockFunctions]);

  const formatTime = (milliseconds: number): TimeFormatted => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');
    const msStr = ms.toString().padStart(2, '0');

    return {
      minutes: minutesStr,
      seconds: secondsStr,
      milliseconds: msStr,
      full: `${minutesStr}:${secondsStr}.${msStr}`
    };
  };

  // Função de contagem regressiva separada e organizada
  const startCountdown = async () => {
    setIsCountingDown(true);
    setCountdownValue(3);

    // Solicitar Wake Lock no início da contagem regressiva
    if (wakeLockFunctions?.requestWakeLock) {
      try {
        await wakeLockFunctions.requestWakeLock();
        console.log('Wake Lock ativado durante contagem regressiva');
      } catch (error) {
        console.warn('Erro ao ativar Wake Lock:', error);
      }
    }

    // Sequência sincronizada: 3, 2, 1, START
    const sequence = [
      { time: 0, action: () => { setCountdownValue(5); } },
      { time: 1000, action: () => { setCountdownValue(4); } },
      { time: 2000, action: () => { setCountdownValue(3); playRestSound();} },
      { time: 3000, action: () => { setCountdownValue(2); } },
      { time: 4000, action: () => { setCountdownValue(1); } },
      { time: 5000, action: () => { 
        setIsCountingDown(false);
        playStartSound();
        setIsRunning(true); 
      }}
    ];

    sequence.forEach(({ time, action }) => {
      setTimeout(action, time);
    });
  };

  const start = () => {
    setIsCompleted(false);
    
    // Primeiro início = contagem regressiva
    if (currentTime === 0 && totalElapsed === 0 && isActivity) {
      startCountdown();
    } else {
      // Retomar = início direto com Wake Lock
      setIsRunning(true);
      
      if (wakeLockFunctions?.requestWakeLock) {
        wakeLockFunctions.requestWakeLock().then(() => {
          console.log('Wake Lock ativado ao retomar timer');
        }).catch((error) => {
          console.warn('Erro ao ativar Wake Lock ao retomar:', error);
        });
      }
    }
  };

  const stop = () => {
    setIsRunning(false);
    setIsCountingDown(false);
    
    // Liberar Wake Lock quando pausar
    if (wakeLockFunctions?.releaseWakeLock) {
      wakeLockFunctions.releaseWakeLock();
      console.log('Wake Lock liberado ao pausar timer');
    }
  };

  const reset = () => {
    setCurrentTime(0);
    setTotalElapsed(0);
    setIsRunning(false);
    setIsActivity(true);
    setCycleCount(0);
    setIsCompleted(false);
    setIsCountingDown(false);
    setCountdownValue(3);
    
    // Liberar Wake Lock quando resetar
    if (wakeLockFunctions?.releaseWakeLock) {
      wakeLockFunctions.releaseWakeLock();
      console.log('Wake Lock liberado ao resetar timer');
    }
  };

  const toggle = () => {
    if (!isCompleted) {
      if (!isRunning && !isCountingDown) {
        start();
      } else {
        stop();
      }
    }
  };

  const updateSettings = (newSettings: IntervalSettings) => {
    setSettings(newSettings);
    reset();
  };

  const remainingActivity = Math.max(0, settings.activityTime - (isActivity ? currentTime : 0));
  const remainingRest = Math.max(0, settings.restTime - (!isActivity ? currentTime : 0));
  const remainingTotal = Math.max(0, settings.totalTime - totalElapsed);

  return {
    currentTime,
    totalElapsed,
    isRunning,
    isActivity,
    formattedCurrentTime: formatTime(currentTime),
    formattedTotalTime: formatTime(totalElapsed),
    remainingActivity,
    remainingRest,
    remainingTotal,
    cycleCount,
    isCompleted,
    isCountingDown,
    countdownValue,
    settings,
    start,
    stop,
    reset,
    toggle,
    updateSettings
  };
};

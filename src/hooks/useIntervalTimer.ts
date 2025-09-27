// hooks/useIntervalTimer.ts
import { useState, useEffect, useRef } from 'react';

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
  settings: IntervalSettings;
  start: () => void;
  stop: () => void;
  reset: () => void;
  toggle: () => void;
  updateSettings: (settings: IntervalSettings) => void;
}

export const useIntervalTimer = (initialSettings?: IntervalSettings): UseIntervalTimerReturn => {
  const defaultSettings: IntervalSettings = {
    activityTime: 30000, // 30s
    restTime: 120000,    // 2min
    totalTime: 600000    // 10min
  };

  const [settings, setSettings] = useState<IntervalSettings>(initialSettings || defaultSettings);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalElapsed, setTotalElapsed] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isActivity, setIsActivity] = useState<boolean>(true); // Começa com atividade
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && !isCompleted) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prevTime => prevTime + 10);
        setTotalElapsed(prevTotal => {
          const newTotal = prevTotal + 10;
          
          // Verifica se completou o tempo total
          if (newTotal >= settings.totalTime) {
            setIsRunning(false);
            setIsCompleted(true);
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
  }, [isRunning, isCompleted, settings.totalTime]);

  // Lógica de alternância entre atividade e descanso
  useEffect(() => {
    const targetTime = isActivity ? settings.activityTime : settings.restTime;
    
    if (currentTime >= targetTime && isRunning) {
      // Alterna entre atividade e descanso
      setIsActivity(prev => !prev);
      setCurrentTime(0);
      
      // Incrementa ciclo quando completa um descanso (fim do ciclo completo)
      if (!isActivity) {
        setCycleCount(prev => prev + 1);
      }
    }
  }, [currentTime, isActivity, settings.activityTime, settings.restTime, isRunning]);

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

  const start = () => {
    setIsCompleted(false);
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setCurrentTime(0);
    setTotalElapsed(0);
    setIsRunning(false);
    setIsActivity(true);
    setCycleCount(0);
    setIsCompleted(false);
  };

  const toggle = () => {
    if (!isCompleted) {
      setIsRunning(prev => !prev);
    }
  };

  const updateSettings = (newSettings: IntervalSettings) => {
    setSettings(newSettings);
    reset(); // Reset quando mudar configurações
  };

  const currentTargetTime = isActivity ? settings.activityTime : settings.restTime;
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
    settings,
    start,
    stop,
    reset,
    toggle,
    updateSettings
  };
};

// import { useState, useEffect, useRef } from 'react';

// interface TimeFormatted {
//   minutes: string;
//   seconds: string;
//   milliseconds: string;
//   full: string; // mantém compatibilidade
// }

// interface UseStopwatchReturn {
//   time: number;
//   isRunning: boolean;
//   start: () => void;
//   stop: () => void;
//   reset: () => void;
//   toggle: () => void;
//   formattedTime: TimeFormatted;
// }

// export const useStopwatch = (initialTime: number = 0): UseStopwatchReturn => {
//   const [time, setTime] = useState<number>(initialTime);
//   const [isRunning, setIsRunning] = useState<boolean>(false);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (isRunning) {
//       intervalRef.current = setInterval(() => {
//         setTime(prevTime => prevTime + 10);
//       }, 10);
//     } else {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//     }

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isRunning]);

//   const start = () => {
//     setIsRunning(true);
//   };

//   const stop = () => {
//     setIsRunning(false);
//   };

//   const reset = () => {
//     setTime(initialTime);
//     setIsRunning(false);
//   };

//   const toggle = () => {
//     setIsRunning(prev => !prev);
//   };

//   const formatTime = (milliseconds: number): TimeFormatted => {
//     const totalSeconds = Math.floor(milliseconds / 1000);
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     const ms = Math.floor((milliseconds % 1000) / 10);

//     const minutesStr = minutes.toString().padStart(2, '0');
//     const secondsStr = seconds.toString().padStart(2, '0');
//     const msStr = ms.toString().padStart(2, '0');

//     return {
//       minutes: minutesStr,
//       seconds: secondsStr,
//       milliseconds: msStr,
//       full: `${minutesStr}:${secondsStr}.${msStr}`
//     };
//   };

//   return {
//     time,
//     isRunning,
//     start,
//     stop,
//     reset,
//     toggle,
//     formattedTime: formatTime(time)
//   };
// };

// hooks/useStopwatch.ts
import { useState, useEffect, useRef } from 'react';

interface TimeFormatted {
  minutes: string;
  seconds: string;
  milliseconds: string;
  full: string;
}

interface UseStopwatchReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  toggle: () => void;
  formattedTime: TimeFormatted;
  targetTime: number;
  setTargetTime: (time: number) => void;
  remainingTime: number;
  isCompleted: boolean;
}

export const useStopwatch = (initialTime: number = 0): UseStopwatchReturn => {
  const [time, setTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [targetTime, setTargetTime] = useState<number>(0); // 0 = sem limite
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 10;
          
          // Verifica se atingiu o tempo limite
          if (targetTime > 0 && newTime >= targetTime) {
            setIsRunning(false);
            setIsCompleted(true);
            return targetTime;
          }
          
          return newTime;
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
  }, [isRunning, targetTime]);

  const start = () => {
    setIsCompleted(false);
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setTime(initialTime);
    setIsRunning(false);
    setIsCompleted(false);
  };

  const toggle = () => {
    if (!isCompleted) {
      setIsRunning(prev => !prev);
    }
  };

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

  const remainingTime = targetTime > 0 ? Math.max(0, targetTime - time) : 0;

  return {
    time,
    isRunning,
    start,
    stop,
    reset,
    toggle,
    formattedTime: formatTime(time),
    targetTime,
    setTargetTime,
    remainingTime,
    isCompleted
  };
};

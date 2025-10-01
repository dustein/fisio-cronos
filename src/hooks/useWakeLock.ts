// hooks/useWakeLock.ts
import { useEffect, useRef } from 'react';

interface WakeLockSentinel {
  released: boolean;
  release(): Promise<void>;
}

interface WakeLockNavigator {
  wakeLock: {
    request(type: 'screen'): Promise<WakeLockSentinel>;
  };
}

function hasWakeLock(navigator: Navigator): navigator is Navigator & WakeLockNavigator {
  return 'wakeLock' in navigator;
}

export function useWakeLock() {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const requestWakeLock = async () => {
    try {
      if (hasWakeLock(navigator)) {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
        console.log('Wake Lock ativo');
      }
    } catch (error) {
      console.error('Erro ao ativar Wake Lock:', error);
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLockRef.current) {
      await wakeLockRef.current.release();
      wakeLockRef.current = null;
      console.log('Wake Lock desativado');
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && wakeLockRef.current?.released) {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      releaseWakeLock();
    };
  }, []);

  return { requestWakeLock, releaseWakeLock };
}

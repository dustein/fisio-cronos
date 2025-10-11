// hooks/useAudio.ts
import { useRef, useCallback } from 'react';

interface UseAudioReturn {
  playStartSound: () => void;
  playEndSound: () => void;
  playRestSound: () => void;
  setVolume: (volume: number) => void;
  isAudioEnabled: boolean;
  setIsAudioEnabled: (enabled: boolean) => void;
}

export const useAudio = (): UseAudioReturn => {
  const startSoundRef = useRef<HTMLAudioElement | null>(null);
  const endSoundRef = useRef<HTMLAudioElement | null>(null);
  const restSoundRef = useRef<HTMLAudioElement | null>(null);
  const isAudioEnabledRef = useRef<boolean>(true);

  // Inicializar sons
  const initializeSounds = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (!startSoundRef.current) {
        startSoundRef.current = new Audio('/sounds/start-sound-beep.mp3');
        startSoundRef.current.preload = 'auto';
        startSoundRef.current.volume = 0.7;
      }
      
      if (!endSoundRef.current) {
        endSoundRef.current = new Audio('/sounds/end.mp3');
        endSoundRef.current.preload = 'auto';
        endSoundRef.current.volume = 0.7;
      }
      
      if (!restSoundRef.current) {
        restSoundRef.current = new Audio('/sounds/rest.mp3');
        restSoundRef.current.preload = 'auto';
        restSoundRef.current.volume = 0.7;
      }
    }
  }, []);

  const playSound = useCallback((audioRef: React.RefObject<HTMLAudioElement | null>) => {
    if (!isAudioEnabledRef.current) return;
    
    if (!audioRef.current) initializeSounds();
    
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.warn);
      }
    } catch (error) {
      console.warn('Erro ao reproduzir som:', error);
    }
  }, [initializeSounds]);

  const playStartSound = useCallback(() => {
    playSound(startSoundRef);
  }, [playSound]);

  const playEndSound = useCallback(() => {
    playSound(endSoundRef);
  }, [playSound]);

  const playRestSound = useCallback(() => {
    playSound(restSoundRef);
  }, [playSound]);

  const setVolume = useCallback((volume: number) => {
    const vol = Math.max(0, Math.min(1, volume));
    if (startSoundRef.current) startSoundRef.current.volume = vol;
    if (endSoundRef.current) endSoundRef.current.volume = vol;
    if (restSoundRef.current) restSoundRef.current.volume = vol;
  }, []);

  const setIsAudioEnabled = useCallback((enabled: boolean) => {
    isAudioEnabledRef.current = enabled;
  }, []);

  return {
    playStartSound,
    playEndSound,
    playRestSound,
    setVolume,
    isAudioEnabled: isAudioEnabledRef.current,
    setIsAudioEnabled
  };
};

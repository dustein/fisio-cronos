'use client'

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import IntervalSettingsComponent from '@/components/IntervalSettings';
import { useIntervalTimer } from '@/hooks/useIntervalTimer';
import { useWakeLock } from '@/hooks/useWakeLock';
import { TimerContainer } from '@/components/timer/TimerContainer';

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  
  const { requestWakeLock, releaseWakeLock } = useWakeLock();
  
  const intervalTimer = useIntervalTimer(undefined, {
  requestWakeLock,
  releaseWakeLock
  });
  
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (

    
    <main className="flex h-full w-full mx-auto p-0.5 py-1 space-y-4 flex-1">
      
      <Card variant="highlighted" className='flex flex-col w-full'>

        <div className='p-6 bg-gray-900 rounded-lg relative min-h-[400px] logo-background flex-1 flex'>

          {/* Botão de CONFIGURAÇÕES */}          
          <div
            onClick={() => setShowSettings(true)}
            // variant="secondary"
            className={`absolute top-2 right-2 border-2 border-gray-400/20 rounded-l text-l p-0.5 m-0 transition-all duration-300 ${
              !intervalTimer.isRunning 
                ? 'animate-pulse hover:animate-bounce' 
                : 'opacity-45'
            }`}
          >
            ⚙️ {!intervalTimer.isRunning && <p className='text-sm font-light'>Tempos</p>}
          </div>
          

          <TimerContainer 
            intervalTimer={intervalTimer}
            formatTime={formatTime}  
          />  

        </div>
      </Card>

      {/* Indicador de Wake Lock */}
      {/* <WakeLockIndicator /> */}

      {/* MODAL de Configurações de Tempos */}
      <Modal 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Configurações dos Tempos"
        className="max-w-md w-full mx-auto overflow-hidden"
      >
        <div className="max-h-[80vh] overflow-y-auto overflow-x-hidden">
          <IntervalSettingsComponent
            settings={intervalTimer.settings}
            onSettingsChange={intervalTimer.updateSettings}
            onClose={() => setShowSettings(false)}
          />
        </div>
      </Modal>
    </main>
  );
}

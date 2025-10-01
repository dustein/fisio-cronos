'use client'

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import IntervalSettingsComponent from '@/components/IntervalSettings';
import { useIntervalTimer } from '@/hooks/useIntervalTimer';
import { TimerContainer } from '@/components/timer/TimerContainer';

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  
  const intervalTimer = useIntervalTimer();

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

          {/* Botão de configurações */}
          <div className="absolute top-2 right-2">
            <Button
              onClick={() => setShowSettings(true)}
              variant="secondary"
              className={`text-l px-1 py-1 transition-all duration-300 ${
                !intervalTimer.isRunning 
                  ? 'animate-pulse hover:animate-bounce' 
                  : 'opacity-45'
              }`}
            >
              ⚙️
            </Button>
            {/* <span className="absolute top-0 right-0 -mt-1 -mr-1 h-3 w-3 animate-ping rounded-full bg-green-400 opacity-75"></span> */}
          </div>

          < TimerContainer 
            intervalTimer={intervalTimer}
            formatTime={formatTime}  
          />  
          

        
        </div>
      </Card>

      {/* Modal de Configurações */}
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

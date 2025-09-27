'use client'

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import IntervalSettingsComponent from '@/components/IntervalSettings';
import { useIntervalTimer } from '@/hooks/useIntervalTimer';

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  
  const intervalTimer = useIntervalTimer();

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getPhaseColor = () => {
    if (intervalTimer.isCompleted) return 'text-red-500';
    return intervalTimer.isActivity ? 'text-green-500' : 'text-blue-500';
  };

  const getPhaseLabel = () => {
    if (intervalTimer.isCompleted) return 'CONCLUÍDO!';
    return intervalTimer.isActivity ? 'ATIVIDADE' : 'DESCANSO';
  };

  const getCurrentTarget = () => {
    return intervalTimer.isActivity 
      ? intervalTimer.settings.activityTime 
      : intervalTimer.settings.restTime;
  };

  return (
    <main className="container mx-auto px-1.5 py-2 space-y-4">
      
      <Card variant="highlighted" className='w-full flex flex-col'>
        <div className='p-6 bg-gray-900 rounded-lg relative min-h-[400px]'>
          
          {/* Botão de configurações */}
          <div className="absolute top-4 right-4">
            <Button
              onClick={() => setShowSettings(true)}
              variant="secondary"
              className="text-xs px-3 py-1"
            >
              ⚙️ Configurar
            </Button>
          </div>

          {/* Fase atual (Atividade/Descanso) */}
          <div className="text-center mb-6">
            <div className={`text-2xl font-bold ${getPhaseColor()}`}>
              {getPhaseLabel()}
            </div>
            <div className="text-gray-400 text-sm">
              Ciclo {intervalTimer.cycleCount + 1}
            </div>
          </div>

          {/* Display principal do cronômetro atual */}
          <div className="text-center mb-6">
            <div className={`text-6xl font-mono font-bold ${getPhaseColor()}`}>
              <span>{intervalTimer.formattedCurrentTime.minutes}:{intervalTimer.formattedCurrentTime.seconds}</span>
              <span className="text-3xl opacity-50">
                .{intervalTimer.formattedCurrentTime.milliseconds}
              </span>
            </div>
          </div>

          {/* Barra de progresso da fase atual */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Progresso da fase</span>
              <span>{formatTime(getCurrentTarget() - intervalTimer.currentTime)} restantes</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-100 ${
                  intervalTimer.isActivity ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ 
                  width: `${(intervalTimer.currentTime / getCurrentTarget()) * 100}%` 
                }}
              />
            </div>
          </div>

          {/* Informações dos dois cronômetros */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Cronômetro de Atividade */}
            <div className="bg-green-900/30 rounded-lg p-3 text-center">
              <div className="text-green-400 font-semibold text-sm mb-1">⚡ ATIVIDADE</div>
              <div className="text-white font-mono text-lg">
                {formatTime(intervalTimer.settings.activityTime)}
              </div>
              {intervalTimer.isActivity && (
                <div className="text-green-300 text-xs mt-1">
                  Restam: {formatTime(intervalTimer.remainingActivity)}
                </div>
              )}
            </div>

            {/* Cronômetro de Descanso */}
            <div className="bg-blue-900/30 rounded-lg p-3 text-center">
              <div className="text-blue-400 font-semibold text-sm mb-1">😴 DESCANSO</div>
              <div className="text-white font-mono text-lg">
                {formatTime(intervalTimer.settings.restTime)}
              </div>
              {!intervalTimer.isActivity && (
                <div className="text-blue-300 text-xs mt-1">
                  Restam: {formatTime(intervalTimer.remainingRest)}
                </div>
              )}
            </div>
          </div>

          {/* Progresso total */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Progresso total</span>
              <span>{formatTime(intervalTimer.remainingTotal)} restantes</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-100"
                style={{ 
                  width: `${(intervalTimer.totalElapsed / intervalTimer.settings.totalTime) * 100}%` 
                }}
              />
            </div>
          </div>

          {/* Tempo total decorrido */}
          <div className="text-center mb-6">
            <div className="text-gray-400 text-sm">Tempo total:</div>
            <div className="text-yellow-400 font-mono text-xl">
              {intervalTimer.formattedTotalTime.minutes}:{intervalTimer.formattedTotalTime.seconds}
            </div>
          </div>

          {/* Indicador de conclusão */}
          {intervalTimer.isCompleted && (
            <div className="text-center mb-4">
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg inline-block animate-pulse">
                🎉 TREINO CONCLUÍDO! 🎉
              </div>
            </div>
          )}

          {/* Botões de controle */}
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={intervalTimer.toggle} 
              variant={intervalTimer.isRunning ? 'danger' : 'primary'} 
              className={`px-6 py-2 ${
                intervalTimer.isCompleted 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : ''
              }`}
              disabled={intervalTimer.isCompleted}
            >
              {intervalTimer.isRunning ? 'Pausar' : 'Iniciar'}
            </Button>
            
            <Button 
              variant='secondary' 
              onClick={intervalTimer.reset} 
              className='px-6 py-2'
            >
              Resetar
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal de Configurações */}
      <Modal 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Configurações do Interval Training"
      >
        <IntervalSettingsComponent
          settings={intervalTimer.settings}
          onSettingsChange={intervalTimer.updateSettings}
          onClose={() => setShowSettings(false)}
        />
      </Modal>
    </main>
  );
}

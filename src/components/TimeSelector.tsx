// components/TimeSelector.tsx
'use client'

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface TimeSelectorProps {
  onTimeSet: (timeInMs: number) => void;
  currentTarget: number;
  onClose: () => void; // Para fechar o modal
}

const TimeSelector = ({ onTimeSet, currentTarget, onClose }: TimeSelectorProps) => {
  const [customMinutes, setCustomMinutes] = useState(0);
  const [customSeconds, setCustomSeconds] = useState(0);

  const handleTimeSet = (timeMs: number) => {
    onTimeSet(timeMs);
    onClose(); // Fecha o modal após definir o tempo
  };

  const add10Seconds = () => {
    handleTimeSet(currentTarget + 10000);
  };

  const add30Seconds = () => {
    handleTimeSet(currentTarget + 30000);
  };

  const setCustomTime = () => {
    const totalMs = (customMinutes * 60 + customSeconds) * 1000;
    if (totalMs > 0) {
      handleTimeSet(totalMs);
    }
  };

  const formatTargetTime = (ms: number) => {
    if (ms === 0) return 'Sem limite';
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Tempo atual */}
      <div className="text-center p-3 bg-gray-800 rounded-lg">
        <div className="text-gray-400 text-sm">Tempo atual:</div>
        <div className="text-green-400 text-lg font-mono">
          {formatTargetTime(currentTarget)}
        </div>
      </div>

      {/* Botões de incremento */}
      <div className="space-y-2">
        <div className="text-white text-sm mb-2">Adicionar tempo:</div>
        <div className="flex gap-3">
          <Button 
            onClick={add10Seconds}
            variant="secondary"
            className="flex-1"
          >
            +10 segundos
          </Button>
          
          <Button 
            onClick={add30Seconds}
            variant="secondary"
            className="flex-1"
          >
            +30 segundos
          </Button>
        </div>
      </div>

      {/* Tempo customizado */}
      <div className="space-y-3">
        <div className="text-white text-sm">Definir tempo específico:</div>
        <div className="flex items-center justify-center space-x-2">
          <div className="flex items-center space-x-1">
            <input
              type="number"
              min="0"
              max="59"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(parseInt(e.target.value) || 0)}
              className="w-20 px-3 py-2 bg-gray-800 text-white rounded text-center"
              placeholder="0"
            />
            <span className="text-white">min</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <input
              type="number"
              min="0"
              max="59"
              value={customSeconds}
              onChange={(e) => setCustomSeconds(parseInt(e.target.value) || 0)}
              className="w-20 px-3 py-2 bg-gray-800 text-white rounded text-center"
              placeholder="0"
            />
            <span className="text-white">seg</span>
          </div>
        </div>
        
        <Button
          onClick={setCustomTime}
          variant="primary"
          className="w-full"
          disabled={customMinutes === 0 && customSeconds === 0}
        >
          Definir Tempo
        </Button>
      </div>

      {/* Opção sem limite */}
      <div className="pt-3 border-t border-gray-700">
        <Button 
          onClick={() => handleTimeSet(0)}
          variant={currentTarget === 0 ? 'primary' : 'secondary'}
          className="w-full"
        >
          Cronômetro Livre (Sem Limite)
        </Button>
      </div>
    </div>
  );
};

export default TimeSelector;

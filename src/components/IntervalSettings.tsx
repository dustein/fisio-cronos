// components/IntervalSettings.tsx
'use client'

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface IntervalSettings {
  activityTime: number;
  restTime: number;
  totalTime: number;
}

interface IntervalSettingsProps {
  settings: IntervalSettings;
  onSettingsChange: (settings: IntervalSettings) => void;
  onClose: () => void;
}

const IntervalSettingsComponent = ({ settings, onSettingsChange, onClose }: IntervalSettingsProps) => {
  const [activityMin, setActivityMin] = useState(Math.floor(settings.activityTime / 60000));
  const [activitySec, setActivitySec] = useState(Math.floor((settings.activityTime % 60000) / 1000));
  const [restMin, setRestMin] = useState(Math.floor(settings.restTime / 60000));
  const [restSec, setRestSec] = useState(Math.floor((settings.restTime % 60000) / 1000));
  const [totalMin, setTotalMin] = useState(Math.floor(settings.totalTime / 60000));

  const presets = [
    { name: 'HIIT Básico', activity: 30, rest: 30, total: 10 },
    { name: 'Tabata', activity: 20, rest: 10, total: 8 },
    { name: 'Cardio Longo', activity: 60, rest: 120, total: 30 },
    { name: 'Força', activity: 45, rest: 90, total: 20 },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setActivityMin(0);
    setActivitySec(preset.activity);
    setRestMin(Math.floor(preset.rest / 60));
    setRestSec(preset.rest % 60);
    setTotalMin(preset.total);
  };

  const handleSave = () => {
    const newSettings: IntervalSettings = {
      activityTime: (activityMin * 60 + activitySec) * 1000,
      restTime: (restMin * 60 + restSec) * 1000,
      totalTime: totalMin * 60 * 1000
    };

    if (newSettings.activityTime > 0 && newSettings.restTime > 0 && newSettings.totalTime > 0) {
      onSettingsChange(newSettings);
      onClose();
    }
  };

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-4 p-1">
        {/* Presets */}
        <div>
          <h3 className="text-white font-semibold mb-3">Presets Rápidos:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {presets.map((preset) => (
              <Button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                variant="secondary"
                className="text-xs p-2 text-center w-full"
              >
                <div className="font-semibold truncate">{preset.name}</div>
                <div className="text-xs opacity-75">
                  {preset.activity}s / {preset.rest}s
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Configurações personalizadas */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">Personalizado:</h3>
          
          {/* Tempo de Atividade */}
          <div className="bg-green-900/30 rounded-lg p-3">
            <div className="text-green-400 font-semibold mb-2">⚡ Tempo de Atividade:</div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={activityMin}
                  onChange={(e) => setActivityMin(parseInt(e.target.value) || 0)}
                  className="w-14 px-2 py-1 bg-gray-800 text-white rounded text-center text-sm"
                  placeholder="0"
                />
                <span className="text-white text-sm">min</span>
                <input
                  type="number"
                  min="1"
                  max="59"
                  value={activitySec}
                  onChange={(e) => setActivitySec(parseInt(e.target.value) || 1)}
                  className="w-14 px-2 py-1 bg-gray-800 text-white rounded text-center text-sm"
                  placeholder="30"
                />
                <span className="text-white text-sm">seg</span>
              </div>
              <div className="text-green-400 font-mono text-sm">
                = {formatTime(activityMin, activitySec)}
              </div>
            </div>
          </div>

          {/* Tempo de Descanso */}
          <div className="bg-blue-900/30 rounded-lg p-3">
            <div className="text-blue-400 font-semibold mb-2">😴 Tempo de Descanso:</div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={restMin}
                  onChange={(e) => setRestMin(parseInt(e.target.value) || 0)}
                  className="w-14 px-2 py-1 bg-gray-800 text-white rounded text-center text-sm"
                  placeholder="2"
                />
                <span className="text-white text-sm">min</span>
                <input
                  type="number"
                  min="1"
                  max="59"
                  value={restSec}
                  onChange={(e) => setRestSec(parseInt(e.target.value) || 0)}
                  className="w-14 px-2 py-1 bg-gray-800 text-white rounded text-center text-sm"
                  placeholder="0"
                />
                <span className="text-white text-sm">seg</span>
              </div>
              <div className="text-blue-400 font-mono text-sm">
                = {formatTime(restMin, restSec)}
              </div>
            </div>
          </div>

          {/* Tempo Total */}
          <div className="bg-yellow-900/30 rounded-lg p-3">
            <div className="text-yellow-400 font-semibold mb-2">⏱️ Tempo Total do Treino:</div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={totalMin}
                  onChange={(e) => setTotalMin(parseInt(e.target.value) || 1)}
                  className="w-16 px-2 py-1 bg-gray-800 text-white rounded text-center text-sm"
                  placeholder="10"
                />
                <span className="text-white text-sm">minutos</span>
              </div>
              <div className="text-yellow-400 font-mono text-sm">
                = {totalMin} min
              </div>
            </div>
          </div>
        </div>

        {/* Resumo */}
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
          <div className="text-white font-semibold mb-2">Resumo:</div>
          <div className="text-sm space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-green-400">Atividade:</span>
              <span className="text-white font-mono">{formatTime(activityMin, activitySec)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-400">Descanso:</span>
              <span className="text-white font-mono">{formatTime(restMin, restSec)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-yellow-400">Total:</span>
              <span className="text-white font-mono">{totalMin} min</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-gray-600">
              <span className="text-gray-400">Ciclos estimados:</span>
              <span className="text-white font-mono">
                ~{Math.floor((totalMin * 60 * 1000) / ((activityMin * 60 + activitySec + restMin * 60 + restSec) * 1000))}
              </span>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Button onClick={onClose} variant="secondary" className="flex-1 w-full">
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            variant="primary" 
            className="flex-1 w-full"
            disabled={activitySec === 0 || restSec === 0 || totalMin === 0}
          >
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntervalSettingsComponent;

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
  
  const NumberControl = ({ 
    value, 
    onIncrement, 
    onDecrement, 
    incrementAmount, 
    decrementAmount, 
    min = 0, 
    max = 999,
    unit = '',
    color = 'blue'
  }: {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
    incrementAmount: number;
    decrementAmount: number;
    min?: number;
    max?: number;
    unit?: string;
    color?: 'blue' | 'green' | 'yellow';
  }) => {
    const colorClasses = {
      blue: 'bg-blue-700/60 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500',
      green: 'bg-green-700/60 hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-500',
      yellow: 'bg-yellow-600/70 hover:bg-yellow-700 disabled:bg-gray-700 disabled:text-gray-500'
    };

    return (
      <div className="flex items-center space-x-6 justify-center">
        <button
          onClick={onDecrement}
          disabled={value <= min}
          className={`${colorClasses[color]} text-white rounded px-3 py-1 text-sm font-bold disabled:cursor-not-allowed transition-colors`}
        >
          - {decrementAmount} {unit}
        </button>
        
        {/* <div className="bg-gray-800 px-4 py-2 rounded text-white font-mono text-center min-w-[60px]">
          {value}{unit}
        </div> */}
        
        <button
          onClick={onIncrement}
          disabled={value >= max}
          className={`${colorClasses[color]} text-white rounded px-3 py-1 text-sm font-bold disabled:cursor-not-allowed transition-colors`}
        >
          + {incrementAmount} {unit}
        </button>
      </div>
    );
  };

  const handleReset = () => {
    setActivityMin(0);
    setActivitySec(0);
    setRestMin(0);
    setRestSec(0);
    setTotalMin(0);
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
      <div className="space-y-2 p-1">
        {/* Configurações personalizadas */}
        <div className="space-y-2">
          
          {/* Tempo de Atividade */}
          <div className="bg-green-900/30 rounded-lg p-2">
            
            <div className="text-green-400 font-semibold mb-1 text-center">⚡ Tempo de Atividade:</div>

            <div className="text-green-400 font-mono text-lg text-center bg-green-900/50 rounded p-1 mb-2">
              Total: {formatTime(activityMin, activitySec)}
            </div>
            
            <div className="space-y-2">
              {/* Controle de Minutos */}
              <div className="flex flex-col space-y-2">
                {/* <span className="text-white text-sm font-medium">Minutos:</span> */}
                <NumberControl
                  value={activityMin}
                  onIncrement={() => setActivityMin(Math.min(activityMin + 1, 59))}
                  onDecrement={() => setActivityMin(Math.max(activityMin - 1, 0))}
                  incrementAmount={1}
                  decrementAmount={1}
                  min={0}
                  max={59}
                  unit="min"
                  color="green"
                />
              </div>
              
              {/* Controle de Segundos */}
              <div className="flex flex-col space-y-2">
                {/* <span className="text-white text-sm font-medium">Segundos:</span> */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <NumberControl
                    value={activitySec}
                    onIncrement={() => setActivitySec(Math.min(activitySec + 10, 59))}
                    onDecrement={() => setActivitySec(Math.max(activitySec - 10, 0))}
                    incrementAmount={10}
                    decrementAmount={10}
                    min={0}
                    max={59}
                    unit="s"
                    color="green"
                  />
                  <NumberControl
                    value={activitySec}
                    onIncrement={() => setActivitySec(Math.min(activitySec + 30, 59))}
                    onDecrement={() => setActivitySec(Math.max(activitySec - 30, 0))}
                    incrementAmount={30}
                    decrementAmount={30}
                    min={0}
                    max={59}
                    unit="s"
                    color="green"
                  />
                </div>
              </div>
              

            </div>
          </div>

          {/* Tempo de Descanso */}
          <div className="bg-blue-900/30 rounded-lg p-2">
            
            <div className="text-blue-400 font-semibold mb-1 text-center">🕓 Tempo de Descanso:</div>
            
            <div className="text-blue-400 font-mono text-lg text-center bg-blue-900/50 rounded p-1 mb-2">
            Total: {formatTime(restMin, restSec)}
            </div>
            
            <div className="space-y-2">
              {/* Controle de Minutos */}
              <div className="flex flex-col space-y-2">
                {/* <span className="text-white text-sm font-medium">Minutos:</span> */}
                <NumberControl
                  value={restMin}
                  onIncrement={() => setRestMin(Math.min(restMin + 1, 59))}
                  onDecrement={() => setRestMin(Math.max(restMin - 1, 0))}
                  incrementAmount={1}
                  decrementAmount={1}
                  min={0}
                  max={59}
                  unit="min"
                  color="blue"
                />
              </div>
              
              {/* Controle de Segundos */}
              <div className="flex flex-col space-y-2">
                {/* <span className="text-white text-sm font-medium">Segundos:</span> */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <NumberControl
                    value={restSec}
                    onIncrement={() => setRestSec(Math.min(restSec + 10, 59))}
                    onDecrement={() => setRestSec(Math.max(restSec - 10, 0))}
                    incrementAmount={10}
                    decrementAmount={10}
                    min={0}
                    max={59}
                    unit="s"
                    color="blue"
                  />
                  <NumberControl
                    value={restSec}
                    onIncrement={() => setRestSec(Math.min(restSec + 30, 59))}
                    onDecrement={() => setRestSec(Math.max(restSec - 30, 0))}
                    incrementAmount={30}
                    decrementAmount={30}
                    min={0}
                    max={59}
                    unit="s"
                    color="blue"
                  />
                </div>
              </div>
              

            </div>
          </div>

          {/* Tempo Total */}
          <div className="bg-yellow-900/30 rounded-lg p-2 text-center">
            <div className="text-yellow-400 font-semibold mb-2">⏱️ Tempo Total do Treino:</div>
            
            <div className="space-y-2">
              <div className="flex flex-col space-y-2">
                {/* <span className="text-white text-sm font-medium">Minutos:</span> */}
                <NumberControl
                  value={totalMin}
                  onIncrement={() => setTotalMin(Math.min(totalMin + 1, 120))}
                  onDecrement={() => setTotalMin(Math.max(totalMin - 1, 1))}
                  incrementAmount={1}
                  decrementAmount={1}
                  min={1}
                  max={120}
                  unit="min"
                  color="yellow"
                />
              </div>
              
              <div className="text-yellow-400 font-mono text-l text-center bg-yellow-900/50 rounded py-2">
                <p>Total: {totalMin} minutos</p>
                <p>{Math.floor((totalMin * 60 * 1000) / ((activityMin * 60 + activitySec + restMin * 60 + restSec) * 1000))} Ciclo(s)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo */}
        <div className="bg-gray-800 rounded-lg px-6 py-1 border border-gray-600">
          <div className="text-white font-semibold mb-1 text-center">Resumo:</div>
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
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Ciclo(s):</span>
              <span className="text-white font-mono">
                {Math.floor((totalMin * 60 * 1000) / ((activityMin * 60 + activitySec + restMin * 60 + restSec) * 1000))}
              </span>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col text-l sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        
          <Button 
            onClick={handleReset} 
            variant="secondary" 
            className="w-full bg-red-500/30 hover:bg-red-600 text-white"
          >
            Reset Tempos
          </Button>
          <Button onClick={onClose} variant="secondary" className="flex-1 w-full">
            Cancelar
          </Button>

          <Button 
            onClick={handleSave} 
            variant="primary" 
            className="flex-1 w-full border-2 border-green-500"
            disabled={
              (activityMin * 60 + activitySec) === 0 || 
              (restMin * 60 + restSec) === 0 || 
              totalMin === 0
            }
          >
            Salvar Configurações
          </Button>
        </div>
      </div>
      
    </div>
  );
};

export default IntervalSettingsComponent;

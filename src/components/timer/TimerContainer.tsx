// components/timer/TimerContainer.tsx
import { PhaseIndicator } from './PhaseIndicator';
import { TimerDisplay } from './TimerDisplay';
import { ProgressBar } from './ProgressBar';
import { TimerCards } from './TimerCards';
import { TotalTimeDisplay } from './TotalTimeDisplay';
import { CompletionIndicator } from './CompletionIndicator';
import { TimerControls } from './TimerControls';

// Interface para definir o tipo do intervalTimer
interface IntervalTimerType {
  isCompleted: boolean;
  isActivity: boolean;
  isRunning: boolean;
  cycleCount: number;
  currentTime: number;
  totalElapsed: number;
  remainingActivity: number;
  remainingRest: number;
  remainingTotal: number;
  isCountingDown: boolean; // NOVO
  countdownValue: number;  // NOVO
  formattedCurrentTime: {
    minutes: string;
    seconds: string;
    milliseconds: string;
  };
  formattedTotalTime: {
    minutes: string;
    seconds: string;
  };
  settings: {
    activityTime: number;
    restTime: number;
    totalTime: number;
  };
  toggle: () => void;
  reset: () => void;
}

// Interface das props do componente
interface TimerContainerProps {
  intervalTimer: IntervalTimerType;
  formatTime: (ms: number) => string;
}

export const TimerContainer = ({ intervalTimer, formatTime }: TimerContainerProps) => {
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
    <div className='relative flex flex-col flex-1 justify-between w-full'>
      <div className='flex-1 flex items-center justify-center flex-col'>

        <div className='flex-shrink-0'>
          <PhaseIndicator
            phaseLabel={getPhaseLabel()}
            phaseColor={getPhaseColor()}
            cycleCount={intervalTimer.cycleCount}
          />
        </div>
        <div className='flex-grow flex items-center justify-center py-4'>
          <TimerDisplay
            minutes={intervalTimer.formattedCurrentTime.minutes}
            seconds={intervalTimer.formattedCurrentTime.seconds}
            milliseconds={intervalTimer.formattedCurrentTime.milliseconds}
            phaseColor={getPhaseColor()}
            isCountingDown={intervalTimer.isCountingDown}
            countdownValue={intervalTimer.countdownValue}
          />
        </div>
      </div>
      <div>
        <div className='flex-shrink-0 space-y-4'>
          <ProgressBar
            label="Progresso da fase"
            remainingTime={formatTime(getCurrentTarget() - intervalTimer.currentTime)}
            progress={(intervalTimer.currentTime / getCurrentTarget()) * 100}
            color={intervalTimer.isActivity ? 'bg-green-500' : 'bg-blue-500'}
          />

          <TimerCards
            activityTime={intervalTimer.settings.activityTime}
            restTime={intervalTimer.settings.restTime}
            isActivity={intervalTimer.isActivity}
            remainingActivity={intervalTimer.remainingActivity}
            remainingRest={intervalTimer.remainingRest}
            formatTime={formatTime}
          />

          <ProgressBar
            label="Progresso total"
            remainingTime={formatTime(intervalTimer.remainingTotal)}
            progress={(intervalTimer.totalElapsed / intervalTimer.settings.totalTime) * 100}
            color="bg-yellow-500"
            height="h-2"
          />

          <TotalTimeDisplay
            minutes={intervalTimer.formattedTotalTime.minutes}
            seconds={intervalTimer.formattedTotalTime.seconds}
          />

          <CompletionIndicator isCompleted={intervalTimer.isCompleted} />

        </div>

        <div className='flex-shrink-0 pt-4'>
          <TimerControls
            isRunning={intervalTimer.isRunning}
            isCompleted={intervalTimer.isCompleted}
            onToggle={intervalTimer.toggle}
            onReset={intervalTimer.reset}
          />
        </div>
      </div>

      
    </div>
  );
};

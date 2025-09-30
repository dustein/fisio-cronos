// components/timer/TimerDisplay.tsx
interface TimerDisplayProps {
  minutes: string;
  seconds: string;
  milliseconds: string;
  phaseColor: string;
}

export const TimerDisplay = ({ minutes, seconds, milliseconds, phaseColor }: TimerDisplayProps) => {
  return (
    <div className="text-center mb-6">
      <div className={`text-6xl font-mono font-bold ${phaseColor}`}>
        <span>{minutes}:{seconds}</span>
        <span className="text-3xl opacity-50">
          .{milliseconds}
        </span>
      </div>
    </div>
  );
};

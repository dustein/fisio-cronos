// components/timer/TotalTimeDisplay.tsx
interface TotalTimeDisplayProps {
  minutes: string;
  seconds: string;
}

export const TotalTimeDisplay = ({ minutes, seconds }: TotalTimeDisplayProps) => {
  return (
    <div className="text-center mb-6">
      <div className="text-gray-400 text-sm">Tempo total: <span className="text-yellow-400 font-mono text-l">{minutes}:{seconds}</span></div>
      {/* <div className="text-yellow-400 font-mono text-l">
        {minutes}:{seconds}
      </div> */}
    </div>
  );
};

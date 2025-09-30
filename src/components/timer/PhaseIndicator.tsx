// components/timer/PhaseIndicator.tsx
interface PhaseIndicatorProps {
  phaseLabel: string;
  phaseColor: string;
  cycleCount: number;
}

export const PhaseIndicator = ({ phaseLabel, phaseColor, cycleCount }: PhaseIndicatorProps) => {
  return (
    <div className="text-center mb-2">
      <div className={`text-l font-bold ${phaseColor}`}>
        {phaseLabel}<span className="text-gray-400 text-sm font-light"> - Ciclo {cycleCount + 1}</span>
      </div>
      {/* <div className="text-gray-400 text-sm">
        Ciclo {cycleCount + 1}
      </div> */}
    </div>
  );
};

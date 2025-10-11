interface PhaseIndicatorProps {
  phaseLabel: string;
  phaseColor: string;
  cycleCount: number;
}

export const PhaseIndicator = ({ phaseLabel, phaseColor, cycleCount }: PhaseIndicatorProps) => {
  return (
    <div className="text-center mb-2">
      <div className={`text-4xl font-bold pt-8 ${phaseColor}`}>
        {phaseLabel}
        <p className="text-gray-300 text-sm font-light">Ciclo {(cycleCount + 1).toString().padStart(2, '0')}</p>
      </div>
    </div>
  );
};

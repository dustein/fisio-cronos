interface TimerDisplayProps {
  minutes: string;
  seconds: string;
  milliseconds: string;
  phaseColor: string;
  isCountingDown?: boolean;
  countdownValue?: number;
}

export const TimerDisplay = ({ minutes, seconds, milliseconds, phaseColor, isCountingDown = false, countdownValue = 0 }: TimerDisplayProps) => {
  
  if (isCountingDown) {
    return (
      <div className="text-center w-full">
        {/* Contagem regressiva usando sua estilização existente */}
        <div 
          className={`font-mono font-bold leading-none text-red-400`}
          style={{
            fontSize: 'clamp(5rem, 12vw, 8rem)',
          }}
        >
          {countdownValue}
        </div>
        
        <div className="text-red-300 text-lg mt-2">
          Preparar...
        </div>
      </div>
    );
  }
  
  return (
    <div className={`text-center w-full ${phaseColor}`}>
      
      <div 
        className="font-mono font-bold leading-none"
        style={{
          fontSize: 'clamp(2rem, 24vw, 24rem)', // Mínimo 3rem, máximo 8rem, preferido 12vw
        }}
      >
        {minutes}:{seconds}

        {/* Milissegundos com fonte proporcional */}
        <span 
          className={`font-mono font-medium ${phaseColor} opacity-80`}
          style={{
            fontSize: 'clamp(2rem, 12vw, 12rem)', // Proporcionalmente menor
          }}
        >
          .{milliseconds}
        </span>
      </div>
      
      
    </div>
  );
};

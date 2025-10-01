interface TimerDisplayProps {
  minutes: string;
  seconds: string;
  milliseconds: string;
  phaseColor: string;
}

export const TimerDisplay = ({ minutes, seconds, milliseconds, phaseColor }: TimerDisplayProps) => {
  return (
    <div className={`text-center w-full ${phaseColor}`}>
      {/* Timer principal com fonte fluida */}
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

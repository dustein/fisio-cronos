// components/timer/TimerCards.tsx
interface TimerCardsProps {
  activityTime: number;
  restTime: number;
  isActivity: boolean;
  remainingActivity: number;
  remainingRest: number;
  formatTime: (ms: number) => string;
}

export const TimerCards = ({ 
  // activityTime, 
  // restTime, 
  isActivity, 
  remainingActivity, 
  remainingRest, 
  formatTime 
}: TimerCardsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {/* Cronômetro de Atividade */}
      <div className={`rounded-lg p-1 text-center flex flex-col justify-center ${
        isActivity ? 'bg-green-800/30' : 'bg-gray-800/40'
      }`}>
        <div className="text-green-400 font-semibold text-xs">
          <p className={`${ isActivity ? '' : 'opacity-20'}`}>⚡</p>
          <p className={`${ isActivity ? 'text-green-400' : 'text-gray-600'}`}>ATIVIDADE</p>
        </div>

        <div className={`font-mono text-l ${ isActivity ? 'text-gray-100' : 'text-gray-600'}`}>
          {formatTime(remainingActivity)}
          {/* {formatTime(activityTime)} */}
        </div>
{/*         
        {isActivity && (
          <div className="text-green-300 text-xs mt-1">
            Restam: {formatTime(remainingActivity)}
          </div>
        )} */}

      </div>

      {/* Cronômetro de Descanso */}
      <div className="bg-blue-900/30 rounded-lg p-1 text-center flex flex-col justify-center">
        <div className="text-blue-400 font-semibold text-xs">
          <p className={`${ isActivity ? 'opacity-20' : ''}`}>😴</p>
          <p className={`${ isActivity ? 'text-gray-600' : 'text-blue-400'}`}>DESCANSO</p>
          
        </div>
        
        <div className={`font-mono text-l ${ isActivity ? 'text-gray-600' : 'text-gray-100'}`}>
          {formatTime(remainingRest)}
          {/* {formatTime(restTime)} */}
        </div>
        
        {/* {!isActivity && (
          <div className="text-blue-300 text-xs mt-1">
            Restam: {formatTime(remainingRest)}
          </div>
        )} */}
      </div>
    </div>
  );
};

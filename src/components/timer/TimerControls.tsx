import Button from "../ui/Button";

// components/timer/TimerControls.tsx
interface TimerControlsProps {
  isRunning: boolean;
  isCompleted: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export const TimerControls = ({ isRunning, isCompleted, onToggle, onReset }: TimerControlsProps) => {
  return (
    <div className="flex justify-center space-x-4">
      <Button 
        onClick={onToggle} 
        variant={isRunning ? 'danger' : 'primary'} 
        className={`px-6 py-2 ${
          isCompleted 
            ? 'bg-gray-600 cursor-not-allowed' 
            : ''
        }`}
        disabled={isCompleted}
      >
        {isRunning ? 'Pausar' : 'Iniciar'}
      </Button>
      
      <Button 
        variant='secondary' 
        onClick={onReset} 
        className='px-6 py-2'
      >
        Resetar
      </Button>
    </div>
  );
};

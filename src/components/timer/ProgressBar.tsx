interface ProgressBarProps {
  label: string;
  remainingTime: string;
  progress: number;
  color: string;
  height?: string;
}

export const ProgressBar = ({ 
  label, 
  remainingTime, 
  progress, 
  color, 
  height = "h-3" 
}: ProgressBarProps) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-400 mb-1">
        <span>{label}</span>
        <span>{remainingTime} restantes</span>
      </div>
      <div className={`w-full bg-gray-700 rounded-full ${height}`}>
        <div 
          className={`${height} rounded-full transition-all duration-100 ${color}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// components/timer/CompletionIndicator.tsx
interface CompletionIndicatorProps {
  isCompleted: boolean;
}

export const CompletionIndicator = ({ isCompleted }: CompletionIndicatorProps) => {
  if (!isCompleted) return null;

  return (
    <div className="text-center mb-4">
      <div className="bg-red-500 text-white px-4 py-2 rounded-lg inline-block animate-pulse">
        🎉 TREINO CONCLUÍDO! 🎉
      </div>
    </div>
  );
};

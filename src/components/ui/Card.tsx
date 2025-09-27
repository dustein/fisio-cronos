interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  variant?: 'default' | 'highlighted' | 'info';
}

export default function Card({ children, title, className = '', variant = 'default' }: CardProps) {
  const variantClasses = {
    default: 'bg-white border-gray-200',
    highlighted: 'bg-grey-800 border-blue-200',
    info: 'bg-green-50 border-green-200'
  };

  return (
    <div className={`border rounded-lg p-0 shadow-sm text-center ${variantClasses[variant]} ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

// src/components/ui/alert.tsx
import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success';
}

export const Alert: React.FC<AlertProps> = ({
  className = '',
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'bg-blue-50 text-blue-800',
    destructive: 'bg-red-50 text-red-800',
    success: 'bg-green-50 text-green-800',
  };

  return (
    <div
      role="alert"
      className={`rounded-lg p-4 ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

export const AlertTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = '',
  ...props
}) => (
  <h5
    className={`font-medium mb-1 ${className}`}
    {...props}
  />
);

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  ...props
}) => (
  <p
    className={`text-sm opacity-90 ${className}`}
    {...props}
  />
);

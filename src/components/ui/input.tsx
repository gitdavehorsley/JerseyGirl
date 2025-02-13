// src/components/ui/input.tsx

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // You can add custom props if needed
}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={`border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}

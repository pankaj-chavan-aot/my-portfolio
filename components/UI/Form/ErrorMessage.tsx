'use client';

import React from 'react';
import { cn } from '@/lib/validation/utils';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  if (!message) return null;

  return (
    <div className={cn('error-message-container', className)}>
      <span className="error-icon">⚠️</span>
      <span className="error-text">{message}</span>
    </div>
  );
};

export default ErrorMessage;
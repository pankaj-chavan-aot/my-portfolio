'use client';

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { cn } from '@/lib/validation/utils';

interface TextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  register: UseFormRegister<any>;
  error?: FieldError;
  disabled?: boolean;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  placeholder,
  required = false,
  rows = 4,
  register,
  error,
  disabled = false,
  className
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className={cn('form-label', error && 'error-label')}>
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'form-textarea',
          error && 'form-textarea-error',
          disabled && 'form-textarea-disabled',
          className
        )}
        {...register(name)}
      />
      {error && (
        <span className="error-message">
          ⚠️ {error.message}
        </span>
      )}
    </div>
  );
};

export default TextArea;
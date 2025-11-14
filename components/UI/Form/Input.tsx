'use client';

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { cn } from '@/lib/validation/utils';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<any>;
  error?: FieldError;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
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
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'form-input',
          error && 'form-input-error',
          disabled && 'form-input-disabled',
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

export default Input;
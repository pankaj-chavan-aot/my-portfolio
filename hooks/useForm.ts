'use client';

import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Simple hook without complex generics
export const useValidatedForm = <T extends z.ZodType<any, any>>(
  schema: T,
  defaultValues?: z.infer<T>,
  onSubmit?: (data: z.infer<T>) => Promise<void> | void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema) as any, // Type assertion to fix compatibility
    defaultValues: defaultValues as any,
    mode: 'onChange'
  });

  const handleSubmit = async (data: z.infer<T>) => {
    if (!onSubmit) return;
    
    try {
      setIsSubmitting(true);
      setSubmitError('');
      await onSubmit(data);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    ...methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
    isSubmitting,
    submitError,
    setSubmitError
  };
};

// Alternative: Direct form setup without custom hook
export const setupForm = <T extends z.ZodType<any, any>>(schema: T, defaultValues?: z.infer<T>) => {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema) as any,
    defaultValues: defaultValues as any,
    mode: 'onChange'
  });
};
// 'use client';

// import { useState } from 'react';
// import { useForm, UseFormReturn } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';

// // Simple hook without complex generics
// export const useValidatedForm = <T extends z.ZodType<any, any>>(
//   schema: T,
//   defaultValues?: z.infer<T>,
//   onSubmit?: (data: z.infer<T>) => Promise<void> | void
// ) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState('');

//   const methods = useForm<z.infer<T>>({
//     resolver: zodResolver(schema) as any, // Type assertion to fix compatibility
//     defaultValues: defaultValues as any,
//     mode: 'onChange'
//   });

//   const handleSubmit = async (data: z.infer<T>) => {
//     if (!onSubmit) return;
    
//     try {
//       setIsSubmitting(true);
//       setSubmitError('');
//       await onSubmit(data);
//     } catch (error) {
//       setSubmitError(error instanceof Error ? error.message : 'Something went wrong');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return {
//     ...methods,
//     handleSubmit: methods.handleSubmit(handleSubmit),
//     isSubmitting,
//     submitError,
//     setSubmitError
//   };
// };

// // Alternative: Direct form setup without custom hook
// export const setupForm = <T extends z.ZodType<any, any>>(schema: T, defaultValues?: z.infer<T>) => {
//   return useForm<z.infer<T>>({
//     resolver: zodResolver(schema) as any,
//     defaultValues: defaultValues as any,
//     mode: 'onChange'
//   });
// };

'use client';

import { useState } from 'react';
import { useForm, UseFormReturn, FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Fix for Zod and React Hook Form type compatibility
type ZodSchema<T extends z.ZodType<any, any>> = T;

interface UseAppFormProps<T extends z.ZodType<any, any>> {
  schema: T;
  defaultValues?: z.infer<T>;
  onSubmit: (data: z.infer<T>) => void | Promise<void>;
}

export const useAppForm = <T extends z.ZodType<any, any>>({
  schema,
  defaultValues,
  onSubmit
}: UseAppFormProps<T>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  // Use z.input for the form data type (this fixes the compatibility issue)
  type FormData = z.input<T>;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema) as any, // Type assertion to fix the resolver issue
    defaultValues: defaultValues as any,
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');
      await onSubmit(data as z.infer<T>);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    methods.reset();
    setSubmitError('');
  };

  return {
    ...methods,
    handleSubmit: methods.handleSubmit(handleFormSubmit),
    isSubmitting,
    submitError,
    setSubmitError,
    resetForm,
    formState: methods.formState
  };
};
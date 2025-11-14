'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      duration={4000}
      expand={true}
      richColors
      closeButton
      theme="light"
    />
  );
}
// // Simple utility function for conditional classes (clsx alternative)
// export function cn(...classes: (string | undefined | null | boolean)[]): string {
//   return classes.filter(Boolean).join(' ');
// }

// // Validation error formatter
// export const formatValidationError = (error: any): string => {
//   if (error && typeof error === 'object' && 'message' in error) {
//     return error.message as string;
//   }
//   return 'Validation error occurred';
// };

// // Debounce utility for form validation
// export const debounce = <T extends (...args: any[]) => any>(
//   func: T,
//   wait: number
// ): ((...args: Parameters<T>) => void) => {
//   let timeout: NodeJS.Timeout;
//   return (...args: Parameters<T>) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// };

// // Email validation utility
// export const isValidEmail = (email: string): boolean => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// // Phone validation utility
// export const isValidPhone = (phone: string): boolean => {
//   const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
//   return phoneRegex.test(phone);
// };

// // URL validation utility
// export const isValidUrl = (url: string): boolean => {
//   try {
//     new URL(url);
//     return true;
//   } catch {
//     return false;
//   }
// };


// Utility functions
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
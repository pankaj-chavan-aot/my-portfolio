import { z } from 'zod';

// Login Form Schema
export const loginSchema = z.object({
  username: z.string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
  
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters')
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Personal Information Schema
export const personalInfoSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  title: z.string()
    .min(1, 'Professional title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  phone: z.string()
    .optional()
    .refine((val) => !val || /^\+?[\d\s\-\(\)]{10,}$/.test(val), {
      message: 'Please enter a valid phone number'
    }),
  
  location: z.string()
    .optional()
    .refine((val) => !val || val.length <= 100, {
      message: 'Location must be less than 100 characters'
    }),
  
  about: z.string()
    .min(1, 'About section is required')
    .min(10, 'About section must be at least 10 characters')
    .max(1000, 'About section must be less than 1000 characters'),
  
  skills: z.array(z.string())
    .min(1, 'At least one skill is required')
    .max(20, 'Maximum 20 skills allowed'),
  
  profileImage: z.string()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: 'Please enter a valid image URL'
    }),
  
  cvUrl: z.string()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: 'Please enter a valid CV URL'
    })
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

// Project Schema
export const projectSchema = z.object({
  title: z.string()
    .min(1, 'Project title is required')
    .min(3, 'Project title must be at least 3 characters')
    .max(100, 'Project title must be less than 100 characters'),
  
  description: z.string()
    .min(1, 'Project description is required')
    .min(10, 'Project description must be at least 10 characters')
    .max(500, 'Project description must be less than 500 characters'),
  
  technologies: z.array(z.string())
    .min(1, 'At least one technology is required')
    .max(15, 'Maximum 15 technologies allowed'),
  
  githubUrl: z.string()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: 'Please enter a valid GitHub URL'
    }),
  
  liveUrl: z.string()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: 'Please enter a valid Live Demo URL'
    })
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// Contact Form Schema
export const contactSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  message: z.string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Password Change Schema
export const passwordChangeSchema = z.object({
  currentPassword: z.string()
    .min(1, 'Current password is required')
    .min(6, 'Current password must be at least 6 characters'),
  
  newPassword: z.string()
    .min(1, 'New password is required')
    .min(6, 'New password must be at least 6 characters')
    .max(50, 'New password must be less than 50 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  
  confirmPassword: z.string()
    .min(1, 'Please confirm your password')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;
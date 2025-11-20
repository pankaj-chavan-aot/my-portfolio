export interface PersonalInfo {
  id: number;
  name: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  about: string;
  skills: string[];
  profile_image?: string;
  cv_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  source: 'contact' | 'system' | 'user';
  read: boolean;
  read_at?: Date;
  created_at: Date;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: Date;
}
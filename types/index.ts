export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export interface Notification {
  id: string;
  type: 'contact' | 'system' | 'warning';
  title: string;
  message: string;
  data?: EmailData;
  read: boolean;
  createdAt: Date;
}

export interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
}
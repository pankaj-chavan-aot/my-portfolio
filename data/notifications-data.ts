export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  source: 'contact' | 'system' | 'user';
}

// Notifications store
let notifications: Notification[] = [];

// Get all notifications
export const getNotifications = (): Notification[] => {
  return notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Get unread notifications count
export const getUnreadCount = (): number => {
  return notifications.filter(notification => !notification.read).length;
};

// Add new notification
export const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void => {
  const newNotification: Notification = {
    id: Date.now().toString(),
    timestamp: new Date(),
    read: false,
    ...notification
  };
  
  notifications.unshift(newNotification);
  
  // Limit to 50 notifications
  if (notifications.length > 50) {
    notifications = notifications.slice(0, 50);
  }
  
  // Update localStorage for persistence
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio-notifications', JSON.stringify(notifications));
  }
};

// Mark notification as read
export const markAsRead = (id: string): void => {
  notifications = notifications.map(notification =>
    notification.id === id ? { ...notification, read: true } : notification
  );
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio-notifications', JSON.stringify(notifications));
  }
};

// Mark all as read
export const markAllAsRead = (): void => {
  notifications = notifications.map(notification => ({ ...notification, read: true }));
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio-notifications', JSON.stringify(notifications));
  }
};

// Clear all notifications
export const clearAllNotifications = (): void => {
  notifications = [];
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio-notifications', JSON.stringify(notifications));
  }
};

// Load notifications from localStorage
export const loadNotifications = (): void => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('portfolio-notifications');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        notifications = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
  }
};

// Initialize notifications
loadNotifications();
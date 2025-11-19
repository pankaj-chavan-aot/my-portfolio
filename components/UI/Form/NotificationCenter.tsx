'use client';

import { useState, useEffect } from 'react';
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead, clearAllNotifications, type Notification } from '@/data/notifications-data';
import { Toaster, toast } from 'sonner';
import './NotificationCenter.css';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      updateNotifications();
    }
  }, [isOpen]);

  const updateNotifications = () => {
    setNotifications(getNotifications());
    setUnreadCount(getUnreadCount());
  };

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
    updateNotifications();
    toast.success('Notification marked as read');
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    updateNotifications();
    toast.success('All notifications marked as read');
  };

  const handleClearAll = () => {
    clearAllNotifications();
    updateNotifications();
    toast.success('All notifications cleared');
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'notification-success';
      case 'error': return 'notification-error';
      case 'warning': return 'notification-warning';
      case 'info': return 'notification-info';
      default: return 'notification-default';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster 
        position="top-right"
        expand={false}
        richColors
        closeButton
      />
      
      <div className="notification-overlay" onClick={onClose}>
        <div className="notification-center" onClick={(e) => e.stopPropagation()}>
          <div className="notification-header">
            <h3>🔔 Notifications ({unreadCount} unread)</h3>
            <div className="notification-actions">
              {unreadCount > 0 && (
                <button 
                  className="btn-mark-all"
                  onClick={handleMarkAllAsRead}
                >
                  Mark all as read
                </button>
              )}
              <button 
                className="btn-clear-all"
                onClick={handleClearAll}
              >
                Clear all
              </button>
              <button 
                className="btn-close"
                onClick={onClose}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="notification-empty">
                <div className="empty-icon">📭</div>
                <p>No notifications yet</p>
                <span>You're all caught up!</span>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${getNotificationColor(notification.type)} ${
                    !notification.read ? 'notification-unread' : ''
                  }`}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="notification-content">
                    <div className="notification-title">
                      {notification.title}
                    </div>
                    <div className="notification-message">
                      {notification.message}
                    </div>
                    <div className="notification-meta">
                      <span className="notification-source">
                        {notification.source === 'contact' ? '📞 Contact Form' : 
                         notification.source === 'system' ? '⚙️ System' : '👤 User'}
                      </span>
                      <span className="notification-time">
                        {notification.timestamp.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="notification-actions">
                    {!notification.read && (
                      <button
                        className="btn-mark-read"
                        onClick={() => handleMarkAsRead(notification.id)}
                        title="Mark as read"
                      >
                        ●
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationCenter;
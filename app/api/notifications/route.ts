import { NextRequest, NextResponse } from 'next/server';
import { notificationQueries } from '@/lib/db';

export async function GET() {
  try {
    const [notifications, unreadCount] = await Promise.all([
      notificationQueries.getNotifications(),
      notificationQueries.getUnreadCount()
    ]);

    return NextResponse.json({
      notifications,
      unreadCount
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, message, source } = body;

    const notification = await notificationQueries.createNotification({
      type,
      title,
      message,
      source
    });

    return NextResponse.json(notification[0]);
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}
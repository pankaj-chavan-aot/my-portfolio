import { NextRequest, NextResponse } from 'next/server';
import { notificationQueries } from '@/lib/db';

interface RouteParams {
  params: {
    id: string;
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid notification ID' },
        { status: 400 }
      );
    }

    const notification = await notificationQueries.markAsRead(id);

    return NextResponse.json({
      message: 'Notification marked as read',
      notification: notification[0]
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid notification ID' },
        { status: 400 }
      );
    }

    // For now, we'll just mark as read since we don't have delete functionality
    const notification = await notificationQueries.markAsRead(id);

    return NextResponse.json({
      message: 'Notification marked as read',
      notification: notification[0]
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    return NextResponse.json(
      { error: 'Failed to delete notification' },
      { status: 500 }
    );
  }
}
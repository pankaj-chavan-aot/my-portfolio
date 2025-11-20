import { NextRequest, NextResponse } from 'next/server';
import { contactQueries, notificationQueries } from '@/lib/db';
import { contactSchema } from '@/lib/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate data
    const validatedData = contactSchema.parse(body);

    // Save to database
    const contact = await contactQueries.createContact(validatedData);

    // Create notification
    await notificationQueries.createNotification({
      type: 'info',
      title: 'New Contact Form Submission',
      message: `From: ${validatedData.name} (${validatedData.email}) - ${validatedData.message.substring(0, 100)}...`,
      source: 'contact'
    });

    return NextResponse.json(
      { message: 'Contact form submitted successfully', contact: contact[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const contacts = await contactQueries.getContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
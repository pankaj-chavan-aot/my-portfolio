import { EmailData } from '@/types';

// Real email service using Resend (recommended for Next.js)
export class EmailService {
  private static instance: EmailService;

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async sendContactNotification(data: EmailData): Promise<{ success: boolean; message: string; id?: string }> {
    try {
      // For development, we'll use Resend (you need to sign up at resend.com)
      // Install: npm install resend
      
      const adminEmail = process.env.ADMIN_EMAIL || 'your-email@gmail.com';
      const siteName = process.env.SITE_NAME || 'Your Portfolio';
      
      // In production, uncomment this and add your Resend API key
      /*
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const result = await resend.emails.send({
        from: `${siteName} <noreply@yourdomain.com>`,
        to: [adminEmail],
        subject: `New Contact from ${data.name} - ${siteName}`,
        html: this.getAdminEmailTemplate(data),
      });
      
      return {
        success: true,
        message: 'Notification sent to admin email',
        id: result.id
      };
      */
      
      // Development fallback - log to console and save to notifications
      console.log('📧 ADMIN NOTIFICATION (Would send to:', adminEmail, ')');
      console.log('👤 From:', data.name);
      console.log('📨 Email:', data.email);
      console.log('💬 Message:', data.message);
      
      return {
        success: true,
        message: 'Admin notification logged (configure Resend for real emails)',
        id: `dev-${Date.now()}`
      };
      
    } catch (error) {
      console.error('❌ Admin email failed:', error);
      return {
        success: false,
        message: 'Failed to send admin notification'
      };
    }
  }

  async sendConfirmationEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
    try {
      // Send confirmation to the user who filled the form
      /*
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: `${process.env.SITE_NAME} <noreply@yourdomain.com>`,
        to: [data.email],
        subject: 'Thank you for contacting me!',
        html: this.getConfirmationTemplate(data),
      });
      */
      
      console.log('📧 USER CONFIRMATION (Would send to:', data.email, ')');
      console.log('✅ Auto-reply sent to:', data.name);
      
      return {
        success: true,
        message: 'Confirmation email logged'
      };
      
    } catch (error) {
      console.error('❌ Confirmation email failed:', error);
      return {
        success: false,
        message: 'Failed to send confirmation email'
      };
    }
  }

  private getAdminEmailTemplate(data: EmailData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .field { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea; }
          .label { font-weight: bold; color: #667eea; display: block; margin-bottom: 5px; }
          .footer { text-align: center; padding: 20px; background: #f7fafc; color: #718096; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Contact Form Submission</h1>
            <p>${process.env.SITE_NAME || 'Your Portfolio'}</p>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name</span>
              <span>${data.name}</span>
            </div>
            <div class="field">
              <span class="label">Email</span>
              <span>${data.email}</span>
            </div>
            <div class="field">
              <span class="label">Message</span>
              <p>${data.message}</p>
            </div>
            <div class="field">
              <span class="label">Submitted At</span>
              <span>${new Date().toLocaleString()}</span>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from your portfolio contact form</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private getConfirmationTemplate(data: EmailData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; text-align: center; }
          .footer { text-align: center; padding: 20px; background: #f7fafc; color: #718096; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Message Received!</h1>
            <p>Thank you for contacting me</p>
          </div>
          <div class="content">
            <h2>Hello ${data.name},</h2>
            <p>Thank you for reaching out through my portfolio. I have received your message and will get back to you within 24-48 hours.</p>
            <p><strong>Your Message:</strong> "${data.message}"</p>
          </div>
          <div class="footer">
            <p>This is an automated confirmation email</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
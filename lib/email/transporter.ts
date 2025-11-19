// // import nodemailer from 'nodemailer';

// // // Create transporter for development (Ethereal Email)
// // export const createTransporter = async () => {
// //   // For development, use Ethereal Email (fake SMTP service)
// //   const testAccount = await nodemailer.createTestAccount();

// //   return nodemailer.createTransporter({
// //     host: 'smtp.ethereal.email',
// //     port: 587,
// //     secure: false,
// //     auth: {
// //       user: testAccount.user,
// //       pass: testAccount.pass,
// //     },
// //   });
// // };

// // // Email template for contact form (Admin Notification)
// // export const adminNotificationTemplate = (data: {
// //   name: string;
// //   email: string;
// //   message: string;
// // }) => {
// //   return `
// //     <!DOCTYPE html>
// //     <html>
// //     <head>
// //       <style>
// //         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
// //         .container { max-width: 600px; margin: 0 auto; padding: 20px; }
// //         .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
// //         .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
// //         .field { margin-bottom: 15px; }
// //         .label { font-weight: bold; color: #667eea; }
// //         .footer { text-align: center; margin-top: 20px; padding: 20px; background: #eee; border-radius: 5px; }
// //       </style>
// //     </head>
// //     <body>
// //       <div class="container">
// //         <div class="header">
// //           <h1>🎯 New Contact Form Submission</h1>
// //           <p>Portfolio Website</p>
// //         </div>
// //         <div class="content">
// //           <div class="field">
// //             <span class="label">Name:</span>
// //             <span>${data.name}</span>
// //           </div>
// //           <div class="field">
// //             <span class="label">Email:</span>
// //             <span>${data.email}</span>
// //           </div>
// //           <div class="field">
// //             <span class="label">Message:</span>
// //             <p>${data.message}</p>
// //           </div>
// //           <div class="field">
// //             <span class="label">Submitted At:</span>
// //             <span>${new Date().toLocaleString()}</span>
// //           </div>
// //         </div>
// //         <div class="footer">
// //           <p>This email was sent from your portfolio contact form.</p>
// //           <p>💼 Portfolio Admin System</p>
// //         </div>
// //       </div>
// //     </body>
// //     </html>
// //   `;
// // };

// // // Email template for user confirmation
// // export const contactEmailTemplate = (data: {
// //   name: string;
// //   email: string;
// //   message: string;
// // }) => {
// //   return `
// //     <!DOCTYPE html>
// //     <html>
// //     <head>
// //       <style>
// //         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
// //         .container { max-width: 600px; margin: 0 auto; padding: 20px; }
// //         .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
// //         .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
// //         .message-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
// //         .footer { text-align: center; margin-top: 30px; padding: 20px; background: #e3f2fd; border-radius: 8px; color: #1976d2; }
// //       </style>
// //     </head>
// //     <body>
// //       <div class="container">
// //         <div class="header">
// //           <h1>Thank You for Reaching Out! 🙏</h1>
// //           <p>I've received your message and will get back to you soon.</p>
// //         </div>
// //         <div class="content">
// //           <p>Hello <strong>${data.name}</strong>,</p>
          
// //           <p>Thank you for contacting me through my portfolio website. I appreciate you taking the time to reach out.</p>
          
// //           <div class="message-box">
// //             <h3 style="color: #667eea; margin-top: 0;">Your Message:</h3>
// //             <p style="font-style: italic;">"${data.message}"</p>
// //           </div>
          
// //           <p>I typically respond to all inquiries within 24-48 hours. In the meantime, feel free to explore more of my work on the portfolio website.</p>
          
// //           <p><strong>Best regards,</strong><br>
// //           ${process.env.ADMIN_NAME || 'Portfolio Owner'}</p>
// //         </div>
// //         <div class="footer">
// //           <p>💼 This is an automated confirmation email from my portfolio contact form.</p>
// //         </div>
// //       </div>
// //     </body>
// //     </html>
// //   `;
// // };

// // // Main function to send contact emails
// // export const sendContactEmail = async (contactData: {
// //   name: string;
// //   email: string;
// //   message: string;
// // }) => {
// //   try {
// //     const transporter = await createTransporter();
    
// //     // Email to admin
// //     const adminMail = {
// //       from: '"Portfolio Contact" <noreply@portfolio.com>',
// //       to: process.env.ADMIN_EMAIL || 'admin@example.com',
// //       subject: `New Contact from ${contactData.name} - Portfolio`,
// //       html: adminNotificationTemplate(contactData),
// //     };
    
// //     // Email to user (confirmation)
// //     const userMail = {
// //       from: '"Your Portfolio" <noreply@portfolio.com>',
// //       to: contactData.email,
// //       subject: 'Thank you for contacting me!',
// //       html: contactEmailTemplate(contactData),
// //     };
    
// //     // Send both emails
// //     const [adminResult, userResult] = await Promise.allSettled([
// //       transporter.sendMail(adminMail),
// //       transporter.sendMail(userMail)
// //     ]);
    
// //     // Return results
// //     return {
// //       adminEmail: adminResult.status === 'fulfilled' 
// //         ? { success: true, preview: nodemailer.getTestMessageUrl(adminResult.value) }
// //         : { success: false, error: adminResult.reason },
// //       userEmail: userResult.status === 'fulfilled'
// //         ? { success: true, preview: nodemailer.getTestMessageUrl(userResult.value) }
// //         : { success: false, error: userResult.reason }
// //     };
    
// //   } catch (error) {
// //     console.error('Email sending error:', error);
// //     throw new Error('Failed to send emails');
// //   }
// // };

// // Simple email service without external dependencies
// export interface EmailData {
//   name: string;
//   email: string;
//   message: string;
// }

// // Mock email service for development
// export class EmailService {
//   private static instance: EmailService;

//   static getInstance(): EmailService {
//     if (!EmailService.instance) {
//       EmailService.instance = new EmailService();
//     }
//     return EmailService.instance;
//   }

//   // Simulate email sending (in production, integrate with real email service)
//   async sendContactNotification(data: EmailData): Promise<{ success: boolean; message: string; previewUrl?: string }> {
//     try {
//       console.log('📧 Email Notification Details:');
//       console.log('──────────────────────────────');
//       console.log('👤 From:', data.name);
//       console.log('📨 Email:', data.email);
//       console.log('💬 Message:', data.message);
//       console.log('⏰ Time:', new Date().toLocaleString());
//       console.log('──────────────────────────────');

//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       // In development, we'll just log the email details
//       // In production, you can integrate with:
//       // - Resend (recommended for Next.js)
//       // - Nodemailer with Gmail/SendGrid
//       // - AWS SES
      
//       return {
//         success: true,
//         message: 'Contact notification sent successfully',
//         previewUrl: this.generatePreviewUrl(data)
//       };
//     } catch (error) {
//       console.error('❌ Email sending failed:', error);
//       return {
//         success: false,
//         message: 'Failed to send email notification'
//       };
//     }
//   }

//   async sendConfirmationEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
//     try {
//       console.log('📧 Confirmation Email Details:');
//       console.log('──────────────────────────────');
//       console.log('👤 To:', data.name);
//       console.log('📨 Email:', data.email);
//       console.log('💬 Auto-reply sent');
//       console.log('──────────────────────────────');

//       await new Promise(resolve => setTimeout(resolve, 1000));

//       return {
//         success: true,
//         message: 'Confirmation email sent successfully'
//       };
//     } catch (error) {
//       console.error('❌ Confirmation email failed:', error);
//       return {
//         success: false,
//         message: 'Failed to send confirmation email'
//       };
//     }
//   }

//   private generatePreviewUrl(data: EmailData): string {
//     // Create a simple preview in development
//     const previewData = {
//       subject: `New Contact from ${data.name}`,
//       from: data.email,
//       to: 'admin@yourportfolio.com',
//       timestamp: new Date().toISOString(),
//       body: data.message
//     };
    
//     return `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(previewData, null, 2))}`;
//   }
// }

// // Email templates
// export const contactEmailTemplate = (data: EmailData) => {
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <style>
//         body { 
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
//           line-height: 1.6; 
//           color: #333; 
//           margin: 0; 
//           padding: 0; 
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//         }
//         .container { 
//           max-width: 600px; 
//           margin: 20px auto; 
//           background: white; 
//           border-radius: 15px; 
//           overflow: hidden;
//           box-shadow: 0 20px 40px rgba(0,0,0,0.1);
//         }
//         .header { 
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
//           color: white; 
//           padding: 40px 30px; 
//           text-align: center; 
//         }
//         .header h1 { 
//           margin: 0; 
//           font-size: 28px; 
//           font-weight: 700;
//         }
//         .header p { 
//           margin: 10px 0 0; 
//           opacity: 0.9; 
//           font-size: 16px;
//         }
//         .content { 
//           padding: 40px 30px; 
//         }
//         .field { 
//           margin-bottom: 25px; 
//           padding: 20px;
//           background: #f8f9fa;
//           border-radius: 10px;
//           border-left: 4px solid #667eea;
//         }
//         .label { 
//           font-weight: 700; 
//           color: #667eea; 
//           display: block;
//           margin-bottom: 8px;
//           font-size: 14px;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }
//         .value {
//           color: #2d3748;
//           font-size: 16px;
//           line-height: 1.5;
//         }
//         .message-content {
//           background: white;
//           padding: 20px;
//           border-radius: 8px;
//           border: 1px solid #e2e8f0;
//           margin-top: 10px;
//         }
//         .footer { 
//           text-align: center; 
//           padding: 30px; 
//           background: #f7fafc; 
//           border-top: 1px solid #e2e8f0;
//           color: #718096;
//           font-size: 14px;
//         }
//         .logo {
//           font-size: 24px;
//           font-weight: 800;
//           margin-bottom: 10px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <h1>🎯 New Portfolio Contact</h1>
//           <p>Someone reached out through your website</p>
//         </div>
        
//         <div class="content">
//           <div class="field">
//             <span class="label">👤 Contact Person</span>
//             <span class="value">${data.name}</span>
//           </div>
          
//           <div class="field">
//             <span class="label">📧 Email Address</span>
//             <span class="value">${data.email}</span>
//           </div>
          
//           <div class="field">
//             <span class="label">⏰ Submitted At</span>
//             <span class="value">${new Date().toLocaleString('en-US', { 
//               weekday: 'long',
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric',
//               hour: '2-digit',
//               minute: '2-digit'
//             })}</span>
//           </div>
          
//           <div class="field">
//             <span class="label">💬 Message</span>
//             <div class="message-content">
//               <span class="value">${data.message}</span>
//             </div>
//           </div>
//         </div>
        
//         <div class="footer">
//           <div class="logo">Portfolio</div>
//           <p>This email was automatically generated from your portfolio contact form</p>
//           <p>💼 Professional Portfolio System</p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// };

// export const confirmationEmailTemplate = (data: EmailData) => {
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <style>
//         body { 
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
//           line-height: 1.6; 
//           color: #333; 
//           margin: 0; 
//           padding: 0; 
//           background: #f7fafc;
//         }
//         .container { 
//           max-width: 600px; 
//           margin: 20px auto; 
//           background: white; 
//           border-radius: 15px; 
//           overflow: hidden;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.1);
//         }
//         .header { 
//           background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); 
//           color: white; 
//           padding: 40px 30px; 
//           text-align: center; 
//         }
//         .header h1 { 
//           margin: 0; 
//           font-size: 28px; 
//           font-weight: 700;
//         }
//         .content { 
//           padding: 40px 30px; 
//           text-align: center;
//         }
//         .icon {
//           font-size: 64px;
//           margin-bottom: 20px;
//         }
//         .message {
//           font-size: 16px;
//           color: #4a5568;
//           line-height: 1.7;
//           margin-bottom: 30px;
//         }
//         .highlight {
//           background: #f0fff4;
//           padding: 20px;
//           border-radius: 10px;
//           border-left: 4px solid #48bb78;
//           margin: 20px 0;
//           text-align: left;
//         }
//         .footer { 
//           text-align: center; 
//           padding: 30px; 
//           background: #f7fafc; 
//           border-top: 1px solid #e2e8f0;
//           color: #718096;
//           font-size: 14px;
//         }
//         .response-time {
//           background: #e6fffa;
//           padding: 15px;
//           border-radius: 8px;
//           margin: 20px 0;
//           border: 1px solid #b2f5ea;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <h1>✅ Message Received!</h1>
//           <p>Thank you for reaching out</p>
//         </div>
        
//         <div class="content">
//           <div class="icon">📬</div>
          
//           <h2 style="color: #2d3748; margin-bottom: 20px;">Hello ${data.name},</h2>
          
//           <div class="message">
//             <p>Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
            
//             <div class="highlight">
//               <strong>Your Message:</strong>
//               <p style="margin: 10px 0 0; font-style: italic;">"${data.message}"</p>
//             </div>
            
//             <div class="response-time">
//               <strong>⏰ Typical Response Time:</strong>
//               <p style="margin: 5px 0 0;">I usually respond within 24-48 hours.</p>
//             </div>
            
//             <p>In the meantime, feel free to explore more of my work on the portfolio website.</p>
//           </div>
          
//           <div style="background: #edf2f7; padding: 20px; border-radius: 10px; margin-top: 30px;">
//             <p style="margin: 0; color: #4a5568;">
//               <strong>Best regards,</strong><br>
//               ${process.env.NEXT_PUBLIC_SITE_OWNER || 'Portfolio Owner'}
//             </p>
//           </div>
//         </div>
        
//         <div class="footer">
//           <p>This is an automated confirmation email. Please do not reply to this message.</p>
//           <p>💼 Professional Portfolio System</p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// };
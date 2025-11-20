
// // // 'use client';

// // // import { useState } from 'react';
// // // import Button from '@/components/UI/Button';
// // // import { personalInfo } from '@/data/portfolio-data';

// // // export default function Contact() {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     message: ''
// // //   });

// // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// // //     setFormData({
// // //       ...formData,
// // //       [e.target.name]: e.target.value
// // //     });
// // //   };

// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     alert('Message sent successfully!');
// // //     setFormData({ name: '', email: '', message: '' });
// // //   };

// // //   return (
// // //     <section className="contact-section">
// // //       <div className="container">
// // //         <h2 className="section-title">Get In Touch</h2>
// // //         <div className="contact-grid">
// // //           <div className="contact-info">
// // //             <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Contact Information</h3>
            
// // //             <div className="contact-item">
// // //               <span>📧</span>
// // //               <div>
// // //                 <strong>Email</strong>
// // //                 <p>{personalInfo.email}</p>
// // //               </div>
// // //             </div>
            
// // //             <div className="contact-item">
// // //               <span>📱</span>
// // //               <div>
// // //                 <strong>Phone</strong>
// // //                 <p>{personalInfo.phone}</p>
// // //               </div>
// // //             </div>
            
// // //             <div className="contact-item">
// // //               <span>📍</span>
// // //               <div>
// // //                 <strong>Location</strong>
// // //                 <p>{personalInfo.location}</p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           <div>
// // //             <form onSubmit={handleSubmit} className="contact-form">
// // //               <div className="form-group">
// // //                 <label htmlFor="name">Name</label>
// // //                 <input
// // //                   type="text"
// // //                   id="name"
// // //                   name="name"
// // //                   value={formData.name}
// // //                   onChange={handleChange}
// // //                   required
// // //                 />
// // //               </div>
              
// // //               <div className="form-group">
// // //                 <label htmlFor="email">Email</label>
// // //                 <input
// // //                   type="email"
// // //                   id="email"
// // //                   name="email"
// // //                   value={formData.email}
// // //                   onChange={handleChange}
// // //                   required
// // //                 />
// // //               </div>
              
// // //               <div className="form-group">
// // //                 <label htmlFor="message">Message</label>
// // //                 <textarea
// // //                   id="message"
// // //                   name="message"
// // //                   rows={5}
// // //                   value={formData.message}
// // //                   onChange={handleChange}
// // //                   required
// // //                 />
// // //               </div>
              
// // //               <Button 
// // //                 type="submit" 
// // //                 label="Send Message" 
// // //                 variant="primary"
// // //               />
// // //             </form>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }




// 'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { contactSchema, type ContactFormData } from '@/lib/validation/schemas';
// import { useToast } from '@/components/UI/Toast/useToast';
// import Input from '@/components/UI/Form/Input';
// import TextArea from '@/components/UI/Form/TextArea';
// import { personalInfo } from '@/data/portfolio-data';

// export default function Contact() {
//   const toast = useToast();
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid, isDirty, isSubmitting },
//     reset
//   } = useForm<ContactFormData>({
//     resolver: zodResolver(contactSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//       message: ''
//     },
//     mode: 'onChange'
//   });

//   const onSubmit = async (data: ContactFormData) => {
//     const loadingToast = toast.loading(
//       'Sending your message...', 
//       'Please wait while we deliver your message'
//     );

//     try {
//       const response = await fetch('/api/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();

//       toast.dismiss(loadingToast);

//       if (response.ok && result.success) {
//         // Success case
//         if (result.warning) {
//           // Partial success - message received but email issues
//           toast.success(
//             'Message Received! 🎉', 
//             `Thank you! ${result.warning}`
//           );
//         } else {
//           // Full success
//           toast.success(
//             'Message Sent Successfully! 🎉', 
//             'Thank you for reaching out. I will get back to you soon.'
//           );
//         }

//         reset(); // Reset form after successful submission
        
//         // Log details for debugging
//         if (result.details) {
//           console.log('📧 Notification Details:', result.details);
//         }
//       } else {
//         // API returned error
//         throw new Error(result.message || 'Failed to send message');
//       }
//     } catch (error) {
//       toast.dismiss(loadingToast);
//       console.error('Contact form submission error:', error);
      
//       if (error instanceof Error) {
//         toast.error(
//           'Unable to Send Message 😔', 
//           error.message || 'Please try again later or contact me directly via email.'
//         );
//       } else {
//         toast.error(
//           'Network Error', 
//           'Please check your internet connection and try again.'
//         );
//       }
//     }
//   };

//   return (
//     <section className="contact-section">
//       <div className="container">
//         <h2 className="section-title">Get In Touch</h2>
        
//         <div className="contact-grid">
//           {/* Contact Information Side */}
//           <div className="contact-info">
//             <h3>Contact Information</h3>
            
//             <div className="contact-item">
//               <span className="contact-icon">📧</span>
//               <div>
//                 <strong>Email</strong>
//                 <p>{personalInfo.email}</p>
//               </div>
//             </div>
            
//             <div className="contact-item">
//               <span className="contact-icon">📱</span>
//               <div>
//                 <strong>Phone</strong>
//                 <p>{personalInfo.phone}</p>
//               </div>
//             </div>
            
//             <div className="contact-item">
//               <span className="contact-icon">📍</span>
//               <div>
//                 <strong>Location</strong>
//                 <p>{personalInfo.location}</p>
//               </div>
//             </div>

//             <div className="contact-note">
//               <p>
//                 💡 I'm always excited to discuss new opportunities, 
//                 creative projects, or just have a conversation about technology and innovation!
//               </p>
//             </div>

//             <div className="response-info">
//               <h4>⏰ Response Time</h4>
//               <p>I typically respond within 24-48 hours. For urgent matters, please call directly.</p>
//             </div>
//           </div>
          
//           {/* Contact Form Side */}
//           <div className="contact-form-container">
//             <h3>Send Me a Message</h3>
//             <p className="form-description">
//               Have a project in mind? Want to collaborate? Or just want to say hello? 
//               I'd love to hear from you!
//             </p>
            
//             <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
//               <Input
//                 label="Full Name"
//                 name="name"
//                 type="text"
//                 placeholder="Enter your full name"
//                 required
//                 register={register}
//                 error={errors.name}
//                 disabled={isSubmitting}
//               />
              
//               <Input
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email address"
//                 required
//                 register={register}
//                 error={errors.email}
//                 disabled={isSubmitting}
//               />
              
//               <TextArea
//                 label="Your Message"
//                 name="message"
//                 placeholder="Tell me about your project, collaboration idea, or just say hello..."
//                 required
//                 rows={6}
//                 register={register}
//                 error={errors.message}
//                 disabled={isSubmitting}
//               />
              
//               <button 
//                 type="submit" 
//                 className="btn btn-primary contact-submit-btn"
//                 disabled={isSubmitting || !isValid || !isDirty}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <span className="loading-spinner"></span>
//                     Sending Message...
//                   </>
//                 ) : (
//                   <>
//                     <span className="send-icon">📨</span>
//                     Send Message
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useAppForm } from '@/hooks/useForm';
import { contactSchema, type ContactFormData } from '@/lib/validation/schemas';
import { addNotification } from '@/data/notifications-data';
import { getPersonalInfo, PersonalInfo } from '@/data/portfolio-data';
import Input from '@/components/UI/Form/Input';
import TextArea from '@/components/UI/Form/TextArea';
import ErrorMessage from '@/components/UI/Form/ErrorMessage';
import { toast } from 'sonner';

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error('Error fetching personal info:', error);
        toast.error('Failed to load contact information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    isSubmitting,
    submitError,
    resetForm
  } = useAppForm({
    schema: contactSchema,
    defaultValues: {
      name: '',
      email: '',
      message: ''
    },
    onSubmit: async (data: ContactFormData) => {
      try {
        // Send to API
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        // Add notification to admin panel
        addNotification({
          type: 'info',
          title: 'New Contact Form Submission',
          message: `From: ${data.name} (${data.email}) - ${data.message.substring(0, 100)}...`,
          source: 'contact'
        });

        // Show success toast
        toast.success('Message sent successfully! I will get back to you soon.', {
          duration: 5000,
          position: 'top-center'
        });

        // Reset form
        resetForm();
        setIsSuccess(true);
        
        // Hide success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } catch (error) {
        toast.error('Failed to send message. Please try again.');
        throw error;
      }
    }
  });

  if (isSuccess) {
    return (
      <section className="contact-section">
        <div className="container">
          <div className="success-message">
            <h2>✅ Message Sent Successfully!</h2>
            <p>Thank you for reaching out. I'll get back to you soon.</p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="btn btn-primary"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="contact-section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Contact Information</h3>
            
            {isLoading ? (
              <div className="loading-contact-info">
                <div className="loading-spinner" style={{ 
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  border: '2px solid #f3f3f3',
                  borderTop: '2px solid #3498db',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '10px'
                }}></div>
                Loading contact information...
              </div>
            ) : personalInfo ? (
              <>
                <div className="contact-item">
                  <span>📧</span>
                  <div>
                    <strong>Email</strong>
                    <p>{personalInfo.email}</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <span>📱</span>
                  <div>
                    <strong>Phone</strong>
                    <p>{personalInfo.phone || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <span>📍</span>
                  <div>
                    <strong>Location</strong>
                    <p>{personalInfo.location || 'Not provided'}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="error-contact-info">
                <p>Unable to load contact information</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="btn btn-secondary"
                >
                  Retry
                </button>
              </div>
            )}
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {submitError && (
                <ErrorMessage message={submitError} className="global-error" />
              )}

              <Input
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                register={register}
                error={errors.name}
                disabled={isSubmitting}
              />
              
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
                register={register}
                error={errors.email}
                disabled={isSubmitting}
              />
              
              <TextArea
                label="Message"
                name="message"
                placeholder="Tell me about your project or inquiry..."
                required
                rows={5}
                register={register}
                error={errors.message}
                disabled={isSubmitting}
              />
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting || !isValid || !isDirty}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  '📨 Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
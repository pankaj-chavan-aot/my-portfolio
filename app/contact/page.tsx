// 'use client'; 

// import { useState } from 'react';
// import Button from '@/components/UI/Button';

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert('Message sent successfully!');
//     setFormData({ name: '', email: '', message: '' });
//   };

//   return (
//     <section className="contact-section">
//       <div className="container">
//         <h2 className="section-title">Get In Touch</h2>
//         <div className="contact-grid">
//           <div className="contact-info">
//             <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Contact Information</h3>
            
//             <div className="contact-item">
//               <span>📧</span>
//               <div>
//                 <strong>Email</strong>
//                 <p>Pankaj.pc@example.com</p>
//               </div>
//             </div>
            
//             <div className="contact-item">
//               <span>📱</span>
//               <div>
//                 <strong>Phone</strong>
//                 <p>+1 (555) 123-4567</p>
//               </div>
//             </div>
            
//             <div className="contact-item">
//               <span>📍</span>
//               <div>
//                 <strong>Location</strong>
//                 <p>Jalgaon, India</p>
//               </div>
//             </div>
//           </div>
          
//           <div>
//             <form onSubmit={handleSubmit} className="contact-form">
//               <div className="form-group">
//                 <label htmlFor="name">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="message">Message</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows={5}
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
//               <Button 
//                 type="submit" 
//                 label="Send Message" 
//                 variant="primary"
//               />
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';

import { useState } from 'react';
import Button from '@/components/UI/Button';
import { personalInfo } from '@/data/portfolio-data';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="contact-section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Contact Information</h3>
            
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
                <p>{personalInfo.phone}</p>
              </div>
            </div>
            
            <div className="contact-item">
              <span>📍</span>
              <div>
                <strong>Location</strong>
                <p>{personalInfo.location}</p>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                label="Send Message" 
                variant="primary"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
// 'use client';

// import { useState, useEffect } from 'react';
// import Button from '@/components/UI/Button';
// import { getPersonalInfo, PersonalInfo } from '@/data/portfolio-data';

// export default function About() {
//   const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [imageError, setImageError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getPersonalInfo();
//         setPersonalInfo(data);
//       } catch (error) {
//         console.error('Error fetching personal info:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDownloadCV = () => {
//     if (personalInfo?.cvUrl) {
//       const link = document.createElement('a');
//       link.href = personalInfo.cvUrl;
//       link.download = 'cv.pdf';
//       link.click();
//     } else {
//       alert('CV not available yet');
//     }
//   };

//   const handleImageError = () => {
//     setImageError(true);
//   };

//   if (isLoading) {
//     return (
//       <section className="about-section">
//         <div className="container">
//           <div className="text-center">
//             <div className="loading-spinner" style={{ 
//               display: 'inline-block',
//               width: '40px',
//               height: '40px',
//               border: '4px solid #f3f3f3',
//               borderTop: '4px solid #3498db',
//               borderRadius: '50%',
//               animation: 'spin 1s linear infinite',
//               margin: '20px auto'
//             }}></div>
//             <p>Loading...</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!personalInfo) {
//     return (
//       <section className="about-section">
//         <div className="container">
//           <div className="text-center">
//             <h2>Error loading data</h2>
//             <p>Please try again later.</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="about-section">
//       <div className="container">
//         <h2 className="section-title">About Me</h2>
//         <div className="about-content">
//           <div>
//             <div className="profile-image-container">
//               {!imageError ? (
//                 <img 
//                   src={personalInfo.profileImage} 
//                   alt="Profile" 
//                   className="profile-image"
//                   onError={handleImageError}
//                   loading="lazy"
//                 />
//               ) : (
//                 <div className="profile-image-placeholder">
//                   <span className="placeholder-icon">👤</span>
//                   <p>Profile Image</p>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div>
//             <h3 style={{ fontSize: '1.8 rem', marginBottom: '1rem', color: '#2c3e50' }}>
//               {personalInfo.name}
//             </h3>
//             <h3 style={{ fontSize: '1 rem', marginBottom: '1rem', color: '#2c3e50' }}>
//               {personalInfo.title}
//             </h3>
//             <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
//               {personalInfo.about}
//             </p>
            
//             <div style={{ marginBottom: '2rem' }}>
//               <h4 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Skills</h4>
//               <div className="skills">
//                 {personalInfo.skills.map((skill) => (
//                   <span key={skill} className="skill-tag">
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
            
//             <button 
//               className="btn btn-primary"
//               onClick={handleDownloadCV}
//             >
//               📄 Download CV
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { getPersonalInfo, PersonalInfo } from '@/data/portfolio-data';

export default function About() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPersonalInfo();
        console.log('📥 Personal info loaded:', {
          name: data.name,
          cvUrl: data.cvUrl,
          cvUrlType: data.cvUrl?.includes('/image/') ? 'Image URL (Wrong)' : 'Raw/PDF URL',
          hasCV: !!data.cvUrl
        });
        
        // FIX: Convert image URL to raw URL if needed
        if (data.cvUrl && data.cvUrl.includes('/image/upload/')) {
          console.log('🔄 Converting image URL to raw URL for download');
          // Replace image URL with raw URL
          const fixedCvUrl = data.cvUrl.replace('/image/upload/', '/raw/upload/');
          data.cvUrl = fixedCvUrl;
          console.log('✅ Converted CV URL:', fixedCvUrl);
        }
        
        setPersonalInfo(data);
      } catch (error) {
        console.error('Error fetching personal info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadCV = async () => {
    if (!personalInfo?.cvUrl) {
      alert('CV not available yet. Please upload your CV in the admin panel.');
      return;
    }

    console.log('📄 Attempting CV download:', personalInfo.cvUrl);
    setIsDownloading(true);

    try {
      let cvUrl = personalInfo.cvUrl;
      
      // FIX: Always convert image URLs to raw URLs for download
      if (cvUrl.includes('/image/upload/')) {
        cvUrl = cvUrl.replace('/image/upload/', '/raw/upload/');
        console.log('🔄 Converted to raw URL:', cvUrl);
      }

      // Add Cloudinary force download parameter
      if (cvUrl.includes('cloudinary.com') && !cvUrl.includes('fl_attachment')) {
        cvUrl = cvUrl.replace('/upload/', '/upload/fl_attachment/');
      }

      console.log('🔗 Final download URL:', cvUrl);

      // Method 1: Direct download
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = `CV_${personalInfo.name || 'Portfolio'}.pdf`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Method 2: Open in new tab
      setTimeout(() => {
        window.open(cvUrl, '_blank', 'noopener,noreferrer');
      }, 100);

      console.log('✅ CV download initiated');

    } catch (error) {
      console.error('❌ CV download error:', error);
      alert('Failed to download CV. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (isLoading) {
    return (
      <section className="about-section">
        <div className="container">
          <div className="text-center">
            <div className="loading-spinner"></div>
            <p>Loading portfolio...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!personalInfo) {
    return (
      <section className="about-section">
        <div className="container">
          <div className="text-center">
            <h2>⚠️ Data Loading Issue</h2>
            <p>Please check your database connection.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="profile-image-wrapper">
            <div className="profile-image-container">
              {personalInfo.profileImage && !imageError ? (
                <img 
                  src={personalInfo.profileImage} 
                  alt="Profile" 
                  className="profile-image"
                  onError={handleImageError}
                  loading="lazy"
                />
              ) : (
                <div className="profile-image-placeholder">
                  <span className="placeholder-icon">👤</span>
                  <p>Profile Image</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="profile-info">
            <h3 className="profile-name">
              {personalInfo.name || 'Your Name'}
            </h3>
            <h4 className="profile-title">
              {personalInfo.title || 'Full Stack Developer'}
            </h4>
            <p className="profile-about">
              {personalInfo.about || 'Welcome to my portfolio! Please update your information in the admin panel.'}
            </p>
            
            <div className="skills-section">
              <h4 className="skills-title">Skills</h4>
              <div className="skills-container">
                {personalInfo.skills.length > 0 ? (
                  personalInfo.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="skill-tag">JavaScript</span>
                )}
              </div>
            </div>
            
            <div className="contact-info">
              {personalInfo.email && (
                <p className="contact-item">
                  <strong className="contact-label">📧 Email:</strong> 
                  <span className="contact-value">{personalInfo.email}</span>
                </p>
              )}
              {personalInfo.phone && (
                <p className="contact-item">
                  <strong className="contact-label">📱 Phone:</strong> 
                  <span className="contact-value">{personalInfo.phone}</span>
                </p>
              )}
              {personalInfo.location && (
                <p className="contact-item">
                  <strong className="contact-label">📍 Location:</strong> 
                  <span className="contact-value">{personalInfo.location}</span>
                </p>
              )}
            </div>
            
            <div className="cv-download-section">
              <button 
                className="btn btn-primary cv-download-btn"
                onClick={handleDownloadCV}
                disabled={!personalInfo.cvUrl || isDownloading}
                title={personalInfo.cvUrl ? 'Download CV' : 'CV not available'}
              >
                {isDownloading ? (
                  <>
                    <span className="loading-spinner-small"></span>
                    Downloading...
                  </>
                ) : personalInfo.cvUrl ? (
                  '📄 Download CV'
                ) : (
                  '📄 CV Coming Soon'
                )}
              </button>
              
              {personalInfo.cvUrl && (
                <div className="cv-info">
                  <small>CV is available for download</small>
                  {personalInfo.cvUrl.includes('/image/upload/') && (
                    <div className="cv-url-preview">
                      <small style={{ color: '#f39c12' }}>
                        ⚠️ Note: Using converted URL for download
                      </small>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
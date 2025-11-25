'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/UI/Button';
import { getPersonalInfo, PersonalInfo } from '@/data/portfolio-data';

export default function About() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error('Error fetching personal info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadCV = () => {
    if (personalInfo?.cvUrl) {
      const link = document.createElement('a');
      link.href = personalInfo.cvUrl;
      link.download = 'cv.pdf';
      link.click();
    } else {
      alert('CV not available yet');
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
            <div className="loading-spinner" style={{ 
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '20px auto'
            }}></div>
            <p>Loading...</p>
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
            <h2>Error loading data</h2>
            <p>Please try again later.</p>
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
          <div>
            <div className="profile-image-container">
              {!imageError ? (
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
          <div>
            <h3 style={{ fontSize: '1.8 rem', marginBottom: '1rem', color: '#2c3e50' }}>
              {personalInfo.name}
            </h3>
            <h3 style={{ fontSize: '1 rem', marginBottom: '1rem', color: '#2c3e50' }}>
              {personalInfo.title}
            </h3>
            <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
              {personalInfo.about}
            </p>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Skills</h4>
              <div className="skills">
                {personalInfo.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <button 
              className="btn btn-primary"
              onClick={handleDownloadCV}
            >
              📄 Download CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
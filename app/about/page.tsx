'use client'; 

import Button from '@/components/UI/Button';

export default function About() {
  const handleDownloadCV = () => {
    alert('CV downloaded successfully!');
  };

  const skills = ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Git', 'HTML5', 'CSS3'];

  return (
    <section className="about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div>
            <img 
              src="/images/download.png"
              alt="Profile" 
              className="profile-image"
            />
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2c3e50' }}>
              Full Stack Developer
            </h3>
            <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
              I'm a passionate developer with 6 Month of experience building web applications. 
              I love creating user-friendly experiences and solving complex problems through code.
            </p>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Skills</h4>
              <div className="skills">
                {skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <Button 
              label="Download CV" 
              variant="primary" 
              onClick={handleDownloadCV}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
'use client'; // ही line add करा

import Button from '@/components/UI/Button';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
}

const projects: Project[] = [
//   {
//     id: 1,
//     title: 'E-Commerce Platform',
//     description: 'A full-stack e-commerce solution with user authentication, payment integration, and admin dashboard.',
//     technologies: ['React', 'Node.js', 'MongoDB'],
//     githubUrl: '#',
//     liveUrl: '#'
//   },
  {
    id: 2,
    title: 'Task Management System',
    description: 'A collaborative task management application with real-time updates and authentication  functionality.',
    technologies: ['node.js', 'PostgreSQL', ],
    githubUrl: '#',
    liveUrl: 'https://my-react-app1-silk.vercel.app/login'
  },
  {
    id: 3,
    title: 'Admin Dashboard',
    description: 'A responsive Admin dashboard with authentiction and interactive desinge.',
    technologies: ['Next.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/pankaj-chavan-aot/My-next-app',
    liveUrl: 'https://my-next-app-rust-sigma.vercel.app/'
  }
];

export default function Projects() {
  const handleGithubClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleLiveDemoClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section className="projects-section">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div className="project-tech">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="project-links">
                <Button 
                  label="GitHub" 
                  variant="outline" 
                  onClick={() => handleGithubClick(project.githubUrl)}
                />
                {project.liveUrl && (
                  <Button 
                    label="Live Demo" 
                    variant="primary" 
                    onClick={() => handleLiveDemoClick(project.liveUrl!)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
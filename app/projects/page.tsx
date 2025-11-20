// 'use client'; // ही line add करा

// import Button from '@/components/UI/Button';

// interface Project {
//   id: number;
//   title: string;
//   description: string;
//   technologies: string[];
//   githubUrl: string;
//   liveUrl?: string;
// }

// const projects: Project[] = [
//   // {
//   //   id: 1,
//   //   title: 'E-Commerce Platform',
//   //   description: 'A full-stack e-commerce solution with user authentication, payment integration, and admin dashboard.',
//   //   technologies: ['React', 'Node.js', 'MongoDB'],
//   //   githubUrl: '#',
//   //   liveUrl: '#'
//   // },
//   {
//     id: 2,
//     title: 'Task Management System',
//     description: 'A collaborative task management application with real-time updates and authentication  functionality.',
//     technologies: ['node.js', 'PostgreSQL', ],
//     githubUrl: '#',
//     liveUrl: 'https://my-react-app1-silk.vercel.app/login'
//   },
//   {
//     id: 3,
//     title: 'Admin Dashboard',
//     description: 'A responsive Admin dashboard with authentiction and interactive desinge.',
//     technologies: ['Next.js', 'PostgreSQL'],
//     githubUrl: 'https://github.com/pankaj-chavan-aot/My-next-app',
//     liveUrl: 'https://my-next-app-rust-sigma.vercel.app/'
//   }
// ];

// export default function Projects() {
//   const handleGithubClick = (url: string) => {
//     window.open(url, '_blank');
//   };

//   const handleLiveDemoClick = (url: string) => {
//     window.open(url, '_blank');
//   };

//   return (
//     <section className="projects-section">
//       <div className="container">
//         <h2 className="section-title">My Projects</h2>
//         <div className="projects-grid">
//           {projects.map((project) => (
//             <div key={project.id} className="project-card">
//               <h3>{project.title}</h3>
//               <p>{project.description}</p>
              
//               <div className="project-tech">
//                 {project.technologies.map((tech) => (
//                   <span key={tech} className="tech-tag">
//                     {tech}
//                   </span>
//                 ))}
//               </div>
              
//               <div className="project-links">
//                 <Button 
//                   label="GitHub" 
//                   variant="outline" 
//                   onClick={() => handleGithubClick(project.githubUrl)}
//                 />
//                 {project.liveUrl && (
//                   <Button 
//                     label="Live Demo" 
//                     variant="primary" 
//                     onClick={() => handleLiveDemoClick(project.liveUrl!)}
//                   />
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/UI/Button';
import { getProjects, Project } from '@/data/portfolio-data';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGithubClick = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    } else {
      alert('GitHub URL not available');
    }
  };

  const handleLiveDemoClick = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    } else {
      alert('Live demo URL not available');
    }
  };

  if (isLoading) {
    return (
      <section className="projects-section">
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
            <p>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

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
                {project.liveUrl && project.liveUrl !== '#' && (
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

        {projects.length === 0 && (
          <div className="text-center">
            <p>No projects found. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
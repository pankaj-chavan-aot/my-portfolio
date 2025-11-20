// // Portfolio Data - 
// export interface Project {
//   id: number;
//   title: string;
//   description: string;
//   technologies: string[];
//   githubUrl: string;
//   liveUrl?: string;
// }

// export interface PersonalInfo {
//   name: string;
//   title: string;
//   email: string;
//   phone: string;
//   location: string;
//   about: string;
//   skills: string[];
//   profileImage: string;
//   cvUrl: string;
// }

// // Default Data - 
// export let personalInfo: PersonalInfo = {
//   name: "Pankaj Chavan",
//   title: "Full Stack Developer",
//   email: "Pankaj.doe@example.com",
//   phone: "+1 (555) 123-4567",
//   location: "Jalgaon, IN",
//   about: "I'm a passionate developer with 6 month of experience building web applications. I love creating user-friendly experiences and solving complex problems through code.",
//   skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Git", ],
//   profileImage: "/images/download.png", // Default placeholder image
//   cvUrl: "/cv/Pankaj-doe-cv.pdf" // Default CV path
// };

// export let projects: Project[] = [
//   {
//     id: 1,
//     title: "E-Commerce Platform",
//     description: "A full-stack e-commerce solution with user authentication, payment integration, and admin dashboard.",
//     technologies: ["React", "Node.js", "MongoDB", "Stripe"],
//     githubUrl: "#",
//     liveUrl: "#"
//   },
//   {
//     id: 2,
//     title: "Task Management App",
//     description: "A collaborative task management application with real-time updates and drag-drop functionality.",
//     technologies: ["Next.js", "TypeScript", "Socket.io"],
//     githubUrl: "#",
//     liveUrl: "#"
//   },
//   {
//     id: 3,
//     title: "Admin Dashboard",
//     description: "A responsive Admin dashboard with authentiction and interactive desinge.'",
//     technologies:["next.js", "PostgreSQL"],
//     githubUrl: "https://github.com/pankaj-chavan-aot/My-next-app'",
//     liveUrl: "https://my-next-app-rust-sigma.vercel.app/"
//   }
// ];

// // Data update functions
// export const updatePersonalInfo = (newInfo: PersonalInfo) => {
//   personalInfo = { ...personalInfo, ...newInfo };
// };

// export const updateProjects = (newProjects: Project[]) => {
//   projects = newProjects;
// };

// export const addProject = (project: Project) => {
//   projects.push(project);
// };

// export const deleteProject = (id: number) => {
//   projects = projects.filter(project => project.id !== id);
// };

// // Image and CV upload simulation
// export const handleImageUpload = (file: File): Promise<string> => {
//   return new Promise((resolve) => {
//     // In real app, upload to cloud storage and return URL
//     // For demo, we'll create a blob URL
//     const imageUrl = URL.createObjectURL(file);
//     resolve(imageUrl);
//   });
// };

// export const handleCVUpload = (file: File): Promise<string> => {
//   return new Promise((resolve) => {
//     // In real app, upload to server and return URL
//     // For demo, we'll create a blob URL
//     const cvUrl = URL.createObjectURL(file);
//     resolve(cvUrl);
//   });
// };



import { portfolioQueries } from '@/lib/db';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  skills: string[];
  profileImage: string;
  cvUrl: string;
}

// Fallback data (if database is not available)
const fallbackPersonalInfo: PersonalInfo = {
  name: "John Doe",
  title: "Full Stack Developer",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  about: "I'm a passionate developer with 3+ years of experience building web applications.",
  skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js"],
  profileImage: "/api/placeholder/400/400",
  cvUrl: "/cv/john-doe-cv.pdf"
};

const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with user authentication and payment integration.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "#",
    liveUrl: "#"
  }
];

// Data fetching functions
export const getPersonalInfo = async (): Promise<PersonalInfo> => {
  try {
    const result = await portfolioQueries.getPersonalInfo();
    if (result.length > 0) {
      const data = result[0];
      return {
        name: data.name,
        title: data.title,
        email: data.email,
        phone: data.phone || '',
        location: data.location || '',
        about: data.about,
        skills: Array.isArray(data.skills) ? data.skills : [],
        profileImage: data.profile_image || '/api/placeholder/400/400',
        cvUrl: data.cv_url || ''
      };
    }
    return fallbackPersonalInfo;
  } catch (error) {
    console.error('Error fetching personal info:', error);
    return fallbackPersonalInfo;
  }
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const result = await portfolioQueries.getProjects();
    return result.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: Array.isArray(project.technologies) ? project.technologies : [],
      githubUrl: project.github_url || '',
      liveUrl: project.live_url
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return fallbackProjects;
  }
};

// Update functions
export const updatePersonalInfo = async (data: PersonalInfo): Promise<void> => {
  try {
    await portfolioQueries.updatePersonalInfo(data);
  } catch (error) {
    console.error('Error updating personal info:', error);
    throw new Error('Failed to update personal info');
  }
};

export const updateProjects = async (projects: Project[]): Promise<void> => {
  try {
    // Clear existing projects and create new ones
    // In a real app, you'd want to update existing ones
    for (const project of projects) {
      if (project.id) {
        await portfolioQueries.updateProject(project.id, project);
      } else {
        await portfolioQueries.createProject(project);
      }
    }
  } catch (error) {
    console.error('Error updating projects:', error);
    throw new Error('Failed to update projects');
  }
};

export const addProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  try {
    const result = await portfolioQueries.createProject(project);
    return {
      id: result[0].id,
      title: result[0].title,
      description: result[0].description,
      technologies: Array.isArray(result[0].technologies) ? result[0].technologies : [],
      githubUrl: result[0].github_url || '',
      liveUrl: result[0].live_url
    };
  } catch (error) {
    console.error('Error adding project:', error);
    throw new Error('Failed to add project');
  }
};

export const deleteProject = async (id: number): Promise<void> => {
  try {
    await portfolioQueries.deleteProject(id);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
};

// Image and CV upload simulation
export const handleImageUpload = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    // In real app, upload to cloud storage and return URL
    const imageUrl = URL.createObjectURL(file);
    resolve(imageUrl);
  });
};

export const handleCVUpload = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    // In real app, upload to server and return URL
    const cvUrl = URL.createObjectURL(file);
    resolve(cvUrl);
  });
};
// Portfolio Data - 
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

// Default Data - 
export let personalInfo: PersonalInfo = {
  name: "Pankaj Chavan",
  title: "Full Stack Developer",
  email: "Pankaj.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "Jalgaon, IN",
  about: "I'm a passionate developer with 6 month of experience building web applications. I love creating user-friendly experiences and solving complex problems through code.",
  skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Git", ],
  profileImage: "/images/download.png", // Default placeholder image
  cvUrl: "/cv/Pankaj-doe-cv.pdf" // Default CV path
};

export let projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with user authentication, payment integration, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and drag-drop functionality.",
    technologies: ["Next.js", "TypeScript", "Socket.io"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 3,
    title: "Admin Dashboard",
    description: "A responsive Admin dashboard with authentiction and interactive desinge.'",
    technologies:["next.js", "PostgreSQL"],
    githubUrl: "https://github.com/pankaj-chavan-aot/My-next-app'",
    liveUrl: "https://my-next-app-rust-sigma.vercel.app/"
  }
];

// Data update functions
export const updatePersonalInfo = (newInfo: PersonalInfo) => {
  personalInfo = { ...personalInfo, ...newInfo };
};

export const updateProjects = (newProjects: Project[]) => {
  projects = newProjects;
};

export const addProject = (project: Project) => {
  projects.push(project);
};

export const deleteProject = (id: number) => {
  projects = projects.filter(project => project.id !== id);
};

// Image and CV upload simulation
export const handleImageUpload = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    // In real app, upload to cloud storage and return URL
    // For demo, we'll create a blob URL
    const imageUrl = URL.createObjectURL(file);
    resolve(imageUrl);
  });
};

export const handleCVUpload = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    // In real app, upload to server and return URL
    // For demo, we'll create a blob URL
    const cvUrl = URL.createObjectURL(file);
    resolve(cvUrl);
  });
};
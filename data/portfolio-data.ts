


// // // portfolio-data.ts
// // import { portfolioQueries } from '@/lib/db';

// // export interface Project {
// //   id: number;
// //   title: string;
// //   description: string;
// //   technologies: string[];
// //   githubUrl: string;
// //   liveUrl?: string;
// // }

// // export interface PersonalInfo {
// //   name: string;
// //   title: string;
// //   email: string;
// //   phone: string;
// //   location: string;
// //   about: string;
// //   skills: string[];
// //   profileImage: string;
// //   cvUrl: string;
// // }

// // // Fallback data
// // const fallbackPersonalInfo: PersonalInfo = {
// //   name: "John Doe",
// //   title: "Full Stack Developer",
// //   email: "john.doe@example.com",
// //   phone: "+1 (555) 123-4567",
// //   location: "New York, NY",
// //   about: "I'm a passionate developer with 3+ years of experience building web applications.",
// //   skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js"],
// //   profileImage: "/default-avatar.png",
// //   cvUrl: ""
// // };

// // const fallbackProjects: Project[] = [
// //   {
// //     id: 1,
// //     title: "E-Commerce Platform",
// //     description: "A full-stack e-commerce solution with user authentication and payment integration.",
// //     technologies: ["React", "Node.js", "MongoDB", "Stripe"],
// //     githubUrl: "#",
// //     liveUrl: "#"
// //   }
// // ];

// // // Data fetching functions
// // export const getPersonalInfo = async (): Promise<PersonalInfo> => {
// //   try {
// //     const result = await portfolioQueries.getPersonalInfo();
// //     console.log('Database result for personal info:', result);
    
// //     if (result.length > 0) {
// //       const data = result[0];
// //       const personalInfo = {
// //         name: data.name || '',
// //         title: data.title || '',
// //         email: data.email || '',
// //         phone: data.phone || '',
// //         location: data.location || '',
// //         about: data.about || '',
// //         skills: Array.isArray(data.skills) ? data.skills : (data.skills ? [data.skills] : []),
// //         profileImage: data.profile_image || '/default-avatar.png',
// //         cvUrl: data.cv_url || ''
// //       };
// //       console.log('Processed personal info:', personalInfo);
// //       return personalInfo;
// //     }
// //     console.log('No data found, using fallback');
// //     return fallbackPersonalInfo;
// //   } catch (error) {
// //     console.error('Error fetching personal info:', error);
// //     return fallbackPersonalInfo;
// //   }
// // };

// // export const getProjects = async (): Promise<Project[]> => {
// //   try {
// //     const result = await portfolioQueries.getProjects();
// //     return result.map(project => ({
// //       id: project.id,
// //       title: project.title,
// //       description: project.description,
// //       technologies: Array.isArray(project.technologies) ? project.technologies : (project.technologies ? [project.technologies] : []),
// //       githubUrl: project.github_url || '',
// //       liveUrl: project.live_url
// //     }));
// //   } catch (error) {
// //     console.error('Error fetching projects:', error);
// //     return fallbackProjects;
// //   }
// // };

// // // Update functions
// // export const updatePersonalInfo = async (data: PersonalInfo): Promise<void> => {
// //   try {
// //     console.log('Updating personal info in database:', data);
// //     await portfolioQueries.updatePersonalInfo(data);
// //     console.log('Personal info updated successfully');
// //   } catch (error) {
// //     console.error('Error updating personal info:', error);
// //     throw new Error('Failed to update personal info');
// //   }
// // };

// // export const updateProjects = async (projects: Project[]): Promise<void> => {
// //   try {
// //     console.log('Updating projects in database:', projects);
// //     // This would need to be more sophisticated in a real app
// //     // For now, we'll just create new projects
// //     for (const project of projects) {
// //       if (!project.id) {
// //         await portfolioQueries.createProject(project);
// //       }
// //     }
// //     console.log('Projects updated successfully');
// //   } catch (error) {
// //     console.error('Error updating projects:', error);
// //     throw new Error('Failed to update projects');
// //   }
// // };

// // export const addProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
// //   try {
// //     console.log('Adding new project:', project);
// //     const result = await portfolioQueries.createProject(project);
// //     const newProject = {
// //       id: result[0].id,
// //       title: result[0].title,
// //       description: result[0].description,
// //       technologies: Array.isArray(result[0].technologies) ? result[0].technologies : (result[0].technologies ? [result[0].technologies] : []),
// //       githubUrl: result[0].github_url || '',
// //       liveUrl: result[0].live_url
// //     };
// //     console.log('Project added successfully:', newProject);
// //     return newProject;
// //   } catch (error) {
// //     console.error('Error adding project:', error);
// //     throw new Error('Failed to add project');
// //   }
// // };

// // export const deleteProject = async (id: number): Promise<void> => {
// //   try {
// //     console.log('Deleting project:', id);
// //     await portfolioQueries.deleteProject(id);
// //     console.log('Project deleted successfully');
// //   } catch (error) {
// //     console.error('Error deleting project:', error);
// //     throw new Error('Failed to delete project');
// //   }
// // };

// // // Cloudinary file upload functions
// // export const handleImageUpload = async (file: File): Promise<string> => {
// //   try {
// //     console.log('Uploading image to Cloudinary:', file.name);
    
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     formData.append('upload_preset', 'ml_default');

// //     const response = await fetch(
// //       `https://api.cloudinary.com/v1_1/ydvco6ccpr/image/upload`,
// //       {
// //         method: 'POST',
// //         body: formData,
// //       }
// //     );

// //     if (!response.ok) {
// //       const errorText = await response.text();
// //       console.error('Cloudinary upload failed:', errorText);
// //       throw new Error(`Upload failed: ${errorText}`);
// //     }

// //     const data = await response.json();
// //     console.log('Image uploaded successfully:', data.secure_url);
// //     return data.secure_url;
// //   } catch (error) {
// //     console.error('Image upload error:', error);
// //     throw new Error('Failed to upload image to Cloudinary');
// //   }
// // };

// // export const handleCVUpload = async (file: File): Promise<{ cvUrl: string; fileName: string }> => {
// //   try {
// //     console.log('Uploading CV to Cloudinary:', file.name);
    
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     formData.append('upload_preset', 'ml_default');

// //     const response = await fetch(
// //       `https://api.cloudinary.com/v1_1/ydvco6ccpr/auto/upload`,
// //       {
// //         method: 'POST',
// //         body: formData,
// //       }
// //     );

// //     if (!response.ok) {
// //       const errorText = await response.text();
// //       console.error('Cloudinary upload failed:', errorText);
// //       throw new Error(`Upload failed: ${errorText}`);
// //     }

// //     const data = await response.json();
// //     console.log('CV uploaded successfully:', data.secure_url);
// //     return { 
// //       cvUrl: data.secure_url, 
// //       fileName: file.name 
// //     };
// //   } catch (error) {
// //     console.error('CV upload error:', error);
// //     throw new Error('Failed to upload CV to Cloudinary');
// //   }
// // };


// // portfolio-data.ts
// import { portfolioQueries } from '@/lib/db';

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

// // Fallback data
// const fallbackPersonalInfo: PersonalInfo = {
//   name: "John Doe",
//   title: "Full Stack Developer",
//   email: "john.doe@example.com",
//   phone: "+1 (555) 123-4567",
//   location: "New York, NY",
//   about: "I'm a passionate developer with 3+ years of experience building web applications.",
//   skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js"],
//   profileImage: "/default-avatar.png",
//   cvUrl: ""
// };

// const fallbackProjects: Project[] = [
//   {
//     id: 1,
//     title: "E-Commerce Platform",
//     description: "A full-stack e-commerce solution with user authentication and payment integration.",
//     technologies: ["React", "Node.js", "MongoDB", "Stripe"],
//     githubUrl: "#",
//     liveUrl: "#"
//   }
// ];

// // Data fetching functions
// export const getPersonalInfo = async (): Promise<PersonalInfo> => {
//   try {
//     console.log('Fetching personal info from database...');
//     const result = await portfolioQueries.getPersonalInfo();
//     console.log('Database result for personal info:', result);
    
//     if (result && result.length > 0) {
//       const data = result[0];
//       const personalInfo = {
//         name: data.name || '',
//         title: data.title || '',
//         email: data.email || '',
//         phone: data.phone || '',
//         location: data.location || '',
//         about: data.about || '',
//         skills: Array.isArray(data.skills) ? data.skills : (data.skills ? [data.skills] : []),
//         profileImage: data.profile_image || '/default-avatar.png',
//         cvUrl: data.cv_url || ''
//       };
//       console.log('Processed personal info:', personalInfo);
//       return personalInfo;
//     }
//     console.log('No data found in database, using fallback');
//     return fallbackPersonalInfo;
//   } catch (error) {
//     console.error('Error fetching personal info:', error);
//     return fallbackPersonalInfo;
//   }
// };

// export const getProjects = async (): Promise<Project[]> => {
//   try {
//     console.log('Fetching projects from database...');
//     const result = await portfolioQueries.getProjects();
//     console.log('Database result for projects:', result);
    
//     if (result && result.length > 0) {
//       return result.map(project => ({
//         id: project.id,
//         title: project.title,
//         description: project.description,
//         technologies: Array.isArray(project.technologies) ? project.technologies : (project.technologies ? [project.technologies] : []),
//         githubUrl: project.github_url || '',
//         liveUrl: project.live_url
//       }));
//     }
//     console.log('No projects found in database, using fallback');
//     return fallbackProjects;
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//     return fallbackProjects;
//   }
// };

// // Update functions with better error handling
// export const updatePersonalInfo = async (data: PersonalInfo): Promise<void> => {
//   try {
//     console.log('Updating personal info in database:', data);
    
//     // Check if we have any existing data
//     const existingData = await portfolioQueries.getPersonalInfo();
    
//     if (existingData && existingData.length > 0) {
//       // Update existing record
//       await portfolioQueries.updatePersonalInfo(data);
//     } else {
//       // Create new record
//       await portfolioQueries.createPersonalInfo(data);
//     }
    
//     console.log('Personal info updated successfully in database');
//   } catch (error) {
//     console.error('Error updating personal info in database:', error);
    
//     // Fallback: Save to localStorage
//     if (typeof window !== 'undefined') {
//       try {
//         localStorage.setItem('portfolio_personal_info', JSON.stringify(data));
//         console.log('Saved to localStorage as fallback');
//       } catch (localError) {
//         console.error('Failed to save to localStorage:', localError);
//       }
//     }
    
//     throw new Error('Failed to update personal info in database');
//   }
// };

// export const updateProjects = async (projects: Project[]): Promise<void> => {
//   try {
//     console.log('Updating projects in database:', projects);
    
//     // Clear existing projects and add new ones
//     const existingProjects = await portfolioQueries.getProjects();
    
//     // Delete all existing projects
//     for (const project of existingProjects) {
//       await portfolioQueries.deleteProject(project.id);
//     }
    
//     // Add all projects
//     for (const project of projects) {
//       await portfolioQueries.createProject(project);
//     }
    
//     console.log('Projects updated successfully in database');
//   } catch (error) {
//     console.error('Error updating projects in database:', error);
    
//     // Fallback: Save to localStorage
//     if (typeof window !== 'undefined') {
//       try {
//         localStorage.setItem('portfolio_projects', JSON.stringify(projects));
//         console.log('Saved projects to localStorage as fallback');
//       } catch (localError) {
//         console.error('Failed to save projects to localStorage:', localError);
//       }
//     }
    
//     throw new Error('Failed to update projects in database');
//   }
// };

// export const addProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
//   try {
//     console.log('Adding new project to database:', project);
//     const result = await portfolioQueries.createProject(project);
    
//     if (result && result.length > 0) {
//       const newProject = {
//         id: result[0].id,
//         title: result[0].title,
//         description: result[0].description,
//         technologies: Array.isArray(result[0].technologies) ? result[0].technologies : (result[0].technologies ? [result[0].technologies] : []),
//         githubUrl: result[0].github_url || '',
//         liveUrl: result[0].live_url
//       };
//       console.log('Project added successfully to database:', newProject);
//       return newProject;
//     }
    
//     throw new Error('No result returned from database');
//   } catch (error) {
//     console.error('Error adding project to database:', error);
    
//     // Fallback: Generate ID and save to localStorage
//     const newProject: Project = {
//       id: Date.now(), // Temporary ID
//       ...project
//     };
    
//     if (typeof window !== 'undefined') {
//       try {
//         const existingProjects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
//         existingProjects.push(newProject);
//         localStorage.setItem('portfolio_projects', JSON.stringify(existingProjects));
//         console.log('Project saved to localStorage as fallback');
//       } catch (localError) {
//         console.error('Failed to save project to localStorage:', localError);
//       }
//     }
    
//     return newProject;
//   }
// };

// export const deleteProject = async (id: number): Promise<void> => {
//   try {
//     console.log('Deleting project from database:', id);
//     await portfolioQueries.deleteProject(id);
//     console.log('Project deleted successfully from database');
//   } catch (error) {
//     console.error('Error deleting project from database:', error);
    
//     // Fallback: Remove from localStorage
//     if (typeof window !== 'undefined') {
//       try {
//         const existingProjects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
//         const updatedProjects = existingProjects.filter((p: Project) => p.id !== id);
//         localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
//         console.log('Project removed from localStorage as fallback');
//       } catch (localError) {
//         console.error('Failed to remove project from localStorage:', localError);
//       }
//     }
    
//     throw new Error('Failed to delete project from database');
//   }
// };

// // Enhanced Cloudinary file upload functions
// export const handleImageUpload = async (file: File): Promise<string> => {
//   try {
//     console.log('Uploading image to Cloudinary:', file.name);
    
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'ml_default');

//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/ydvco6ccpr/image/upload`,
//       {
//         method: 'POST',
//         body: formData,
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('Cloudinary upload failed:', errorText);
//       throw new Error(`Image upload failed: ${errorText}`);
//     }

//     const data = await response.json();
//     console.log('✅ Image uploaded successfully to Cloudinary:', data.secure_url);
//     return data.secure_url;
//   } catch (error) {
//     console.error('❌ Image upload error:', error);
//     throw new Error('Failed to upload image to Cloudinary. Please try again.');
//   }
// };

// export const handleCVUpload = async (file: File): Promise<{ cvUrl: string; fileName: string }> => {
//   try {
//     console.log('Uploading CV to Cloudinary:', file.name);
    
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'ml_default');

//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/ydvco6ccpr/auto/upload`,
//       {
//         method: 'POST',
//         body: formData,
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('Cloudinary upload failed:', errorText);
//       throw new Error(`CV upload failed: ${errorText}`);
//     }

//     const data = await response.json();
//     console.log('✅ CV uploaded successfully to Cloudinary:', data.secure_url);
//     return { 
//       cvUrl: data.secure_url, 
//       fileName: file.name 
//     };
//   } catch (error) {
//     console.error('❌ CV upload error:', error);
//     throw new Error('Failed to upload CV to Cloudinary. Please try again.');
//   }
// };

// // Load data with localStorage fallback
// export const loadPersonalInfoWithFallback = async (): Promise<PersonalInfo> => {
//   try {
//     // First try database
//     const dbData = await getPersonalInfo();
    
//     // If database has fallback data, check localStorage
//     if (dbData.name === fallbackPersonalInfo.name && typeof window !== 'undefined') {
//       const localData = localStorage.getItem('portfolio_personal_info');
//       if (localData) {
//         console.log('Using personal info from localStorage');
//         return JSON.parse(localData);
//       }
//     }
    
//     return dbData;
//   } catch (error) {
//     console.error('Error loading personal info:', error);
    
//     // Final fallback to localStorage
//     if (typeof window !== 'undefined') {
//       const localData = localStorage.getItem('portfolio_personal_info');
//       if (localData) {
//         return JSON.parse(localData);
//       }
//     }
    
//     return fallbackPersonalInfo;
//   }
// };

// export const loadProjectsWithFallback = async (): Promise<Project[]> => {
//   try {
//     // First try database
//     const dbData = await getProjects();
    
//     // If database has fallback data, check localStorage
//     if (dbData.length === fallbackProjects.length && typeof window !== 'undefined') {
//       const localData = localStorage.getItem('portfolio_projects');
//       if (localData) {
//         console.log('Using projects from localStorage');
//         return JSON.parse(localData);
//       }
//     }
    
//     return dbData;
//   } catch (error) {
//     console.error('Error loading projects:', error);
    
//     // Final fallback to localStorage
//     if (typeof window !== 'undefined') {
//       const localData = localStorage.getItem('portfolio_projects');
//       if (localData) {
//         return JSON.parse(localData);
//       }
//     }
    
//     return fallbackProjects;
//   }
// };






// portfolio-data.ts
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

// Fallback data
const fallbackPersonalInfo: PersonalInfo = {
  name: "John Doe",
  title: "Full Stack Developer",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  about: "I'm a passionate developer with 3+ years of experience building web applications.",
  skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js"],
  profileImage: "/default-avatar.jpg",
  cvUrl: ""
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
    console.log('Fetching personal info from database...');
    const result = await portfolioQueries.getPersonalInfo();
    console.log('Database result for personal info:', result);
    
    if (result && result.length > 0) {
      const data = result[0];
      const personalInfo = {
        name: data.name || '',
        title: data.title || '',
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        about: data.about || '',
        skills: Array.isArray(data.skills) ? data.skills : (data.skills ? [data.skills] : []),
        profileImage: data.profile_image || '/default-avatar.jpg',
        cvUrl: data.cv_url || ''
      };
      console.log('Processed personal info:', personalInfo);
      return personalInfo;
    }
    console.log('No data found in database, using fallback');
    return fallbackPersonalInfo;
  } catch (error) {
    console.error('Error fetching personal info:', error);
    return fallbackPersonalInfo;
  }
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    console.log('Fetching projects from database...');
    const result = await portfolioQueries.getProjects();
    console.log('Database result for projects:', result);
    
    if (result && result.length > 0) {
      return result.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        technologies: Array.isArray(project.technologies) ? project.technologies : (project.technologies ? [project.technologies] : []),
        githubUrl: project.github_url || '',
        liveUrl: project.live_url
      }));
    }
    console.log('No projects found in database, using fallback');
    return fallbackProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return fallbackProjects;
  }
};

// Update functions with better error handling
export const updatePersonalInfo = async (data: PersonalInfo): Promise<void> => {
  try {
    console.log('Updating personal info in database:', data);
    
    // Check if we have any existing data
    const existingData = await portfolioQueries.getPersonalInfo();
    
    if (existingData && existingData.length > 0) {
      // Update existing record
      await portfolioQueries.updatePersonalInfo(data);
    } else {
      // Create new record using updatePersonalInfo (it should handle both cases)
      await portfolioQueries.updatePersonalInfo(data);
    }
    
    console.log('Personal info updated successfully in database');
  } catch (error) {
    console.error('Error updating personal info in database:', error);
    
    // Fallback: Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('portfolio_personal_info', JSON.stringify(data));
        console.log('Saved to localStorage as fallback');
      } catch (localError) {
        console.error('Failed to save to localStorage:', localError);
      }
    }
    
    throw new Error('Failed to update personal info in database');
  }
};

export const updateProjects = async (projects: Project[]): Promise<void> => {
  try {
    console.log('Updating projects in database:', projects);
    
    // For now, we'll just update existing projects or create new ones
    // This is a simplified approach - in a real app you'd need more sophisticated logic
    for (const project of projects) {
      if (project.id) {
        // Try to update existing project
        try {
          await portfolioQueries.updateProject(project.id, project);
        } catch (updateError) {
          console.log('Project not found, creating new one:', project.title);
          await portfolioQueries.createProject(project);
        }
      } else {
        // Create new project
        await portfolioQueries.createProject(project);
      }
    }
    
    console.log('Projects updated successfully in database');
  } catch (error) {
    console.error('Error updating projects in database:', error);
    
    // Fallback: Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('portfolio_projects', JSON.stringify(projects));
        console.log('Saved projects to localStorage as fallback');
      } catch (localError) {
        console.error('Failed to save projects to localStorage:', localError);
      }
    }
    
    throw new Error('Failed to update projects in database');
  }
};

export const addProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  try {
    console.log('Adding new project to database:', project);
    const result = await portfolioQueries.createProject(project);
    
    if (result && result.length > 0) {
      const newProject = {
        id: result[0].id,
        title: result[0].title,
        description: result[0].description,
        technologies: Array.isArray(result[0].technologies) ? result[0].technologies : (result[0].technologies ? [result[0].technologies] : []),
        githubUrl: result[0].github_url || '',
        liveUrl: result[0].live_url
      };
      console.log('Project added successfully to database:', newProject);
      return newProject;
    }
    
    throw new Error('No result returned from database');
  } catch (error) {
    console.error('Error adding project to database:', error);
    
    // Fallback: Generate ID and save to localStorage
    const newProject: Project = {
      id: Date.now(), // Temporary ID
      ...project
    };
    
    if (typeof window !== 'undefined') {
      try {
        const existingProjects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
        existingProjects.push(newProject);
        localStorage.setItem('portfolio_projects', JSON.stringify(existingProjects));
        console.log('Project saved to localStorage as fallback');
      } catch (localError) {
        console.error('Failed to save project to localStorage:', localError);
      }
    }
    
    return newProject;
  }
};

export const deleteProject = async (id: number): Promise<void> => {
  try {
    console.log('Deleting project from database:', id);
    await portfolioQueries.deleteProject(id);
    console.log('Project deleted successfully from database');
  } catch (error) {
    console.error('Error deleting project from database:', error);
    
    // Fallback: Remove from localStorage
    if (typeof window !== 'undefined') {
      try {
        const existingProjects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
        const updatedProjects = existingProjects.filter((p: Project) => p.id !== id);
        localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
        console.log('Project removed from localStorage as fallback');
      } catch (localError) {
        console.error('Failed to remove project from localStorage:', localError);
      }
    }
    
    throw new Error('Failed to delete project from database');
  }
};

// ✅ UPDATED: Enhanced Cloudinary file upload functions with fallback
const uploadToLocalStorage = async (file: File, fileType: 'image' | 'pdf'): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      
      // Save to localStorage with timestamp
      const fileKey = `portfolio_${fileType}_${Date.now()}`;
      localStorage.setItem(fileKey, result);
      
      console.log(`✅ File saved to localStorage: ${fileKey}`);
      resolve(result);
    };
    reader.onerror = () => reject(new Error('File reading failed'));
    reader.readAsDataURL(file);
  });
};

// ✅ UPDATED: Cloudinary Upload with Fallback
const uploadToCloudinaryWithFallback = async (file: File, fileType: 'image' | 'pdf'): Promise<string> => {
  try {
    console.log('🚀 Attempting Cloudinary upload...');
    
    // First try Cloudinary
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dvco6ccpr/auto/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Cloudinary upload successful!');
        return data.secure_url;
      } else {
        const errorText = await response.text();
        console.warn('⚠️ Cloudinary upload failed, using local storage');
        throw new Error(`Cloudinary: ${errorText}`);
      }
    } catch (cloudinaryError) {
      console.warn('🌐 Cloudinary unavailable, using local storage fallback');
      // Fallback to local storage
      return await uploadToLocalStorage(file, fileType);
    }
    
  } catch (error) {
    console.error('💥 Upload error:', error);
    // Final fallback
    return await uploadToLocalStorage(file, fileType);
  }
};

// ✅ UPDATED: Enhanced Cloudinary file upload functions
export const handleImageUpload = async (file: File): Promise<string> => {
  try {
    console.log('Uploading image...');
    return await uploadToCloudinaryWithFallback(file, 'image');
  } catch (error) {
    console.error('❌ Image upload error:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
};

export const handleCVUpload = async (file: File): Promise<{ cvUrl: string; fileName: string }> => {
  try {
    console.log('Uploading CV...');
    const cvUrl = await uploadToCloudinaryWithFallback(file, 'pdf');
    return { 
      cvUrl: cvUrl, 
      fileName: file.name 
    };
  } catch (error) {
    console.error('❌ CV upload error:', error);
    throw new Error('Failed to upload CV. Please try again.');
  }
};

// Load data with localStorage fallback
export const loadPersonalInfoWithFallback = async (): Promise<PersonalInfo> => {
  try {
    // First try database
    const dbData = await getPersonalInfo();
    
    // If database has fallback data, check localStorage
    if (dbData.name === fallbackPersonalInfo.name && typeof window !== 'undefined') {
      const localData = localStorage.getItem('portfolio_personal_info');
      if (localData) {
        console.log('Using personal info from localStorage');
        return JSON.parse(localData);
      }
    }
    
    return dbData;
  } catch (error) {
    console.error('Error loading personal info:', error);
    
    // Final fallback to localStorage
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('portfolio_personal_info');
      if (localData) {
        return JSON.parse(localData);
      }
    }
    
    return fallbackPersonalInfo;
  }
};

export const loadProjectsWithFallback = async (): Promise<Project[]> => {
  try {
    // First try database
    const dbData = await getProjects();
    
    // If database has fallback data, check localStorage
    if (dbData.length === fallbackProjects.length && typeof window !== 'undefined') {
      const localData = localStorage.getItem('portfolio_projects');
      if (localData) {
        console.log('Using projects from localStorage');
        return JSON.parse(localData);
      }
    }
    
    return dbData;
  } catch (error) {
    console.error('Error loading projects:', error);
    
    // Final fallback to localStorage
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('portfolio_projects');
      if (localData) {
        return JSON.parse(localData);
      }
    }
    
    return fallbackProjects;
  }
};
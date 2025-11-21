


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
//     const result = await portfolioQueries.getPersonalInfo();
//     if (result.length > 0) {
//       const data = result[0];
//       return {
//         name: data.name,
//         title: data.title,
//         email: data.email,
//         phone: data.phone || '',
//         location: data.location || '',
//         about: data.about,
//         skills: Array.isArray(data.skills) ? data.skills : [],
//         profileImage: data.profile_image || '/default-avatar.png',
//         cvUrl: data.cv_url || ''
//       };
//     }
//     return fallbackPersonalInfo;
//   } catch (error) {
//     console.error('Error fetching personal info:', error);
//     return fallbackPersonalInfo;
//   }
// };

// export const getProjects = async (): Promise<Project[]> => {
//   try {
//     const result = await portfolioQueries.getProjects();
//     return result.map(project => ({
//       id: project.id,
//       title: project.title,
//       description: project.description,
//       technologies: Array.isArray(project.technologies) ? project.technologies : [],
//       githubUrl: project.github_url || '',
//       liveUrl: project.live_url
//     }));
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//     return fallbackProjects;
//   }
// };

// // Update functions
// export const updatePersonalInfo = async (data: PersonalInfo): Promise<void> => {
//   try {
//     await portfolioQueries.updatePersonalInfo(data);
//   } catch (error) {
//     console.error('Error updating personal info:', error);
//     throw new Error('Failed to update personal info');
//   }
// };

// export const updateProjects = async (projects: Project[]): Promise<void> => {
//   try {
//     // This would need to be more sophisticated in a real app
//     // For now, we'll just create new projects
//     for (const project of projects) {
//       if (!project.id) {
//         await portfolioQueries.createProject(project);
//       }
//     }
//   } catch (error) {
//     console.error('Error updating projects:', error);
//     throw new Error('Failed to update projects');
//   }
// };

// export const addProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
//   try {
//     const result = await portfolioQueries.createProject(project);
//     return {
//       id: result[0].id,
//       title: result[0].title,
//       description: result[0].description,
//       technologies: Array.isArray(result[0].technologies) ? result[0].technologies : [],
//       githubUrl: result[0].github_url || '',
//       liveUrl: result[0].live_url
//     };
//   } catch (error) {
//     console.error('Error adding project:', error);
//     throw new Error('Failed to add project');
//   }
// };

// export const deleteProject = async (id: number): Promise<void> => {
//   try {
//     await portfolioQueries.deleteProject(id);
//   } catch (error) {
//     console.error('Error deleting project:', error);
//     throw new Error('Failed to delete project');
//   }
// };

// // Real file upload functions
// export const handleImageUpload = async (file: File): Promise<string> => {
//   try {
//     const formData = new FormData();
//     formData.append('image', file);

//     const response = await fetch('/api/portfolio/upload/image', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.error || 'Failed to upload image');
//     }

//     const result = await response.json();
//     return result.imageUrl;
//   } catch (error) {
//     console.error('Image upload error:', error);
//     throw error;
//   }
// };

// export const handleCVUpload = async (file: File): Promise<{ cvUrl: string; fileName: string }> => {
//   try {
//     const formData = new FormData();
//     formData.append('cv', file);

//     const response = await fetch('/api/portfolio/upload/cv', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.error || 'Failed to upload CV');
//     }

//     const result = await response.json();
//     return { cvUrl: result.cvUrl, fileName: result.fileName || file.name };
//   } catch (error) {
//     console.error('CV upload error:', error);
//     throw error;
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
  profileImage: "/default-avatar.png",
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
    const result = await portfolioQueries.getPersonalInfo();
    console.log('Database result for personal info:', result);
    
    if (result.length > 0) {
      const data = result[0];
      const personalInfo = {
        name: data.name || '',
        title: data.title || '',
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        about: data.about || '',
        skills: Array.isArray(data.skills) ? data.skills : (data.skills ? [data.skills] : []),
        profileImage: data.profile_image || '/default-avatar.png',
        cvUrl: data.cv_url || ''
      };
      console.log('Processed personal info:', personalInfo);
      return personalInfo;
    }
    console.log('No data found, using fallback');
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
      technologies: Array.isArray(project.technologies) ? project.technologies : (project.technologies ? [project.technologies] : []),
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
    console.log('Updating personal info in database:', data);
    await portfolioQueries.updatePersonalInfo(data);
    console.log('Personal info updated successfully');
  } catch (error) {
    console.error('Error updating personal info:', error);
    throw new Error('Failed to update personal info');
  }
};

export const updateProjects = async (projects: Project[]): Promise<void> => {
  try {
    console.log('Updating projects in database:', projects);
    // This would need to be more sophisticated in a real app
    // For now, we'll just create new projects
    for (const project of projects) {
      if (!project.id) {
        await portfolioQueries.createProject(project);
      }
    }
    console.log('Projects updated successfully');
  } catch (error) {
    console.error('Error updating projects:', error);
    throw new Error('Failed to update projects');
  }
};

export const addProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  try {
    console.log('Adding new project:', project);
    const result = await portfolioQueries.createProject(project);
    const newProject = {
      id: result[0].id,
      title: result[0].title,
      description: result[0].description,
      technologies: Array.isArray(result[0].technologies) ? result[0].technologies : (result[0].technologies ? [result[0].technologies] : []),
      githubUrl: result[0].github_url || '',
      liveUrl: result[0].live_url
    };
    console.log('Project added successfully:', newProject);
    return newProject;
  } catch (error) {
    console.error('Error adding project:', error);
    throw new Error('Failed to add project');
  }
};

export const deleteProject = async (id: number): Promise<void> => {
  try {
    console.log('Deleting project:', id);
    await portfolioQueries.deleteProject(id);
    console.log('Project deleted successfully');
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
};

// Cloudinary file upload functions
export const handleImageUpload = async (file: File): Promise<string> => {
  try {
    console.log('Uploading image to Cloudinary:', file.name);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/ydvco6ccpr/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudinary upload failed:', errorText);
      throw new Error(`Upload failed: ${errorText}`);
    }

    const data = await response.json();
    console.log('Image uploaded successfully:', data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error('Image upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

export const handleCVUpload = async (file: File): Promise<{ cvUrl: string; fileName: string }> => {
  try {
    console.log('Uploading CV to Cloudinary:', file.name);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/ydvco6ccpr/auto/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudinary upload failed:', errorText);
      throw new Error(`Upload failed: ${errorText}`);
    }

    const data = await response.json();
    console.log('CV uploaded successfully:', data.secure_url);
    return { 
      cvUrl: data.secure_url, 
      fileName: file.name 
    };
  } catch (error) {
    console.error('CV upload error:', error);
    throw new Error('Failed to upload CV to Cloudinary');
  }
};
// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { 
//   personalInfo, 
//   projects, 
//   updatePersonalInfo, 
//   updateProjects, 
//   addProject, 
//   deleteProject, 
//   PersonalInfo, 
//   Project,
//   handleImageUpload,
//   handleCVUpload
// } from '@/data/portfolio-data';
// import { logout, changePassword } from '@/data/auth-data';
// import ProtectedRoute from '@/components/Auth/ProtectedRoute';
// import './admin.css';

// function AdminDashboard() {
//   const [personalData, setPersonalData] = useState<PersonalInfo>({
//     name: '',
//     title: '',
//     email: '',
//     phone: '',
//     location: '',
//     about: '',
//     skills: [],
//     profileImage: '',
//     cvUrl: ''
//   });
//   const [projectsData, setProjectsData] = useState<Project[]>([]);
//   const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({ 
//     title: '', 
//     description: '', 
//     technologies: [], 
//     githubUrl: '', 
//     liveUrl: '' 
//   });
//   const [techInput, setTechInput] = useState('');
//   const [imagePreview, setImagePreview] = useState('');
//   const [cvFileName, setCvFileName] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
  
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const cvInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     // Load saved data on component mount
//     setPersonalData(personalInfo);
//     setProjectsData(projects);
//     setImagePreview(personalInfo.profileImage);
//   }, []);

//   // Handle Image Upload
//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         alert('Please select an image file (JPEG, PNG, etc.)');
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         alert('Image size should be less than 5MB');
//         return;
//       }

//       setIsLoading(true);
//       try {
//         const imageUrl = await handleImageUpload(file);
//         setImagePreview(imageUrl);
//         setPersonalData({ ...personalData, profileImage: imageUrl });
        
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           setImagePreview(e.target?.result as string);
//           setIsLoading(false);
//         };
//         reader.readAsDataURL(file);
        
//         alert('🎉 Image uploaded successfully!');
//       } catch (error) {
//         alert('❌ Error uploading image');
//         setIsLoading(false);
//       }
//     }
//   };

//   // Handle CV Upload
//   const handleCVChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.type !== 'application/pdf') {
//         alert('Please select a PDF file');
//         return;
//       }

//       if (file.size > 10 * 1024 * 1024) {
//         alert('CV file size should be less than 10MB');
//         return;
//       }

//       setIsLoading(true);
//       try {
//         const cvUrl = await handleCVUpload(file);
//         setPersonalData({ ...personalData, cvUrl });
//         setCvFileName(file.name);
//         alert('📄 CV uploaded successfully!');
//       } catch (error) {
//         alert('❌ Error uploading CV');
//       }
//       setIsLoading(false);
//     }
//   };

//   // Trigger file input click
//   const triggerImageInput = () => {
//     fileInputRef.current?.click();
//   };

//   const triggerCVInput = () => {
//     cvInputRef.current?.click();
//   };

//   // Save personal info
//   const handleSavePersonalInfo = () => {
//     updatePersonalInfo(personalData);
//     alert('✅ Personal information updated successfully!');
//   };

//   // Save projects
//   const handleSaveProjects = () => {
//     updateProjects(projectsData);
//     alert('✅ Projects updated successfully!');
//   };

//   // Add new project
//   const handleAddProject = () => {
//     if (!newProject.title.trim() || !newProject.description.trim()) {
//       alert('Please fill in title and description');
//       return;
//     }

//     const project: Project = {
//       ...newProject,
//       id: Date.now()
//     };
//     const updatedProjects = [...projectsData, project];
//     setProjectsData(updatedProjects);
//     setNewProject({ 
//       title: '', 
//       description: '', 
//       technologies: [], 
//       githubUrl: '', 
//       liveUrl: '' 
//     });
//     setTechInput('');
//     alert('🚀 Project added successfully!');
//   };

//   // Delete project
//   const handleDeleteProject = (id: number) => {
//     if (confirm('Are you sure you want to delete this project?')) {
//       const updatedProjects = projectsData.filter(project => project.id !== id);
//       setProjectsData(updatedProjects);
//       alert('🗑️ Project deleted successfully!');
//     }
//   };

//   // Add technology
//   const handleAddTechnology = () => {
//     if (techInput.trim()) {
//       setNewProject({
//         ...newProject,
//         technologies: [...newProject.technologies, techInput.trim()]
//       });
//       setTechInput('');
//     }
//   };

//   // Remove technology
//   const handleRemoveTechnology = (tech: string) => {
//     setNewProject({
//       ...newProject,
//       technologies: newProject.technologies.filter(t => t !== tech)
//     });
//   };

//   // Handle Enter key for technology input
//   const handleTechInputKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleAddTechnology();
//     }
//   };

//   // Download current CV
//   const handleDownloadCV = () => {
//     if (personalData.cvUrl) {
//       const link = document.createElement('a');
//       link.href = personalData.cvUrl;
//       link.download = cvFileName || 'my-cv.pdf';
//       link.click();
//     } else {
//       alert('No CV uploaded yet');
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     if (confirm('Are you sure you want to logout?')) {
//       logout();
//       window.location.href = '/admin/login';
//     }
//   };

//   // Handle password change
//   const handlePasswordChange = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert('New passwords do not match');
//       return;
//     }

//     if (passwordData.newPassword.length < 6) {
//       alert('New password must be at least 6 characters long');
//       return;
//     }

//     const success = changePassword(passwordData.currentPassword, passwordData.newPassword);
//     if (success) {
//       alert('✅ Password changed successfully!');
//       setShowChangePassword(false);
//       setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
//     } else {
//       alert('❌ Current password is incorrect');
//     }
//   };

//   return (
//     <ProtectedRoute>
//       <div className="admin-container fade-in">
//         <div className="admin-header">
//           <h1 className="admin-title">
//             🎛️ Portfolio Admin Dashboard
//           </h1>
//           <div className="admin-actions">
//             <button 
//               className="change-password-btn"
//               onClick={() => setShowChangePassword(!showChangePassword)}
//             >
//               🔑 Change Password
//             </button>
//             <button 
//               className="logout-btn"
//               onClick={handleLogout}
//             >
//               🚪 Logout
//             </button>
//           </div>
//         </div>

//         {/* Change Password Modal */}
//         {showChangePassword && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <h3>🔑 Change Password</h3>
//               <form onSubmit={handlePasswordChange} className="password-form">
//                 <div className="admin-form-group">
//                   <label>Current Password</label>
//                   <input
//                     type="password"
//                     value={passwordData.currentPassword}
//                     onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
//                     required
//                   />
//                 </div>
//                 <div className="admin-form-group">
//                   <label>New Password</label>
//                   <input
//                     type="password"
//                     value={passwordData.newPassword}
//                     onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
//                     required
//                   />
//                 </div>
//                 <div className="admin-form-group">
//                   <label>Confirm New Password</label>
//                   <input
//                     type="password"
//                     value={passwordData.confirmPassword}
//                     onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
//                     required
//                   />
//                 </div>
//                 <div className="modal-actions">
//                   <button type="submit" className="admin-btn-primary">
//                     💾 Change Password
//                   </button>
//                   <button 
//                     type="button" 
//                     className="admin-btn-secondary"
//                     onClick={() => setShowChangePassword(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Personal Information Section */}
//         <section className="admin-section slide-in">
//           <h2>👤 Personal Information</h2>
          
//           <div className="admin-form-grid">
//             {/* Profile Image Upload */}
//             <div className="admin-form-group">
//               <label>🖼️ Profile Image</label>
//               <div className="image-upload-container">
//                 <div className="image-preview">
//                   <img 
//                     src={imagePreview} 
//                     alt="Profile Preview" 
//                     className="profile-preview"
//                   />
//                   <div className="image-overlay">
//                     <button 
//                       type="button"
//                       className="upload-image-btn"
//                       onClick={triggerImageInput}
//                       disabled={isLoading}
//                     >
//                       {isLoading ? '⏳ Uploading...' : '📷 Change Image'}
//                     </button>
//                   </div>
//                 </div>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   style={{ display: 'none' }}
//                 />
//                 <p className="upload-hint">
//                   Recommended: 400x400px, JPG/PNG, max 5MB
//                 </p>
//               </div>
//             </div>

//             {/* CV Upload */}
//             <div className="admin-form-group">
//               <label>📄 CV/Resume</label>
//               <div className="cv-upload-container">
//                 <div className="cv-info">
//                   <span className="cv-status">
//                     {cvFileName || personalData.cvUrl ? '✅ CV Uploaded' : '❌ No CV Uploaded'}
//                   </span>
//                   {cvFileName && (
//                     <span className="cv-filename">📋 {cvFileName}</span>
//                   )}
//                 </div>
//                 <div className="cv-actions">
//                   <button 
//                     type="button"
//                     className="admin-btn-secondary"
//                     onClick={triggerCVInput}
//                     disabled={isLoading}
//                   >
//                     📤 Upload New CV
//                   </button>
//                   <button 
//                     type="button"
//                     className="admin-btn-secondary"
//                     onClick={handleDownloadCV}
//                     disabled={!personalData.cvUrl || isLoading}
//                   >
//                     ⬇️ Download CV
//                   </button>
//                 </div>
//                 <input
//                   type="file"
//                   ref={cvInputRef}
//                   onChange={handleCVChange}
//                   accept=".pdf"
//                   style={{ display: 'none' }}
//                 />
//                 <p className="upload-hint">
//                   PDF format only, max 10MB
//                 </p>
//               </div>
//             </div>

//             <div className="admin-form-group">
//               <label>👤 Full Name *</label>
//               <input
//                 type="text"
//                 value={personalData.name}
//                 onChange={(e) => setPersonalData({...personalData, name: e.target.value})}
//                 required
//                 placeholder="Enter your full name"
//               />
//             </div>

//             <div className="admin-form-group">
//               <label>💼 Professional Title *</label>
//               <input
//                 type="text"
//                 value={personalData.title}
//                 onChange={(e) => setPersonalData({...personalData, title: e.target.value})}
//                 required
//                 placeholder="e.g., Full Stack Developer"
//               />
//             </div>

//             <div className="admin-form-group">
//               <label>📧 Email *</label>
//               <input
//                 type="email"
//                 value={personalData.email}
//                 onChange={(e) => setPersonalData({...personalData, email: e.target.value})}
//                 required
//                 placeholder="your.email@example.com"
//               />
//             </div>

//             <div className="admin-form-group">
//               <label>📱 Phone</label>
//               <input
//                 type="text"
//                 value={personalData.phone}
//                 onChange={(e) => setPersonalData({...personalData, phone: e.target.value})}
//                 placeholder="+1 (555) 123-4567"
//               />
//             </div>

//             <div className="admin-form-group">
//               <label>📍 Location</label>
//               <input
//                 type="text"
//                 value={personalData.location}
//                 onChange={(e) => setPersonalData({...personalData, location: e.target.value})}
//                 placeholder="City, Country"
//               />
//             </div>

//             <div className="admin-form-group">
//               <label>📝 About Me *</label>
//               <textarea
//                 rows={4}
//                 value={personalData.about}
//                 onChange={(e) => setPersonalData({...personalData, about: e.target.value})}
//                 required
//                 placeholder="Describe yourself professionally..."
//               />
//             </div>

//             <div className="admin-form-group">
//               <label>🛠️ Skills (comma separated) *</label>
//               <input
//                 type="text"
//                 value={personalData.skills.join(', ')}
//                 onChange={(e) => setPersonalData({...personalData, skills: e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill)})}
//                 placeholder="JavaScript, React, Node.js, Python, ..."
//                 required
//               />
//             </div>

//             <button 
//               className="admin-btn-primary"
//               onClick={handleSavePersonalInfo}
//             >
//               💾 Save Personal Information
//             </button>
//           </div>
//         </section>

//         {/* Projects Section */}
//         <section className="admin-section slide-in">
//           <h2>🚀 Projects Management</h2>

//           {/* Add New Project */}
//           <div className="add-project-section">
//             <h3>➕ Add New Project</h3>
            
//             <div className="admin-form-grid">
//               <div className="admin-form-group">
//                 <label>📋 Project Title *</label>
//                 <input
//                   type="text"
//                   value={newProject.title}
//                   onChange={(e) => setNewProject({...newProject, title: e.target.value})}
//                   placeholder="Enter project title"
//                 />
//               </div>

//               <div className="admin-form-group">
//                 <label>📝 Description *</label>
//                 <textarea
//                   rows={3}
//                   value={newProject.description}
//                   onChange={(e) => setNewProject({...newProject, description: e.target.value})}
//                   placeholder="Describe your project, features, and technologies used..."
//                 />
//               </div>

//               <div className="admin-form-group">
//                 <label>🔗 GitHub URL</label>
//                 <input
//                   type="text"
//                   value={newProject.githubUrl}
//                   onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
//                   placeholder="https://github.com/username/project"
//                 />
//               </div>

//               <div className="admin-form-group">
//                 <label>🌐 Live Demo URL (optional)</label>
//                 <input
//                   type="text"
//                   value={newProject.liveUrl || ''}
//                   onChange={(e) => setNewProject({...newProject, liveUrl: e.target.value})}
//                   placeholder="https://your-project-demo.com"
//                 />
//               </div>

//               <div className="admin-form-group">
//                 <label>⚙️ Technologies Used</label>
//                 <div className="tech-input-container">
//                   <input
//                     type="text"
//                     className="tech-input"
//                     value={techInput}
//                     onChange={(e) => setTechInput(e.target.value)}
//                     onKeyPress={handleTechInputKeyPress}
//                     placeholder="Enter technology and press Enter/Add"
//                   />
//                   <button 
//                     className="admin-btn-secondary"
//                     onClick={handleAddTechnology}
//                     type="button"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="tech-tags-container">
//                   {newProject.technologies.map((tech, index) => (
//                     <span key={index} className="tech-tag">
//                       {tech}
//                       <button 
//                         className="tech-tag-remove"
//                         onClick={() => handleRemoveTechnology(tech)}
//                         type="button"
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <button 
//                 className="admin-btn-primary"
//                 onClick={handleAddProject}
//               >
//                 🚀 Add New Project
//               </button>
//             </div>
//           </div>

//           {/* Existing Projects */}
//           <div>
//             <h3>📂 Existing Projects ({projectsData.length})</h3>
//             <div className="project-list">
//               {projectsData.map((project) => (
//                 <div key={project.id} className="project-item">
//                   <div className="project-header">
//                     <h4 className="project-title">{project.title}</h4>
//                     <button 
//                       className="delete-btn"
//                       onClick={() => handleDeleteProject(project.id)}
//                       type="button"
//                     >
//                       🗑️ Delete
//                     </button>
//                   </div>
//                   <p className="project-description">{project.description}</p>
//                   <div className="project-technologies">
//                     {project.technologies.map((tech, techIndex) => (
//                       <span key={techIndex} className="project-tech-tag">
//                         {tech}
//                       </span>
//                     ))}
//                   </div>
//                   <div style={{ fontSize: '0.9rem', color: '#718096', marginTop: '15px' }}>
//                     <strong>🔗 GitHub:</strong> {project.githubUrl || 'Not provided'} <br/>
//                     <strong>🌐 Live Demo:</strong> {project.liveUrl || 'Not provided'}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button 
//             className="admin-btn-primary"
//             onClick={handleSaveProjects}
//             style={{ marginTop: '20px' }}
//           >
//             💾 Save All Projects
//           </button>
//         </section>

//         {/* Instructions */}
//         <section className="instructions-section">
//           <h3>📋 Admin Guide</h3>
//           <ul className="instructions-list">
//             <li><strong>Profile Image:</strong> Upload JPG/PNG (max 5MB) for better visual appeal</li>
//             <li><strong>CV Upload:</strong> PDF format only (max 10MB) for professional presentation</li>
//             <li><strong>Personal Info:</strong> Keep your information updated and professional</li>
//             <li><strong>Skills:</strong> List relevant technologies separated by commas</li>
//             <li><strong>Projects:</strong> Add detailed descriptions and relevant technologies</li>
//             <li><strong>Save Changes:</strong> Always click save buttons to apply updates</li>
//             <li><strong>Preview:</strong> Visit your portfolio homepage to see live changes</li>
//           </ul>
//         </section>
//       </div>
//     </ProtectedRoute>
//   );
// }

// export default AdminDashboard;

'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  personalInfo, 
  projects, 
  updatePersonalInfo, 
  updateProjects, 
  addProject, 
  deleteProject, 
  PersonalInfo, 
  Project,
  handleImageUpload,
  handleCVUpload
} from '@/data/portfolio-data';
import { logout, changePassword, checkAuth } from '@/data/auth-data';
import './admin.css';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  // Check authentication on component mount
  useEffect(() => {
    const authStatus = checkAuth();
    setIsAuthenticated(authStatus);
    
    if (!authStatus) {
      window.location.href = '/admin/login';
    }
  }, []);

  // State for personal information
  const [personalData, setPersonalData] = useState<PersonalInfo>(personalInfo);
  const [projectsData, setProjectsData] = useState<Project[]>(projects);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({ 
    title: '', 
    description: '', 
    technologies: [], 
    githubUrl: '', 
    liveUrl: '' 
  });
  const [techInput, setTechInput] = useState('');
  const [imagePreview, setImagePreview] = useState(personalInfo.profileImage);
  const [cvFileName, setCvFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

  // Handle Image Upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, etc.)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setIsLoading(true);
      try {
        const imageUrl = await handleImageUpload(file);
        setImagePreview(imageUrl);
        setPersonalData({ ...personalData, profileImage: imageUrl });
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
          setIsLoading(false);
        };
        reader.readAsDataURL(file);
        
        alert('🎉 Image uploaded successfully!');
      } catch (error) {
        alert('❌ Error uploading image');
        setIsLoading(false);
      }
    }
  };

  // Handle CV Upload
  const handleCVChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('CV file size should be less than 10MB');
        return;
      }

      setIsLoading(true);
      try {
        const cvUrl = await handleCVUpload(file);
        setPersonalData({ ...personalData, cvUrl });
        setCvFileName(file.name);
        alert('📄 CV uploaded successfully!');
      } catch (error) {
        alert('❌ Error uploading CV');
      }
      setIsLoading(false);
    }
  };

  // Trigger file input click
  const triggerImageInput = () => {
    fileInputRef.current?.click();
  };

  const triggerCVInput = () => {
    cvInputRef.current?.click();
  };

  // Save personal info
  const handleSavePersonalInfo = () => {
    updatePersonalInfo(personalData);
    alert('✅ Personal information updated successfully!');
  };

  // Save projects
  const handleSaveProjects = () => {
    updateProjects(projectsData);
    alert('✅ Projects updated successfully!');
  };

  // Add new project
  const handleAddProject = () => {
    if (!newProject.title.trim() || !newProject.description.trim()) {
      alert('Please fill in title and description');
      return;
    }

    const project: Project = {
      ...newProject,
      id: Date.now()
    };
    const updatedProjects = [...projectsData, project];
    setProjectsData(updatedProjects);
    setNewProject({ 
      title: '', 
      description: '', 
      technologies: [], 
      githubUrl: '', 
      liveUrl: '' 
    });
    setTechInput('');
    alert('🚀 Project added successfully!');
  };

  // Delete project
  const handleDeleteProject = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projectsData.filter(project => project.id !== id);
      setProjectsData(updatedProjects);
      alert('🗑️ Project deleted successfully!');
    }
  };

  // Add technology
  const handleAddTechnology = () => {
    if (techInput.trim()) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, techInput.trim()]
      });
      setTechInput('');
    }
  };

  // Remove technology
  const handleRemoveTechnology = (tech: string) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter(t => t !== tech)
    });
  };

  // Handle Enter key for technology input
  const handleTechInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  // Download current CV
  const handleDownloadCV = () => {
    if (personalData.cvUrl) {
      const link = document.createElement('a');
      link.href = personalData.cvUrl;
      link.download = cvFileName || 'my-cv.pdf';
      link.click();
    } else {
      alert('No CV uploaded yet');
    }
  };

  // Handle logout
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      window.location.href = '/admin/login';
    }
  };

  // Handle password change
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return;
    }

    const success = changePassword(passwordData.currentPassword, passwordData.newPassword);
    if (success) {
      alert('✅ Password changed successfully!');
      setShowChangePassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      alert('❌ Current password is incorrect');
    }
  };

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ 
          color: 'white', 
          fontSize: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ 
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid transparent',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px'
          }}></div>
          <br />
          🔒 Authenticating...
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // If not authenticated, redirect will happen in useEffect
  if (!isAuthenticated) {
    return null;
  }

  // Main admin dashboard content
  return (
    <div className="admin-container fade-in">
      <div className="admin-header">
        <h1 className="admin-title">
          🎛️ Portfolio Admin Dashboard
        </h1>
        <div className="admin-actions">
          <button 
            className="change-password-btn"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            🔑 Change Password
          </button>
          <button 
            className="logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>🔑 Change Password</h3>
            <form onSubmit={handlePasswordChange} className="password-form">
              <div className="admin-form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="admin-btn-primary">
                  💾 Change Password
                </button>
                <button 
                  type="button" 
                  className="admin-btn-secondary"
                  onClick={() => setShowChangePassword(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Personal Information Section */}
      <section className="admin-section slide-in">
        <h2>👤 Personal Information</h2>
        
        <div className="admin-form-grid">
          {/* Profile Image Upload */}
          <div className="admin-form-group">
            <label>🖼️ Profile Image</label>
            <div className="image-upload-container">
              <div className="image-preview">
                <img 
                  src={imagePreview} 
                  alt="Profile Preview" 
                  className="profile-preview"
                />
                <div className="image-overlay">
                  <button 
                    type="button"
                    className="upload-image-btn"
                    onClick={triggerImageInput}
                    disabled={isLoading}
                  >
                    {isLoading ? '⏳ Uploading...' : '📷 Change Image'}
                  </button>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <p className="upload-hint">
                Recommended: 400x400px, JPG/PNG, max 5MB
              </p>
            </div>
          </div>

          {/* CV Upload */}
          <div className="admin-form-group">
            <label>📄 CV/Resume</label>
            <div className="cv-upload-container">
              <div className="cv-info">
                <span className="cv-status">
                  {cvFileName || personalData.cvUrl ? '✅ CV Uploaded' : '❌ No CV Uploaded'}
                </span>
                {cvFileName && (
                  <span className="cv-filename">📋 {cvFileName}</span>
                )}
              </div>
              <div className="cv-actions">
                <button 
                  type="button"
                  className="admin-btn-secondary"
                  onClick={triggerCVInput}
                  disabled={isLoading}
                >
                  📤 Upload New CV
                </button>
                <button 
                  type="button"
                  className="admin-btn-secondary"
                  onClick={handleDownloadCV}
                  disabled={!personalData.cvUrl || isLoading}
                >
                  ⬇️ Download CV
                </button>
              </div>
              <input
                type="file"
                ref={cvInputRef}
                onChange={handleCVChange}
                accept=".pdf"
                style={{ display: 'none' }}
              />
              <p className="upload-hint">
                PDF format only, max 10MB
              </p>
            </div>
          </div>

          <div className="admin-form-group">
            <label>👤 Full Name *</label>
            <input
              type="text"
              value={personalData.name}
              onChange={(e) => setPersonalData({...personalData, name: e.target.value})}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="admin-form-group">
            <label>💼 Professional Title *</label>
            <input
              type="text"
              value={personalData.title}
              onChange={(e) => setPersonalData({...personalData, title: e.target.value})}
              required
              placeholder="e.g., Full Stack Developer"
            />
          </div>

          <div className="admin-form-group">
            <label>📧 Email *</label>
            <input
              type="email"
              value={personalData.email}
              onChange={(e) => setPersonalData({...personalData, email: e.target.value})}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="admin-form-group">
            <label>📱 Phone</label>
            <input
              type="text"
              value={personalData.phone}
              onChange={(e) => setPersonalData({...personalData, phone: e.target.value})}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="admin-form-group">
            <label>📍 Location</label>
            <input
              type="text"
              value={personalData.location}
              onChange={(e) => setPersonalData({...personalData, location: e.target.value})}
              placeholder="City, Country"
            />
          </div>

          <div className="admin-form-group">
            <label>📝 About Me *</label>
            <textarea
              rows={4}
              value={personalData.about}
              onChange={(e) => setPersonalData({...personalData, about: e.target.value})}
              required
              placeholder="Describe yourself professionally..."
            />
          </div>

          <div className="admin-form-group">
            <label>🛠️ Skills (comma separated) *</label>
            <input
              type="text"
              value={personalData.skills.join(', ')}
              onChange={(e) => setPersonalData({...personalData, skills: e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill)})}
              placeholder="JavaScript, React, Node.js, Python, ..."
              required
            />
          </div>

          <button 
            className="admin-btn-primary"
            onClick={handleSavePersonalInfo}
          >
            💾 Save Personal Information
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section className="admin-section slide-in">
        <h2>🚀 Projects Management</h2>

        {/* Add New Project */}
        <div className="add-project-section">
          <h3>➕ Add New Project</h3>
          
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>📋 Project Title *</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                placeholder="Enter project title"
              />
            </div>

            <div className="admin-form-group">
              <label>📝 Description *</label>
              <textarea
                rows={3}
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                placeholder="Describe your project, features, and technologies used..."
              />
            </div>

            <div className="admin-form-group">
              <label>🔗 GitHub URL</label>
              <input
                type="text"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className="admin-form-group">
              <label>🌐 Live Demo URL (optional)</label>
              <input
                type="text"
                value={newProject.liveUrl || ''}
                onChange={(e) => setNewProject({...newProject, liveUrl: e.target.value})}
                placeholder="https://your-project-demo.com"
              />
            </div>

            <div className="admin-form-group">
              <label>⚙️ Technologies Used</label>
              <div className="tech-input-container">
                <input
                  type="text"
                  className="tech-input"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={handleTechInputKeyPress}
                  placeholder="Enter technology and press Enter/Add"
                />
                <button 
                  className="admin-btn-secondary"
                  onClick={handleAddTechnology}
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="tech-tags-container">
                {newProject.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                    <button 
                      className="tech-tag-remove"
                      onClick={() => handleRemoveTechnology(tech)}
                      type="button"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button 
              className="admin-btn-primary"
              onClick={handleAddProject}
            >
              🚀 Add New Project
            </button>
          </div>
        </div>

        {/* Existing Projects */}
        <div>
          <h3>📂 Existing Projects ({projectsData.length})</h3>
          <div className="project-list">
            {projectsData.map((project) => (
              <div key={project.id} className="project-item">
                <div className="project-header">
                  <h4 className="project-title">{project.title}</h4>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteProject(project.id)}
                    type="button"
                  >
                    🗑️ Delete
                  </button>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="project-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#718096', marginTop: '15px' }}>
                  <strong>🔗 GitHub:</strong> {project.githubUrl || 'Not provided'} <br/>
                  <strong>🌐 Live Demo:</strong> {project.liveUrl || 'Not provided'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="admin-btn-primary"
          onClick={handleSaveProjects}
          style={{ marginTop: '20px' }}
        >
          💾 Save All Projects
        </button>
      </section>

      {/* Instructions */}
      <section className="instructions-section">
        <h3>📋 Admin Guide</h3>
        <ul className="instructions-list">
          <li><strong>Profile Image:</strong> Upload JPG/PNG (max 5MB) for better visual appeal</li>
          <li><strong>CV Upload:</strong> PDF format only (max 10MB) for professional presentation</li>
          <li><strong>Personal Info:</strong> Keep your information updated and professional</li>
          <li><strong>Skills:</strong> List relevant technologies separated by commas</li>
          <li><strong>Projects:</strong> Add detailed descriptions and relevant technologies</li>
          <li><strong>Save Changes:</strong> Always click save buttons to apply updates</li>
          <li><strong>Preview:</strong> Visit your portfolio homepage to see live changes</li>
        </ul>
      </section>
    </div>
  );
}
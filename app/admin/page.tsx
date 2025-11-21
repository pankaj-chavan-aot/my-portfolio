// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { 
//   getPersonalInfo,
//   getProjects,
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
// import { getUnreadCount } from '@/data/notifications-data';
// import ProtectedRoute from '@/components/Auth/ProtectedRoute';
// import NotificationCenter from '@/components/UI/Form/NotificationCenter';
// import { toast } from 'sonner';
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
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
  
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const cvInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setIsLoading(true);
//         const [personalDataFromDB, projectsFromDB] = await Promise.all([
//           getPersonalInfo(),
//           getProjects()
//         ]);
        
//         setPersonalData(personalDataFromDB);
//         setProjectsData(projectsFromDB);
//         setImagePreview(personalDataFromDB.profileImage);
//         updateUnreadCount();
//       } catch (error) {
//         console.error('Error loading data:', error);
//         toast.error('Failed to load data from database');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadData();
    
//     // Update unread count every 30 seconds
//     const interval = setInterval(updateUnreadCount, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const updateUnreadCount = () => {
//     setUnreadCount(getUnreadCount());
//   };

//   // Handle logout function
//   const handleLogout = () => {
//     if (confirm('Are you sure you want to logout?')) {
//       logout();
//       toast.success('Logged out successfully!');
//       setTimeout(() => {
//         window.location.href = '/admin/login';
//       }, 1000);
//     }
//   };

//   // Handle password change
//   const handlePasswordChange = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       toast.error('New passwords do not match');
//       return;
//     }

//     if (passwordData.newPassword.length < 6) {
//       toast.error('New password must be at least 6 characters long');
//       return;
//     }

//     const success = changePassword(passwordData.currentPassword, passwordData.newPassword);
//     if (success) {
//       toast.success('Password changed successfully!');
//       setShowChangePassword(false);
//       setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
//     } else {
//       toast.error('Current password is incorrect');
//     }
//   };
// // ------------------------------------------------------------
//   // // Handle Image Upload
//   // const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const file = e.target.files?.[0];
//   //   if (file) {
//   //     if (!file.type.startsWith('image/')) {
//   //       toast.error('Please select an image file (JPEG, PNG, etc.)');
//   //       return;
//   //     }

//   //     if (file.size > 5 * 1024 * 1024) {
//   //       toast.error('Image size should be less than 5MB');
//   //       return;
//   //     }

//   //     setIsLoading(true);
//   //     try {
//   //       const imageUrl = await handleImageUpload(file);
//   //       setImagePreview(imageUrl);
//   //       setPersonalData({ ...personalData, profileImage: imageUrl });
        
//   //       const reader = new FileReader();
//   //       reader.onload = (e) => {
//   //         setImagePreview(e.target?.result as string);
//   //         setIsLoading(false);
//   //       };
//   //       reader.readAsDataURL(file);
        
//   //       toast.success('Profile image uploaded successfully!');
//   //     } catch (error) {
//   //       toast.error('Error uploading image');
//   //       setIsLoading(false);
//   //     }
//   //   }
//   // };


//  // Handle Image Upload
//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setIsLoading(true);
//       try {
//         const imageUrl = await handleImageUpload(file);
        
//         // Update local state
//         setImagePreview(imageUrl);
//         setPersonalData({ ...personalData, profileImage: imageUrl });
        
//         // Update database
//         await updatePersonalInfo({ ...personalData, profileImage: imageUrl });
        
//         toast.success('Profile image uploaded successfully!');
//       } catch (error) {
//         toast.error(error instanceof Error ? error.message : 'Error uploading image');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };


//   // // -------------------------------------------------------------------------------------------------------

//   // Handle CV Upload
//   // const handleCVChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const file = e.target.files?.[0];
//   //   if (file) {
//   //     if (file.type !== 'application/pdf') {
//   //       toast.error('Please select a PDF file');
//   //       return;
//   //     }

//   //     if (file.size > 10 * 1024 * 1024) {
//   //       toast.error('CV file size should be less than 10MB');
//   //       return;
//   //     }

//   //     setIsLoading(true);
//   //     try {
//   //       const cvUrl = await handleCVUpload(file);
//   //       setPersonalData({ ...personalData, cvUrl });
//   //       setCvFileName(file.name);
//   //       toast.success('CV uploaded successfully!');
//   //     } catch (error) {
//   //       toast.error('Error uploading CV');
//   //     }
//   //     setIsLoading(false);
//   //   }
//   // };



  
//   // Handle CV Upload
//   const handleCVChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setIsLoading(true);
//       try {
//         const { cvUrl, fileName } = await handleCVUpload(file);
        
//         // Update local state
//         setPersonalData({ ...personalData, cvUrl });
//         setCvFileName(fileName);
        
//         // Update database
//         await updatePersonalInfo({ ...personalData, cvUrl });
        
//         toast.success('CV uploaded successfully!');
//       } catch (error) {
//         toast.error(error instanceof Error ? error.message : 'Error uploading CV');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   // Download current CV
//   const handleDownloadCV = () => {
//     if (personalData.cvUrl) {
//       const link = document.createElement('a');
//       link.href = personalData.cvUrl;
//       link.download = cvFileName || 'cv.pdf';
//       link.click();
//     } else {
//       toast.error('No CV uploaded yet');
//     }
//   };



// // ----------------------------------------------------------------------------------
//   // Trigger file input click
//   const triggerImageInput = () => {
//     fileInputRef.current?.click();
//   };

//   const triggerCVInput = () => {
//     cvInputRef.current?.click();
//   };

//   // Save personal info
//   const handleSavePersonalInfo = async () => {
//     try {
//       setIsLoading(true);
//       await updatePersonalInfo(personalData);
//       toast.success('Personal information updated successfully!');
//     } catch (error) {
//       toast.error('Failed to update personal information');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Save projects
//   const handleSaveProjects = async () => {
//     try {
//       setIsLoading(true);
//       await updateProjects(projectsData);
//       toast.success('Projects updated successfully!');
//     } catch (error) {
//       toast.error('Failed to update projects');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Add new project
//   const handleAddProject = async () => {
//     if (!newProject.title.trim() || !newProject.description.trim()) {
//       toast.error('Please fill in title and description');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const project = await addProject(newProject);
//       const updatedProjects = [...projectsData, project];
//       setProjectsData(updatedProjects);
//       setNewProject({ 
//         title: '', 
//         description: '', 
//         technologies: [], 
//         githubUrl: '', 
//         liveUrl: '' 
//       });
//       setTechInput('');
//       toast.success('Project added successfully!');
//     } catch (error) {
//       toast.error('Failed to add project');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Delete project
//   const handleDeleteProject = async (id: number) => {
//     toast.custom((t) => (
//       <div className="confirmation-toast">
//         <p>Are you sure you want to delete this project?</p>
//         <div className="toast-actions">
//           <button 
//             onClick={async () => {
//               try {
//                 await deleteProject(id);
//                 const updatedProjects = projectsData.filter(project => project.id !== id);
//                 setProjectsData(updatedProjects);
//                 toast.success('Project deleted successfully!');
//                 toast.dismiss(t);
//               } catch (error) {
//                 toast.error('Failed to delete project');
//               }
//             }}
//             className="btn-confirm"
//           >
//             Yes, Delete
//           </button>
//           <button 
//             onClick={() => toast.dismiss(t)}
//             className="btn-cancel"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     ));
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

//   // // Download current CV
//   // const handleDownloadCV = () => {
//   //   if (personalData.cvUrl) {
//   //     const link = document.createElement('a');
//   //     link.href = personalData.cvUrl;
//   //     link.download = cvFileName || 'my-cv.pdf';
//   //     link.click();
//   //   } else {
//   //     toast.error('No CV uploaded yet');
//   //   }
//   // };

//   if (isLoading && projectsData.length === 0) {
//     return (
//       <div className="admin-container">
//         <div className="loading-screen">
//           <div className="loading-spinner large"></div>
//           <p>Loading admin dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute>
//       <div className="admin-container fade-in">
//         <div className="admin-header">
//           <h1 className="admin-title">
//             🎛️ Portfolio Admin Dashboard
//           </h1>
//           <div className="admin-actions">
//             <button 
//               className="notification-btn"
//               onClick={() => setShowNotifications(true)}
//             >
//               🔔 Notifications
//               {unreadCount > 0 && (
//                 <span className="notification-badge">
//                   {unreadCount}
//                 </span>
//               )}
//             </button>
            
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

//         {/* Notification Center */}
//         <NotificationCenter 
//           isOpen={showNotifications}
//           onClose={() => setShowNotifications(false)}
//         />

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
//               disabled={isLoading}
//             >
//               {isLoading ? '⏳ Saving...' : '💾 Save Personal Information'}
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
//                 disabled={isLoading}
//               >
//                 {isLoading ? '⏳ Adding...' : '🚀 Add New Project'}
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
//                       disabled={isLoading}
//                     >
//                       {isLoading ? '⏳' : '🗑️ Delete'}
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
//             disabled={isLoading}
//           >
//             {isLoading ? '⏳ Saving...' : '💾 Save All Projects'}
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
  getPersonalInfo,
  getProjects,
  updatePersonalInfo, 
  updateProjects, 
  addProject, 
  deleteProject, 
  PersonalInfo, 
  Project
} from '@/data/portfolio-data';

import { logout, changePassword } from '@/data/auth-data';
import { getUnreadCount } from '@/data/notifications-data';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import NotificationCenter from '@/components/UI/Form/NotificationCenter';
import { toast } from 'sonner';
import './admin.css';

// Cloudinary Upload Functions
const uploadToCloudinary = async (file: File, fileType: 'image' | 'pdf'): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // तुमचा upload preset

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/ydvco6ccpr/auto/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${errorText}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
};

function AdminDashboard() {
  const [personalData, setPersonalData] = useState<PersonalInfo>({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    about: '',
    skills: [],
    profileImage: '',
    cvUrl: ''
  });
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({ 
    title: '', 
    description: '', 
    technologies: [], 
    githubUrl: '', 
    liveUrl: '' 
  });
  const [techInput, setTechInput] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [cvFileName, setCvFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [personalDataFromDB, projectsFromDB] = await Promise.all([
          getPersonalInfo(),
          getProjects()
        ]);
        
        setPersonalData(personalDataFromDB);
        setProjectsData(projectsFromDB);
        setImagePreview(personalDataFromDB.profileImage);
        updateUnreadCount();
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load data from database');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    
    // Update unread count every 30 seconds
    const interval = setInterval(updateUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const updateUnreadCount = () => {
    setUnreadCount(getUnreadCount());
  };

  // Handle logout function
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      toast.success('Logged out successfully!');
      setTimeout(() => {
        window.location.href = '/admin/login';
      }, 1000);
    }
  };

  // Handle password change
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }

    const success = changePassword(passwordData.currentPassword, passwordData.newPassword);
    if (success) {
      toast.success('Password changed successfully!');
      setShowChangePassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      toast.error('Current password is incorrect');
    }
  };

  // Handle Image Upload to Cloudinary
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validation
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file (JPEG, PNG, etc.)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setIsLoading(true);
      try {
        // Create local preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Upload to Cloudinary
        const imageUrl = await uploadToCloudinary(file, 'image');
        
        // Update local state
        setPersonalData({ ...personalData, profileImage: imageUrl });
        
        // Update database
        await updatePersonalInfo({ ...personalData, profileImage: imageUrl });
        
        toast.success('Profile image uploaded to Cloudinary successfully!');
      } catch (error) {
        console.error('Image upload error:', error);
        toast.error(error instanceof Error ? error.message : 'Error uploading image to Cloudinary');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle CV Upload to Cloudinary
  const handleCVChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validation
      if (file.type !== 'application/pdf') {
        toast.error('Please select a PDF file');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error('CV file size should be less than 10MB');
        return;
      }

      setIsLoading(true);
      try {
        // Upload to Cloudinary
        const cvUrl = await uploadToCloudinary(file, 'pdf');
        
        // Update local state
        setPersonalData({ ...personalData, cvUrl });
        setCvFileName(file.name);
        
        // Update database
        await updatePersonalInfo({ ...personalData, cvUrl });
        
        toast.success('CV uploaded to Cloudinary successfully!');
      } catch (error) {
        console.error('CV upload error:', error);
        toast.error(error instanceof Error ? error.message : 'Error uploading CV to Cloudinary');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Download current CV
  const handleDownloadCV = () => {
    if (personalData.cvUrl) {
      const link = document.createElement('a');
      link.href = personalData.cvUrl;
      link.download = cvFileName || 'cv.pdf';
      link.target = '_blank'; // Cloudinary URL साठी
      link.click();
    } else {
      toast.error('No CV uploaded yet');
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
  const handleSavePersonalInfo = async () => {
    try {
      setIsLoading(true);
      await updatePersonalInfo(personalData);
      toast.success('Personal information updated successfully!');
    } catch (error) {
      toast.error('Failed to update personal information');
    } finally {
      setIsLoading(false);
    }
  };

  // Save projects
  const handleSaveProjects = async () => {
    try {
      setIsLoading(true);
      await updateProjects(projectsData);
      toast.success('Projects updated successfully!');
    } catch (error) {
      toast.error('Failed to update projects');
    } finally {
      setIsLoading(false);
    }
  };

  // Add new project
  const handleAddProject = async () => {
    if (!newProject.title.trim() || !newProject.description.trim()) {
      toast.error('Please fill in title and description');
      return;
    }

    try {
      setIsLoading(true);
      const project = await addProject(newProject);
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
      toast.success('Project added successfully!');
    } catch (error) {
      toast.error('Failed to add project');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete project
  const handleDeleteProject = async (id: number) => {
    toast.custom((t) => (
      <div className="confirmation-toast">
        <p>Are you sure you want to delete this project?</p>
        <div className="toast-actions">
          <button 
            onClick={async () => {
              try {
                await deleteProject(id);
                const updatedProjects = projectsData.filter(project => project.id !== id);
                setProjectsData(updatedProjects);
                toast.success('Project deleted successfully!');
                toast.dismiss(t);
              } catch (error) {
                toast.error('Failed to delete project');
              }
            }}
            className="btn-confirm"
          >
            Yes, Delete
          </button>
          <button 
            onClick={() => toast.dismiss(t)}
            className="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
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

  if (isLoading && projectsData.length === 0) {
    return (
      <div className="admin-container">
        <div className="loading-screen">
          <div className="loading-spinner large"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="admin-container fade-in">
        <div className="admin-header">
          <h1 className="admin-title">
            🎛️ Portfolio Admin Dashboard
          </h1>
          <div className="admin-actions">
            <button 
              className="notification-btn"
              onClick={() => setShowNotifications(true)}
            >
              🔔 Notifications
              {unreadCount > 0 && (
                <span className="notification-badge">
                  {unreadCount}
                </span>
              )}
            </button>
            
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

        {/* Notification Center */}
        <NotificationCenter 
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />

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
                    src={imagePreview || '/default-avatar.png'} 
                    alt="Profile Preview" 
                    className="profile-preview"
                    onError={(e) => {
                      e.currentTarget.src = '/default-avatar.png';
                    }}
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
                <p className="cloudinary-info">
                  🌩️ Files are stored securely on Cloudinary
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
                <p className="cloudinary-info">
                  🌩️ Files are stored securely on Cloudinary
                </p>
              </div>
            </div>

            {/* ... rest of the personal info form remains the same ... */}
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

            {/* ... rest of the code remains exactly the same ... */}
          </div>
        </section>

        {/* ... rest of the component remains exactly the same ... */}
      </div>
    </ProtectedRoute>
  );
}

export default AdminDashboard;
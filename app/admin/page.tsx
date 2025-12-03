
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
        
//         // Extract filename from CV URL if exists
//         if (personalDataFromDB.cvUrl) {
//           const fileName = personalDataFromDB.cvUrl.split('/').pop() || 'cv.pdf';
//           setCvFileName(fileName);
//         }
        
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

//   // Handle Image Upload
//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // File validation
//       if (!file.type.startsWith('image/')) {
//         toast.error('Please select an image file (JPEG, PNG, etc.)');
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size should be less than 5MB');
//         return;
//       }

//       setIsLoading(true);
//       try {
//         // Create immediate preview
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           setImagePreview(e.target?.result as string);
//         };
//         reader.readAsDataURL(file);

//         // Upload image and get URL
//         const imageUrl = await handleImageUpload(file);
        
//         // Update local state with actual URL
//         setImagePreview(imageUrl);
//         const updatedPersonalData = { ...personalData, profileImage: imageUrl };
//         setPersonalData(updatedPersonalData);
        
//         // Update database
//         await updatePersonalInfo(updatedPersonalData);
        
//         toast.success('Profile image uploaded successfully!');
//       } catch (error) {
//         toast.error(error instanceof Error ? error.message : 'Error uploading image');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   // Handle CV Upload
//   const handleCVChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // File validation
//       if (file.type !== 'application/pdf') {
//         toast.error('Please select a PDF file');
//         return;
//       }

//       if (file.size > 10 * 1024 * 1024) {
//         toast.error('CV file size should be less than 10MB');
//         return;
//       }

//       setIsLoading(true);
//       try {
//         // Upload CV and get URL
//         const { cvUrl, fileName } = await handleCVUpload(file);
        
//         // Update local state
//         const updatedPersonalData = { ...personalData, cvUrl };
//         setPersonalData(updatedPersonalData);
//         setCvFileName(fileName);
        
//         // Update database
//         await updatePersonalInfo(updatedPersonalData);
        
//         toast.success('CV uploaded successfully!');
//       } catch (error) {
//         toast.error(error instanceof Error ? error.message : 'Error uploading CV');
//       } finally {
//         setIsLoading(false);
//       }
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

//   // Download current CV
//   const handleDownloadCV = () => {
//     if (personalData.cvUrl) {
//       const link = document.createElement('a');
//       link.href = personalData.cvUrl;
//       link.download = cvFileName || 'my-cv.pdf';
//       link.click();
//     } else {
//       toast.error('No CV uploaded yet');
//     }
//   };

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
//                   {/* <img 
//                     src={imagePreview || '/default-avatar.jpg'} 
//                     alt="Profile Preview" 
//                     className="profile-preview"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src = '/default-avatar.jpg';
//                     }}
//                   /> */
                  
//                   <img 
//                     src={imagePreview || '/images/default-avatar.png'} 
//                     alt="Profile Preview" 
//                     className="profile-preview"
//                     onError={(e) => {
//                     // Fallback to base64 placeholder
//                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qcm9maWxlIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
//                      }}
//                       />
//                   }
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
//                   <div className="project-urls">
//                     <div><strong>🔗 GitHub:</strong> {project.githubUrl || 'Not provided'}</div>
//                     <div><strong>🌐 Live Demo:</strong> {project.liveUrl || 'Not provided'}</div>
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

// Cloudinary Upload Functions - FIXED
const uploadToCloudinary = async (file: File, fileType: 'image' | 'pdf'): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default');
  
  // IMPORTANT: Set resource_type based on file type
  if (fileType === 'pdf') {
    formData.append('resource_type', 'raw');
  } else {
    formData.append('resource_type', 'image');
  }

  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dvco6ccpr';
    
    // Use correct endpoint based on resource_type
    const endpoint = fileType === 'pdf' 
      ? `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`
      : `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    console.log(`Uploading ${fileType} to:`, endpoint);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${errorText}`);
    }

    const data = await response.json();
    console.log(`✅ ${fileType.toUpperCase()} uploaded successfully:`, {
      secure_url: data.secure_url,
      resource_type: data.resource_type,
      format: data.format
    });
    
    // For PDFs, add force download parameter
    if (fileType === 'pdf' && data.secure_url.includes('cloudinary.com')) {
      const downloadUrl = data.secure_url.replace('/upload/', '/upload/fl_attachment/');
      console.log('PDF Download URL:', downloadUrl);
      return downloadUrl;
    }
    
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
  const [imagePreview, setImagePreview] = useState('/images/default-avatar.png');
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
        
        console.log('📥 Loaded personal data:', {
          name: personalDataFromDB.name,
          cvUrl: personalDataFromDB.cvUrl,
          cvUrlType: personalDataFromDB.cvUrl?.includes('/image/') ? 'Image URL (Wrong)' : 'Raw/PDF URL'
        });
        
        setPersonalData(personalDataFromDB);
        setProjectsData(projectsFromDB);
        
        if (personalDataFromDB.profileImage) {
          setImagePreview(personalDataFromDB.profileImage);
        }
        
        // Set CV file name if exists
        if (personalDataFromDB.cvUrl) {
          setCvFileName('Download CV');
        }
        
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
        // Create local preview immediately
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Upload to Cloudinary as IMAGE
        const imageUrl = await uploadToCloudinary(file, 'image');
        console.log('Uploaded image URL:', imageUrl);
        
        // Create updated personal data with new image URL
        const updatedPersonalData = {
          ...personalData,
          profileImage: imageUrl
        };
        
        // Update local state
        setPersonalData(updatedPersonalData);
        setImagePreview(imageUrl);
        
        // Update database
        await updatePersonalInfo(updatedPersonalData);
        console.log('✅ Database updated with new image URL');
        
        toast.success('✅ Profile image uploaded successfully!');
        
      } catch (error) {
        console.error('❌ Image upload error:', error);
        toast.error(error instanceof Error ? error.message : 'Error uploading image');
        // Reset to previous image
        setImagePreview(personalData.profileImage || '/images/default-avatar.png');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle CV Upload to Cloudinary - FIXED
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
        console.log('📤 Starting CV upload...', {
          name: file.name,
          size: file.size,
          type: file.type
        });

        // Upload to Cloudinary as RAW (PDF)
        const cvUrl = await uploadToCloudinary(file, 'pdf');
        console.log('✅ Uploaded CV URL:', cvUrl);
        
        // Verify it's a raw URL
        if (cvUrl.includes('/image/upload/')) {
          console.warn('⚠️ Warning: CV uploaded as image instead of raw');
          toast.warning('CV uploaded but may have wrong format. Please check URL.');
        }
        
        // Create updated personal data with new CV URL
        const updatedPersonalData = {
          ...personalData,
          cvUrl: cvUrl
        };
        
        // Update local state
        setPersonalData(updatedPersonalData);
        setCvFileName(file.name);
        
        // Update database
        await updatePersonalInfo(updatedPersonalData);
        console.log('✅ Database updated with new CV URL');
        
        toast.success('✅ CV uploaded successfully!');
        toast.info('Refresh the About page to see updated CV download button');
        
      } catch (error) {
        console.error('❌ CV upload error:', error);
        toast.error(error instanceof Error ? error.message : 'Error uploading CV');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Download current CV
  const handleDownloadCV = () => {
    if (personalData.cvUrl) {
      console.log('📥 Downloading CV:', personalData.cvUrl);
      
      let downloadUrl = personalData.cvUrl;
      
      // Fix URL if it's an image URL
      if (downloadUrl.includes('/image/upload/')) {
        downloadUrl = downloadUrl.replace('/image/upload/', '/raw/upload/');
        console.log('🔄 Converted to raw URL:', downloadUrl);
      }
      
      // Add force download parameter
      if (downloadUrl.includes('cloudinary.com') && !downloadUrl.includes('fl_attachment')) {
        downloadUrl = downloadUrl.replace('/upload/', '/upload/fl_attachment/');
      }
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = cvFileName || `CV_${personalData.name || 'Portfolio'}.pdf`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Also open in new tab
      setTimeout(() => {
        window.open(downloadUrl, '_blank', 'noopener,noreferrer');
      }, 100);
      
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
      toast.success('✅ Personal information updated successfully!');
      
      // Refresh data
      setTimeout(async () => {
        const refreshedData = await getPersonalInfo();
        setPersonalData(refreshedData);
      }, 500);
      
    } catch (error) {
      toast.error('❌ Failed to update personal information');
    } finally {
      setIsLoading(false);
    }
  };

  // Save projects
  const handleSaveProjects = async () => {
    try {
      setIsLoading(true);
      await updateProjects(projectsData);
      toast.success('✅ Projects updated successfully!');
    } catch (error) {
      toast.error('❌ Failed to update projects');
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
      toast.success('✅ Project added successfully!');
    } catch (error) {
      toast.error('❌ Failed to add project');
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
                toast.success('✅ Project deleted successfully!');
                toast.dismiss(t);
              } catch (error) {
                toast.error('❌ Failed to delete project');
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
                    src={imagePreview} 
                    alt="Profile Preview" 
                    className="profile-preview"
                    onError={(e) => {
                      e.currentTarget.src = '/images/default-avatar.png';
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
                {personalData.profileImage && (
                  <p className="current-url">
                    <small>Current: {personalData.profileImage.substring(0, 50)}...</small>
                  </p>
                )}
              </div>
            </div>

            {/* CV Upload */}
            <div className="admin-form-group">
              <label>📄 CV/Resume</label>
              <div className="cv-upload-container">
                <div className="cv-info">
                  <span className="cv-status">
                    {personalData.cvUrl ? '✅ CV Uploaded' : '❌ No CV Uploaded'}
                  </span>
                  {cvFileName && (
                    <span className="cv-filename">📋 {cvFileName}</span>
                  )}
                  {personalData.cvUrl && personalData.cvUrl.includes('/image/upload/') && (
                    <span className="cv-warning" style={{ color: '#e74c3c', fontSize: '0.8em', display: 'block', marginTop: '5px' }}>
                      ⚠️ CV is uploaded as image. Please re-upload for proper PDF format.
                    </span>
                  )}
                </div>
                <div className="cv-actions">
                  <button 
                    type="button"
                    className="admin-btn-secondary"
                    onClick={triggerCVInput}
                    disabled={isLoading}
                  >
                    📤 Upload New CV (PDF)
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
                  accept=".pdf,application/pdf"
                  style={{ display: 'none' }}
                />
                <p className="upload-hint">
                  PDF format only, max 10MB (Will be uploaded as Raw file)
                </p>
                <p className="cloudinary-info">
                  🌩️ PDFs are stored as Raw files on Cloudinary for proper download
                </p>
                {personalData.cvUrl && (
                  <p className="current-url">
                    <small>Current URL: {personalData.cvUrl.substring(0, 60)}...</small>
                  </p>
                )}
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
          </div>

          <button 
            className="admin-btn-primary"
            onClick={handleSavePersonalInfo}
            disabled={isLoading}
          >
            {isLoading ? '⏳ Saving...' : '💾 Save Personal Information'}
          </button>
        </section>

        {/* ... rest of the component remains the same ... */}
      </div>
    </ProtectedRoute>
  );
}

export default AdminDashboard;
// import { neon } from '@neondatabase/serverless';

// // Database connection with error handling
// const getSql = () => {
//   if (!process.env.DATABASE_URL) {
//     throw new Error('DATABASE_URL environment variable is not set');
//   }
//   return neon(process.env.DATABASE_URL);
// };

// // Test connection
// export const testConnection = async () => {
//   try {
//     const sql = getSql();
//     const result = await sql`SELECT version()`;
//     console.log('✅ Database connected successfully');
//     return true;
//   } catch (error) {
//     console.error('❌ Database connection failed:', error);
//     return false;
//   }
// };

// // Portfolio queries with error handling
// export const portfolioQueries = {
//   // Get personal info
//   getPersonalInfo: async () => {
//     try {
//       const sql = getSql();
//       return await sql`
//         SELECT * FROM personal_info 
//         ORDER BY updated_at DESC 
//         LIMIT 1
//       `;
//     } catch (error) {
//       console.error('Error in getPersonalInfo:', error);
//       throw new Error('Failed to fetch personal information');
//     }
//   },

//   // Update personal info
//   updatePersonalInfo: async (data: any) => {
//     try {
//       const sql = getSql();
//       return await sql`
//         INSERT INTO personal_info (name, title, email, phone, location, about, skills, profile_image, cv_url)
//         VALUES (${data.name}, ${data.title}, ${data.email}, ${data.phone}, ${data.location}, ${data.about}, ${data.skills}, ${data.profileImage}, ${data.cvUrl})
//         ON CONFLICT (email) 
//         DO UPDATE SET 
//           name = EXCLUDED.name,
//           title = EXCLUDED.title,
//           phone = EXCLUDED.phone,
//           location = EXCLUDED.location,
//           about = EXCLUDED.about,
//           skills = EXCLUDED.skills,
//           profile_image = EXCLUDED.profile_image,
//           cv_url = EXCLUDED.cv_url,
//           updated_at = CURRENT_TIMESTAMP
//         RETURNING *
//       `;
//     } catch (error) {
//       console.error('Error in updatePersonalInfo:', error);
//       throw new Error('Failed to update personal information');
//     }
//   },

//   // Get all projects
//   getProjects: async () => {
//     try {
//       const sql = getSql();
//       return await sql`
//         SELECT * FROM projects 
//         ORDER BY created_at DESC
//       `;
//     } catch (error) {
//       console.error('Error in getProjects:', error);
//       throw new Error('Failed to fetch projects');
//     }
//   },

//   // Create project
//   createProject: async (data: any) => {
//     try {
//       const sql = getSql();
//       return await sql`
//         INSERT INTO projects (title, description, technologies, github_url, live_url)
//         VALUES (${data.title}, ${data.description}, ${data.technologies}, ${data.githubUrl}, ${data.liveUrl})
//         RETURNING *
//       `;
//     } catch (error) {
//       console.error('Error in createProject:', error);
//       throw new Error('Failed to create project');
//     }
//   },

//   // Update project
//   updateProject: async (id: number, data: any) => {
//     try {
//       const sql = getSql();
//       return await sql`
//         UPDATE projects 
//         SET title = ${data.title}, 
//             description = ${data.description}, 
//             technologies = ${data.technologies}, 
//             github_url = ${data.githubUrl}, 
//             live_url = ${data.liveUrl},
//             updated_at = CURRENT_TIMESTAMP
//         WHERE id = ${id}
//         RETURNING *
//       `;
//     } catch (error) {
//       console.error('Error in updateProject:', error);
//       throw new Error('Failed to update project');
//     }
//   },

//   // Delete project
//   deleteProject: async (id: number) => {
//     try {
//       const sql = getSql();
//       return await sql`
//         DELETE FROM projects 
//         WHERE id = ${id}
//         RETURNING *
//       `;
//     } catch (error) {
//       console.error('Error in deleteProject:', error);
//       throw new Error('Failed to delete project');
//     }
//   }
// };

// // Notifications queries
// export const notificationQueries = {
//   // Get all notifications
//   getNotifications: async () => {
//     try {
//       const sql = getSql();
//       return await sql`
//         SELECT * FROM notifications 
//         ORDER BY created_at DESC
//       `;
//     } catch (error) {
//       console.error('Error in getNotifications:', error);
//       throw new Error('Failed to fetch notifications');
//     }
//   },

//   // Create notification
//   createNotification: async (data: any) => {
//     try {
//       const sql = getSql();
//       return await sql`
//         INSERT INTO notifications (type, title, message, source)
//         VALUES (${data.type}, ${data.title}, ${data.message}, ${data.source})
//         RETURNING *
//       `;
//     } catch (error) {
//       console.error('Error in createNotification:', error);
//       throw new Error('Failed to create notification');
//     }
//   },

//   // Mark notification as read
//   markAsRead: async (id: number) => {
//     try {
//       const sql = getSql();
//       return await sql`
//         UPDATE notifications 
//         SET read = true, read_at = CURRENT_TIMESTAMP
//         WHERE id = ${id}
//         RETURNING *
//       `;
//     } catch (error) {
//       console.error('Error in markAsRead:', error);
//       throw new Error('Failed to mark notification as read');
//     }
//   },

//   // Get unread count
//   getUnreadCount: async () => {
//     try {
//       const sql = getSql();
//       const result = await sql`
//         SELECT COUNT(*) as count FROM notifications 
//         WHERE read = false
//       `;
//       return parseInt(result[0]?.count || '0');
//     } catch (error) {
//       console.error('Error in getUnreadCount:', error);
//       return 0;
//     }
//   }
// };

// // Contact form queries
// export const contactQueries = {
//   // Create contact submission
//   createContact: async (data: any) => {
//     try {
//       const sql = getSql();
//       return await sql`
//         INSERT INTO contact_submissions (name, email, message)
//         VALUES (${data.name}, ${data.email}, ${data.message})
//         RETURNING *
//       `;
//     } catch (error) {
//       console.error('Error in createContact:', error);
//       throw new Error('Failed to create contact submission');
//     }
//   },

//   // Get all contact submissions
//   getContacts: async () => {
//     try {
//       const sql = getSql();
//       return await sql`
//         SELECT * FROM contact_submissions 
//         ORDER BY created_at DESC
//       `;
//     } catch (error) {
//       console.error('Error in getContacts:', error);
//       throw new Error('Failed to fetch contact submissions');
//     }
//   }
// };

// export default getSql;

import { neon } from '@neondatabase/serverless';

// Database connection with error handling
const getSql = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return neon(process.env.DATABASE_URL);
};

// Test connection
export const testConnection = async () => {
  try {
    const sql = getSql();
    const result = await sql`SELECT version()`;
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
};

// Portfolio queries with error handling
export const portfolioQueries = {
  // Get personal info
  getPersonalInfo: async () => {
    try {
      const sql = getSql();
      return await sql`
        SELECT * FROM personal_info 
        ORDER BY updated_at DESC 
        LIMIT 1
      `;
    } catch (error) {
      console.error('Error in getPersonalInfo:', error);
      throw new Error('Failed to fetch personal information');
    }
  },

  // Update personal info
  updatePersonalInfo: async (data: any) => {
    try {
      const sql = getSql();
      return await sql`
        INSERT INTO personal_info (name, title, email, phone, location, about, skills, profile_image, cv_url)
        VALUES (${data.name}, ${data.title}, ${data.email}, ${data.phone}, ${data.location}, ${data.about}, ${data.skills}, ${data.profileImage}, ${data.cvUrl})
        ON CONFLICT (email) 
        DO UPDATE SET 
          name = EXCLUDED.name,
          title = EXCLUDED.title,
          phone = EXCLUDED.phone,
          location = EXCLUDED.location,
          about = EXCLUDED.about,
          skills = EXCLUDED.skills,
          profile_image = EXCLUDED.profile_image,
          cv_url = EXCLUDED.cv_url,
          updated_at = CURRENT_TIMESTAMP
        RETURNING *
      `;
    } catch (error) {
      console.error('Error in updatePersonalInfo:', error);
      throw new Error('Failed to update personal information');
    }
  },

  // Get all projects
  getProjects: async () => {
    try {
      const sql = getSql();
      return await sql`
        SELECT * FROM projects 
        ORDER BY created_at DESC
      `;
    } catch (error) {
      console.error('Error in getProjects:', error);
      throw new Error('Failed to fetch projects');
    }
  },

  // Get project by ID
  getProjectById: async (id: number) => {
    try {
      const sql = getSql();
      return await sql`
        SELECT * FROM projects 
        WHERE id = ${id}
      `;
    } catch (error) {
      console.error('Error in getProjectById:', error);
      throw new Error('Failed to fetch project');
    }
  },

  // Create project
  createProject: async (data: any) => {
    try {
      const sql = getSql();
      return await sql`
        INSERT INTO projects (title, description, technologies, github_url, live_url)
        VALUES (${data.title}, ${data.description}, ${data.technologies}, ${data.githubUrl}, ${data.liveUrl})
        RETURNING *
      `;
    } catch (error) {
      console.error('Error in createProject:', error);
      throw new Error('Failed to create project');
    }
  },

  // Update project
  updateProject: async (id: number, data: any) => {
    try {
      const sql = getSql();
      return await sql`
        UPDATE projects 
        SET title = ${data.title}, 
            description = ${data.description}, 
            technologies = ${data.technologies}, 
            github_url = ${data.githubUrl}, 
            live_url = ${data.liveUrl},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;
    } catch (error) {
      console.error('Error in updateProject:', error);
      throw new Error('Failed to update project');
    }
  },

  // Delete project
  deleteProject: async (id: number) => {
    try {
      const sql = getSql();
      return await sql`
        DELETE FROM projects 
        WHERE id = ${id}
        RETURNING *
      `;
    } catch (error) {
      console.error('Error in deleteProject:', error);
      throw new Error('Failed to delete project');
    }
  }
};

// Notifications queries
export const notificationQueries = {
  // Get all notifications
  getNotifications: async () => {
    try {
      const sql = getSql();
      return await sql`
        SELECT * FROM notifications 
        ORDER BY created_at DESC
      `;
    } catch (error) {
      console.error('Error in getNotifications:', error);
      throw new Error('Failed to fetch notifications');
    }
  },

  // Create notification
  createNotification: async (data: any) => {
    try {
      const sql = getSql();
      return await sql`
        INSERT INTO notifications (type, title, message, source)
        VALUES (${data.type}, ${data.title}, ${data.message}, ${data.source})
        RETURNING *
      `;
    } catch (error) {
      console.error('Error in createNotification:', error);
      throw new Error('Failed to create notification');
    }
  },

  // Mark notification as read
  markAsRead: async (id: number) => {
    try {
      const sql = getSql();
      return await sql`
        UPDATE notifications 
        SET read = true, read_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;
    } catch (error) {
      console.error('Error in markAsRead:', error);
      throw new Error('Failed to mark notification as read');
    }
  },

  // Get unread count
  getUnreadCount: async () => {
    try {
      const sql = getSql();
      const result = await sql`
        SELECT COUNT(*) as count FROM notifications 
        WHERE read = false
      `;
      return parseInt(result[0]?.count || '0');
    } catch (error) {
      console.error('Error in getUnreadCount:', error);
      return 0;
    }
  }
};

// Contact form queries
export const contactQueries = {
  // Create contact submission
  createContact: async (data: any) => {
    try {
      const sql = getSql();
      return await sql`
        INSERT INTO contact_submissions (name, email, message)
        VALUES (${data.name}, ${data.email}, ${data.message})
        RETURNING *
      `;
    } catch (error) {
      console.error('Error in createContact:', error);
      throw new Error('Failed to create contact submission');
    }
  },

  // Get all contact submissions
  getContacts: async () => {
    try {
      const sql = getSql();
      return await sql`
        SELECT * FROM contact_submissions 
        ORDER BY created_at DESC
      `;
    } catch (error) {
      console.error('Error in getContacts:', error);
      throw new Error('Failed to fetch contact submissions');
    }
  }
};

export default getSql;


// // export default getSql;

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
//         VALUES (${data.name}, ${data.title}, ${data.email}, ${data.phone}, ${data.location}, ${data.about}, ${data.skills}, ${data.profile_image}, ${data.cv_url})
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

//   // Get project by ID
//   getProjectById: async (id: number) => {
//     try {
//       const sql = getSql();
//       return await sql`
//         SELECT * FROM projects 
//         WHERE id = ${id}
//       `;
//     } catch (error) {
//       console.error('Error in getProjectById:', error);
//       throw new Error('Failed to fetch project');
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

// Industry-level database connection with multiple fallbacks
const getSql = () => {
  // Multiple fallback strategies for production
  const databaseUrl = 
    process.env.DATABASE_URL || // 1. Primary environment variable
    'postgresql://neondb_owner:npg_F8vXnitsI1Mj@ep-dawn-feather-adukowyb-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'; // 2. Direct fallback

    
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL is not configured');
    console.log('💡 Please set DATABASE_URL in Vercel environment variables');
    throw new Error(
      'Database configuration missing. ' +
      'Please set DATABASE_URL environment variable in Vercel settings.'
    );
  }

  try {
    console.log('🔗 Initializing database connection...');
    const sql = neon(databaseUrl);
    return sql;
  } catch (error) {
    console.error('❌ Failed to initialize database connection:', error);
    throw new Error(
      'Failed to connect to database. ' +
      'Please check your DATABASE_URL configuration in Vercel.'
    );
  }
};

// Enhanced connection test
export const testConnection = async (): Promise<boolean> => {
  try {
    const sql = getSql();
    const result = await sql`SELECT version() as version, NOW() as time`;
    console.log('✅ Database connected successfully:', {
      version: result[0]?.version,
      time: result[0]?.time
    });
    return true;
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    return false;
  }
};

// Industry-level portfolio queries with comprehensive error handling
export const portfolioQueries = {
  // Get personal info with fallback
  getPersonalInfo: async (): Promise<any[]> => {
    try {
      const sql = getSql();
      console.log('📊 Fetching personal information...');
      
      const result = await sql`
        SELECT * FROM personal_info 
        ORDER BY updated_at DESC 
        LIMIT 1
      `;
      
      console.log('✅ Personal info fetched:', {
        count: result.length,
        hasData: result.length > 0
      });
      
      return result;
    } catch (error) {
      console.error('❌ Error in getPersonalInfo:', error);
      // Return empty array instead of throwing - let the frontend handle fallback
      return [];
    }
  },

  // Update personal info with proper field mapping
  updatePersonalInfo: async (data: any) => {
    try {
      const sql = getSql();
      console.log('💾 Updating personal info:', {
        name: data.name,
        email: data.email
      });

      // ✅ FIXED: Correct field mapping
      const result = await sql`
        INSERT INTO personal_info 
          (name, title, email, phone, location, about, skills, profile_image, cv_url)
        VALUES 
          (${data.name}, ${data.title}, ${data.email}, ${data.phone}, 
           ${data.location}, ${data.about}, ${data.skills}, 
           ${data.profileImage}, ${data.cvUrl})
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

      console.log('✅ Personal info updated successfully');
      return result;
    } catch (error) {
      console.error('❌ Error in updatePersonalInfo:', error);
      throw new Error(
        'Failed to update personal information. ' +
        'Please check your data and try again.'
      );
    }
  },

  // Get all projects
  getProjects: async (): Promise<any[]> => {
    try {
      const sql = getSql();
      console.log('📊 Fetching projects...');
      
      const result = await sql`
        SELECT * FROM projects 
        ORDER BY created_at DESC
      `;
      
      console.log('✅ Projects fetched:', { count: result.length });
      return result;
    } catch (error) {
      console.error('❌ Error in getProjects:', error);
      return [];
    }
  },

  // Get project by ID
  getProjectById: async (id: number): Promise<any[]> => {
    try {
      if (!id || isNaN(id)) {
        throw new Error('Invalid project ID');
      }

      const sql = getSql();
      const result = await sql`
        SELECT * FROM projects 
        WHERE id = ${id}
      `;
      
      return result;
    } catch (error) {
      console.error('❌ Error in getProjectById:', error);
      throw new Error('Failed to fetch project');
    }
  },

  // Create project with validation
  createProject: async (data: any) => {
    try {
      if (!data.title?.trim() || !data.description?.trim()) {
        throw new Error('Project title and description are required');
      }

      const sql = getSql();
      
      // ✅ FIXED: Correct field mapping for projects
      const result = await sql`
        INSERT INTO projects 
          (title, description, technologies, github_url, live_url)
        VALUES 
          (${data.title}, ${data.description}, ${data.technologies}, 
           ${data.githubUrl}, ${data.liveUrl})
        RETURNING *
      `;

      console.log('✅ Project created successfully:', {
        id: result[0]?.id,
        title: result[0]?.title
      });

      return result;
    } catch (error) {
      console.error('❌ Error in createProject:', error);
      throw new Error('Failed to create project');
    }
  },

  // Update project
  updateProject: async (id: number, data: any) => {
    try {
      if (!id || isNaN(id)) {
        throw new Error('Invalid project ID');
      }

      const sql = getSql();
      
      // ✅ FIXED: Correct field mapping
      const result = await sql`
        UPDATE projects 
        SET 
          title = ${data.title}, 
          description = ${data.description}, 
          technologies = ${data.technologies}, 
          github_url = ${data.githubUrl}, 
          live_url = ${data.liveUrl},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;

      return result;
    } catch (error) {
      console.error('❌ Error in updateProject:', error);
      throw new Error('Failed to update project');
    }
  },

  // Delete project
  deleteProject: async (id: number) => {
    try {
      if (!id || isNaN(id)) {
        throw new Error('Invalid project ID');
      }

      const sql = getSql();
      const result = await sql`
        DELETE FROM projects 
        WHERE id = ${id}
        RETURNING *
      `;

      console.log('✅ Project deleted successfully');
      return result;
    } catch (error) {
      console.error('❌ Error in deleteProject:', error);
      throw new Error('Failed to delete project');
    }
  }
};

// Enhanced notifications queries
export const notificationQueries = {
  getNotifications: async (): Promise<any[]> => {
    try {
      const sql = getSql();
      return await sql`
        SELECT * FROM notifications 
        ORDER BY created_at DESC
      `;
    } catch (error) {
      console.error('❌ Error in getNotifications:', error);
      return [];
    }
  },

  createNotification: async (data: any) => {
    try {
      const sql = getSql();
      return await sql`
        INSERT INTO notifications (type, title, message, source)
        VALUES (${data.type}, ${data.title}, ${data.message}, ${data.source})
        RETURNING *
      `;
    } catch (error) {
      console.error('❌ Error in createNotification:', error);
      throw new Error('Failed to create notification');
    }
  },

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
      console.error('❌ Error in markAsRead:', error);
      throw new Error('Failed to mark notification as read');
    }
  },

  getUnreadCount: async (): Promise<number> => {
    try {
      const sql = getSql();
      const result = await sql`
        SELECT COUNT(*) as count FROM notifications 
        WHERE read = false
      `;
      return parseInt(result[0]?.count || '0');
    } catch (error) {
      console.error('❌ Error in getUnreadCount:', error);
      return 0;
    }
  }
};

// Enhanced contact queries
export const contactQueries = {
  createContact: async (data: any) => {
    try {
      const sql = getSql();
      return await sql`
        INSERT INTO contact_submissions (name, email, message)
        VALUES (${data.name}, ${data.email}, ${data.message})
        RETURNING *
      `;
    } catch (error) {
      console.error('❌ Error in createContact:', error);
      throw new Error('Failed to create contact submission');
    }
  },

  getContacts: async (): Promise<any[]> => {
    try {
      const sql = getSql();
      return await sql`
        SELECT * FROM contact_submissions 
        ORDER BY created_at DESC
      `;
    } catch (error) {
      console.error('❌ Error in getContacts:', error);
      return [];
    }
  }
};

// Create initial tables if they don't exist (for development)
export const initializeDatabase = async (): Promise<void> => {
  try {
    const sql = getSql();
    
    // Create personal_info table
    await sql`
      CREATE TABLE IF NOT EXISTS personal_info (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        title VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        phone VARCHAR(50),
        location VARCHAR(255),
        about TEXT,
        skills TEXT[],
        profile_image TEXT,
        cv_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Create projects table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        technologies TEXT[],
        github_url TEXT,
        live_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
};

export default getSql;
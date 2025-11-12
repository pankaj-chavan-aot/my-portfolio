// Admin credentials (In production, use environment variables and database)
export const adminCredentials = {
  username: "admin",
  password: "admin123" // Change this in production
};

// Session management
let isAuthenticated = false;

export const login = (username: string, password: string): boolean => {
  if (username === adminCredentials.username && password === adminCredentials.password) {
    isAuthenticated = true;
    // Store in sessionStorage for persistence
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('adminAuthenticated', 'true');
      sessionStorage.setItem('loginTime', Date.now().toString());
    }
    return true;
  }
  return false;
};

export const logout = (): void => {
  isAuthenticated = false;
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('loginTime');
  }
};

export const checkAuth = (): boolean => {
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('adminAuthenticated');
    const loginTime = sessionStorage.getItem('loginTime');
    
    // Check if session is expired (8 hours)
    if (loginTime && Date.now() - parseInt(loginTime) > 8 * 60 * 60 * 1000) {
      logout();
      return false;
    }
    
    return stored === 'true';
  }
  return isAuthenticated;
};

export const changePassword = (currentPassword: string, newPassword: string): boolean => {
  if (currentPassword === adminCredentials.password) {
    adminCredentials.password = newPassword;
    return true;
  }
  return false;
};
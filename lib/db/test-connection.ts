import { testConnection } from './index';

// Test database connection
export async function checkDatabase() {
  try {
    const isConnected = await testConnection();
    if (isConnected) {
      console.log('✅ Database connection successful');
      return true;
    } else {
      console.log('❌ Database connection failed');
      return false;
    }
  } catch (error) {
    console.error('❌ Database connection error:', error);
    return false;
  }
}

// Run this function to test connection
checkDatabase();
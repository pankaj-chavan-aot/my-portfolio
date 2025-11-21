import { uploadToCloudinary } from './cloudinary';

// Check if we're in production
const isProduction = process.env.NODE_ENV === 'production';

export const uploadFile = async (file: File, type: 'image' | 'cv'): Promise<string> => {
  try {
    // Validate file size
    const maxSize = type === 'image' ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB for images, 10MB for CV
    if (file.size > maxSize) {
      throw new Error(`File size too large. Maximum ${maxSize / 1024 / 1024}MB allowed.`);
    }

    // Validate file type
    if (type === 'image') {
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }
    } else if (type === 'cv') {
      if (file.type !== 'application/pdf') {
        throw new Error('Please upload a PDF file');
      }
    }

    // Upload to Cloudinary in production, local storage in development
    if (isProduction) {
      const folder = type === 'image' ? 'images' : 'cv';
      return await uploadToCloudinary(file, folder);
    } else {
      // For development, create a blob URL (temporary solution)
      return URL.createObjectURL(file);
    }
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};

export const generateFileName = (originalName: string, type: 'image' | 'cv'): string => {
  const timestamp = Date.now();
  const extension = type === 'image' 
    ? originalName.split('.').pop() || 'jpg'
    : 'pdf';
  
  const prefix = type === 'image' ? 'profile' : 'cv';
  return `${prefix}-${timestamp}.${extension}`;
};
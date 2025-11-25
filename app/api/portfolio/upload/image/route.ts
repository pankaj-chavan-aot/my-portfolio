// import { NextRequest, NextResponse } from 'next/server';
// import { uploadFile } from '@/lib/db/storage/upload';
// import { portfolioQueries } from '@/lib/db';

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('image') as File;

//     if (!file) {
//       return NextResponse.json(
//         { error: 'No image file provided' },
//         { status: 400 }
//       );
//     }

//     // Upload image
//     const imageUrl = await uploadFile(file, 'image');

//     // Update personal info with new image URL
//     const personalInfo = await portfolioQueries.getPersonalInfo();
//     if (personalInfo.length > 0) {
//       await portfolioQueries.updatePersonalInfo({
//         ...personalInfo[0],
//         profile_image: imageUrl
//       });
//     }

//     return NextResponse.json({ 
//       success: true, 
//       imageUrl,
//       message: 'Image uploaded successfully' 
//     });
//   } catch (error) {
//     console.error('Image upload error:', error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'Failed to upload image' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import { portfolioQueries } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File; // Changed from 'image' to 'file'

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: 'File must be an image' },
        { status: 400 }
      );
    }

    // Upload to Cloudinary via main upload API
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('upload_preset', 'ml_default');

    const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/upload`, {
      method: 'POST',
      body: uploadFormData,
    });

    if (!uploadResponse.ok) {
      const error = await uploadResponse.json();
      throw new Error(error.message || 'Image upload failed');
    }

    const uploadResult = await uploadResponse.json();

    if (!uploadResult.success) {
      throw new Error(uploadResult.message);
    }

    // Update personal info with new image URL
    const personalInfo = await portfolioQueries.getPersonalInfo();
    if (personalInfo.length > 0) {
      await portfolioQueries.updatePersonalInfo({
        ...personalInfo[0],
        profile_image: uploadResult.fileUrl
      });
    } else {
      // Create initial personal info record
      await portfolioQueries.updatePersonalInfo({
        profile_image: uploadResult.fileUrl,
        name: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        about: ''
      });
    }

    return NextResponse.json({ 
      success: true, 
      imageUrl: uploadResult.fileUrl,
      message: 'Profile image uploaded successfully' 
    });

  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to upload image' 
      },
      { status: 500 }
    );
  }
}
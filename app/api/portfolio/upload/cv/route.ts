// import { NextRequest, NextResponse } from 'next/server';
// import { uploadFile } from '@/lib/db/storage/upload';
// import { portfolioQueries } from '@/lib/db';

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('cv') as File;

//     if (!file) {
//       return NextResponse.json(
//         { error: 'No CV file provided' },
//         { status: 400 }
//       );
//     }

//     // Upload CV
//     const cvUrl = await uploadFile(file, 'cv');

//     // Update personal info with new CV URL
//     const personalInfo = await portfolioQueries.getPersonalInfo();
//     if (personalInfo.length > 0) {
//       await portfolioQueries.updatePersonalInfo({
//         ...personalInfo[0],
//         cv_url: cvUrl
//       });
//     }

//     return NextResponse.json({ 
//       success: true, 
//       cvUrl,
//       fileName: file.name,
//       message: 'CV uploaded successfully' 
//     });
//   } catch (error) {
//     console.error('CV upload error:', error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'Failed to upload CV' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import { portfolioQueries } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File; // Changed from 'cv' to 'file'

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No CV file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension || '')) {
      return NextResponse.json(
        { success: false, message: 'Only PDF, DOC, and DOCX files are allowed' },
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
      throw new Error(error.message || 'CV upload failed');
    }

    const uploadResult = await uploadResponse.json();

    if (!uploadResult.success) {
      throw new Error(uploadResult.message);
    }

    // Update personal info with new CV URL
    const personalInfo = await portfolioQueries.getPersonalInfo();
    if (personalInfo.length > 0) {
      await portfolioQueries.updatePersonalInfo({
        ...personalInfo[0],
        cv_url: uploadResult.fileUrl
      });
    } else {
      // Create initial personal info record
      await portfolioQueries.updatePersonalInfo({
        cv_url: uploadResult.fileUrl,
        profile_image: '',
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
      cvUrl: uploadResult.fileUrl,
      fileName: file.name,
      message: 'CV uploaded successfully' 
    });

  } catch (error) {
    console.error('CV upload error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to upload CV' 
      },
      { status: 500 }
    );
  }
}
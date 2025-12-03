

// import { NextRequest, NextResponse } from 'next/server';
// import { portfolioQueries } from '@/lib/db';

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('file') as File; // Changed from 'cv' to 'file'

//     if (!file) {
//       return NextResponse.json(
//         { success: false, message: 'No CV file provided' },
//         { status: 400 }
//       );
//     }

//     // Validate file type
//     const allowedTypes = ['.pdf', '.doc', '.docx'];
//     const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
//     if (!allowedTypes.includes(fileExtension || '')) {
//       return NextResponse.json(
//         { success: false, message: 'Only PDF, DOC, and DOCX files are allowed' },
//         { status: 400 }
//       );
//     }

//     // Upload to Cloudinary via main upload API
//     const uploadFormData = new FormData();
//     uploadFormData.append('file', file);
//     uploadFormData.append('upload_preset', 'ml_default');

//     const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/upload`, {
//       method: 'POST',
//       body: uploadFormData,
//     });

//     if (!uploadResponse.ok) {
//       const error = await uploadResponse.json();
//       throw new Error(error.message || 'CV upload failed');
//     }

//     const uploadResult = await uploadResponse.json();

//     if (!uploadResult.success) {
//       throw new Error(uploadResult.message);
//     }

//     // Update personal info with new CV URL
//     const personalInfo = await portfolioQueries.getPersonalInfo();
//     if (personalInfo.length > 0) {
//       await portfolioQueries.updatePersonalInfo({
//         ...personalInfo[0],
//         cv_url: uploadResult.fileUrl
//       });
//     } else {
//       // Create initial personal info record
//       await portfolioQueries.updatePersonalInfo({
//         cv_url: uploadResult.fileUrl,
//         profile_image: '',
//         name: '',
//         title: '',
//         email: '',
//         phone: '',
//         location: '',
//         about: ''
//       });
//     }

//     return NextResponse.json({ 
//       success: true, 
//       cvUrl: uploadResult.fileUrl,
//       fileName: file.name,
//       message: 'CV uploaded successfully' 
//     });

//   } catch (error) {
//     console.error('CV upload error:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: error instanceof Error ? error.message : 'Failed to upload CV' 
//       },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import { portfolioQueries } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No CV file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, message: 'Only PDF files are allowed for CV' },
        { status: 400 }
      );
    }

    // Upload to Cloudinary with raw resource type
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('upload_preset', 'ml_default');
    
    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload`,
      {
        method: 'POST',
        body: uploadFormData,
      }
    );

    if (!uploadResponse.ok) {
      const error = await uploadResponse.json();
      console.error('Cloudinary CV upload failed:', error);
      throw new Error(error.message || 'CV upload failed');
    }

    const uploadResult = await uploadResponse.json();
    
    // Store the direct URL
    const cvUrl = uploadResult.secure_url;
    
    console.log('📄 CV Uploaded Successfully:', {
      url: cvUrl,
      size: file.size,
      fileName: file.name
    });

    // Update personal info with new CV URL
    try {
      const personalInfo = await portfolioQueries.getPersonalInfo();
      
      let updateData;
      if (personalInfo && personalInfo.length > 0) {
        // Update existing info
        updateData = {
          ...personalInfo[0],
          cv_url: cvUrl
        };
      } else {
        // Create new entry with CV
        updateData = {
          cv_url: cvUrl,
          profile_image: '',
          name: '',
          title: '',
          email: '',
          phone: '',
          location: '',
          about: '',
          skills: []
        };
      }

      await portfolioQueries.updatePersonalInfo(updateData);
      
      console.log('✅ CV URL saved to database');
      
    } catch (dbError) {
      console.error('Database update error:', dbError);
      // Continue even if DB update fails, we still have the URL
    }

    return NextResponse.json({ 
      success: true, 
      cvUrl: cvUrl,
      fileName: file.name,
      message: 'CV uploaded successfully',
      downloadNote: 'CV is now ready for download'
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
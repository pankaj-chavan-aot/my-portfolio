// import { NextRequest, NextResponse } from 'next/server';
// import { portfolioQueries } from '@/lib/db';

// export async function GET() {
//   try {
//     const [personalInfo, projects] = await Promise.all([
//       portfolioQueries.getPersonalInfo(),
//       portfolioQueries.getProjects()
//     ]);

//     return NextResponse.json({
//       personalInfo: personalInfo[0] || null,
//       projects: projects || []
//     });
//   } catch (error) {
//     console.error('Error fetching portfolio:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch portfolio data' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { type, data } = body;

//     let result;

//     switch (type) {
//       case 'personal_info':
//         result = await portfolioQueries.updatePersonalInfo(data);
//         break;
//       case 'project':
//         result = await portfolioQueries.createProject(data);
//         break;
//       default:
//         return NextResponse.json(
//           { error: 'Invalid type' },
//           { status: 400 }
//         );
//     }

//     return NextResponse.json(result[0]);
//   } catch (error) {
//     console.error('Error updating portfolio:', error);
//     return NextResponse.json(
//       { error: 'Failed to update portfolio' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const uploadPreset = formData.get('upload_preset') as string || 'ml_default';

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    // Debug environment variables
    console.log('Cloudinary Config Check:', {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not Set',
      uploadPreset
    });

    // Validate Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      console.error('Cloudinary environment variables missing');
      return NextResponse.json(
        { success: false, message: 'Cloudinary configuration missing' },
        { status: 500 }
      );
    }

    // Convert file to FormData for Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', uploadPreset);
    cloudinaryFormData.append('api_key', process.env.CLOUDINARY_API_KEY);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`;

    console.log('Uploading to Cloudinary:', cloudinaryUrl);

    const uploadResponse = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: cloudinaryFormData,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('Cloudinary upload failed:', {
        status: uploadResponse.status,
        statusText: uploadResponse.statusText,
        error: errorText
      });
      
      return NextResponse.json(
        { 
          success: false, 
          message: `Cloudinary upload failed: ${uploadResponse.status}` 
        },
        { status: uploadResponse.status }
      );
    }

    const cloudinaryData = await uploadResponse.json();
    
    console.log('Cloudinary upload successful:', {
      url: cloudinaryData.secure_url,
      publicId: cloudinaryData.public_id
    });

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      fileUrl: cloudinaryData.secure_url,
      fileName: file.name,
      publicId: cloudinaryData.public_id
    });

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
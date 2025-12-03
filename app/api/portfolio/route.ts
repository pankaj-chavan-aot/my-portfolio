

// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('file') as File;
//     const uploadPreset = formData.get('upload_preset') as string || 'ml_default';

//     if (!file) {
//       return NextResponse.json(
//         { success: false, message: 'No file provided' },
//         { status: 400 }
//       );
//     }

//     // Debug environment variables
//     console.log('Cloudinary Config Check:', {
//       cloudName: process.env.CLOUDINARY_CLOUD_NAME,
//       apiKey: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not Set',
//       uploadPreset
//     });

//     // Validate Cloudinary configuration
//     if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
//       console.error('Cloudinary environment variables missing');
//       return NextResponse.json(
//         { success: false, message: 'Cloudinary configuration missing' },
//         { status: 500 }
//       );
//     }

//     // Convert file to FormData for Cloudinary
//     const cloudinaryFormData = new FormData();
//     cloudinaryFormData.append('file', file);
//     cloudinaryFormData.append('upload_preset', uploadPreset);
//     cloudinaryFormData.append('api_key', process.env.CLOUDINARY_API_KEY);

//     const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`;

//     console.log('Uploading to Cloudinary:', cloudinaryUrl);

//     const uploadResponse = await fetch(cloudinaryUrl, {
//       method: 'POST',
//       body: cloudinaryFormData,
//     });

//     if (!uploadResponse.ok) {
//       const errorText = await uploadResponse.text();
//       console.error('Cloudinary upload failed:', {
//         status: uploadResponse.status,
//         statusText: uploadResponse.statusText,
//         error: errorText
//       });
      
//       return NextResponse.json(
//         { 
//           success: false, 
//           message: `Cloudinary upload failed: ${uploadResponse.status}` 
//         },
//         { status: uploadResponse.status }
//       );
//     }

//     const cloudinaryData = await uploadResponse.json();
    
//     console.log('Cloudinary upload successful:', {
//       url: cloudinaryData.secure_url,
//       publicId: cloudinaryData.public_id
//     });

//     return NextResponse.json({
//       success: true,
//       message: 'File uploaded successfully',
//       fileUrl: cloudinaryData.secure_url,
//       fileName: file.name,
//       publicId: cloudinaryData.public_id
//     });

//   } catch (error) {
//     console.error('Upload API error:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: error instanceof Error ? error.message : 'Internal server error' 
//       },
//       { status: 500 }
//     );
//   }
// }



// /api/upload/route.ts मध्ये
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string || 'image'; // 'image' or 'pdf'
    const uploadPreset = formData.get('upload_preset') as string || 'ml_default';

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    // Determine resource type based on file type
    let resourceType = 'auto';
    let cloudinaryUrl = '';
    
    if (file.type === 'application/pdf' || type === 'pdf') {
      resourceType = 'raw';
      // For raw files (PDF), we need to add 'fl_attachment' for download
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', file);
      cloudinaryFormData.append('upload_preset', uploadPreset);
      
      cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload`;
      
      const uploadResponse = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: cloudinaryFormData,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error('Cloudinary upload failed:', errorText);
        return NextResponse.json(
          { success: false, message: 'Cloudinary upload failed' },
          { status: uploadResponse.status }
        );
      }

      const cloudinaryData = await uploadResponse.json();
      
      // Create download URL with attachment flag
      const downloadUrl = cloudinaryData.secure_url;
      console.log('✅ PDF uploaded successfully:', downloadUrl);
      
      return NextResponse.json({
        success: true,
        message: 'PDF uploaded successfully',
        fileUrl: downloadUrl,
        fileName: file.name,
        publicId: cloudinaryData.public_id,
        resourceType: 'pdf'
      });
    } else {
      // Image upload
      resourceType = 'image';
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', file);
      cloudinaryFormData.append('upload_preset', uploadPreset);
      
      cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;
      
      const uploadResponse = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: cloudinaryFormData,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error('Cloudinary upload failed:', errorText);
        return NextResponse.json(
          { success: false, message: 'Cloudinary upload failed' },
          { status: uploadResponse.status }
        );
      }

      const cloudinaryData = await uploadResponse.json();
      
      console.log('✅ Image uploaded successfully:', cloudinaryData.secure_url);
      
      return NextResponse.json({
        success: true,
        message: 'File uploaded successfully',
        fileUrl: cloudinaryData.secure_url,
        fileName: file.name,
        publicId: cloudinaryData.public_id,
        resourceType: 'image'
      });
    }

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
import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/db/storage/upload';
import { portfolioQueries } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Upload image
    const imageUrl = await uploadFile(file, 'image');

    // Update personal info with new image URL
    const personalInfo = await portfolioQueries.getPersonalInfo();
    if (personalInfo.length > 0) {
      await portfolioQueries.updatePersonalInfo({
        ...personalInfo[0],
        profile_image: imageUrl
      });
    }

    return NextResponse.json({ 
      success: true, 
      imageUrl,
      message: 'Image uploaded successfully' 
    });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload image' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/db/storage/upload';
import { portfolioQueries } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('cv') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No CV file provided' },
        { status: 400 }
      );
    }

    // Upload CV
    const cvUrl = await uploadFile(file, 'cv');

    // Update personal info with new CV URL
    const personalInfo = await portfolioQueries.getPersonalInfo();
    if (personalInfo.length > 0) {
      await portfolioQueries.updatePersonalInfo({
        ...personalInfo[0],
        cv_url: cvUrl
      });
    }

    return NextResponse.json({ 
      success: true, 
      cvUrl,
      fileName: file.name,
      message: 'CV uploaded successfully' 
    });
  } catch (error) {
    console.error('CV upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload CV' },
      { status: 500 }
    );
  }
}
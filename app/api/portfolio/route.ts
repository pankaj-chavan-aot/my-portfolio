import { NextRequest, NextResponse } from 'next/server';
import { portfolioQueries } from '@/lib/db';

export async function GET() {
  try {
    const [personalInfo, projects] = await Promise.all([
      portfolioQueries.getPersonalInfo(),
      portfolioQueries.getProjects()
    ]);

    return NextResponse.json({
      personalInfo: personalInfo[0] || null,
      projects: projects || []
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    let result;

    switch (type) {
      case 'personal_info':
        result = await portfolioQueries.updatePersonalInfo(data);
        break;
      case 'project':
        result = await portfolioQueries.createProject(data);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid type' },
          { status: 400 }
        );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio' },
      { status: 500 }
    );
  }
}
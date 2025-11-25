// import { NextRequest, NextResponse } from 'next/server';

// interface RouteParams {
//   params: {
//     id: string;
//   }
// }

// export async function GET(request: NextRequest, { params }: RouteParams) {
//   try {
//     const id = parseInt(params.id);
    
//     if (isNaN(id)) {
//       return NextResponse.json(
//         { error: 'Invalid contact ID' },
//         { status: 400 }
//       );
//     }

//     // For now, return not implemented
//     // In a real app, you'd fetch the specific contact by ID
//     return NextResponse.json(
//       { error: 'Not implemented' },
//       { status: 501 }
//     );
//   } catch (error) {
//     console.error('Error fetching contact:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch contact' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ✅ Await the params
    const numericId = parseInt(id);
    
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Invalid contact ID' },
        { status: 400 }
      );
    }

    // For now, return not implemented
    // In a real app, you'd fetch the specific contact by ID
    return NextResponse.json(
      { error: 'Not implemented' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact' },
      { status: 500 }
    );
  }
}

// Add other methods if needed with the same pattern
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = parseInt(id);
    
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Invalid contact ID' },
        { status: 400 }
      );
    }

    // Your update logic here
    return NextResponse.json({ message: 'Contact updated' });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}
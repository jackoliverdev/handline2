import { NextRequest, NextResponse } from 'next/server';
import { sendDistributionEmail, type DistributionFormData } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const data: DistributionFormData = await request.json();
    
    // Validate required fields
    if (!data.name || !data.company || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sendDistributionEmail(data);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Distribution form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
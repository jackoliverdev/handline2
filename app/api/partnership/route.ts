import { NextRequest, NextResponse } from 'next/server';
import { sendPartnershipEmail, type PartnershipFormData } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const data: PartnershipFormData = await request.json();
    
    // Validate required fields
    if (!data.name || !data.company || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sendPartnershipEmail(data);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Partnership form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import { sendProductInquiryEmail, type ProductInquiryData } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const data: ProductInquiryData = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.message || !data.productName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sendProductInquiryEmail(data);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Product inquiry form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
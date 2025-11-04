import { NextRequest, NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

interface InterestPayload {
  name: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: InterestPayload = await request.json();
    if (!data.name || !data.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: result, error } = await resend.emails.send({
      from: 'Hand Line Website <noreply@resend.dev>',
      to: ['jackoliverdev@gmail.com'],
      subject: `Careers Interest Subscription: ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
          <div style="background: #F28C38; color: white; padding: 16px; text-align: center;">
            <h2>Careers - Keep Me Informed</h2>
          </div>
          <div style="padding: 16px; background: #f9f9f9;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p>This person consented to receive future job updates for up to 12 months.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      throw error;
    }
    return NextResponse.json({ success: true, data: result });
  } catch (e) {
    console.error('Careers interest error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}



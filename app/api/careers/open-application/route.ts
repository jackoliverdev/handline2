import { NextRequest, NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

interface OpenApplicationPayload {
  name: string;
  email: string;
  idea: string;
  cvUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: OpenApplicationPayload = await request.json();
    if (!data.name || !data.email || !data.idea) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: result, error } = await resend.emails.send({
      from: 'Hand Line Website <noreply@mail.handlineco.com>',
      to: ['enquiries@handlineco.com', 'jackoliverdev@gmail.com'],
      subject: `Open Application from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
          <div style="background: #F28C38; color: white; padding: 16px; text-align: center;">
            <h2>Open Application</h2>
          </div>
          <div style="padding: 16px; background: #f9f9f9;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.cvUrl ? `<p><strong>CV/Portfolio:</strong> <a href="${data.cvUrl}">${data.cvUrl}</a></p>` : ''}
            <h3>Candidate Idea / Proposal</h3>
            <div style="background: white; padding: 12px; border-left: 4px solid #F28C38;">${data.idea.replace(/\n/g, '<br/>')}</div>
          </div>
        </div>
      `,
    });

    if (error) {
      throw error;
    }
    return NextResponse.json({ success: true, data: result });
  } catch (e) {
    console.error('Open application error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}



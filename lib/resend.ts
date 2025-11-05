import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  subject: string;
  message: string;
}

export interface PartnershipFormData {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
}

export interface DistributionFormData {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ProductInquiryData {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
  productName: string;
}

type EmailAttachment = { filename: string; content: string; contentType?: string };

export async function sendContactEmail(data: ContactFormData, attachments?: EmailAttachment[]) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: 'Hand Line Website <noreply@resend.dev>',
      to: ['enquiries@handlineco.com', 'jackoliverdev@gmail.com'],
      subject: `Contact Form: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #F28C38; color: white; padding: 20px; text-align: center;">
            <h1>New Contact Form Submission</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <h2>Contact Details</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            
            <h2>Message</h2>
            <div style="background: white; padding: 15px; border-left: 4px solid #F28C38;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="padding: 20px; text-align: center; color: #666;">
            <p>This email was sent from the Hand Line Company website contact form.</p>
            <p><strong>Destination:</strong> enquiries@handlineco.com</p>
          </div>
        </div>
      `,
      attachments: attachments && attachments.length > 0 ? attachments.map(a => ({ filename: a.filename, content: a.content, contentType: a.contentType })) : undefined,
    });

    if (error) {
      throw error;
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return { success: false, error };
  }
}

export async function sendPartnershipEmail(data: PartnershipFormData) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: 'Hand Line Website <noreply@resend.dev>',
      to: ['jackoliverdev@gmail.com'],
      subject: 'New Partnership Inquiry',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #F28C38; color: white; padding: 20px; text-align: center;">
            <h1>New Partnership Inquiry</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <h2>Partner Details</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Company:</strong> ${data.company}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            
            <h2>Partnership Details</h2>
            <div style="background: white; padding: 15px; border-left: 4px solid #F28C38;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="padding: 20px; text-align: center; color: #666;">
            <p>This email was sent from the Hand Line Company partnership form.</p>
            <p><strong>Original destination:</strong> partnerships@handlineco.com + info@handlineco.com</p>
          </div>
        </div>
      `,
    });

    if (error) {
      throw error;
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to send partnership email:', error);
    return { success: false, error };
  }
}

export async function sendDistributionEmail(data: DistributionFormData) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: 'Hand Line Website <noreply@resend.dev>',
      to: ['jackoliverdev@gmail.com'],
      subject: 'New Distribution Inquiry',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #F28C38; color: white; padding: 20px; text-align: center;">
            <h1>New Distribution Inquiry</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <h2>Distributor Details</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Company:</strong> ${data.company}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            
            <h2>Distribution Details</h2>
            <div style="background: white; padding: 15px; border-left: 4px solid #F28C38;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="padding: 20px; text-align: center; color: #666;">
            <p>This email was sent from the Hand Line Company distribution form.</p>
            <p><strong>Original destination:</strong> distribution@handlineco.com + info@handlineco.com</p>
          </div>
        </div>
      `,
    });

    if (error) {
      throw error;
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to send distribution email:', error);
    return { success: false, error };
  }
}

export async function sendProductInquiryEmail(data: ProductInquiryData) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: 'Hand Line Website <noreply@resend.dev>',
      to: ['jackoliverdev@gmail.com'],
      subject: `Product Inquiry: ${data.productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #F28C38; color: white; padding: 20px; text-align: center;">
            <h1>New Product Inquiry</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <h2>Product of Interest</h2>
            <p style="background: white; padding: 15px; border-left: 4px solid #F28C38; font-size: 18px; font-weight: bold;">
              ${data.productName}
            </p>
            
            <h2>Customer Details</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            
            <h2>Inquiry Details</h2>
            <div style="background: white; padding: 15px; border-left: 4px solid #F28C38;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="padding: 20px; text-align: center; color: #666;">
            <p>This email was sent from the Hand Line Company product inquiry form.</p>
            <p><strong>Original destination:</strong> info@handlineco.com</p>
          </div>
        </div>
      `,
    });

    if (error) {
      throw error;
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to send product inquiry email:', error);
    return { success: false, error };
  }
} 
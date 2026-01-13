
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // 1. Method Validation
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Method not allowed' 
    }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const body = await req.json();
    const { name, email, company, phone, message, honeypot } = body;

    // 2. Bot Protection (Honeypot)
    if (honeypot) {
      console.log('Bot detected via honeypot');
      return new Response(JSON.stringify({ success: true, message: 'Processed' }), { status: 200 });
    }

    // 3. Payload Validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Missing required fields: Name, Email, and Message are required.' 
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // 4. Email Delivery
    // IMPORTANT: If domain is not verified, this will fail if 'from' is not 'onboarding@resend.dev'
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
    
    const { data, error } = await resend.emails.send({
      from: `LINCO Web <${fromEmail}>`,
      to: ['ahmed.muhammedin@linco.network', 'info@linco.network'],
      replyTo: email,
      subject: `New Lead: ${name} from ${company || 'General Inquiry'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #10b981;">New Inquiry from LINCO Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        message: error.message 
      }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Email sent successfully',
      id: data?.id 
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (err: any) {
    console.error('Serverless Function Error:', err);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Internal server error. Please check Vercel logs.' 
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

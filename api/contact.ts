import { Resend } from 'resend';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // 1. Initial validation
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Only POST allowed' }), { status: 405 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('MISSING_API_KEY: Check Vercel environment variables.');
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Server configuration error: Missing API Key' 
    }), { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const body = await req.json();
    const { name, email, company, phone, message, honeypot } = body;

    // 2. Bot Protection
    if (honeypot) {
      return new Response(JSON.stringify({ success: true, message: 'Bot filtered' }), { status: 200 });
    }

    // 3. Payload Validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, message: 'Required fields missing' }), { status: 400 });
    }

    // 4. Send Email
    // If domain isn't verified in Resend, 'from' MUST be 'onboarding@resend.dev'
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
    
    const { data, error } = await resend.emails.send({
      from: `LINCO Web <${fromEmail}>`,
      to: ['ahmed.muhammedin@linco.network', 'info@linco.network'],
      replyTo: email,
      subject: `[LEAD] ${name} - ${company || 'General Inquiry'}`,
      html: `
        <div style="font-family: sans-serif; background: #f9f9f9; padding: 40px;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 20px; border: 1px solid #eee;">
            <h2 style="color: #10b981; margin-top: 0;">New Project Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <div style="margin: 20px 0; padding: 20px; background: #f3f4f6; border-radius: 12px; white-space: pre-wrap;">
              ${message}
            </div>
            <p style="font-size: 12px; color: #999;">Sent via LINCO Website infrastructure.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('RESEND_API_ERROR:', error);
      // Return the actual error message from Resend for easier debugging
      return new Response(JSON.stringify({ 
        success: false, 
        message: `Provider Error: ${error.message}` 
      }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, id: data?.id }), { status: 200 });

  } catch (err: any) {
    console.error('SERVERLESS_FUNCTION_CRASH:', err);
    return new Response(JSON.stringify({ 
      success: false, 
      message: `System Error: ${err.message || 'Unexpected failure'}` 
    }), { status: 500 });
  }
}
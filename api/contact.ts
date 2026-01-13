import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const body = await req.json();
    const { name, email, phone, company, message, honeypot } = body;

    // Honeypot check for bots
    if (honeypot) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Required fields missing' }), { status: 400 });
    }

    // Send email via Resend
    const result = await resend.emails.send({
      from: 'LINCO Lead <onboarding@resend.dev>', // Update to verified domain for prod
      to: ['ahmed.muhammedin@linco.network', 'info@linco.network'],
      replyTo: email,
      subject: `[INQUIRY] ${name} | ${company || 'General'}`,
      html: `
        <div style="font-family: sans-serif; background: #f9f9f9; padding: 40px; color: #111;">
          <div style="max-width: 600px; margin: auto; background: white; border: 1px solid #eee; border-radius: 8px; padding: 30px;">
            <h2 style="color: #10b981; margin-top: 0;">New Project Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'Not Specified'}</p>
            <p><strong>Phone:</strong> ${phone || 'Not Specified'}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;" />
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
import { Resend } from 'resend';

export const config = {
  runtime: 'edge',
};

const jsonResponse = (data: any, status: number = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') return jsonResponse({ ok: true }, 200);
  if (req.method !== 'POST') return jsonResponse({ ok: false, message: `Method ${req.method} not allowed.` }, 405);

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  // 1. Diagnose Missing Configuration
  if (!apiKey) {
    console.error('[CONFIG ERROR] RESEND_API_KEY is missing.');
    return jsonResponse({ 
      ok: false, 
      message: 'Server Configuration Error: RESEND_API_KEY is missing in Vercel environment variables.' 
    }, 500);
  }

  if (!fromEmail) {
    console.error('[CONFIG ERROR] CONTACT_FROM_EMAIL is missing.');
    return jsonResponse({ 
      ok: false, 
      message: 'Server Configuration Error: CONTACT_FROM_EMAIL is missing. Verify sender domain in Resend.' 
    }, 500);
  }

  const resend = new Resend(apiKey);

  try {
    const body = await req.json();
    const { name, email, company, phone, message, honeypot } = body;

    if (honeypot) return jsonResponse({ ok: true, message: 'Spam filtered.' });
    if (!name || !email || !message) return jsonResponse({ ok: false, message: 'Required fields missing.' }, 400);

    const { data, error } = await resend.emails.send({
      from: `LINCO Infrastructure <${fromEmail}>`,
      to: ['ahmed.muhammedin@linco.network', 'info@linco.network'],
      replyTo: email,
      subject: `New Infrastructure Inquiry: ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #10b981;">New Lead Captured</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error('[PROVIDER ERROR]', error);
      return jsonResponse({ ok: false, message: `Email Provider Error: ${error.message}` }, 500);
    }

    return jsonResponse({ ok: true, id: data?.id });

  } catch (err: any) {
    return jsonResponse({ ok: false, message: err.message || 'An unexpected error occurred.' }, 500);
  }
}
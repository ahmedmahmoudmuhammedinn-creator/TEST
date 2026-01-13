import { Resend } from 'resend';

export const config = {
  runtime: 'edge',
};

/**
 * Standardized JSON response helper.
 * Ensures we never return plain text/HTML, preventing client-side JSON parse crashes.
 */
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
  // Handle CORS Preflight
  if (req.method === 'OPTIONS') return jsonResponse({ ok: true }, 200);

  if (req.method !== 'POST') {
    return jsonResponse({ ok: false, message: `Method ${req.method} not allowed.` }, 405);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  // If API Key is missing, this is a Vercel configuration issue
  if (!apiKey) {
    console.error('[CONFIG ERROR] RESEND_API_KEY is missing from Vercel Environment Variables.');
    return jsonResponse({ 
      ok: false, 
      message: 'Server Configuration Error: API key missing. Please check Vercel environment variables.' 
    }, 500);
  }

  const resend = new Resend(apiKey);

  try {
    const body = await req.json();
    const { name, email, company, phone, message, honeypot } = body;

    // Honeypot anti-spam check
    if (honeypot) {
      console.warn('[SPAM PREVENTION] Honeypot triggered.');
      return jsonResponse({ ok: true, message: 'Transmission accepted (spam filter).' });
    }

    if (!name || !email || !message) {
      return jsonResponse({ ok: false, message: 'Required fields (name, email, message) are missing.' }, 400);
    }

    // Send to both requested addresses
    const { data, error } = await resend.emails.send({
      from: `LINCO Web Leads <${fromEmail}>`,
      to: ['ahmed.muhammedin@linco.network', 'info@linco.network'],
      replyTo: email,
      subject: `New Lead: ${name} [${company || 'Individual'}]`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1a202c; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #10b981; margin-bottom: 20px;">New Inquiry Captured</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Organization:</strong> ${company || 'Not Specified'}</p>
          <p><strong>Phone:</strong> ${phone || 'Not Provided'}</p>
          <hr style="margin: 20px 0; border: 0; border-top: 1px solid #e2e8f0;" />
          <p style="white-space: pre-wrap;"><strong>Message:</strong><br/>${message}</p>
          <p style="font-size: 12px; color: #718096; margin-top: 30px;">
            Sent from LINCO Network automated lead routing system.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('[RESEND PROVIDER ERROR]', error);
      return jsonResponse({ 
        ok: false, 
        message: `Email Provider Error: ${error.message}. Is ${fromEmail} verified in Resend?` 
      }, 500);
    }

    return jsonResponse({ ok: true, transmissionId: data?.id });

  } catch (err: any) {
    console.error('[CRITICAL SERVER ERROR]', err);
    return jsonResponse({ 
      ok: false, 
      message: `Internal Server Error: ${err.message || 'An unexpected error occurred.'}` 
    }, 500);
  }
}

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
  if (req.method !== 'POST') return jsonResponse({ ok: false, message: 'Method not allowed' }, 405);

  // 1. Clean and validate environment variables
  const rawApiKey = process.env.RESEND_API_KEY || '';
  const rawFromEmail = process.env.CONTACT_FROM_EMAIL || '';
  
  const apiKey = rawApiKey.trim();
  const fromEmail = rawFromEmail.trim();

  // DEBUG LOG: This will show hidden characters like " \"email@domain.com\" " or " email@domain.com "
  console.log('Diagnostic - API Key length:', apiKey.length);
  console.log('Diagnostic - From Email raw:', JSON.stringify(fromEmail));

  if (!apiKey || !fromEmail) {
    return jsonResponse({ 
      ok: false, 
      message: 'Server Configuration Error: Missing or empty environment variables.' 
    }, 500);
  }

  const resend = new Resend(apiKey);

  try {
    const { name, email, company, phone, message, honeypot } = await req.json();

    if (honeypot) return jsonResponse({ ok: true, message: 'Spam filtered' });

    // 2. Use a guaranteed safe format for the 'from' field
    // If the display name "LINCO Web Lead" causes issues, we use the raw email directly.
    const senderString = `LINCO Web <${fromEmail}>`;

    const { data, error } = await resend.emails.send({
      from: senderString,
      to: ['ahmed.muhammedin@linco.network', 'info@linco.network'],
      replyTo: email,
      subject: `New Inquiry: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1a202c;">
          <h2 style="color: #10b981; border-bottom: 1px solid #eee; padding-bottom: 10px;">Infrastructure Lead</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f7fafc; border-radius: 8px;">
            <strong>Message:</strong><br/>
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('[Resend Error Details]:', error);
      return jsonResponse({ 
        ok: false, 
        message: `Invalid Sender: ${error.message}. Check if ${fromEmail} is verified in Resend.`,
        code: (error as any).name 
      }, 500);
    }

    return jsonResponse({ ok: true, id: data?.id });

  } catch (err: any) {
    console.error('[Server Crash]:', err);
    return jsonResponse({ ok: false, message: 'Internal Server Error' }, 500);
  }
}

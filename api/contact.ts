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

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return jsonResponse({ 
      ok: false, 
      message: 'Server Configuration Error: Missing RESEND_API_KEY or CONTACT_FROM_EMAIL.' 
    }, 500);
  }

  const resend = new Resend(apiKey);

  try {
    const { name, email, company, phone, message, honeypot } = await req.json();

    if (honeypot) return jsonResponse({ ok: true, message: 'Spam filtered' });

    // Detailed request to Resend
    const { data, error } = await resend.emails.send({
      from: `LINCO Web Lead <${fromEmail}>`,
      to: ['ahmed.muhammedin@linco.network', 'info@linco.network'],
      replyTo: email,
      subject: `New Inquiry: ${name} [${company || 'Direct'}]`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1a202c;">
          <h2 style="color: #10b981; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Infrastructure Lead</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f7fafc; border-radius: 8px;">
            <strong>Requirement:</strong><br/>
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
    });

    if (error) {
      // EXPOSE REAL ERROR: This will tell us if it's "Domain not verified" or "Sender not allowed"
      console.error('[Resend Error Details]:', error);
      return jsonResponse({ 
        ok: false, 
        message: `Email Provider Error: ${error.message}`,
        code: (error as any).name 
      }, 500);
    }

    return jsonResponse({ ok: true, id: data?.id });

  } catch (err: any) {
    console.error('[Server Crash]:', err);
    return jsonResponse({ ok: false, message: 'Internal Server Error' }, 500);
  }
}

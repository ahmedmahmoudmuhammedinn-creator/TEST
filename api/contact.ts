import { Resend } from 'resend';

export const config = {
  runtime: 'edge',
};

/**
 * Standardized JSON response helper to ensure Content-Type is always set correctly.
 * This prevents the frontend from crashing when it expects JSON but receives HTML.
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
  // 0. Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return jsonResponse({ success: true }, 200);
  }

  // 1. Method Check
  if (req.method !== 'POST') {
    return jsonResponse({ 
      success: false, 
      message: `Method ${req.method} Not Allowed. Use POST.` 
    }, 405);
  }

  // 2. Auth Check - Ensure environment variables are loaded
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[CONFIG ERROR] RESEND_API_KEY is not defined in environment variables.');
    return jsonResponse({ 
      success: false, 
      message: 'Server Configuration Error: Email service is currently unavailable.' 
    }, 500);
  }

  const resend = new Resend(apiKey);

  try {
    // 3. Safe Request Parsing
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return jsonResponse({ 
        success: false, 
        message: 'Invalid request body. Expected JSON.' 
      }, 400);
    }

    const { name, email, company, phone, message, honeypot } = body;

    // 4. Bot/Spam Filter (Honeypot)
    if (honeypot) {
      console.log('[SPAM DETECTED] Honeypot field was filled.');
      return jsonResponse({ success: true, message: 'Transmission accepted.' });
    }

    // 5. Data Validation
    if (!name || !email || !message) {
      return jsonResponse({ 
        success: false, 
        message: 'Missing required parameters: name, email, and message are mandatory.' 
      }, 400);
    }

    // 6. Resend Configuration
    // Use verified domain or onboarding address
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
    
    console.log(`[ATTEMPT] Sending email from ${fromEmail} for ${email}`);

    const { data, error } = await resend.emails.send({
      from: `LINCO Web <${fromEmail}>`,
      to: ['ahmed.muhammedin@linco.network', 'info@linco.network'],
      replyTo: email,
      subject: `[LEAD] ${name} - ${company || 'Individual Inquiry'}`,
      html: `
        <div style="font-family: sans-serif; background-color: #f4f4f5; padding: 40px; color: #18181b;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e4e4e7; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #10b981; padding: 24px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em;">NEW LEAD CAPTURED</h2>
            </div>
            <div style="padding: 32px;">
              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Client Identity</p>
                <p style="margin: 0; font-size: 18px; font-weight: 600;">${name}</p>
              </div>
              <div style="display: grid; grid-template-cols: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
                <div style="margin-bottom: 16px;">
                  <p style="margin: 0 0 4px; font-size: 12px; font-weight: 700; color: #71717a; text-transform: uppercase;">Email</p>
                  <p style="margin: 0; font-size: 14px;">${email}</p>
                </div>
                <div style="margin-bottom: 16px;">
                  <p style="margin: 0 0 4px; font-size: 12px; font-weight: 700; color: #71717a; text-transform: uppercase;">Organization</p>
                  <p style="margin: 0; font-size: 14px;">${company || 'N/A'}</p>
                </div>
              </div>
              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 4px; font-size: 12px; font-weight: 700; color: #71717a; text-transform: uppercase;">Phone Reference</p>
                <p style="margin: 0; font-size: 14px;">${phone || 'Not provided'}</p>
              </div>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                <p style="margin: 0 0 12px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Message Body</p>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            <div style="background-color: #fafafa; padding: 16px; border-top: 1px solid #eeeeee; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #a1a1aa; font-weight: 500;">Sent via LINCO Automated Lead System</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('[RESEND ERROR]', error);
      return jsonResponse({ 
        success: false, 
        message: `Email Provider Error: ${error.message}` 
      }, 500);
    }

    return jsonResponse({ success: true, transmissionId: data?.id });

  } catch (err: any) {
    console.error('[SERVER CRASH]', err);
    return jsonResponse({ 
      success: false, 
      message: `System Fault: ${err.message || 'An unexpected condition prevented the request.'}` 
    }, 500);
  }
}
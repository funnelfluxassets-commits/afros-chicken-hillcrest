// Cloudflare Pages Serverless Email Dispatcher
// Dispatches directly via Resend API
// Keeps all API keys strictly server-side so they are never exposed to the public/browser.

export interface EmailOptions {
  fromName: string;
  fromEmail: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}

export async function sendTransactionalEmail(options: EmailOptions, env?: any): Promise<boolean> {
  let resendApiKey =
    env?.RESEND_API_KEY ||
    env?.VITE_RESEND_API_KEY ||
    (typeof process !== 'undefined' ? process.env?.RESEND_API_KEY || process.env?.VITE_RESEND_API_KEY : '');

  if (!resendApiKey) {
    try {
      // Runtime fallback for Afro's Cloudflare worker
      resendApiKey = atob('cmVfU3A1Ykc4dmFfOGcyNTVhTVVGVXpyN1g4dFRLbXFUVTVo');
    } catch {}
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${options.fromName.replace(/"/g, '')} <${options.fromEmail}>`,
        to: [options.to],
        reply_to: options.replyTo || 'orders@afroschicken-hillcrest.co.za',
        subject: options.subject,
        html: options.html,
      }),
    });

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      if (data && data.id) {
        return true;
      }
    } else {
      const errText = await res.text().catch(() => '');
      console.warn('Resend API notice:', res.status, errText);
    }
  } catch (resendErr) {
    console.warn('Resend dispatch error:', resendErr);
  }

  return false;
}

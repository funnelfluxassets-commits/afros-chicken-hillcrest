// Cloudflare Pages Function: Automated Contact Form Email Notification
import { sendTransactionalEmail } from '../utils/smtp';

export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
    },
  });
}

export async function onRequestPost(context: any) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Content-Type': 'application/json',
  };

  try {
    const body = await context.request.json().catch(() => ({}));
    const { title, firstName, lastName, email, telephone, message } = body;

    if (!firstName || !email || !telephone || !message) {
      return new Response(JSON.stringify({ error: 'Missing required contact form fields' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const fullName = `${title ? `${title} ` : ''}${firstName} ${lastName}`.trim();
    const cleanPhone = telephone.replace(/\s+/g, '');
    const rawDigits = telephone.replace(/[^0-9]/g, '');
    const cleanDigits = rawDigits.startsWith('0') ? `27${rawDigits.slice(1)}` : rawDigits;
    const sentTime = new Date().toLocaleString('en-ZA');

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Contact Form Message - ${fullName}</title>
</head>
<body style="margin: 0; padding: 12px 4px; background-color: #0c0c0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; overflow: hidden;">
    <tr>
      <td height="6" style="background-color: #FFD100; font-size: 0; line-height: 0;">&nbsp;</td>
    </tr>
    <tr>
      <td align="center" style="padding: 24px 16px 18px 16px; background-color: #121215; border-bottom: 1px solid #27272a;">
        <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #FFD100; margin-bottom: 6px;">
          ✉️ AFRO'S CHICKEN SHOP &bull; HILLCREST
        </div>
        <h1 style="margin: 0 0 8px 0; font-size: 22px; line-height: 28px; font-weight: 800; color: #ffffff;">
          New Website Message!
        </h1>
        <div style="display: inline-block; background-color: #27272a; color: #e4e4e7; font-size: 12px; font-weight: 700; padding: 5px 14px; border-radius: 9999px; border: 1px solid #FFD100;">
          Customer Contact Inquiry
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 16px;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 1px solid #27272a; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
          <tr style="border-bottom: 1px solid #27272a; background-color: #202024;">
            <td width="30%" style="padding: 10px 12px; color: #a1a1aa; font-size: 12px; font-weight: 700; text-transform: uppercase;">Sender Name</td>
            <td style="padding: 10px 12px; color: #ffffff; font-size: 15px; font-weight: 700;">${fullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #27272a; background-color: #18181b;">
            <td style="padding: 10px 12px; color: #a1a1aa; font-size: 12px; font-weight: 700; text-transform: uppercase;">Email</td>
            <td style="padding: 10px 12px; color: #38bdf8; font-size: 14px;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #27272a; background-color: #202024;">
            <td style="padding: 10px 12px; color: #a1a1aa; font-size: 12px; font-weight: 700; text-transform: uppercase;">Phone</td>
            <td style="padding: 10px 12px; color: #FFD100; font-size: 14px; font-weight: 700;">
              ${cleanPhone}
              <a href="tel:${cleanPhone}" style="display: inline-block; margin-left: 8px; background: #FFD100; color: #000; padding: 2px 8px; border-radius: 4px; text-decoration: none; font-size: 11px; font-weight: 800;">Call</a>
              ${cleanDigits ? `<a href="https://wa.me/${cleanDigits}" style="display: inline-block; margin-left: 4px; background: #22c55e; color: #fff; padding: 2px 8px; border-radius: 4px; text-decoration: none; font-size: 11px; font-weight: 700;">WhatsApp</a>` : ''}
            </td>
          </tr>
        </table>
        <div style="background-color: #202024; border: 1px solid #27272a; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #FFD100; margin-bottom: 8px;">Customer Message:</div>
          <div style="color: #ffffff; font-size: 14px; line-height: 22px; white-space: pre-wrap;">${message}</div>
        </div>
        <div style="text-align: center; font-size: 11px; color: #71717a;">
          Received: ${sentTime} &bull; Afro's Chicken Shop (Hillcrest) Website Contact Form
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const subject = `✉️ [NEW WEBSITE MESSAGE] from ${fullName}`;

    const sent = await sendTransactionalEmail(
      {
        fromName: "Afro's Chicken Hillcrest Website",
        fromEmail: 'orders@wrapandwings.co.za',
        to: 'orders@afroschicken-hillcrest.co.za',
        replyTo: email,
        subject,
        html: htmlContent,
      },
      context.env
    );

    if (sent) {
      return new Response(JSON.stringify({ success: true, message: 'Message sent successfully' }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ error: 'Failed to dispatch email' }), {
      status: 500,
      headers: corsHeaders,
    });
  } catch (err: any) {
    console.error('Contact form email error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal error' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

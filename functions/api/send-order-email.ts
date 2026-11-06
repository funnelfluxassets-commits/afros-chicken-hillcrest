// Cloudflare Pages Function: Automated Order Email Notification
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
    const { order } = body;

    if (!order || !order.orderId) {
      return new Response(JSON.stringify({ error: 'Invalid order data' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const orderId = order.orderId;
    const customerName = order.customer?.customerName || 'Customer';
    const customerPhone = order.customer?.phone || 'Not provided';
    const rawDigits = customerPhone.replace(/[^0-9]/g, '');
    const cleanDigits = rawDigits.startsWith('0') ? `27${rawDigits.slice(1)}` : rawDigits;

    const orderMode = order.orderMode === 'collection' ? 'Collection' : 'Delivery';
    const preferredTime =
      order.preferredTime || (order.orderMode === 'collection' ? 'ASAP (15–20 mins)' : 'ASAP (35–45 mins)');
    const storeName = order.store?.name || "Afro's Chicken Shop - The Junction, Hillcrest";
    const address =
      order.orderMode === 'delivery'
        ? `${order.customer?.address || ''}, ${order.customer?.suburb || 'Hillcrest'}${
            order.customer?.complexOrUnit ? ` (${order.customer.complexOrUnit})` : ''
          }${order.customer?.gateCode ? ` [Gate: ${order.customer.gateCode}]` : ''}`
        : 'Store Collection (Shop 5, The Junction, Hillcrest)';
    const notes = order.customer?.notes || '';
    const createdAt = order.createdAt || new Date().toLocaleString('en-ZA');

    const customerEmail = order.customer?.email || '';
    const paymentLabel =
      order.paymentMethod === 'paystack'
        ? '💳 Paystack (Card / Apple Pay - Confirmed Paid)'
        : order.paymentMethod === 'ozow'
        ? '🏦 Ozow (Instant EFT - Confirmed Paid)'
        : order.paymentMethod === 'payfast'
        ? 'PayFast Online (Confirmed Paid)'
        : order.paymentMethod === 'whatsapp'
        ? 'WhatsApp Order'
        : order.paymentMethod === 'cod'
        ? order.orderMode === 'collection'
          ? 'Pay on Collection (Card / Cash)'
          : 'Pay on Delivery (Card / Cash)'
        : order.paymentMethod || 'Paid';

    // Build items HTML table rows
    const itemsRows = (order.items || [])
      .map((item: any, idx: number) => {
        const details: string[] = [];
        if (item.customization?.preparationStyle) {
          details.push(`Prep: <strong style="color: #ffffff;">${item.customization.preparationStyle}</strong>`);
        }
        if (item.customization?.flavour) {
          details.push(`Flavour: <strong style="color: #FFD100;">${item.customization.flavour}</strong>`);
        }
        if (item.customization?.side) {
          details.push(`Side: <strong style="color: #e4e4e7;">${item.customization.side}</strong>`);
        }
        if (item.customization?.extras && item.customization.extras.length > 0) {
          details.push(`Extras: <em>${item.customization.extras.map((e: any) => e.name).join(', ')}</em>`);
        }
        if (item.customization?.notes) {
          details.push(`Note: <em>${item.customization.notes}</em>`);
        }
        const detailsHtml =
          details.length > 0
            ? `<div style="font-size: 12px; color: #a1a1aa; margin-top: 3px; line-height: 16px;">${details.join(
                ' &bull; '
              )}</div>`
            : '';

        const isLast = idx === (order.items?.length || 1) - 1;
        const borderStyle = isLast ? '' : 'border-bottom: 1px solid #27272a;';

        return `
        <tr style="${borderStyle}">
          <td style="padding: 10px 8px; text-align: center; vertical-align: top;">
            <span style="display: inline-block; background-color: #27272a; color: #FFD100; font-weight: 800; font-size: 12px; padding: 2px 7px; border-radius: 4px;">${
              item.quantity || 1
            }x</span>
          </td>
          <td style="padding: 10px 10px; vertical-align: top;">
            <div style="color: #ffffff; font-size: 14px; font-weight: 700; line-height: 18px;">
              ${item.menuItem?.name || 'Meal'}
            </div>
            ${detailsHtml}
          </td>
          <td style="padding: 10px 10px; text-align: right; vertical-align: top; color: #ffffff; font-size: 14px; font-weight: 700; white-space: nowrap;">
            R${(item.itemTotal || 0).toFixed(2)}
          </td>
        </tr>
      `;
      })
      .join('');

    const subtotal = `R${(order.subtotal || 0).toFixed(2)}`;
    const deliveryFee = `R${(order.deliveryFee || 0).toFixed(2)}`;
    const tip = `R${(order.tip || 0).toFixed(2)}`;
    const grandTotal = `R${(order.grandTotal || 0).toFixed(2)}`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order #${orderId} - Afro's Chicken Hillcrest</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0c0c0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5; }
    table { border-spacing: 0; }
    td { padding: 0; }
    img { border: 0; }
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .mobile-padding { padding: 16px 12px !important; }
      .mobile-label { width: 38% !important; font-size: 11px !important; }
      .mobile-value { font-size: 13px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 12px; background-color: #0c0c0e;">

  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; overflow: hidden;" class="container">
    
    <!-- Top Afro Yellow Accent Strip -->
    <tr>
      <td height="6" style="background-color: #FFD100; font-size: 0; line-height: 0;">&nbsp;</td>
    </tr>

    <!-- Header Banner -->
    <tr>
      <td align="center" style="padding: 22px 16px 18px 16px; background-color: #121215; border-bottom: 1px solid #27272a;">
        <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #FFD100; margin-bottom: 6px;">
          🍗 AFRO'S CHICKEN SHOP &bull; HILLCREST
        </div>
        <h1 style="margin: 0 0 8px 0; font-size: 21px; line-height: 26px; font-weight: 800; color: #ffffff;">
          Someone just submitted their order!
        </h1>
        <div style="display: inline-block; background-color: #27272a; color: #e4e4e7; font-size: 13px; font-weight: 700; padding: 5px 14px; border-radius: 9999px; border: 1px solid #3f3f46; white-space: nowrap;">
          Order #${orderId} - ${orderMode}
        </div>
      </td>
    </tr>

    <!-- Customer & Order Specs Table -->
    <tr>
      <td style="padding: 16px;" class="mobile-padding">
        
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 1px solid #27272a; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
          
          <!-- Customer Name -->
          <tr style="border-bottom: 1px solid #27272a;">
            <td class="mobile-label" style="width: 32%; padding: 10px 12px; background-color: #202024; color: #a1a1aa; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: middle;">
              Customer:
            </td>
            <td class="mobile-value" style="padding: 10px 12px; background-color: #18181b; color: #ffffff; font-size: 14px; font-weight: 700; vertical-align: middle;">
              ${customerName}
            </td>
          </tr>

          <!-- Phone & Quick Actions (Call + WhatsApp) -->
          <tr style="border-bottom: 1px solid #27272a;">
            <td class="mobile-label" style="padding: 10px 12px; background-color: #202024; color: #a1a1aa; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: middle;">
              Phone / Cell:
            </td>
            <td class="mobile-value" style="padding: 10px 12px; background-color: #18181b; vertical-align: middle;">
              <span style="font-size: 14px; font-weight: 700; color: #FFD100; margin-right: 8px;">${customerPhone}</span>
              <div style="margin-top: 6px;">
                <a href="tel:${customerPhone}" style="display: inline-block; background-color: #FFD100; color: #000000; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; text-decoration: none; margin-right: 6px;">
                  📞 Call
                </a>
                ${
                  cleanDigits
                    ? `<a href="https://wa.me/${cleanDigits}" style="display: inline-block; background-color: #16a34a; color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; text-decoration: none;">
                  💬 WhatsApp
                </a>`
                    : ''
                }
              </div>
            </td>
          </tr>

          ${
            customerEmail
              ? `<!-- Customer Email -->
          <tr style="border-bottom: 1px solid #27272a;">
            <td class="mobile-label" style="padding: 10px 12px; background-color: #202024; color: #a1a1aa; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: middle;">
              Email Receipt:
            </td>
            <td class="mobile-value" style="padding: 10px 12px; background-color: #18181b; color: #38bdf8; font-size: 13px; font-weight: 600; vertical-align: middle;">
              <a href="mailto:${customerEmail}" style="color: #38bdf8; text-decoration: none;">${customerEmail}</a>
            </td>
          </tr>`
              : ''
          }

          <!-- Fulfillment -->
          <tr style="border-bottom: 1px solid #27272a;">
            <td class="mobile-label" style="padding: 10px 12px; background-color: #202024; color: #a1a1aa; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: middle;">
              Fulfillment:
            </td>
            <td class="mobile-value" style="padding: 10px 12px; background-color: #18181b; color: #ffffff; font-size: 13px; font-weight: 700; vertical-align: middle;">
              <span style="display: inline-block; background-color: #1e3a8a; color: #93c5fd; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 4px; margin-right: 6px;">
                ${orderMode.toUpperCase()}
              </span>
              <span>Time: ${preferredTime}</span>
            </td>
          </tr>

          <!-- Location / Address -->
          <tr style="border-bottom: 1px solid #27272a;">
            <td class="mobile-label" style="padding: 10px 12px; background-color: #202024; color: #a1a1aa; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: middle;">
              Address / Loc:
            </td>
            <td class="mobile-value" style="padding: 10px 12px; background-color: #18181b; color: #d4d4d8; font-size: 13px; vertical-align: middle;">
              ${address}
            </td>
          </tr>

          <!-- Payment Mode -->
          <tr style="border-bottom: 1px solid #27272a;">
            <td class="mobile-label" style="padding: 10px 12px; background-color: #202024; color: #a1a1aa; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: middle;">
              Payment Mode:
            </td>
            <td class="mobile-value" style="padding: 10px 12px; background-color: #18181b; color: #ffffff; font-size: 13px; vertical-align: middle;">
              <strong style="color: #FFD100;">${paymentLabel}</strong>
              ${
                order.paymentReference
                  ? `<div style="margin-top: 4px; font-size: 11px; color: #a1a1aa; font-family: monospace;">Ref: ${order.paymentReference}</div>`
                  : ''
              }
            </td>
          </tr>

          <!-- Payment Status -->
          <tr ${notes ? 'style="border-bottom: 1px solid #27272a;"' : ''}>
            <td class="mobile-label" style="padding: 10px 12px; background-color: #202024; color: #a1a1aa; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: middle;">
              Payment Status:
            </td>
            <td class="mobile-value" style="padding: 10px 12px; background-color: #18181b; color: #22c55e; font-size: 13px; font-weight: 800; vertical-align: middle;">
              ${order.paymentStatus === 'paid' ? '✅ PAID (Confirmed)' : '💵 PAY ON HANDOVER'}
            </td>
          </tr>

          ${
            notes
              ? `<!-- Special Notes -->
          <tr>
            <td class="mobile-label" style="padding: 10px 12px; background-color: #202024; color: #a1a1aa; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: middle;">
              Kitchen Notes:
            </td>
            <td class="mobile-value" style="padding: 10px 12px; background-color: #18181b; color: #FFD100; font-size: 13px; font-style: italic; vertical-align: middle;">
              ${notes}
            </td>
          </tr>`
              : ''
          }

        </table>

        <!-- Order Items Section Header -->
        <div style="font-size: 13px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #FFD100; margin: 18px 0 10px 0;">
          🍗 ORDER ITEMS (${grandTotal})
        </div>

        <!-- Order Items Table -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 1px solid #27272a; border-radius: 8px; overflow: hidden; margin-bottom: 16px; background-color: #18181b;">
          ${itemsRows}
          
          <!-- Subtotal -->
          <tr style="border-top: 2px solid #27272a;">
            <td colspan="2" style="padding: 8px 12px; color: #a1a1aa; font-size: 13px;">Subtotal:</td>
            <td style="padding: 8px 12px; text-align: right; color: #ffffff; font-size: 13px; font-weight: 600;">${subtotal}</td>
          </tr>

          ${
            orderMode === 'delivery'
              ? `<!-- Delivery Fee -->
          <tr>
            <td colspan="2" style="padding: 6px 12px; color: #a1a1aa; font-size: 13px;">Delivery Fee:</td>
            <td style="padding: 6px 12px; text-align: right; color: #ffffff; font-size: 13px; font-weight: 600;">${deliveryFee}</td>
          </tr>`
              : ''
          }

          ${
            order.tip && order.tip > 0
              ? `<!-- Driver Tip -->
          <tr>
            <td colspan="2" style="padding: 6px 12px; color: #a1a1aa; font-size: 13px;">Driver Tip:</td>
            <td style="padding: 6px 12px; text-align: right; color: #22c55e; font-size: 13px; font-weight: 700;">+${tip}</td>
          </tr>`
              : ''
          }
        </table>

        <!-- Grand Total Banner (Afro's Yellow Border & Accent) -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background-color: #121215; border: 2px solid #FFD100; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
          <tr>
            <td style="padding: 12px 14px; color: #e4e4e7; font-size: 15px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
              GRAND TOTAL:
            </td>
            <td align="right" style="padding: 12px 14px; color: #FFD100; font-size: 22px; font-weight: 900; white-space: nowrap;">
              ${grandTotal}
            </td>
          </tr>
        </table>

        <!-- Footer Note -->
        <div style="text-align: center; font-size: 11px; color: #71717a; line-height: 16px; padding-top: 4px;">
          Order Placed: ${createdAt} &bull; Afro's Chicken Shop (Hillcrest) - The Junction<br>
          Internal Staff &amp; Kitchen Notification
        </div>

      </td>
    </tr>

  </table>

</body>
</html>
    `;

    const subject = `🍗 [NEW AFRO'S ORDER] #${orderId} - ${
      order.orderMode === 'collection' ? 'COLLECTION' : 'DELIVERY'
    } - ${customerName} (${grandTotal})`;

    const sent = await sendTransactionalEmail(
      {
        fromName: "Afro's Chicken Hillcrest Orders",
        fromEmail: 'orders@wrapandwings.co.za',
        to: 'orders@afroschicken-hillcrest.co.za',
        replyTo: order.customer?.email || 'orders@afroschicken-hillcrest.co.za',
        subject,
        html: htmlContent,
      },
      context.env
    );

    if (sent) {
      return new Response(JSON.stringify({ success: true, message: 'Email sent successfully via Cloudflare Pages' }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ error: 'Failed to dispatch email' }), {
      status: 500,
      headers: corsHeaders,
    });
  } catch (err: any) {
    console.error('Cloudflare Pages email dispatch error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal error' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

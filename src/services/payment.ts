import { CartItem, DeliveryDetails, OrderMode, StoreLocation, PaymentGatewayType } from '../types';
import { ORDER_WHATSAPP_NUMBER } from '../data/stores';

export interface CheckoutPayload {
  orderId: string;
  orderMode: OrderMode;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tip?: number;
  grandTotal: number;
  customer: DeliveryDetails;
  store: StoreLocation;
  paymentMethod: PaymentGatewayType;
  preferredTime?: string;
  createdAt: string;
  paymentReference?: string;
}

// ── Google Maps & Waze Deep-link Generators ──────────────────────────────────
export function formatFullDeliveryAddress(address: string, suburb: string): string {
  const cleanAddr = (address || '').trim();
  const cleanSub = (suburb || '').trim();
  const parts: string[] = [cleanAddr];
  if (cleanSub && !cleanAddr.toLowerCase().includes(cleanSub.toLowerCase())) {
    parts.push(cleanSub);
  }
  if (!cleanAddr.toLowerCase().includes('durban') && !cleanSub.toLowerCase().includes('durban')) {
    parts.push('Durban');
  }
  if (!cleanAddr.toLowerCase().includes('south africa')) {
    parts.push('South Africa');
  }
  return parts.filter(Boolean).join(', ');
}

export function generateGoogleMapsUrl(address: string, suburb: string): string {
  const fullAddress = formatFullDeliveryAddress(address, suburb);
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;
}

export function generateWazeUrl(address: string, suburb: string): string {
  const fullAddress = formatFullDeliveryAddress(address, suburb);
  return `https://waze.com/ul?q=${encodeURIComponent(fullAddress)}&navigate=yes`;
}

// ── WhatsApp Order Message Formatter ─────────────────────────────────────────
export function buildWhatsAppOrderMessage(payload: CheckoutPayload): string {
  if (!payload) return '';
  const orderId = payload.orderId || '';
  const orderMode = payload.orderMode || 'collection';
  const isDelivery = orderMode === 'delivery';
  const items = Array.isArray(payload.items) ? payload.items : [];
  const grandTotal = typeof payload.grandTotal === 'number' ? payload.grandTotal : 0;
  const subtotal = typeof payload.subtotal === 'number' ? payload.subtotal : grandTotal;
  const deliveryFee = typeof payload.deliveryFee === 'number' ? payload.deliveryFee : (isDelivery ? 25 : 0);
  const customer = payload.customer || ({} as any);
  const store = payload.store || { name: "Afro's Chicken Shop — Hillcrest", mall: 'The Junction (Shop 5)' };
  const paymentMethod = payload.paymentMethod || 'cod';
  const preferredTime = payload.preferredTime || 'ASAP';

  let msg = `🔥 *NEW ORDER - AFRO’S CHICKEN (HILLCREST)*\n`;
  msg += `*Order Ref:* #${orderId}\n`;
  msg += `*Type:* ${isDelivery ? '🏍️ HOME DELIVERY' : '🛍️ STORE COLLECTION'}\n`;
  msg += `*Store:* ${store.name || "Afro's Chicken Shop — Hillcrest"} (${store.mall || 'The Junction'})\n`;
  if (preferredTime) {
    msg += `*Requested Time:* ⏰ ${preferredTime}\n`;
  }
  msg += `─────────────────────────\n`;
  msg += `*CUSTOMER DETAILS:*\n`;
  msg += `👤 *Name:* ${customer.customerName || 'Customer'}\n`;
  msg += `📞 *Phone:* ${customer.phone || 'N/A'}\n`;

  if (isDelivery) {
    msg += `📍 *Address:* ${customer.address || ''}\n`;
    msg += `🏙️ *Suburb:* ${customer.suburb || 'Hillcrest'}\n`;
    if (customer.complexOrUnit) msg += `🏢 *Unit/Complex:* ${customer.complexOrUnit}\n`;
    if (customer.gateCode) msg += `🔑 *Gate Code:* ${customer.gateCode}\n`;
    if (customer.notes) msg += `📝 *Notes:* ${customer.notes}\n`;
    msg += `\n🏍️ *DRIVER GPS LINK:* \n${generateGoogleMapsUrl(customer.address || '', customer.suburb || 'Hillcrest')}\n`;
  }

  msg += `─────────────────────────\n`;
  msg += `*ITEMS ORDERED:*\n`;
  items.forEach((item, idx) => {
    const qty = typeof item?.quantity === 'number' ? item.quantity : 1;
    const rawTotal = typeof item?.itemTotal === 'number'
      ? item.itemTotal
      : (typeof item?.menuItem?.price === 'number' ? item.menuItem.price * qty : 0);
    const safeTotal = typeof rawTotal === 'number' && !isNaN(rawTotal) ? rawTotal : 0;
    const itemName = item?.menuItem?.name || 'Meal';
    msg += `${idx + 1}. *${qty}x ${itemName}* (R${safeTotal.toFixed(2)})\n`;
    if (item?.customization?.flavour) {
      msg += `   • Flavour: *${String(item.customization.flavour).toUpperCase()}*\n`;
    }
    if (item?.customization?.side) {
      msg += `   • Side: *${item.customization.side}*\n`;
    }
    if (item?.customization?.extras && item.customization.extras.length > 0) {
      msg += `   • Extras: ${item.customization.extras.map((e) => e.name).join(', ')}\n`;
    }
    if (item?.customization?.notes) {
      msg += `   • Notes: _${item.customization.notes}_\n`;
    }
  });

  msg += `─────────────────────────\n`;
  msg += `*Subtotal:* R${(typeof subtotal === 'number' ? subtotal : 0).toFixed(2)}\n`;
  if (isDelivery) {
    msg += `*Delivery Fee:* R${(typeof deliveryFee === 'number' ? deliveryFee : 0).toFixed(2)}\n`;
    if (typeof payload.tip === 'number' && payload.tip > 0) {
      msg += `*Driver Tip:* R${payload.tip.toFixed(2)}\n`;
    }
  }
  msg += `*TOTAL DUE:* *R${(typeof grandTotal === 'number' ? grandTotal : 0).toFixed(2)}*\n`;
  msg += `*Payment:* ${
    paymentMethod === 'paystack'
      ? '✅ Paid via Card / Apple Pay (Paystack)'
      : paymentMethod === 'ozow'
      ? '✅ Paid via Instant EFT (Ozow)'
      : paymentMethod === 'payfast'
      ? '✅ Paid via PayFast (Instant EFT / Card)'
      : paymentMethod === 'yoco'
      ? '✅ Paid via Yoco (Card / Apple Pay)'
      : paymentMethod === 'cod'
      ? '💵 Pay on Handover (Cash / Speedpoint)'
      : '💬 Direct WhatsApp Confirmation'
  }\n`;
  if (payload.paymentReference) {
    msg += `*Payment Ref:* \`${payload.paymentReference}\`\n`;
  }
  msg += `─────────────────────────\n`;
  msg += `_Thank you for ordering with Afro’s Chicken (Hillcrest)!_`;

  return msg;
}

export function getWhatsAppOrderUrl(payload: CheckoutPayload): string {
  const text = buildWhatsAppOrderMessage(payload);
  const targetNumber = payload.store.whatsapp || ORDER_WHATSAPP_NUMBER;
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`;
}

export function openWhatsAppOrder(payload: CheckoutPayload) {
  const url = getWhatsAppOrderUrl(payload);
  window.open(url, '_blank');
}

// ── Staff Test Mode & Sandbox Utilities ──────────────────────────────────────
export const PAYMENT_TEST_STORAGE_KEY = 'afros_payment_test_mode';

export function isPayFastStaffTestMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const params = new URLSearchParams(window.location.search);
    const testParam =
      params.get('test_payment') ||
      params.get('test_paystack') ||
      params.get('test_payfast') ||
      params.get('test_gateway');
    const hash = (window.location.hash || '').toLowerCase();
    const hasHash =
      hash.includes('test_payment') ||
      hash.includes('test_paystack') ||
      hash.includes('test_payfast') ||
      hash.includes('test_gateway');

    if (testParam === '1' || testParam === 'true' || hasHash) {
      try {
        localStorage.setItem(PAYMENT_TEST_STORAGE_KEY, 'true');
      } catch {}
      try {
        sessionStorage.setItem(PAYMENT_TEST_STORAGE_KEY, 'true');
      } catch {}
      return true;
    }
    if (testParam === '0' || testParam === 'false') {
      try {
        localStorage.removeItem(PAYMENT_TEST_STORAGE_KEY);
      } catch {}
      try {
        sessionStorage.removeItem(PAYMENT_TEST_STORAGE_KEY);
      } catch {}
      return false;
    }

    const fromLocal = localStorage.getItem(PAYMENT_TEST_STORAGE_KEY);
    const fromSession = sessionStorage.getItem(PAYMENT_TEST_STORAGE_KEY);
    return fromLocal === 'true' || fromSession === 'true';
  } catch {
    return false;
  }
}

export function setPayFastStaffTestMode(enabled: boolean) {
  if (typeof window === 'undefined') return;
  try {
    if (enabled) {
      localStorage.setItem(PAYMENT_TEST_STORAGE_KEY, 'true');
      sessionStorage.setItem(PAYMENT_TEST_STORAGE_KEY, 'true');
    } else {
      localStorage.removeItem(PAYMENT_TEST_STORAGE_KEY);
      sessionStorage.removeItem(PAYMENT_TEST_STORAGE_KEY);
    }
  } catch {}
}

export function initiatePayFastCheckout(payload: CheckoutPayload, options?: { isSandbox?: boolean }) {
  if (typeof window === 'undefined') return;

  const isSandbox = options?.isSandbox ?? true;
  const processUrl = isSandbox
    ? 'https://sandbox.payfast.co.za/eng/process'
    : 'https://www.payfast.co.za/eng/process';

  // PayFast official sandbox merchant credentials (or production if isSandbox is false)
  const merchantId = isSandbox ? '10000100' : '37558383';
  const merchantKey = isSandbox ? '46f0cd694581a' : '1hbeo86df6tge';

  const origin = window.location.origin;
  const cleanId = String(payload.orderId).replace('#', '').trim();
  const returnUrl = `${origin}/?view=track&orderId=${encodeURIComponent(cleanId)}&payfast=success`;
  const cancelUrl = `${origin}/?view=menu&orderId=${encodeURIComponent(cleanId)}&payfast=cancelled`;

  const rawName = (payload.customer.customerName || 'Wrap Wing Guest').trim();
  const parts = rawName.split(' ');
  const firstName = parts[0] || 'Guest';
  const lastName = parts.slice(1).join(' ') || 'Customer';

  // Sanitize South African mobile number: PayFast requires 10 digits (e.g. 0821234567) without spaces or plus
  let sanitizedCell: string | undefined = undefined;
  if (payload.customer.phone) {
    let digits = payload.customer.phone.replace(/\D/g, '');
    if (digits.startsWith('27') && digits.length === 11) {
      digits = '0' + digits.slice(2);
    }
    if (digits.length === 10 && digits.startsWith('0')) {
      sanitizedCell = digits;
    }
  }

  // PayFast requires an email address. Use customer phone or fallback if not entered
  const emailPhoneTag = sanitizedCell || (payload.customer.phone || '').replace(/\D/g, '') || 'orders';
  const email = payload.customer.email?.trim() || `${emailPhoneTag}@afroschicken-hillcrest.co.za`;

  const fields: Record<string, string | undefined> = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: `${origin}/api/orders`,
    name_first: firstName,
    name_last: lastName,
    email_address: email,
    cell_number: sanitizedCell, // only include if strictly valid SA format; omitted otherwise so PayFast never errors
    m_payment_id: cleanId,
    amount: payload.grandTotal.toFixed(2),
    item_name: `Afro's Chicken Hillcrest Order #${cleanId}`,
    item_description: `${payload.items.length} item(s) from ${payload.store.name}`,
    payment_method: 'cc', // Forces PayFast to display the Credit / Debit Card input screen
  };

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = processUrl;
  form.style.display = 'none';

  Object.entries(fields).forEach(([key, val]) => {
    if (val) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = val;
      form.appendChild(input);
    }
  });

  document.body.appendChild(form);
  form.submit();
}

// ── Paystack Gateway Integration (Card & Apple Pay) ──────────────────────────
export const PAYSTACK_PUBLIC_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_PAYSTACK_PUBLIC_KEY) ||
  'pk_test_de1955ffaf363a9d94aae19761b9e1ef7f8d8d2c';

/**
 * Loads Paystack Inline popup script dynamically if not yet available in the window.
 */
export function loadPaystackScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if ((window as any).PaystackPop) return resolve(true);

    const existing = document.getElementById('paystack-inline-js');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.id = 'paystack-inline-js';
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('Unable to load Paystack inline script.');
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export interface PaystackCheckoutOptions {
  onSuccess: (reference: string) => void;
  onCancel: () => void;
  onError?: (err: Error) => void;
}

export async function initiatePaystackCheckout(
  payload: CheckoutPayload,
  options: PaystackCheckoutOptions
) {
  if (typeof window === 'undefined') return;

  const scriptLoaded = await loadPaystackScript();
  const PaystackPop = (window as any).PaystackPop;

  if (!scriptLoaded || !PaystackPop) {
    options.onError?.(
      new Error('Unable to open Paystack payment window. Please check your internet connection and try again.')
    );
    return;
  }

  const cleanId = String(payload.orderId).replace('#', '').trim();
  const rawName = (payload.customer.customerName || "Afro's Guest").trim();
  const phone = payload.customer.phone || '';
  const emailPhoneTag = phone.replace(/\D/g, '') || 'guest';
  const customerEmail =
    payload.customer.email && payload.customer.email.trim().includes('@')
      ? payload.customer.email.trim()
      : `order-${cleanId}-${emailPhoneTag}@afroschicken-hillcrest.co.za`;

  // Paystack expects amount in cents (e.g. R158.00 -> 15800)
  const amountInCents = Math.round(payload.grandTotal * 100);
  const reference = `AFR-${cleanId}-${Date.now().toString(36).toUpperCase()}`;

  try {
    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: customerEmail,
      amount: amountInCents,
      currency: 'ZAR',
      ref: reference,
      channels: ['card', 'apple_pay'],
      metadata: {
        custom_fields: [
          {
            display_name: 'Customer Name',
            variable_name: 'customer_name',
            value: rawName,
          },
          {
            display_name: 'Phone Number',
            variable_name: 'phone_number',
            value: phone,
          },
          {
            display_name: 'Order Number',
            variable_name: 'order_number',
            value: `#${cleanId}`,
          },
          {
            display_name: 'Order Type',
            variable_name: 'order_type',
            value: payload.orderMode === 'delivery' ? 'Home Delivery' : 'Store Collection',
          },
          {
            display_name: 'Store',
            variable_name: 'store',
            value: payload.store.name || "Afro's Chicken Shop (Hillcrest)",
          },
        ],
      },
      callback: function (response: { reference?: string; trxref?: string; status?: string }) {
        const confirmedRef = response?.reference || response?.trxref || reference;
        options.onSuccess(confirmedRef);
      },
      onClose: function () {
        options.onCancel();
      },
    });

    handler.openIframe();
  } catch (err: any) {
    console.error('Paystack popup setup error:', err);
    options.onError?.(err instanceof Error ? err : new Error(String(err)));
  }
}

// ── Ozow Gateway Integration (Instant EFT & Capitec Pay) ─────────────────────
export const OZOW_SITE_CODE =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_OZOW_SITE_CODE) || '';



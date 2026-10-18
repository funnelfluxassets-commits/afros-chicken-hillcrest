import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { DeliveryDetails, PaymentGatewayType } from '../types';
import {
  openWhatsAppOrder,
  CheckoutPayload,
  isPayFastStaffTestMode,
  setPayFastStaffTestMode,
  initiatePayFastCheckout,
} from '../services/payment';
import { createLiveOrder, playCustomerUpdateChime, generateNextOrderId } from '../services/orderService';
import { logCheckoutStart, logOrderCompleted } from '../services/analyticsService';
import { X, CheckCircle, ShieldCheck, MapPin, Phone, CreditCard, Send, Navigation, ArrowRight, Clock, MessageSquare, ShoppingBag } from 'lucide-react';
import { DeliveryMotorbikeIcon } from './icons/DeliveryMotorbikeIcon';

interface SavedCustomerProfile {
  customerName?: string;
  phone?: string;
  address?: string;
  suburb?: string;
  complexOrUnit?: string;
  gateCode?: string;
  notes?: string;
}

const SAVED_PROFILE_KEY = 'wrap_wing_saved_customer_profile';

function loadSavedProfile(): SavedCustomerProfile {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(SAVED_PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveCustomerProfile(profile: SavedCustomerProfile) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SAVED_PROFILE_KEY, JSON.stringify(profile));
  } catch {}
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (payload: CheckoutPayload) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onOrderSuccess }) => {
  const { items, orderMode, subtotal, deliveryFee, tip, setTip, grandTotal, selectedStore, clearCart } = useCart();

  const savedProfile = loadSavedProfile();
  const [hasAutofilled, setHasAutofilled] = useState(() => Boolean(savedProfile.customerName || savedProfile.phone));
  const [customerName, setCustomerName] = useState(() => savedProfile.customerName || '');
  const [phone, setPhone] = useState(() => savedProfile.phone || '');
  const [address, setAddress] = useState(() => savedProfile.address || '');
  const [suburb, setSuburb] = useState(() => savedProfile.suburb || 'Hillcrest');
  const [complexOrUnit, setComplexOrUnit] = useState(() => savedProfile.complexOrUnit || '');
  const [gateCode, setGateCode] = useState(() => savedProfile.gateCode || '');
  const [notes, setNotes] = useState(() => savedProfile.notes || '');
  const [preferredTime, setPreferredTime] = useState('ASAP');
  const [paymentMethod, setPaymentMethod] = useState<PaymentGatewayType>('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isStaffTest, setIsStaffTest] = useState(() => isPayFastStaffTestMode());

  useEffect(() => {
    if (isOpen) {
      setIsStaffTest(isPayFastStaffTestMode());
      try {
        logCheckoutStart();
      } catch {}
    }
  }, [isOpen]);

  const handleClearSavedDetails = () => {
    try {
      localStorage.removeItem(SAVED_PROFILE_KEY);
    } catch {}
    setCustomerName('');
    setPhone('');
    setAddress('');
    setSuburb('Hillcrest');
    setComplexOrUnit('');
    setGateCode('');
    setNotes('');
    setHasAutofilled(false);
  };

  const firstName = (savedProfile.customerName || customerName || '').trim().split(' ')[0];

  if (!isOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }
    if (orderMode === 'delivery' && !address) {
      alert('Please enter your delivery street address.');
      return;
    }

    setIsProcessing(true);

    // Save customer details to localStorage for instant autofill on future orders
    saveCustomerProfile({
      customerName,
      phone,
      address,
      suburb,
      complexOrUnit: complexOrUnit.trim() || undefined,
      gateCode: gateCode.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    const orderId = generateNextOrderId(orderMode);

    const deliveryDetails: DeliveryDetails = {
      customerName,
      phone,
      address,
      suburb,
      complexOrUnit: complexOrUnit.trim() || undefined,
      gateCode: gateCode.trim() || undefined,
      notes: notes.trim() || undefined,
      preferredTime: preferredTime === 'ASAP'
        ? (orderMode === 'collection' ? 'ASAP (15–20 mins)' : 'ASAP (35–45 mins)')
        : preferredTime,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const payload: CheckoutPayload = {
      orderId,
      orderMode,
      items: [...items],
      subtotal,
      deliveryFee,
      tip: orderMode === 'delivery' ? tip : 0,
      grandTotal,
      customer: deliveryDetails,
      store: selectedStore,
      paymentMethod,
      preferredTime: deliveryDetails.preferredTime,
      createdAt: deliveryDetails.createdAt || 'Just now',
    };

    // If customer selected PayFast, store pending order in browser memory and forward to PayFast.
    // The order will ONLY be dispatched to the kitchen once payment approval is confirmed!
    if (paymentMethod === 'payfast') {
      try {
        localStorage.setItem('wrap_wing_pending_payfast_order', JSON.stringify(payload));
        sessionStorage.setItem('wrap_wing_pending_payfast_order', JSON.stringify(payload));
      } catch {}
      setIsProcessing(false);
      clearCart();
      onClose();
      initiatePayFastCheckout(payload, { isSandbox: true });
      return;
    }

    // For Pay on Handover (Cash/Speedpoint), dispatch immediately to kitchen
    await createLiveOrder(payload);
    try {
      logOrderCompleted(
        items.map((i) => ({
          name: i.menuItem.name,
          quantity: i.quantity,
          flavour: i.customization?.flavour,
          extras: i.customization?.extras,
        }))
      );
    } catch {}

    // If customer chose WhatsApp confirmation, open WhatsApp
    if (paymentMethod === 'whatsapp') {
      openWhatsAppOrder(payload);
    }

    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      onOrderSuccess(payload);
      onClose();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl max-h-[92vh] rounded-3xl bg-white border border-zinc-300 shadow-2xl flex flex-col overflow-hidden text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-black flex items-center gap-2">
              {orderMode === 'delivery' ? (
                <>
                  <span className="p-1 rounded-lg bg-[#FFD100] text-black shrink-0">
                    <DeliveryMotorbikeIcon className="w-5 h-5 text-black shrink-0" />
                  </span>
                  <span>Delivery Checkout</span>
                </>
              ) : (
                <>
                  <span className="p-1 rounded-lg bg-[#FFD100] text-black shrink-0">
                    <ShoppingBag className="w-5 h-5 text-black shrink-0" />
                  </span>
                  <span>Collection Checkout</span>
                </>
              )}
            </h2>
            <p className="text-xs text-zinc-600 font-semibold mt-0.5">
              Afro’s Chicken (Hillcrest) • Fresh flame-grilled order
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-white">
          
          {/* Saved Profile Autofill Notice */}
          {hasAutofilled && (
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <span className="truncate flex items-center gap-1.5 font-medium">
                <span>👋</span>
                <span>Welcome back{firstName ? `, ${firstName}` : ''}! Your details have been auto-filled.</span>
              </span>
              <button
                type="button"
                onClick={handleClearSavedDetails}
                className="text-[11px] font-bold text-zinc-600 hover:text-black underline cursor-pointer ml-3 shrink-0"
              >
                Clear
              </button>
            </div>
          )}

          {/* Customer Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FFD100] text-black text-xs font-black flex items-center justify-center shrink-0 border border-black/10">
                1
              </span>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wide text-black">
                Contact Details
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-100/80 focus:bg-white border border-zinc-300 focus:border-black focus:ring-1 focus:ring-black text-xs text-black placeholder-zinc-400 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  name="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 082 123 4567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-100/80 focus:bg-white border border-zinc-300 focus:border-black focus:ring-1 focus:ring-black text-xs text-black placeholder-zinc-400 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address (If delivery mode) */}
          {orderMode === 'delivery' && (
            <div className="space-y-3 pt-4 border-t border-zinc-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FFD100] text-black text-xs font-black flex items-center justify-center shrink-0 border border-black/10">
                    2
                  </span>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wide text-black flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-black" />
                    <span>Delivery Address</span>
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-zinc-500">Connected to Driver GPS</span>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  autoComplete="street-address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 14 Josiah Gumede Road"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-100/80 focus:bg-white border border-zinc-300 focus:border-black focus:ring-1 focus:ring-black text-xs text-black placeholder-zinc-400 focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Suburb / Area</label>
                  <select
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-100/80 focus:bg-white border border-zinc-300 focus:border-black focus:ring-1 focus:ring-black text-xs text-black font-semibold focus:outline-none transition-all"
                  >
                    <option value="Hillcrest">Hillcrest Central</option>
                    <option value="Kloof">Kloof</option>
                    <option value="Gillitts">Gillitts</option>
                    <option value="Waterfall">Waterfall</option>
                    <option value="Bothas Hill">Botha's Hill</option>
                    <option value="Winston Park">Winston Park</option>
                    <option value="Assagay">Assagay</option>
                    <option value="Everton">Everton</option>
                    <option value="Forest Hills">Forest Hills</option>
                    <option value="Plantations">Plantations Estate</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Complex / Unit (Optional)</label>
                  <input
                    type="text"
                    value={complexOrUnit}
                    onChange={(e) => setComplexOrUnit(e.target.value)}
                    placeholder="e.g. Unit 4, Sunset Oaks"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-100/80 focus:bg-white border border-zinc-300 focus:border-black focus:ring-1 focus:ring-black text-xs text-black placeholder-zinc-400 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Gate Code / Access</label>
                  <input
                    type="text"
                    value={gateCode}
                    onChange={(e) => setGateCode(e.target.value)}
                    placeholder="e.g. #1234 or Ring 4"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-100/80 focus:bg-white border border-zinc-300 focus:border-black focus:ring-1 focus:ring-black text-xs text-black placeholder-zinc-400 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Driver Instructions</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Please leave at reception"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-100/80 focus:bg-white border border-zinc-300 focus:border-black focus:ring-1 focus:ring-black text-xs text-black placeholder-zinc-400 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Order Timing / Pickup Schedule */}
          <div className="space-y-3 pt-4 border-t border-zinc-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#FFD100] text-black text-xs font-black flex items-center justify-center shrink-0 border border-black/10">
                  <Clock className="w-3.5 h-3.5" />
                </span>
                <label className="text-xs sm:text-sm font-black uppercase tracking-wide text-black">
                  Preparation Timing
                </label>
              </div>
              <span className="text-xs font-black text-black bg-[#FFD100]/40 px-2.5 py-1 rounded-full border border-black/10">
                {orderMode === 'collection' ? '⚡ Ready in ~15–20 mins' : '⚡ Delivery in ~35–45 mins'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: 'ASAP', desc: orderMode === 'collection' ? '15–20 mins' : '35–45 mins' },
                { label: 'In 45 Mins', desc: 'Pre-order' },
                { label: 'In 1.5 Hours', desc: 'Later Today' },
              ].map((opt) => {
                const isSelected = preferredTime === opt.label;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setPreferredTime(opt.label)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFD100] border-2 border-black text-black font-black shadow-xs'
                        : 'bg-zinc-100 hover:bg-zinc-200/70 border-zinc-300 text-zinc-900 font-bold'
                    }`}
                  >
                    <div className="text-xs font-black uppercase">{opt.label}</div>
                    <div className={`text-[10px] ${isSelected ? 'text-black/80 font-bold' : 'text-zinc-500 font-medium'}`}>
                      {opt.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kitchen WhatsApp Live Dispatch Banner */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-950">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-700">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0 font-medium">
              Orders are dispatched straight to our Hillcrest kitchen WhatsApp (
              <strong className="text-emerald-800 font-black">+27 78 905 7975</strong>
              ) for instant confirmation.
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-4 border-t border-zinc-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#FFD100] text-black text-xs font-black flex items-center justify-center shrink-0 border border-black/10">
                  <CreditCard className="w-3.5 h-3.5" />
                </span>
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wide text-black">
                  Payment Method
                </h3>
              </div>
              {isStaffTest && (
                <button
                  type="button"
                  onClick={() => {
                    setPayFastStaffTestMode(false);
                    setIsStaffTest(false);
                    if (paymentMethod === 'payfast') setPaymentMethod('cod');
                  }}
                  className="text-xs text-amber-700 hover:text-black underline font-bold cursor-pointer"
                >
                  Exit Test Mode
                </button>
              )}
            </div>

            {isStaffTest && (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 animate-fadeIn">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Staff Test Mode: PayFast Sandbox Active (Zero real money charged)</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Pay On Handover (Active) */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                  paymentMethod === 'cod'
                    ? 'bg-[#FFD100]/25 border-2 border-black text-black font-black'
                    : 'border-zinc-300 bg-zinc-100 hover:bg-zinc-200/70 text-zinc-900 font-bold'
                }`}
              >
                <div>
                  <div className="text-xs font-black flex items-center gap-2">
                    <span>Pay On Handover</span>
                    <span className="text-[9px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                      ACTIVE
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-600 font-medium mt-0.5">Cash or Speedpoint card machine</div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-black bg-black'
                      : 'border-zinc-400 bg-white'
                  }`}
                >
                  {paymentMethod === 'cod' && <div className="w-1.5 h-1.5 rounded-full bg-[#FFD100]" />}
                </div>
              </button>

              {/* PayFast */}
              {isStaffTest ? (
                <button
                  type="button"
                  onClick={() => setPaymentMethod('payfast')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                    paymentMethod === 'payfast'
                      ? 'bg-[#FFD100]/25 border-2 border-black text-black font-black'
                      : 'border-zinc-300 bg-zinc-100 hover:bg-zinc-200/70 text-zinc-900 font-bold'
                  }`}
                >
                  <div>
                    <div className="text-xs font-black flex items-center gap-2">
                      <span>PayFast</span>
                      <span className="text-[9px] bg-sky-600 text-white px-2 py-0.5 rounded-full font-black uppercase">
                        SANDBOX TEST
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-600 font-medium mt-0.5">Instant EFT, Capitec Pay, Cards</div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      paymentMethod === 'payfast'
                        ? 'border-black bg-black'
                        : 'border-zinc-400 bg-white'
                    }`}
                  >
                    {paymentMethod === 'payfast' && <div className="w-1.5 h-1.5 rounded-full bg-[#FFD100]" />}
                  </div>
                </button>
              ) : (
                <div
                  className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 text-left flex items-center justify-between opacity-60 cursor-not-allowed select-none"
                  title="Online payments coming soon"
                >
                  <div>
                    <div className="text-xs font-bold text-zinc-500 flex items-center gap-2">
                      <span>PayFast</span>
                      <span className="text-[9px] bg-zinc-200 text-zinc-600 px-2 py-0.5 rounded-full font-black uppercase">
                        COMING SOON
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 font-medium mt-0.5">Instant EFT, Capitec Pay, Cards</div>
                  </div>
                  <div className="w-4 h-4 rounded-full border border-zinc-300 bg-zinc-100" />
                </div>
              )}
            </div>
          </div>

          {/* Order Summary & Tip Breakdown */}
          <div className="p-4 rounded-2xl bg-zinc-100 border border-zinc-300 space-y-2.5 text-xs text-zinc-700">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-zinc-600">Items Subtotal</span>
              <span className="text-black font-black text-sm">R{subtotal.toFixed(2)}</span>
            </div>
            {orderMode === 'delivery' && (
              <>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-zinc-600">Delivery Fee</span>
                  <span className="text-black font-black text-sm">R{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-zinc-200 my-0.5">
                  <span className="text-zinc-800 font-bold">Add Driver Tip:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTip(tip === 5 ? 0 : 5)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                        tip === 5
                          ? 'bg-[#FFD100] text-black border-2 border-black shadow-xs'
                          : 'bg-white text-zinc-700 hover:text-black hover:bg-zinc-200 border border-zinc-300'
                      }`}
                      title={tip === 5 ? 'Click to remove tip' : 'Add R5 tip'}
                    >
                      R5
                    </button>
                    <button
                      type="button"
                      onClick={() => setTip(tip === 10 ? 0 : 10)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                        tip === 10
                          ? 'bg-[#FFD100] text-black border-2 border-black shadow-xs'
                          : 'bg-white text-zinc-700 hover:text-black hover:bg-zinc-200 border border-zinc-300'
                      }`}
                      title={tip === 10 ? 'Click to remove tip' : 'Add R10 tip'}
                    >
                      R10
                    </button>
                  </div>
                </div>
                {tip > 0 && (
                  <div className="flex justify-between text-xs text-black font-bold">
                    <span>Driver Tip</span>
                    <span>+R{tip.toFixed(2)}</span>
                  </div>
                )}
              </>
            )}
            <div className="flex justify-between items-center text-sm font-black text-black pt-2.5 border-t border-zinc-300">
              <span className="uppercase tracking-wider">Total Bill</span>
              <span className="text-lg font-black text-black bg-[#FFD100] px-3 py-1 rounded-xl border border-black/10">
                R{grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Trust Banner */}
          <div className="p-3 rounded-xl bg-zinc-100 border border-zinc-300 flex items-center gap-2.5 text-xs text-zinc-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Encrypted 256-bit checkout • Food freshly flame-grilled upon confirmation</span>
          </div>

          {/* Total & Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-5 rounded-2xl bg-[#FFD100] hover:bg-[#e6bd00] text-black font-black text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-between cursor-pointer border-2 border-black disabled:opacity-50"
            >
              <span>{isProcessing ? 'CONFIRMING ORDER...' : 'CONFIRM & PLACE ORDER'}</span>
              <span className="text-base sm:text-lg">R{grandTotal.toFixed(2)}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

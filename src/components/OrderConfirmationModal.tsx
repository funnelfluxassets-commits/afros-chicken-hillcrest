import React, { useState } from 'react';
import { CheckoutPayload, generateGoogleMapsUrl, generateWazeUrl, getWhatsAppOrderUrl } from '../services/payment';
import {
  X,
  Navigation,
  Phone,
  MessageSquare,
  MapPin,
  CheckCircle,
  Clock,
  ShoppingBag,
  ExternalLink,
  Flame,
  Copy,
  Check,
  AlertCircle,
  Truck
} from 'lucide-react';
import { ChickenWingIcon } from './icons/ChickenWingIcon';
import { DeliveryMotorbikeIcon } from './icons/DeliveryMotorbikeIcon';

interface OrderConfirmationModalProps {
  order: CheckoutPayload | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  const [activeTab, setActiveTab] = useState<'customer' | 'driver'>('customer');
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const isDelivery = order.orderMode === 'delivery';
  const whatsAppUrl = getWhatsAppOrderUrl(order);
  const googleMapsUrl = generateGoogleMapsUrl(order.customer.address, order.customer.suburb);
  const wazeUrl = generateWazeUrl(order.customer.address, order.customer.suburb);

  const cleanPhone = order.customer.phone.replace(/[^0-9]/g, '');
  const customerPhoneInternational = cleanPhone.startsWith('0') ? `27${cleanPhone.slice(1)}` : cleanPhone;

  const handleCopyOrder = () => {
    const summary = `Afro’s Chicken Shop (Hillcrest). Order #${order.orderId}\nType: ${
      isDelivery ? 'Delivery' : 'Store Collection'
    }\nTotal: R${(typeof order.grandTotal === 'number' ? order.grandTotal : 0).toFixed(2)}`;
    navigator.clipboard?.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl max-h-[92vh] rounded-3xl bg-white border border-zinc-300 shadow-2xl flex flex-col overflow-hidden text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#FFD100] border-b-2 border-black text-black flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-black text-[#FFD100] flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-black/80 flex items-center gap-1.5">
                {isDelivery ? (
                  <>
                    <DeliveryMotorbikeIcon className="w-3.5 h-3.5 text-black shrink-0" />
                    <span>DELIVERY ORDER PLACED</span>
                  </>
                ) : (
                  <span>🛍️ COLLECTION ORDER PLACED</span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-black">
                Order #{order.orderId}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-black/10 hover:bg-black/20 text-black transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher Tabs (Customer vs Driver Dispatch) */}
        <div className="p-2 bg-zinc-100 border-b border-zinc-200 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('customer')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'customer'
                ? 'bg-[#FFD100] text-black border-2 border-black font-black shadow-xs'
                : 'text-zinc-600 hover:text-black font-bold'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Customer Receipt & Tracker</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('driver')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'driver'
                ? 'bg-black text-[#FFD100] border-2 border-black font-black shadow-xs'
                : 'text-zinc-600 hover:text-black font-bold'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Driver GPS & Kitchen Ticket</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-white">
          {activeTab === 'customer' ? (
            <>
              {/* WhatsApp Direct Action Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2.5 text-emerald-950">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-900">
                    <MessageSquare className="w-4 h-4 text-emerald-700" />
                    <span>Instant Kitchen Confirmation</span>
                  </div>
                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-black">
                    WhatsApp Connected
                  </span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                  Your order has been formatted for our Hillcrest kitchen phone (<strong className="text-emerald-950 font-black">+27 78 905 7975</strong>).
                  Tap below to open WhatsApp and send your ticket to begin flame-grilling right away!
                </p>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>OPEN WHATSAPP & CONFIRM WITH KITCHEN</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Live Order Timeline Tracker */}
              <div className="p-4 rounded-2xl bg-zinc-100 border border-zinc-300 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-black" />
                    <span>Live Order Tracker</span>
                  </h3>
                  <span className="text-xs font-black text-black bg-[#FFD100]/40 px-2.5 py-0.5 rounded-full border border-black/10">
                    {order.preferredTime || (isDelivery ? 'ETA: 35–45 mins' : 'ETA: 15–20 mins')}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-2.5 rounded-xl bg-white border border-emerald-500 shadow-2xs">
                    <div className="w-7 h-7 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black mb-1">
                      ✓
                    </div>
                    <div className="text-[11px] font-black text-emerald-900">Order Sent</div>
                    <div className="text-[9px] text-zinc-600 font-semibold">Received at shop</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FFD100]/25 border-2 border-black shadow-2xs">
                    <div className="w-7 h-7 mx-auto rounded-full bg-[#FFD100] text-black border border-black flex items-center justify-center text-xs font-black mb-1 animate-pulse">
                      🔥
                    </div>
                    <div className="text-[11px] font-black text-black">On The Grill</div>
                    <div className="text-[9px] text-zinc-700 font-semibold">Fresh basting</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-zinc-300 shadow-2xs">
                    <div className="w-7 h-7 mx-auto rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center text-xs font-black mb-1">
                      {isDelivery ? (
                        <DeliveryMotorbikeIcon className="w-4 h-4 text-black" />
                      ) : (
                        <span>🛍️</span>
                      )}
                    </div>
                    <div className="text-[11px] font-black text-black">
                      {isDelivery ? 'Driver En Route' : 'Ready for Pickup'}
                    </div>
                    <div className="text-[9px] text-zinc-500 font-medium">
                      {isDelivery ? 'To your door' : 'At Hillcrest counter'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pickup / Delivery Information */}
              <div className="p-4 rounded-2xl bg-zinc-100 border border-zinc-300 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-black" />
                    <span>{isDelivery ? 'Delivery Destination' : 'Store Collection Point'}</span>
                  </span>
                  <span className="text-xs text-zinc-500 font-bold">Ref: #{order.orderId}</span>
                </div>

                {!isDelivery ? (
                  <div className="text-xs text-zinc-700 space-y-1">
                    <div className="text-sm font-black text-black">{order.store.name}</div>
                    <div className="text-zinc-600 font-medium">{order.store.address} • {order.store.landmark}</div>
                    <div className="text-[11px] text-emerald-800 font-black">{order.store.hours}</div>
                    <div className="pt-2 flex gap-2">
                      {order.store.googleMapsUrl && (
                        <a
                          href={order.store.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs flex items-center justify-center gap-1.5 border border-zinc-300 shadow-xs"
                        >
                          <Navigation className="w-3.5 h-3.5 text-blue-600" />
                          <span>Get Directions</span>
                        </a>
                      )}
                      <a
                        href={`tel:${order.store.phone}`}
                        className="py-2 px-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs flex items-center justify-center gap-1.5 border border-zinc-300 shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Call Shop</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-zinc-700 space-y-1">
                    <div className="text-sm font-black text-black">{order.customer.address}</div>
                    <div className="text-zinc-600 font-medium">{order.customer.suburb}, Durban</div>
                    {order.customer.complexOrUnit && (
                      <div className="text-black font-bold">Unit: {order.customer.complexOrUnit}</div>
                    )}
                    {order.customer.gateCode && (
                      <div className="text-black font-bold">🔑 Gate Code: {order.customer.gateCode}</div>
                    )}
                    {order.customer.notes && (
                      <div className="italic text-zinc-600 pt-0.5">"{order.customer.notes}"</div>
                    )}
                  </div>
                )}
              </div>

              {/* Order Items Summary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-black">
                    Your Feast ({order.items.length} items)
                  </h3>
                  <button
                    type="button"
                    onClick={handleCopyOrder}
                    className="text-xs font-bold text-zinc-600 hover:text-black flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-zinc-100 border border-zinc-300 flex items-start justify-between text-xs shadow-xs"
                    >
                      <div>
                        <span className="font-black text-black text-sm">
                          {item.quantity}x {item.menuItem.name}
                        </span>
                        <div className="text-[11px] text-zinc-700 mt-1 space-y-0.5">
                          {item.customization?.flavour && (
                            <div className="text-black font-black bg-[#FFD100]/40 px-1.5 py-0.5 rounded inline-block text-[10px] mr-1 capitalize">
                              Baste: {item.customization.flavour}
                            </div>
                          )}
                          {item.customization?.side && (
                            <div className="font-semibold text-zinc-700">Side: {item.customization.side}</div>
                          )}
                          {item.customization?.extras?.map((e) => (
                            <div key={e.name} className="text-zinc-600 font-medium">+ {e.name}</div>
                          ))}
                          {item.customization?.notes && (
                            <div className="italic text-zinc-500">"{item.customization.notes}"</div>
                          )}
                        </div>
                      </div>
                      <span className="font-black text-black text-sm">R{(typeof item.itemTotal === 'number' ? item.itemTotal : (item.menuItem?.price ? item.menuItem.price * (item.quantity || 1) : 0)).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Totals Card */}
              <div className="p-4 rounded-2xl bg-zinc-100 border border-zinc-300 space-y-2 text-xs text-zinc-700">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-zinc-600">Subtotal</span>
                  <span className="text-black font-black text-sm">R{(typeof order.subtotal === 'number' ? order.subtotal : order.grandTotal || 0).toFixed(2)}</span>
                </div>
                {isDelivery && (
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-zinc-600">Local Delivery Fee</span>
                    <span className="text-black font-black text-sm">R{(typeof order.deliveryFee === 'number' ? order.deliveryFee : 0).toFixed(2)}</span>
                  </div>
                )}
                {isDelivery && typeof order.tip === 'number' && order.tip > 0 && (
                  <div className="flex justify-between items-center text-black font-bold">
                    <span>Driver Tip</span>
                    <span>+R{order.tip.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm sm:text-base font-black text-black pt-2.5 border-t border-zinc-300">
                  <span className="uppercase tracking-wider">Total Paid / Due</span>
                  <span className="text-lg font-black text-black bg-[#FFD100] px-3 py-1 rounded-xl border border-black/10">
                    R{(typeof order.grandTotal === 'number' ? order.grandTotal : 0).toFixed(2)}
                  </span>
                </div>
                <div className="pt-1.5 text-xs text-zinc-700 font-semibold flex items-center justify-between">
                  <span>Payment Method:</span>
                  <span className="uppercase font-black text-black">
                    {order.paymentMethod === 'payfast'
                      ? 'PayFast (EFT / Card)'
                      : order.paymentMethod === 'yoco'
                      ? 'Yoco Checkout'
                      : order.paymentMethod === 'cod'
                      ? 'Pay on Handover (Cash / Card)'
                      : 'WhatsApp Direct'}
                  </span>
                </div>
              </div>
            </>
          ) : (
            /* Staff & Delivery Driver View */
            <div className="space-y-4">
              {isDelivery ? (
                <div className="p-4 rounded-2xl bg-zinc-100 border border-zinc-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-black" />
                      <span>Delivery Driver Navigation</span>
                    </span>
                    <span className="text-[10px] bg-emerald-600 text-white font-black px-2 py-0.5 rounded-full uppercase">
                      1-TAP GPS
                    </span>
                  </div>

                  <div className="text-xs text-zinc-700 space-y-0.5 pt-1">
                    <div className="font-black text-black text-sm">{order.customer.address}</div>
                    <div className="text-zinc-600 font-semibold">{order.customer.suburb}, Durban, South Africa</div>
                    {order.customer.complexOrUnit && (
                      <div className="text-black font-bold">Unit: {order.customer.complexOrUnit}</div>
                    )}
                    {order.customer.gateCode && (
                      <div className="text-black font-bold">🔑 Gate Code: {order.customer.gateCode}</div>
                    )}
                    {order.customer.notes && (
                      <div className="italic text-zinc-500 pt-1">"{order.customer.notes}"</div>
                    )}
                  </div>

                  {/* GPS Routing Buttons */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-transform hover:scale-105"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Google Maps</span>
                    </a>

                    <a
                      href={wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-transform hover:scale-105"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Waze GPS</span>
                    </a>
                  </div>

                  {/* Call Customer Direct */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`tel:${order.customer.phone}`}
                      className="py-2 px-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs flex items-center justify-center gap-1.5 border border-zinc-300 shadow-xs"
                    >
                      <Phone className="w-3 h-3 text-emerald-600" />
                      <span>Call Customer</span>
                    </a>

                    <a
                      href={`https://wa.me/${customerPhoneInternational}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs flex items-center justify-center gap-1.5 border border-zinc-300 shadow-xs"
                    >
                      <MessageSquare className="w-3 h-3 text-emerald-600" />
                      <span>Customer WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-zinc-100 border border-zinc-300 space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-black" />
                    <span>Store Pickup Counter Ticket</span>
                  </span>
                  <div className="text-xs text-zinc-700 space-y-0.5">
                    <div>Customer: <strong className="text-black">{order.customer.customerName}</strong></div>
                    <div>Phone: <strong className="text-black">{order.customer.phone}</strong></div>
                    <div>Collection Store: <strong className="text-black">{order.store.name}</strong></div>
                  </div>
                </div>
              )}

              {/* Kitchen Checklist */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-black">
                  Kitchen Bag & Order Checklist
                </h3>
                <div className="space-y-1.5">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-zinc-100 border border-zinc-300 flex items-start justify-between text-xs shadow-xs"
                    >
                      <div>
                        <span className="font-black text-black">
                          {item.quantity}x {item.menuItem.name}
                        </span>
                        <div className="text-[11px] text-zinc-700 mt-1">
                          {item.customization?.flavour && (
                            <span className="text-black font-black bg-[#FFD100]/40 px-1.5 py-0.5 rounded mr-2 capitalize">
                              Baste: {item.customization.flavour}
                            </span>
                          )}
                          {item.customization?.side && <span className="font-semibold text-zinc-700">Side: {item.customization.side}</span>}
                        </div>
                      </div>
                      <span className="font-black text-black">R{item.itemTotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-4 rounded-2xl bg-[#FFD100] hover:bg-[#e6bd00] text-black font-black text-sm sm:text-base tracking-wide shadow-md border-2 border-black transition-all cursor-pointer"
          >
            Done & Return to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Phone, Check, Menu, X, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DeliveryMotorbikeIcon } from './icons/DeliveryMotorbikeIcon';
import { PageView } from '../types';
import { subscribeToOrders, getCurrentOrderId } from '../services/orderService';

export interface NavbarProps {
  onOpenStoreModal?: () => void;
  currentView: PageView;
  onNavigate: (view: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { totalItemCount, grandTotal, setIsCartOpen, orderMode, setOrderMode } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(getCurrentOrderId());

  useEffect(() => {
    const unsub = subscribeToOrders((orders) => {
      const myOrderId = getCurrentOrderId();
      if (!myOrderId) {
        setActiveOrderId(null);
        return;
      }
      const cleanMyId = myOrderId.replace('#', '').trim();
      const myOrder = orders.find(
        (o) => o.orderId === myOrderId || o.orderId?.replace('#', '').trim() === cleanMyId
      );
      if (myOrder && myOrder.status !== 'completed' && myOrder.status !== 'cancelled') {
        setActiveOrderId(myOrder.orderId);
      } else {
        setActiveOrderId(null);
      }
    });
    return unsub;
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* LEFT: AFRO'S WORDMARK LOGO */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('main')}
              className="flex items-center gap-2 group text-left cursor-pointer"
              title="Afro's Chicken Shop (Hillcrest)"
            >
              <img
                src="/assets/afros/logos/afros-logo.png"
                alt="Afro's Chicken"
                className="h-9 sm:h-11 w-auto object-contain transform group-hover:scale-102 transition-transform"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="hidden sm:inline-block text-[11px] font-black text-zinc-400 uppercase tracking-widest pl-2 border-l border-zinc-200">
                Hillcrest
              </span>
            </button>
          </div>

          {/* CENTER / RIGHT: FRANCHISE NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-black-grotesque uppercase text-sm tracking-wider text-black">
            {/* HOWZIT - Direct link to Main Landing Page as instructed */}
            <button
              type="button"
              onClick={() => onNavigate('main')}
              className={`py-2 hover:text-[#b89500] transition-colors cursor-pointer ${
                currentView === 'main' ? 'border-b-2 border-[#FFD100]' : ''
              }`}
            >
              HOWZIT
            </button>

            {/* MENU LINK */}
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className={`py-2 hover:text-[#b89500] transition-colors cursor-pointer ${
                currentView === 'menu' ? 'border-b-2 border-[#FFD100]' : ''
              }`}
            >
              MENU
            </button>

            {/* SHOPS / HILLCREST STORE */}
            <button
              type="button"
              onClick={() => {
                if (currentView !== 'main') {
                  onNavigate('main');
                  setTimeout(() => {
                    document.getElementById('hillcrest-shop')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                } else {
                  document.getElementById('hillcrest-shop')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="py-2 hover:text-[#b89500] transition-colors cursor-pointer"
            >
              SHOPS
            </button>

            {/* TRACK ORDER */}
            <button
              type="button"
              onClick={() => onNavigate('track')}
              className={`py-2 text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentView === 'track' ? 'text-black border-b-2 border-[#FFD100]' : 'text-zinc-600 hover:text-black'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>TRACK</span>
              {activeOrderId && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />}
            </button>
          </nav>

          {/* RIGHT ACTIONS: CART & MOBILE TOGGLE */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Phone link on larger screens */}
            <a
              href="tel:0789057975"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-xs font-black text-black transition-colors border border-zinc-200"
            >
              <Phone className="w-3 h-3 text-black" />
              <span>078 905 7975</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black shadow-md shadow-[#FFD100]/25 transition-all hover:scale-102 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 fill-black stroke-black" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center">
                    {totalItemCount}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm tracking-tight font-black hidden xs:inline">
                {totalItemCount > 0 ? `R${grandTotal.toFixed(2)}` : 'CART'}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-black transition-colors cursor-pointer flex md:hidden items-center justify-center border border-zinc-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU ACCORDION */}
        {mobileMenuOpen && (
          <div className="bg-white border-t border-zinc-200 px-4 py-4 shadow-xl md:hidden">
            <div className="grid grid-cols-2 gap-2 text-center mb-3 font-black text-xs uppercase">
              <button
                type="button"
                onClick={() => {
                  onNavigate('main');
                  setMobileMenuOpen(false);
                }}
                className={`py-3 px-3 rounded-xl border transition-all ${
                  currentView === 'main'
                    ? 'bg-[#FFD100] text-black border-[#FFD100]'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                }`}
              >
                HOWZIT
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate('menu');
                  setMobileMenuOpen(false);
                }}
                className={`py-3 px-3 rounded-xl border transition-all ${
                  currentView === 'menu'
                    ? 'bg-[#FFD100] text-black border-[#FFD100]'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                }`}
              >
                MENU
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate('about');
                  setMobileMenuOpen(false);
                }}
                className={`py-3 px-3 rounded-xl border transition-all ${
                  currentView === 'about'
                    ? 'bg-[#FFD100] text-black border-[#FFD100]'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                }`}
              >
                ABOUT US
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate('functions');
                  setMobileMenuOpen(false);
                }}
                className={`py-3 px-3 rounded-xl border transition-all ${
                  currentView === 'functions'
                    ? 'bg-[#FFD100] text-black border-[#FFD100]'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                }`}
              >
                FUNCTIONS
              </button>
            </div>

            <button
              onClick={() => {
                onNavigate('track');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-3 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 mb-3 ${
                currentView === 'track'
                  ? 'bg-[#FFD100] text-black border-[#FFD100]'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Track Active Order</span>
              {activeOrderId && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />}
            </button>

            <div className="pt-2 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-600">
              <span>📍 Shop 5, The Junction, Hillcrest</span>
              <a href="tel:0789057975" className="text-black font-extrabold">
                Call 078 905 7975
              </a>
            </div>
          </div>
        )}

        {/* ORDER MODE TOGGLE (COLLECTION / DELIVERY) - VISIBLE ON MENU PAGE */}
        {currentView === 'menu' && (
          <div className="px-4 sm:px-6 py-2 bg-zinc-50 border-t border-zinc-200">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-zinc-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setOrderMode('collection')}
                  className={`px-3 py-1 rounded-lg text-xs font-black uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                    orderMode === 'collection'
                      ? 'bg-[#FFD100] text-black shadow-2xs'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  <span>🛍️ Collect</span>
                  {orderMode === 'collection' && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderMode('delivery')}
                  className={`px-3 py-1 rounded-lg text-xs font-black uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                    orderMode === 'delivery'
                      ? 'bg-[#FFD100] text-black shadow-2xs'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  <DeliveryMotorbikeIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>Delivery</span>
                  {orderMode === 'delivery' && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
              </div>

              <span className="text-zinc-500 hidden sm:inline text-xs font-medium">
                📍 Shop 5, The Junction, 5 Inanda Rd, Hillcrest
              </span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

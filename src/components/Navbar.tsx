import React, { useState, useEffect } from 'react';
import { ShoppingBag, Phone, Clock, Check, Menu, X, Package, Home, Utensils, Info, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORES } from '../data/stores';
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

  const navLinks = [
    { id: 'main' as PageView, label: 'Main', icon: Home },
    { id: 'menu' as PageView, label: 'Menu', icon: Utensils },
    { id: 'about' as PageView, label: 'About Us', icon: Info },
    { id: 'functions' as PageView, label: 'Functions', icon: Calendar },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#141418]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* LOGO & BRAND */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => onNavigate('main')}
              className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-[#FFD100] p-1 flex items-center justify-center shadow-lg shadow-[#FFD100]/20 transform group-hover:scale-105 transition-transform">
                <img
                  src="/assets/afros/logos/afros-logo-round-yellow-bg-300x300.png"
                  alt="Afro's Chicken Shop"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden xs:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-white uppercase group-hover:text-[#FFD100] transition-colors leading-none">
                    Afro’s Chicken
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#FFD100] uppercase tracking-wider block mt-0.5">
                  Shop 5, The Junction • Hillcrest
                </span>
              </div>
            </button>
          </div>

          {/* DESKTOP NAV TABS */}
          <nav className="hidden md:flex items-center gap-1 bg-black/40 p-1.5 rounded-2xl border border-white/10">
            {navLinks.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#FFD100] text-black shadow-md shadow-[#FFD100]/20'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {/* Track Order Desktop Button */}
            <button
              onClick={() => onNavigate('track')}
              className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                currentView === 'track'
                  ? 'bg-[#FFD100] text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Track</span>
              {activeOrderId && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
            </button>
          </nav>

          {/* RIGHT ACTIONS: CART & MOBILE TOGGLE */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Phone link on larger screens */}
            <a
              href="tel:0789057975"
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-bold text-zinc-300 hover:text-[#FFD100] hover:border-[#FFD100]/50 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFD100]" />
              <span>078 905 7975</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black shadow-lg shadow-[#FFD100]/25 transition-all hover:scale-105 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 fill-black" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-[#FFD100] text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-[#FFD100]">
                    {totalItemCount}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm tracking-tight font-black hidden xs:inline">
                {totalItemCount > 0 ? `R${grandTotal.toFixed(2)}` : 'Cart'}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-xl bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer flex md:hidden items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU ACCORDION / SUBHEADER */}
        {mobileMenuOpen && (
          <div className="bg-zinc-950/98 border-t border-b border-white/10 px-4 py-3 shadow-2xl backdrop-blur-md md:hidden">
            <div className="grid grid-cols-2 gap-2 text-center mb-3">
              {navLinks.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentView === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onNavigate(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2.5 px-3 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      isActive
                        ? 'bg-[#FFD100] text-black border-[#FFD100] shadow-md shadow-[#FFD100]/20'
                        : 'bg-zinc-900 border-white/10 text-zinc-300 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                onNavigate('track');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-3 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 mb-2 ${
                currentView === 'track'
                  ? 'bg-[#FFD100] text-black border-[#FFD100]'
                  : 'bg-zinc-900 border-white/10 text-zinc-300 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Track Active Order</span>
              {activeOrderId && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
            </button>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
              <span>Hillcrest Shop</span>
              <a href="tel:0789057975" className="text-[#FFD100] font-bold">
                Call 078 905 7975
              </a>
            </div>
          </div>
        )}

        {/* ORDER MODE TOGGLE (COLLECTION / DELIVERY) - ONLY VISIBLE ON MENU PAGE */}
        {currentView === 'menu' && (
          <div className="px-4 sm:px-6 py-2 bg-black/70 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setOrderMode('collection')}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    orderMode === 'collection'
                      ? 'bg-[#FFD100] text-black shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>🛍️ Collect</span>
                  {orderMode === 'collection' && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderMode('delivery')}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    orderMode === 'delivery'
                      ? 'bg-[#FFD100] text-black shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <DeliveryMotorbikeIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>Delivery</span>
                  {orderMode === 'delivery' && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
              </div>

              <span className="text-zinc-400 hidden sm:inline text-[11px]">
                📍 Shop 5, The Junction, 5 Inanda Rd, Hillcrest
              </span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

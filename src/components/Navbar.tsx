import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Phone, Check, Menu, X, Package, ChevronDown } from 'lucide-react';
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
  const [howzitDropdownOpen, setHowzitDropdownOpen] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(getCurrentOrderId());
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleMouseEnterHowzit = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setHowzitDropdownOpen(true);
  };

  const handleMouseLeaveHowzit = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setHowzitDropdownOpen(false);
    }, 150);
  };

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
                className="h-10 sm:h-12 w-auto object-contain transform group-hover:scale-102 transition-transform"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="hidden sm:inline-block text-[12px] font-black text-zinc-400 uppercase tracking-widest pl-2 border-l border-zinc-200">
                Hillcrest
              </span>
            </button>
          </div>

          {/* CENTER / RIGHT: FRANCHISE NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 font-black-grotesque uppercase text-[17px] sm:text-[18px] tracking-wide text-black">
            {/* HOWZIT WITH DROPDOWN MENU */}
            <div
              className="relative py-2"
              onMouseEnter={handleMouseEnterHowzit}
              onMouseLeave={handleMouseLeaveHowzit}
            >
              <button
                type="button"
                onClick={() => {
                  onNavigate('main');
                  setHowzitDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer font-black font-black-grotesque uppercase text-[17px] sm:text-[18px] tracking-wide ${
                  currentView === 'main' || ['about', 'team', 'functions', 'contact'].includes(currentView)
                    ? 'border-b-4 border-[#FFD100] text-black pb-0.5'
                    : 'text-black hover:text-[#b89500]'
                }`}
              >
                <span>HOWZIT</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    howzitDropdownOpen ? 'rotate-180 text-black' : 'text-zinc-700'
                  }`}
                />
              </button>

              {/* HOWZIT DROPDOWN PANEL */}
              {howzitDropdownOpen && (
                <div
                  className="absolute left-0 top-full pt-1 z-50 animate-fadeIn"
                  onMouseEnter={handleMouseEnterHowzit}
                  onMouseLeave={handleMouseLeaveHowzit}
                >
                  <div className="bg-white border border-zinc-200 shadow-xl min-w-[210px] py-1">
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('about');
                        setHowzitDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-[14px] font-black font-black-grotesque tracking-wider uppercase transition-colors cursor-pointer ${
                        currentView === 'about'
                          ? 'bg-[#FFD100] text-black'
                          : 'text-black hover:bg-zinc-100 hover:text-[#b89500]'
                      }`}
                    >
                      ABOUT US
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('team');
                        setHowzitDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-[14px] font-black font-black-grotesque tracking-wider uppercase transition-colors cursor-pointer ${
                        currentView === 'team'
                          ? 'bg-[#FFD100] text-black'
                          : 'text-black hover:bg-zinc-100 hover:text-[#b89500]'
                      }`}
                    >
                      OUR TEAM
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('functions');
                        setHowzitDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-[14px] font-black font-black-grotesque tracking-wider uppercase transition-colors cursor-pointer ${
                        currentView === 'functions'
                          ? 'bg-[#FFD100] text-black'
                          : 'text-black hover:bg-zinc-100 hover:text-[#b89500]'
                      }`}
                    >
                      FUNCTIONS
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('contact');
                        setHowzitDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-[14px] font-black font-black-grotesque tracking-wider uppercase transition-colors cursor-pointer ${
                        currentView === 'contact'
                          ? 'bg-[#FFD100] text-black'
                          : 'text-black hover:bg-zinc-100 hover:text-[#b89500]'
                      }`}
                    >
                      CONTACT US
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* MENU LINK */}
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className={`py-1 hover:text-[#b89500] transition-colors cursor-pointer font-black font-black-grotesque uppercase text-[17px] sm:text-[18px] tracking-wide ${
                currentView === 'menu' ? 'border-b-4 border-[#FFD100] pb-0.5' : ''
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
              className="py-1 hover:text-[#b89500] transition-colors cursor-pointer font-black font-black-grotesque uppercase text-[17px] sm:text-[18px] tracking-wide"
            >
              SHOPS
            </button>

            {/* TRACK ORDER */}
            <button
              type="button"
              onClick={() => onNavigate('track')}
              className={`py-1 text-[15px] sm:text-[16px] flex items-center gap-1.5 transition-colors cursor-pointer font-black font-black-grotesque uppercase tracking-wide ${
                currentView === 'track' ? 'text-black border-b-4 border-[#FFD100] pb-0.5' : 'text-zinc-600 hover:text-black'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>TRACK</span>
              {activeOrderId && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />}
            </button>
          </nav>

          {/* RIGHT ACTIONS: CART & MOBILE TOGGLE */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Phone link on larger screens */}
            <a
              href="tel:0789057975"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-xs font-black text-black transition-colors border border-zinc-200"
            >
              <Phone className="w-3.5 h-3.5 text-black" />
              <span>078 905 7975</span>
            </a>

            {/* Cart Trigger Button (Desktop & Tablet) */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="hidden sm:flex relative items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black shadow-md shadow-[#FFD100]/25 transition-all hover:scale-102 cursor-pointer"
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

            {/* Mobile Menu Toggle - Matching Reference Header (3 clean horizontal lines, borderless) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black cursor-pointer flex md:hidden items-center justify-center focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <div className="w-7 h-5 flex flex-col justify-between">
                <span
                  className={`block h-[3.5px] w-full bg-black rounded-full transition-transform duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''
                  }`}
                />
                <span
                  className={`block h-[3.5px] w-full bg-black rounded-full transition-opacity duration-200 ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-[3.5px] w-full bg-black rounded-full transition-transform duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE MENU ACCORDION */}
        {mobileMenuOpen && (
          <div className="bg-white border-t border-zinc-200 px-4 py-5 shadow-2xl md:hidden animate-fadeIn">
            <div className="flex flex-col space-y-2 mb-4 font-black font-black-grotesque text-sm uppercase">
              <button
                type="button"
                onClick={() => {
                  onNavigate('main');
                  setMobileMenuOpen(false);
                }}
                className={`py-3 px-4 rounded-xl border text-left font-black tracking-wider transition-all flex items-center justify-between ${
                  currentView === 'main'
                    ? 'bg-[#FFD100] text-black border-[#FFD100]'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                }`}
              >
                <span>HOWZIT (HOME)</span>
                <span>→</span>
              </button>

              {/* Sub-pages under Howzit */}
              <div className="grid grid-cols-2 gap-2 pl-2">
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('about');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-black tracking-wide transition-all ${
                    currentView === 'about'
                      ? 'bg-[#FFD100] text-black border-[#FFD100]'
                      : 'bg-white border-zinc-200 text-zinc-800'
                  }`}
                >
                  ABOUT US
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate('team');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-black tracking-wide transition-all ${
                    currentView === 'team'
                      ? 'bg-[#FFD100] text-black border-[#FFD100]'
                      : 'bg-white border-zinc-200 text-zinc-800'
                  }`}
                >
                  OUR TEAM
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate('functions');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-black tracking-wide transition-all ${
                    currentView === 'functions'
                      ? 'bg-[#FFD100] text-black border-[#FFD100]'
                      : 'bg-white border-zinc-200 text-zinc-800'
                  }`}
                >
                  FUNCTIONS
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate('contact');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-black tracking-wide transition-all ${
                    currentView === 'contact'
                      ? 'bg-[#FFD100] text-black border-[#FFD100]'
                      : 'bg-white border-zinc-200 text-zinc-800'
                  }`}
                >
                  CONTACT US
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onNavigate('menu');
                  setMobileMenuOpen(false);
                }}
                className={`py-3 px-4 rounded-xl border text-left font-black tracking-wider transition-all flex items-center justify-between ${
                  currentView === 'menu'
                    ? 'bg-[#FFD100] text-black border-[#FFD100]'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                }`}
              >
                <span>MENU</span>
                <span>→</span>
              </button>

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
                  setMobileMenuOpen(false);
                }}
                className="py-3 px-4 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 text-left font-black tracking-wider flex items-center justify-between"
              >
                <span>SHOPS (HILLCREST)</span>
                <span>📍</span>
              </button>
            </div>

            {/* Mobile Cart Trigger inside drawer */}
            <button
              onClick={() => {
                setIsCartOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#FFD100] text-black font-black font-black-grotesque text-xs uppercase tracking-wider flex items-center justify-between shadow-md mb-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 fill-black stroke-black" />
                <span>View Cart</span>
              </div>
              <span>{totalItemCount > 0 ? `${totalItemCount} items • R${grandTotal.toFixed(2)}` : 'Empty'}</span>
            </button>

            <button
              onClick={() => {
                onNavigate('track');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-3 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 mb-3 ${
                currentView === 'track'
                  ? 'bg-black text-white border-black'
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

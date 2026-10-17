import React from 'react';
import { SOCIAL_LINKS, STORES } from '../data/stores';
import { TikTokIcon } from './icons/TikTokIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { MapPin, Phone, Mail, Clock, Heart, ShieldCheck, Flame, Utensils, Info, Calendar } from 'lucide-react';
import { LegalTab } from './LegalModal';
import { PageView } from '../types';

interface FooterProps {
  onOpenLegal: (tab: LegalTab) => void;
  onNavigate?: (view: PageView) => void;
  onOpenStaffLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onNavigate, onOpenStaffLogin }) => {
  const store = STORES[0];

  const handleNav = (view: PageView) => {
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#2D2D2D] text-zinc-300 pt-7 pb-8 sm:pt-9 sm:pb-10 relative overflow-hidden border-t-4 border-[#FFD100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => handleNav('main')}
              className="flex items-center gap-3.5 text-left cursor-pointer group"
            >
              <img
                src="/assets/afros/logos/afros-logo-round-yellow-bg.png"
                alt="Afro's Chicken Shop"
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-full shadow-lg group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-sm font-black text-white uppercase tracking-wider font-black-grotesque">
                  Afro's Chicken Shop
                </span>
                <span className="text-xs font-black text-[#FFD100] uppercase tracking-widest">
                  Hillcrest
                </span>
              </div>
            </button>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-medium">
              Founded in 2012 as a food truck on the Durban beachfront. We believe in fresh, uncomplicated food made well
              with the best ingredients: fresh never-frozen chicken and real hand-cut potato tjips.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href={SOCIAL_LINKS.whatsappDirect}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#2D2D2D] hover:bg-[#383838] border border-white/20 text-xs font-black text-[#FFD100] hover:text-[#ffe14d] transition-colors flex items-center gap-1.5"
              >
                <span>WhatsApp: 078 905 7975</span>
              </a>
              <a
                href="https://www.facebook.com/afroschicken"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#2D2D2D] hover:bg-[#383838] border border-white/20 text-xs font-bold text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.tiktok.com/@afroschicken"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#2D2D2D] hover:bg-[#383838] border border-white/20 text-xs font-bold text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3 font-bold">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('main')}
                  className="text-zinc-400 hover:text-[#FFD100] transition-colors cursor-pointer text-left font-bold"
                >
                  🏠 Home Page
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('menu')}
                  className="text-zinc-400 hover:text-[#FFD100] transition-colors cursor-pointer text-left font-bold"
                >
                  🍗 Online Food Menu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="text-zinc-400 hover:text-[#FFD100] transition-colors cursor-pointer text-left font-bold"
                >
                  📖 About Us (Keep Things Simple)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('functions')}
                  className="text-zinc-400 hover:text-[#FFD100] transition-colors cursor-pointer text-left font-bold"
                >
                  🎉 Functions &amp; Catering
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('track')}
                  className="text-zinc-400 hover:text-[#FFD100] transition-colors cursor-pointer text-left font-bold"
                >
                  📦 Track Live Order
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hillcrest Shop Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Hillcrest Store</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFD100] shrink-0 mt-0.5" />
                <div>
                  <div className="font-extrabold text-white">Shop 5, The Junction</div>
                  <div className="text-zinc-400">5 Inanda Road</div>
                  <div className="text-zinc-500">Hillcrest, 3650</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#FFD100] shrink-0" />
                <span className="text-zinc-300 font-semibold">Monday – Sunday: 10:00 – 20:00</span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#FFD100] shrink-0" />
                <a href="tel:0789057975" className="text-white font-black hover:text-[#FFD100]">
                  078 905 7975
                </a>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-4 h-4 text-[#FFD100] shrink-0" />
                <a href="mailto:info@afroschicken.co.za" className="text-zinc-300 hover:text-white font-medium">
                  info@afroschicken.co.za
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Safe Payments & Local Delivery */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Payment &amp; Delivery</h4>
            <div className="space-y-2 text-xs text-zinc-400 font-medium">
              <p>
                We accept PayFast Instant EFT, Debit/Credit Card, Cash on delivery/collection, and speedpoint on handover.
              </p>
              <div className="p-3 rounded-xl bg-[#2D2D2D] border border-white/20 space-y-1">
                <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFD100]" />
                  <span>Hillcrest Doorstep Delivery</span>
                </div>
                <div className="text-[10px] text-zinc-400">
                  Prompt delivery across Hillcrest, Kloof, Waterfall, Gillitts &amp; surrounding areas.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <div>© {new Date().getFullYear()} Afro's Chicken Shop (Hillcrest). All Rights Reserved.</div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenLegal('privacy')}
                className="text-zinc-400 hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer"
              >
                Privacy Policy (POPIA)
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onOpenLegal('terms')}
                className="text-zinc-400 hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer"
              >
                Terms of Service
              </button>
              {onOpenStaffLogin && (
                <>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={onOpenStaffLogin}
                    className="text-zinc-500 hover:text-[#FFD100] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                    title="Staff Portal (Kitchen, Driver &amp; Admin Access)"
                  >
                    <span>🔒 Staff Portal</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 font-bold">
            <span>Proudly Local</span>
            <Heart className="w-3.5 h-3.5 text-[#FFD100] fill-[#FFD100]" />
            <span>Durban Beachfront Heritage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { STORES, SOCIAL_LINKS } from '../data/stores';
import { TikTokIcon } from './icons/TikTokIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { useCart } from '../context/CartContext';
import { MapPin, Clock, Phone, Navigation, Check, Sparkles, X } from 'lucide-react';
import { StoreLocation } from '../types';

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreModal: React.FC<StoreModalProps> = ({ isOpen, onClose }) => {
  const { selectedStore, setSelectedStore } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white border border-zinc-200 shadow-2xl flex flex-col overflow-hidden text-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div>
            <h2 className="text-base sm:text-lg font-black text-black">Select Your Store</h2>
            <p className="text-xs text-zinc-500">Order from our flagship kitchen or preview expansion sites</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-500 hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-3">
          {STORES.map((store) => {
            const isSelected = selectedStore.id === store.id;
            const isActive = store.status === 'active';

            return (
              <div
                key={store.id}
                onClick={() => {
                  if (isActive) {
                    setSelectedStore(store);
                    onClose();
                  }
                }}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-rose-500/15 border-rose-500 ring-1 ring-rose-500'
                    : isActive
                    ? 'bg-zinc-50/80 hover:bg-zinc-800/80 border-zinc-200 cursor-pointer'
                    : 'bg-zinc-50/50 border-zinc-200 opacity-60'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-black">{store.name}</span>
                    {isActive ? (
                      <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                        OPEN NOW
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                        COMING SOON
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-700">{store.address}</div>
                  <div className="text-[11px] text-zinc-500 flex items-center gap-3 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {store.hours}
                    </span>
                    <span className="text-[#FFD100] font-semibold">{store.landmark}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-rose-500 text-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const StoreLocatorSection: React.FC = () => {
  const flagship = STORES[0];

  return (
    <section id="store-locator" className="py-14 sm:py-20 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-[#FFD100] text-xs font-black uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Store Location & Directions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight uppercase">
            VISIT OUR HILLCREST SHOP
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 font-medium">
            Fresh flame-grilled food served daily. Drop in for collection or order straight to your doorstep.
          </p>
        </div>

        {/* Flagship Store Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Flagship Store Details Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-md flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-block px-3 py-1 bg-[#FFD100] text-black text-xs font-black uppercase mb-3">
                HILLCREST STORE • NOW OPEN
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-black">{flagship.name}</h3>
              <p className="text-sm text-zinc-500 font-bold mt-1">{flagship.landmark}</p>

              <div className="space-y-4 pt-6 text-sm text-zinc-700">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-100 text-black shrink-0">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="font-extrabold text-black">Physical Address</div>
                    <div className="text-xs text-zinc-600 mt-0.5">{flagship.address}</div>
                    <div className="text-xs text-zinc-600">{flagship.city}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-100 text-black shrink-0">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="font-extrabold text-black">Opening Times</div>
                    <div className="text-xs text-zinc-600 mt-0.5">{flagship.hours}</div>
                    <div className="text-[11px] text-emerald-600 font-bold">Open Every Day of the Week</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-100 text-black shrink-0">
                    <Phone className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="font-extrabold text-black">Hotline & WhatsApp</div>
                    <div className="text-xs text-zinc-600 mt-0.5">{flagship.phone}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Direction Actions */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-200">
              <a
                href={
                  flagship.googleMapsUrl ||
                  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    'Afro’s Chicken Shop, Shop 5, The Junction, 5 Inanda Rd, Hillcrest'
                  )}`
                }
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl bg-[#FFD100] text-black font-black hover:bg-[#ffe14d] text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform hover:scale-105"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href={SOCIAL_LINKS.whatsappDirect}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-black font-bold text-xs flex items-center justify-center gap-1.5 border border-zinc-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Right: Map Embed & Expansion Roadmap */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Interactive Map Visual */}
            <div className="rounded-3xl overflow-hidden border border-zinc-200 bg-white shadow-md aspect-[16/9] relative">
              <iframe
                title="Afro’s Chicken Shop (Hillcrest) Location"
                src={
                  flagship.mapEmbedUrl ||
                  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1163.082511830803!2d30.85500734324751!3d-29.811872099023525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef6ff609bbeefc7%3A0xb1b982704527f3d7!2sWrap%20and%20Wing%20Co!5e1!3m2!1sen!2sza!4v1791152071878!5m2!1sen!2sza'
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full"
              />
              
              {/* Map Floating Card */}
              <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200 text-xs text-black flex items-center gap-3 shadow-md">
                <span className="w-3 h-3 rounded-full bg-[#FFD100] border border-black animate-ping shrink-0" />
                <div>
                  <div className="font-extrabold text-black">Shop 5, The Junction</div>
                  <div className="text-[11px] text-zinc-500">5 Inanda Rd, Hillcrest</div>
                </div>
              </div>
            </div>

            {/* Franchise Expansion Teaser */}
            <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-black bg-[#FFD100] px-2 py-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Expansion In Motion</span>
                </div>
                <h4 className="text-lg font-black text-black">More Branches Opening Across KZN</h4>
                <p className="text-xs text-zinc-600">
                  Targeting Westville, Umhlanga & Durban North. Follow our socials for opening dates!
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-black border border-zinc-300 transition-colors flex items-center gap-2"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

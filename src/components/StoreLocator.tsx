import React from 'react';
import { STORES, SOCIAL_LINKS } from '../data/stores';
import { useCart } from '../context/CartContext';
import { MapPin, Clock, Phone, Navigation, Check, X, ExternalLink } from 'lucide-react';
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
            className="p-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-black cursor-pointer"
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
                    ? 'bg-[#FFD100]/20 border-black ring-1 ring-black'
                    : isActive
                    ? 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 cursor-pointer'
                    : 'bg-zinc-50/50 border-zinc-200 opacity-60'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-black">{store.name}</span>
                    {isActive ? (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        OPEN NOW
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        COMING SOON
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-700">{store.address}</div>
                  <div className="text-[11px] text-zinc-500 flex items-center gap-3 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-600" />
                      {store.hours}
                    </span>
                    <span className="text-black font-semibold">{store.landmark}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-black text-[#FFD100] flex items-center justify-center shrink-0">
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
    <section id="store-locator" className="py-14 sm:py-20 bg-white border-t border-zinc-200">
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
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-zinc-100 border border-zinc-200 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-block px-3 py-1 bg-[#FFD100] text-black text-xs font-black uppercase mb-3">
                HILLCREST STORE • NOW OPEN
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-black">{flagship.name}</h3>
              <p className="text-sm text-zinc-500 font-bold mt-1">{flagship.landmark}</p>

              <div className="space-y-4 pt-6 text-sm text-zinc-700">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-zinc-200 shadow-sm text-black shrink-0">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="font-extrabold text-black">Physical Address</div>
                    <div className="text-xs text-zinc-600 mt-0.5">{flagship.address}</div>
                    <div className="text-xs text-zinc-600">{flagship.city}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-zinc-200 shadow-sm text-black shrink-0">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="font-extrabold text-black">Opening Times</div>
                    <div className="text-xs text-zinc-600 mt-0.5">{flagship.hours}</div>
                    <div className="text-[11px] text-emerald-600 font-bold">Open Every Day of the Week</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-zinc-200 shadow-sm text-black shrink-0">
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
                href={flagship.googleMapsUrl}
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
                className="py-3 px-4 rounded-xl bg-white hover:bg-zinc-50 text-black font-bold text-xs flex items-center justify-center gap-1.5 border border-zinc-300 shadow-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Right: Map Embed (fills full height to match left card) */}
          <div className="lg:col-span-7 h-full flex flex-col min-h-[380px] sm:min-h-[460px] lg:min-h-0">
            <div className="rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-100 shadow-sm relative w-full h-full flex-1">
              <iframe
                title="Afro’s Chicken Shop (Hillcrest) Location"
                src={
                  flagship.mapEmbedUrl ||
                  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d350!2d30.7652685!3d-29.7783477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef6fb073d7b934f%3A0x63b003b5b6fe8c7c!2sAfro%27s%20Chicken%20Shop%20(Hillcrest)!5e0!3m2!1sen!2sza!4v1792178000000!5m2!1sen!2sza'
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full absolute inset-0"
              />
              
              {/* Map Floating Card - Clicking opens Google Business page */}
              <a
                href={flagship.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 left-4 p-3 rounded-2xl bg-white/95 hover:bg-white backdrop-blur-md border border-zinc-200 text-xs text-black flex items-center gap-3 shadow-md z-10 transition-transform hover:scale-105 group"
                title="Open Afro's Chicken Shop (Hillcrest) on Google Maps"
              >
                <span className="w-3 h-3 rounded-full bg-[#FFD100] border border-black animate-ping shrink-0" />
                <div>
                  <div className="font-extrabold text-black flex items-center gap-1.5">
                    <span>Shop 5, The Junction</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-black transition-colors" />
                  </div>
                  <div className="text-[11px] text-zinc-500">5 Inanda Rd, Hillcrest · View in Maps</div>
                </div>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

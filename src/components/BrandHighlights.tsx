import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { FLAVOURS } from '../data/menuData';

export const BrandHighlights: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-[#FFD100] text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE AFRO’S CREED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight uppercase">
            Keep Things Simple. Done Right.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 font-medium">
            We don’t take shortcuts. Every meal is cooked fresh to order with real, honest ingredients.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3 hover:border-black transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FFD100]/25 text-black flex items-center justify-center text-xl font-black">
              🥔
            </div>
            <h3 className="text-base font-black text-black uppercase">Real Hand-Cut Tjips</h3>
            <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed font-medium">
              Hand-cut from real potatoes, skin-on, cooked golden and seasoned with pure sea salt. No processed fries.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3 hover:border-black transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FFD100]/25 text-black flex items-center justify-center text-xl font-black">
              🍗
            </div>
            <h3 className="text-base font-black text-black uppercase">100% Fresh Chicken</h3>
            <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed font-medium">
              Delivered fresh daily, never frozen. Charred over hot flames or fried crispy to seal in natural tenderness.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3 hover:border-black transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FFD100]/25 text-black flex items-center justify-center text-xl font-black">
              🔥
            </div>
            <h3 className="text-base font-black text-black uppercase">5 Durban Bastings</h3>
            <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed font-medium">
              From mild Lemony and Sweet Chilli to fiery Peri-Peri Chilli and the famous 50/50 blend.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3 hover:border-black transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FFD100]/25 text-black flex items-center justify-center text-xl font-black">
              🥗
            </div>
            <h3 className="text-base font-black text-black uppercase">Small-Batch Fresh Slaw</h3>
            <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed font-medium">
              Tossed every morning in small batches so it arrives crisp, cool and crunchy on your plate.
            </p>
          </div>
        </div>

        {/* 5 Flavours Bar */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-white border-2 border-black shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[11px] font-black uppercase tracking-wider text-black bg-[#FFD100] px-2 py-0.5">
                PICK YOUR BASTING
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-black uppercase">5 Signature Durban Flavours</h3>
              <p className="text-xs sm:text-[13px] text-zinc-600 max-w-md font-medium">
                Every chicken cut, burger, and strip portion can be basted in your favourite flavour.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full md:w-auto">
              {FLAVOURS.map((f) => (
                <div
                  key={f.id}
                  className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1 hover:border-black hover:scale-102 transition-all flex flex-col items-center shadow-2xs"
                >
                  <div className="w-10 h-10 relative flex items-center justify-center">
                    {f.badgeUrl ? (
                      <img src={f.badgeUrl} alt={f.name} className="w-full h-full object-contain filter drop-shadow-sm" />
                    ) : (
                      <span className="text-2xl">{f.emoji}</span>
                    )}
                  </div>
                  <div className="text-xs font-black text-black uppercase">{f.name}</div>
                  <div className="text-[10px] text-zinc-500 line-clamp-1">{f.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

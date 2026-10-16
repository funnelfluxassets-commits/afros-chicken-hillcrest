import React from 'react';
import { Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import { FLAVOURS } from '../data/menuData';

export const BrandHighlights: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#121215] to-[#18181B] border-t border-white/10 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#FFD100]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD100]/15 border border-[#FFD100]/30 text-[#FFD100] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Afro’s Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Keep Things Simple. Done Right.
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-2 font-medium">
            We don’t take shortcuts. Every meal is cooked fresh to order with real, honest ingredients.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-white/10 shadow-lg space-y-3 hover:border-[#FFD100]/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#FFD100]/15 border border-[#FFD100]/30 text-[#FFD100] flex items-center justify-center text-xl font-black">
              🥔
            </div>
            <h3 className="text-base font-black text-white">Real Hand-Cut Tjips</h3>
            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
              Hand-cut from real potatoes, skin-on, cooked golden and seasoned with pure sea salt. No processed fries.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-white/10 shadow-lg space-y-3 hover:border-[#FFD100]/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#FFD100]/15 border border-[#FFD100]/30 text-[#FFD100] flex items-center justify-center text-xl font-black">
              🍗
            </div>
            <h3 className="text-base font-black text-white">100% Fresh Chicken</h3>
            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
              Delivered fresh daily, never frozen. Charred over hot flames or fried crispy to seal in natural tenderness.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-white/10 shadow-lg space-y-3 hover:border-[#FFD100]/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#FFD100]/15 border border-[#FFD100]/30 text-[#FFD100] flex items-center justify-center text-xl font-black">
              🔥
            </div>
            <h3 className="text-base font-black text-white">5 Durban Bastings</h3>
            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
              From mild Lemony and Sweet Chilli to fiery Peri-Peri Chilli and the famous 50/50 blend.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-white/10 shadow-lg space-y-3 hover:border-[#FFD100]/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#FFD100]/15 border border-[#FFD100]/30 text-[#FFD100] flex items-center justify-center text-xl font-black">
              🥗
            </div>
            <h3 className="text-base font-black text-white">Small-Batch Fresh Slaw</h3>
            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
              Tossed every morning in small batches so it arrives crisp, cool and crunchy on your plate.
            </p>
          </div>
        </div>

        {/* 5 Flavours Bar */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-zinc-900/95 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#FFD100]">
                CHOOSE YOUR BASTING
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">5 Signature Durban Flavours</h3>
              <p className="text-xs sm:text-[13px] text-zinc-400 max-w-md">
                Every chicken cut, burger, and strip portion can be basted in your favourite flavour.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full md:w-auto">
              {FLAVOURS.map((f) => (
                <div
                  key={f.id}
                  className="p-3 rounded-2xl bg-black/60 border border-white/10 text-center space-y-1 hover:border-[#FFD100] hover:scale-105 transition-all flex flex-col items-center"
                >
                  <div className="w-10 h-10 relative flex items-center justify-center">
                    {f.badgeUrl ? (
                      <img src={f.badgeUrl} alt={f.name} className="w-full h-full object-contain filter drop-shadow" />
                    ) : (
                      <span className="text-2xl">{f.emoji}</span>
                    )}
                  </div>
                  <div className="text-xs font-black text-white uppercase">{f.name}</div>
                  <div className="text-[10px] text-zinc-400 line-clamp-1">{f.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

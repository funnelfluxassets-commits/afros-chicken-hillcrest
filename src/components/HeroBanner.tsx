import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-black min-h-[220px] sm:min-h-[260px] md:min-h-[300px] flex items-center justify-center py-10 sm:py-12">
      {/* Background Image using Afros Menu Header */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45"
        style={{
          backgroundImage: "url('/assets/afros/images/afros-menu-header.jpg')",
        }}
        aria-hidden="true"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-black/60 to-black/80 pointer-events-none" aria-hidden="true" />

      {/* Central Branded Box */}
      <div className="relative z-10 max-w-xl md:max-w-2xl w-[92%] sm:w-auto mx-auto px-6 sm:px-12 py-6 sm:py-8 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 shadow-2xl text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD100] text-black text-[11px] font-black uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          <span>Keep Things Simple</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight drop-shadow">
          Online Food Menu
        </h1>

        <div className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto font-medium space-y-0.5">
          <p className="text-[#FFD100] font-bold">
            100% Fresh Chicken • Hand-Cut Real Potato Tjips • 5 Signature Bastings
          </p>
          <p className="text-zinc-400 text-xs">
            Pick your favourite items, choose your basting sauce, and order for collection or delivery.
          </p>
        </div>
      </div>
    </section>
  );
};

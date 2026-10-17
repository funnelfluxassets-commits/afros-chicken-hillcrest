import React from 'react';
import { Sparkles } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-[#FFFBEB] py-10 sm:py-14">
      {/* Background with subtle Afro's menu texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage: "url('/assets/afros/images/afros-menu-header.jpg')",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-black text-[#FFD100] text-xs font-black uppercase tracking-widest shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PROPER FOOD • NO SHORTCUTS</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight uppercase leading-tight">
          Online Food Menu
        </h1>

        <div className="text-sm sm:text-base text-zinc-700 max-w-xl mx-auto font-medium space-y-1">
          <p className="font-extrabold text-black">
            100% Fresh Chicken • Real Hand-Cut Potato Tjips • 5 Signature Bastings
          </p>
          <p className="text-zinc-500 text-xs sm:text-sm">
            Cooked to order over hot flames. Choose collection at Shop 5, The Junction, or delivery to your door.
          </p>
        </div>
      </div>
    </section>
  );
};

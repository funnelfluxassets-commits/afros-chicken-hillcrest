import React from 'react';
import { Sparkles } from 'lucide-react';

export const BrandHighlights: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-[#FFD100] text-xs font-black uppercase tracking-wider mb-2.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>THE AFRO’S CREED</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight uppercase">
          Keep Things Simple. Done Right.
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 mt-2.5 font-medium max-w-xl mx-auto">
          We don’t take shortcuts. Every meal is cooked fresh to order with real, honest ingredients.
        </p>
      </div>
    </section>
  );
};

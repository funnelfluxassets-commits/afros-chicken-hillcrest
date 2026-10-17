import React, { useEffect } from 'react';
import { PageView } from '../types';

interface AboutViewProps {
  onNavigate: (view: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#FFD100] selection:text-black w-full max-w-full overflow-x-hidden pb-16">
      {/* ── 1. HERO BANNER WITH BURGER & "ABOUT US" ── */}
      <section className="relative w-full h-[260px] xs:h-[320px] sm:h-[400px] md:h-[460px] lg:h-[520px] overflow-hidden bg-[#F2C103] flex items-center justify-center">
        {/* Burger and Tjips Photo on Wooden Board with Yellow Studio Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/afros/pages/afros-about-hero.jpg')",
          }}
          aria-hidden="true"
        />

        {/* Big Bold White Centered "ABOUT US" Title */}
        <div className="relative z-10 text-center px-4 select-none pointer-events-none">
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-black font-black-grotesque uppercase text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)] leading-none">
            ABOUT US
          </h1>
        </div>
      </section>

      {/* ── 2. "KEEP THINGS SIMPLE" STORY SECTION ── */}
      <section className="bg-white py-16 sm:py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-4xl lg:max-w-5xl mx-auto text-center space-y-8 sm:space-y-10 md:space-y-12 text-zinc-900 font-medium-grotesque">
          {/* Main Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[62px] font-bold font-bold-grotesque tracking-tight text-black leading-tight">
            Keep Things <span className="text-[#00C4D6]">Simple</span>
          </h2>

          {/* Paragraph 1 */}
          <p className="text-lg sm:text-xl md:text-[22px] lg:text-[24px] leading-relaxed text-zinc-900">
            At Afro’s, we keep things simple — because simple, done right, is our mantra.
          </p>

          {/* Paragraph 2 */}
          <p className="text-lg sm:text-xl md:text-[22px] lg:text-[24px] leading-relaxed text-zinc-900">
            We use fresh, locally sourced ingredients and a small, focused menu to make sure every meal is consistent,
            high-quality, and full of flavour. No shortcuts. No unnecessary additives. Just proper food.
          </p>

          {/* Paragraph 3 */}
          <div className="space-y-2 sm:space-y-2.5 text-lg sm:text-xl md:text-[22px] lg:text-[24px] leading-relaxed text-zinc-900">
            <p>Our chips are hand-cut from real potatoes, skin on, cooked fresh, and seasoned with nothing but salt.</p>
            <p>Our coleslaw is made in small batches, every day, so it’s always crisp and fresh.</p>
          </div>

          {/* Paragraph 4 */}
          <div className="pt-1 sm:pt-2 space-y-2 sm:space-y-3 text-lg sm:text-xl md:text-[22px] lg:text-[24px] leading-relaxed text-zinc-900">
            <p>Everything we do is built around one idea:</p>
            <p>Give people restaurant-quality food — without the wait.</p>
            <p>Because when you’re short on time, you shouldn’t have to compromise on taste.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

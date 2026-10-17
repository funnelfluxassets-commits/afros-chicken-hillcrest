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
      <section className="relative w-full h-[280px] xs:h-[340px] sm:h-[420px] md:h-[480px] lg:h-[540px] overflow-hidden bg-[#F3CD17] flex items-center justify-center">
        {/* Burger and Tjips Photo on Wooden Board with Yellow Studio Background */}
        <div
          className="absolute inset-0 bg-cover bg-[position:center_38%] sm:bg-center"
          style={{
            backgroundImage: "url('/assets/afros/pages/afros-home-page-banner.png')",
          }}
          aria-hidden="true"
        />

        {/* Big Bold White Centered "ABOUT US" Title */}
        <div className="relative z-10 text-center px-4 select-none pointer-events-none">
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[102px] font-black font-black-grotesque uppercase text-white tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)] leading-none">
            ABOUT US
          </h1>
        </div>
      </section>

      {/* ── 2. "KEEP THINGS SIMPLE" STORY SECTION ── */}
      <section className="bg-white py-14 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-7 sm:space-y-8 text-zinc-800">
          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black font-black-grotesque tracking-tight text-black">
            Keep Things <span className="text-[#1CB9C0]">Simple</span>
          </h2>

          {/* Paragraph 1 */}
          <p className="text-sm sm:text-base md:text-[17px] leading-relaxed text-zinc-800">
            At Afro’s, we keep things simple — because simple, done right, is our mantra.
          </p>

          {/* Paragraph 2 */}
          <p className="text-sm sm:text-base md:text-[17px] leading-relaxed text-zinc-800">
            We use fresh, locally sourced ingredients and a small, focused menu to make sure every meal is consistent,
            high-quality, and full of flavour. No shortcuts. No unnecessary additives. Just proper food.
          </p>

          {/* Paragraph 3 */}
          <div className="space-y-1.5 text-sm sm:text-base md:text-[17px] leading-relaxed text-zinc-800">
            <p>Our chips are hand-cut from real potatoes, skin on, cooked fresh, and seasoned with nothing but salt.</p>
            <p>Our coleslaw is made in small batches, every day, so it’s always crisp and fresh.</p>
          </div>

          {/* Paragraph 4 */}
          <div className="pt-2 space-y-4 text-sm sm:text-base md:text-[17px] leading-relaxed text-zinc-800">
            <p className="font-medium text-zinc-800">Everything we do is built around one idea:</p>
            <p className="font-medium text-zinc-900">
              Give people restaurant-quality food — without the wait.
            </p>
            <p className="text-zinc-800">
              Because when you’re short on time, you shouldn’t have to compromise on taste.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

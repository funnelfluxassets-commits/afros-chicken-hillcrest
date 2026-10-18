import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { STORES } from '../data/stores';
import { CategoryId, MenuItem, PageView } from '../types';

interface MainViewProps {
  onNavigate: (view: PageView, categoryId?: CategoryId) => void;
  onSelectItem?: (item: MenuItem) => void;
}

export const MainView: React.FC<MainViewProps> = ({ onNavigate }) => {
  const store = STORES[0];
  const collageRef = useRef<HTMLDivElement>(null);
  const [seedOffsetY, setSeedOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (collageRef.current) {
            const rect = collageRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const scrollDistance = windowHeight - rect.top;
            if (scrollDistance > 0 && rect.bottom > 0) {
              // As user scrolls down, animate seeds upward behind the pops card
              const offset = Math.min(Math.max((scrollDistance * 0.16) - 25, 0), 115);
              setSeedOffsetY(offset);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#FFD100] selection:text-black w-full max-w-full overflow-x-hidden">
      {/* ── 1. HERO BANNER: THE REAL MAKOYA ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F3CD17] border-b border-black/10 w-full max-w-full">
        {/* DESKTOP HERO VIEW (md and larger screens) */}
        <div className="hidden md:block relative min-h-[580px] lg:min-h-[660px] xl:min-h-[720px] flex items-center">
          {/* Full-width authentic Afros hero image */}
          <div
            className="absolute inset-0 bg-cover bg-[center_top]"
            style={{
              backgroundImage: "url('/assets/afros/pages/afros-home-page-banner.webp')",
            }}
            aria-hidden="true"
          />

          {/* 3 yellow wavy lines placed directly over the burger bun on desktop with drop-bounce animation */}
          <div className="absolute top-[21%] lg:top-[23%] left-[17%] lg:left-[19%] z-20 pointer-events-none animate-drop-bounce">
            <img
              src="/assets/afros/logos/afros-yellow-waves-align.png"
              alt="Yellow waves doodle"
              className="h-8 lg:h-11 w-auto object-contain drop-shadow-sm"
            />
          </div>

          {/* Desktop Content Container with increased gap from right edge */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 lg:py-20">
            <div className="grid grid-cols-12 gap-8 items-center">
              {/* Empty Left Spacer (Image contains burger on cutting board) */}
              <div className="col-span-6 lg:col-span-6 pointer-events-none" />

              {/* Right: Stacked Badges with Afros Left/Right Slide-in Animations + VIEW MENU CTA */}
              <div className="col-span-6 lg:col-span-6 flex flex-col items-end text-right pr-6 lg:pr-14">
                {/* 50% increased spacing between badges */}
                <div className="flex flex-col items-end space-y-3.5 sm:space-y-4 mb-6 sm:mb-8 font-black-grotesque">
                  {/* THE - Slides in from LEFT */}
                  <div className="animate-slide-left">
                    <span className="inline-block bg-black text-white px-5 sm:px-8 py-1 sm:py-2 text-5xl sm:text-7xl lg:text-[92px] font-black uppercase tracking-tight shadow-2xl leading-none">
                      THE
                    </span>
                  </div>

                  {/* REAL - Slides in from RIGHT */}
                  <div className="animate-slide-right">
                    <span className="inline-block bg-black text-white px-5 sm:px-8 py-1 sm:py-2 text-5xl sm:text-7xl lg:text-[92px] font-black uppercase tracking-tight shadow-2xl leading-none">
                      REAL
                    </span>
                  </div>

                  {/* MAKOYA - Slides in from LEFT */}
                  <div className="animate-slide-left">
                    <span className="inline-block bg-black text-white px-5 sm:px-8 py-1 sm:py-2 text-5xl sm:text-7xl lg:text-[92px] font-black uppercase tracking-tight shadow-2xl leading-none">
                      MAKOYA
                    </span>
                  </div>
                </div>

                {/* VIEW MENU CTA BUTTON - 50% increased gap above button, Slides in from RIGHT */}
                <div className="animate-slide-right mt-6 sm:mt-8">
                  <button
                    type="button"
                    onClick={() => onNavigate('menu')}
                    className="inline-flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black-grotesque text-xl sm:text-2xl uppercase tracking-wider shadow-2xl transition-all transform hover:scale-102 cursor-pointer border border-black/15"
                  >
                    <span>VIEW MENU</span>
                    <ArrowRight className="w-6 h-6 stroke-[3]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE HERO VIEW (Trimmed bottom to match reference screenshot media_1792241184255.jpg) */}
        <div className="md:hidden relative w-full h-[390px] xs:h-[415px] sm:h-[450px] overflow-hidden bg-[#F3CD17]">
          {/* Full-width authentic Afros hero image with trimmed bottom framing */}
          <div
            className="absolute inset-0 bg-cover bg-[position:22%_top]"
            style={{
              backgroundImage: "url('/assets/afros/pages/afros-home-page-banner.webp')",
            }}
            aria-hidden="true"
          />

          {/* 3 yellow wavy lines placed directly over the burger bun with drop-down bounce */}
          <div className="absolute top-[16%] left-[7%] w-[38%] max-w-[145px] pointer-events-none z-20 animate-drop-bounce">
            <img
              src="/assets/afros/logos/afros-yellow-waves-align.png"
              alt="Yellow wave doodle"
              className="w-full h-auto object-contain drop-shadow"
            />
          </div>

          {/* Overlaid Badges & VIEW MENU Button directly on the burger (with 50% increased gap from right edge) */}
          <div className="absolute top-[21%] xs:top-[23%] sm:top-[25%] right-7 xs:right-8 sm:right-12 z-20 flex flex-col items-end text-right font-black-grotesque">
            {/* Badges container with 50% increased vertical gap */}
            <div className="flex flex-col items-end space-y-3">
              {/* THE - Slides in from LEFT */}
              <div className="animate-slide-left">
                <span className="inline-block bg-black text-white px-5 sm:px-6 py-1 text-3xl sm:text-4xl font-black uppercase tracking-tight shadow-2xl leading-none">
                  THE
                </span>
              </div>

              {/* REAL - Slides in from RIGHT */}
              <div className="animate-slide-right">
                <span className="inline-block bg-black text-white px-5 sm:px-6 py-1 text-3xl sm:text-4xl font-black uppercase tracking-tight shadow-2xl leading-none">
                  REAL
                </span>
              </div>

              {/* MAKOYA - Slides in from LEFT */}
              <div className="animate-slide-left">
                <span className="inline-block bg-black text-white px-5 sm:px-6 py-1 text-3xl sm:text-4xl font-black uppercase tracking-tight shadow-2xl leading-none">
                  MAKOYA
                </span>
              </div>
            </div>

            {/* VIEW MENU CTA BUTTON - 50% increased gap and more centered on the same line */}
            <div className="mt-5 sm:mt-6 animate-slide-right -translate-x-6 sm:-translate-x-10">
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#FFD100] hover:bg-[#ffe14d] active:bg-amber-400 text-black font-black font-black-grotesque text-base sm:text-lg uppercase tracking-wider shadow-2xl transition-all cursor-pointer border border-black/15"
              >
                <span>VIEW MENU</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ORIGIN STORY & 2-CARD COLLAGE (EXACT AFROS REPLICATION) ───────── */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Authentic Clean Brandon Grotesque Story Narrative with completely uniform line-height & font-size */}
            <div className="lg:col-span-5">
              <p className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-black-grotesque text-black leading-[1.18] tracking-tight">
                Afro’s Chicken Shop was founded in 2012 as a food truck in Durban, We’re a proudly local chicken shop that believes in serving fresh, uncomplicated food made well with the best ingredients.
              </p>
            </div>

            {/* Right Column: Visual Collage with Parallax Black Seeds Effect */}
            <div className="lg:col-span-7 relative flex justify-center items-center py-6" ref={collageRef}>
              <div className="relative w-full max-w-xl aspect-[16/12]">
                {/* 1. Top-Right Card: Afro Pops & Box with Yellow Background (z-20 so seeds slide behind it) */}
                <div className="absolute top-0 right-0 w-[58%] z-20 shadow-xl rounded-2xl overflow-hidden bg-[#F3CD17] border border-black/10 transform hover:scale-102 transition-transform duration-300">
                  <img
                    src="/assets/afros/images/afros-pops.webp"
                    alt="Afro Pops & Box"
                    className="w-full h-auto object-contain block"
                  />
                </div>

                {/* 2. Yellow Circle Accent behind bottom-left of the chicken strips plate */}
                <div className="absolute bottom-2 left-0 w-44 h-44 sm:w-56 sm:h-56 z-0 pointer-events-none">
                  <img
                    src="/assets/afros/logos/afros-yellow-circle.png"
                    alt="Yellow circle accent"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* 3. Bottom-Left Card: Strips Plate overlapping only bottom-left tip of Pops card (z-30) */}
                <div className="absolute bottom-0 left-6 sm:left-10 w-[60%] z-30 shadow-2xl rounded-2xl overflow-hidden border-2 border-white bg-white transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="/assets/afros/pages/Main Page-2 image 1 afros-chicken-strip.jpg"
                    alt="Chicken Strips and Hand-cut Tjips"
                    className="w-full h-auto object-cover block"
                  />
                </div>

                {/* 4. Bottom-Right: Black Seeds / Sprinkles with Parallax Scrolling Upward Behind Pops Card (z-10) */}
                <div
                  className="absolute -bottom-4 sm:-bottom-8 right-2 sm:right-4 w-44 sm:w-56 h-auto z-10 pointer-events-none transition-transform duration-100 ease-out will-change-transform opacity-95"
                  style={{
                    transform: `translate3d(0, -${seedOffsetY}px, 0)`,
                  }}
                >
                  <svg viewBox="0 0 577 472" fill="black" className="w-full h-auto">
                    <g transform="matrix(0.95 0 0 0.95 14.425 11.8)">
                      <path d="M336.94,193.25C329.77,193.32,326.75,189.25,328.59,183.63C328.847596,182.663572,329.259566,181.745082,329.81,180.91C340.08,167.16,353.14,157.8,370.62,156.03C372.97,155.79,376.99,157.19,377.67,158.87C378.67,161.29,377.92,164.97,376.67,167.52C375.224143,170.156894,373.13203,172.383204,370.59,173.99Q357.59,182.73,344.14,190.84C341.7,192.33,338.56,192.73,336.94,193.25Z" />
                      <path d="M264.28,115.81C268.66,106.34,275.61,101.55,284.01,100.35C293.75,98.95,303.77,99.35,313.67,99.14C315.55,99.14,317.54,100.06,319.35,100.86C325.29,103.5,325.98,108.06,320.54,111.67C316.52214,114.292698,312.142518,116.314062,307.54,117.67C297.41,120.67,287,121.98,276.54,119.79C272.53,119,268.75,117.3,264.28,115.81Z" />
                      <path d="M538.3,368C537.39,369.1,536.23,371.72,534.3,372.47C532.37,373.22,529.62,372.47,527.39,371.77C526.33,371.45,525.39,369.99,524.83,368.83C519.41,356.37,513.56,344.06,509.02,331.28C507.54,327.1,508.68,321.4,510.15,316.91C511.7,312.2,515.69,311.82,519.15,315.42C521.3,317.65,523.53,320.25,524.51,323.1C529.21,336.9,533.51,350.84,537.91,364.73C538.111929,365.810213,538.242214,366.902596,538.3,368Z" />
                      <path d="M418.82,76.06C417.078925,75.735716,415.35646,75.318452,413.66,74.81C409.07,73.18,408.18,70.32,411.15,66.45C412.294688,64.811544,413.728049,63.395126,415.38,62.27C427.17,55.18,438.89,48,451,41.49C453.83,39.98,459.55,39.8,461.48,41.62C464.8,44.74,461.77,49.14,459.35,52.24C449,65.6,435.06,73,418.82,76.06Z" />
                      <path d="M516.18,132.59C516.18,138.93,512.51,142.05,507.65,140.11C503.936256,138.745802,500.629638,136.461105,498.04,133.47C493.67,127.89,490.2,121.59,486.49,115.47C484.15,111.65,481.97,107.73,479.84,103.8C477.99,100.38,477.1,96.94,480.54,93.8C483.98,90.66,487.8,91.7,490.49,94.21C496.478588,99.653723,502.038408,105.551211,507.12,111.85C512,118.22,515.41,125.52,516.18,132.59Z" />
                      <path d="M292.58,274.62C290.28,281.46,288.69,287.57,286.19,293.28C282.92,300.72,278.97,307.86,275.24,315.09C274.511497,316.582807,273.568139,317.960783,272.44,319.18C268.44,323.18,263.64,322.1,262.16,316.7C261.475303,314.309397,261.308255,311.800271,261.67,309.34C263.928843,296.706519,268.89594,284.711798,276.23,274.18C277.081814,272.743873,278.182288,271.47071,279.48,270.42C282.03,268.62,284.83,267.18,287.48,265.6Z" />
                      <path d="M172.66,252.41C173.66,250.84,174.74,247.21,176.81,246.5C178.88,245.79,183.05,246.93,184.74,248.72C188.314372,252.404499,191.233022,256.67256,193.37,261.34C197.211866,270.317083,200.550377,279.501328,203.37,288.85C203.873227,291.618167,203.01779,294.459704,201.07,296.49C199.71,297.63,196.07,296.33,193.59,295.68C192.45,295.38,191.48,294.1,190.59,293.12C180.64,281.86,175,268.65,172.66,252.41Z" />
                      <path d="M412.54,109.33C415.14,110,416.54,110.13,417.68,110.69C428.29,115.77,439.09,120.52,449.34,126.25C453.64,128.66,457.19,132.85,460.21,136.89C461.55,138.68,461.84,142.94,460.61,144.5C459.38,146.06,455.28,146.5,453.08,145.68C446.42,143.22,440.08,139.92,433.61,136.94C425.68,133.29,418.22,128.99,413.37,121.39C411.97,119.19,410.52,116.75,410.15,114.26C409.93,112.73,411.72,110.91,412.54,109.33Z" />
                      <path d="M323.17,76.65C326.49,75.77,329.77,74.33,333.17,74.12C346.72,73.29,360.17,74.12,373.04,78.95C375.19,79.75,377.63,80.58,379.14,82.15C380.82,83.9,382.92,86.92,382.41,88.67C381.71,91.07,378.94,94.15,376.65,94.54C371.767307,95.474523,366.745579,95.406478,361.89,94.34C352.064354,91.83474,342.383205,88.793524,332.89,85.23C329.12,83.84,325.98,80.76,322.55,78.45Z" />
                      <path d="M533.47,255.55C521,254.1,508.42,252.9,496,251C493.58,250.64,490.64,248.06,489.58,245.74C487.76,241.82,491.1,238.18,496.58,236.99C506.78,234.78,516.81,236.56,526.77,238.53C532.45,239.65,537.97,241.59,543.58,243.1C546.28,243.83,548.68,245.41,547.65,248.21C546.680498,250.658902,544.818765,252.649277,542.44,253.78C539.81,254.84,536.55,254.34,533.57,254.51Z" />
                      <path d="M432.9,322C433.78,319.74,434.76,315.2,437.14,311.57C442.82,302.92,450.88,296.73,460.24,292.4C465.59,289.93,470.36,293.35,470,299.31C469.822822,301.458306,469.235563,303.552749,468.27,305.48C463.254069,315.908044,454.874188,324.344284,444.48,329.43C438.14,332.59,432.68,329.9,432.9,322Z" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. SLIDING BANNER: HOWZIT.HEITA.HELLO.HOEGAANIT (RIGHT TO LEFT) ── */}
      <section className="bg-white py-6 sm:py-10 overflow-hidden border-y border-zinc-200 select-none w-full max-w-full">
        <div className="animate-marquee-left flex items-center whitespace-nowrap">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center shrink-0 pr-8">
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black-grotesque text-black tracking-tight uppercase">
                HOWZIT.HEITA.HELLO.HOEGAANIT.
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. SEAMLESS FOOD OPTIONS MOSAIC GRID (CENTERED QUICK BITES) ─────── */}
      {/* Exactly replicating the authentic Afros 3-column top + 2-column bottom layout */}
      <section className="bg-white w-full max-w-full overflow-hidden">
        {/* Top 5 Categories: 3 Columns (Left 2, Center Tall Quick Bites, Right 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* LEFT COLUMN: FLAMED (top) & BREAKFAST (bottom) */}
          <div className="flex flex-col">
            {/* FLAMED */}
            <div
              onClick={() => onNavigate('menu', 'flamed')}
              className="relative aspect-[4/3] overflow-hidden group cursor-pointer bg-zinc-100"
            >
              <img
                src="/assets/afros/pages/Main Page-3 -Image FLAMED afros-chicekn-and-chips.jpg"
                alt="FLAMED"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black-grotesque text-white uppercase tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform duration-300">
                  FLAMED
                </span>
              </div>
            </div>

            {/* BREAKFAST */}
            <div
              onClick={() => onNavigate('menu', 'breakfast')}
              className="relative aspect-[4/3] overflow-hidden group cursor-pointer bg-zinc-100"
            >
              <img
                src="/assets/afros/pages/Main Page-3 - Image Breakfast afros-burger.jpg"
                alt="BREAKFAST"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black-grotesque text-white uppercase tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform duration-300">
                  BREAKFAST
                </span>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: QUICK BITES (TALL PROMINENT CENTER CARD) */}
          <div
            onClick={() => onNavigate('menu', 'quick_bites')}
            className="relative min-h-[340px] md:min-h-full aspect-[4/3] md:aspect-auto overflow-hidden group cursor-pointer bg-zinc-100"
          >
            <img
              src="/assets/afros/pages/afros-side-chicks-sarmie.webp"
              alt="QUICK BITES"
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black-grotesque text-white uppercase tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform duration-300">
                QUICK BITES
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: BURGERS (top) & SALADS (bottom) */}
          <div className="flex flex-col">
            {/* BURGERS */}
            <div
              onClick={() => onNavigate('menu', 'burgers')}
              className="relative aspect-[4/3] overflow-hidden group cursor-pointer bg-zinc-100"
            >
              <img
                src="/assets/afros/pages/Main Page 3 Image Burgers afros-burger-and-chips.jpg"
                alt="BURGERS"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black-grotesque text-white uppercase tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform duration-300">
                  BURGERS
                </span>
              </div>
            </div>

            {/* SALADS */}
            <div
              onClick={() => onNavigate('menu', 'salads')}
              className="relative aspect-[4/3] overflow-hidden group cursor-pointer bg-zinc-100"
            >
              <img
                src="/assets/afros/pages/Main Page-3 - Image Salads afros-crispy-chicken-salad.jpg"
                alt="SALADS"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black-grotesque text-white uppercase tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform duration-300">
                  SALADS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 2 Categories: 2 Balanced Columns for STRIPS & WRAPS matching Afros screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* STRIPS */}
          <div
            onClick={() => onNavigate('menu', 'strips')}
            className="relative aspect-[16/9] sm:aspect-[4/3] overflow-hidden group cursor-pointer bg-zinc-100"
          >
            <img
              src="/assets/afros/pages/afros-crispy-strips-and-side.webp"
              alt="STRIPS"
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black-grotesque text-white uppercase tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform duration-300">
                STRIPS
              </span>
            </div>
          </div>

          {/* WRAPS */}
          <div
            onClick={() => onNavigate('menu', 'wraps')}
            className="relative aspect-[16/9] sm:aspect-[4/3] overflow-hidden group cursor-pointer bg-zinc-100"
          >
            <img
              src="/assets/afros/pages/Main Page-3 - Image Wraps afros-crispy-wrap-and-side.jpg"
              alt="WRAPS"
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black-grotesque text-white uppercase tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform duration-300">
                WRAPS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. HILLCREST SHOP CARD & DETAILS ─────────────────────────────────── */}
      <section id="hillcrest-shop" className="py-16 sm:py-20 bg-white w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block px-3.5 py-1 bg-[#FFD100] text-black font-black font-black-grotesque text-xs uppercase tracking-wider rounded-full">
                  HILLCREST STORE
                </span>
                <h3 className="text-3xl sm:text-4xl font-black-grotesque text-black uppercase tracking-tight">
                  Afro’s Chicken Shop — Hillcrest
                </h3>
                <div className="space-y-2 text-zinc-700 text-sm font-medium">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#FFD100] shrink-0" />
                    <span>{store.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#FFD100] shrink-0" />
                    <a href={`tel:${store.phone}`} className="hover:text-black font-bold">
                      {store.phone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 lg:justify-end">
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="px-8 py-4 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black font-black-grotesque text-base uppercase tracking-wider shadow-lg transition-all text-center cursor-pointer rounded-md border border-black/20 hover:scale-[1.02] active:scale-[0.99]"
                >
                  Order Collection (Delivery Coming Soon)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

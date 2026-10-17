import React from 'react';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { STORES } from '../data/stores';
import { CategoryId, MenuItem, PageView } from '../types';

interface MainViewProps {
  onNavigate: (view: PageView, categoryId?: CategoryId) => void;
  onSelectItem?: (item: MenuItem) => void;
}

export const MainView: React.FC<MainViewProps> = ({ onNavigate }) => {
  const store = STORES[0];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#FFD100] selection:text-black">
      {/* ── 1. HERO BANNER: THE REAL MAKOYA ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F3CD17] border-b border-black/10">
        {/* DESKTOP HERO VIEW (md and larger screens) */}
        <div className="hidden md:block relative min-h-[580px] lg:min-h-[660px] xl:min-h-[720px] flex items-center">
          {/* Full-width authentic Afros hero image */}
          <div
            className="absolute inset-0 bg-cover bg-[center_top]"
            style={{
              backgroundImage: "url('/assets/afros/pages/afros-home-page-banner.png')",
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

          {/* Desktop Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 lg:py-20">
            <div className="grid grid-cols-12 gap-8 items-center">
              {/* Empty Left Spacer (Image contains burger on cutting board) */}
              <div className="col-span-6 lg:col-span-7 pointer-events-none" />

              {/* Right: Stacked Badges with Afros Left/Right Slide-in Animations + VIEW MENU CTA */}
              <div className="col-span-6 lg:col-span-5 flex flex-col items-end text-right">
                <div className="flex flex-col items-end space-y-2 sm:space-y-3 mb-6 sm:mb-8 font-black-grotesque">
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

                {/* VIEW MENU CTA BUTTON - Slides in from RIGHT */}
                <div className="animate-slide-right">
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

        {/* MOBILE HERO VIEW (Matches reference screenshot media_1792241184255.jpg - overlay directly on burger) */}
        <div className="md:hidden relative w-full aspect-[4/5] min-h-[500px] max-h-[640px] overflow-hidden bg-[#F3CD17]">
          {/* Full-width authentic Afros hero image */}
          <div
            className="absolute inset-0 bg-cover bg-[position:22%_center]"
            style={{
              backgroundImage: "url('/assets/afros/pages/afros-home-page-banner.png')",
            }}
            aria-hidden="true"
          />

          {/* 3 yellow wavy lines placed directly over the burger bun with drop-down bounce */}
          <div className="absolute top-[18%] left-[7%] w-[38%] max-w-[150px] pointer-events-none z-20 animate-drop-bounce">
            <img
              src="/assets/afros/logos/afros-yellow-waves-align.png"
              alt="Yellow wave doodle"
              className="w-full h-auto object-contain drop-shadow"
            />
          </div>

          {/* Overlaid Badges & VIEW MENU Button directly on the burger (matching media_1792241184255.jpg) */}
          <div className="absolute top-[28%] sm:top-[30%] right-3 sm:right-6 z-20 flex flex-col items-end text-right space-y-2 font-black-grotesque">
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

            {/* VIEW MENU CTA BUTTON - Slides in from RIGHT */}
            <div className="pt-2 animate-slide-right">
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FFD100] hover:bg-[#ffe14d] active:bg-amber-400 text-black font-black font-black-grotesque text-lg sm:text-xl uppercase tracking-wider shadow-2xl transition-all cursor-pointer border border-black/15"
              >
                <span>VIEW MENU</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ORIGIN STORY & 2-CARD COLLAGE (EXACT AFROS REPLICATION) ───────── */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Authentic Clean Brandon Grotesque Story Narrative with completely uniform line-height & font-size */}
            <div className="lg:col-span-5">
              <p className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-black-grotesque text-black leading-[1.18] tracking-tight">
                Afro’s Chicken Shop was founded in 2012 as a food truck in Durban, We’re a proudly local chicken shop that believes in serving fresh, uncomplicated food made well with the best ingredients.
              </p>
            </div>

            {/* Right Column: Visual Collage with Two Separated Cards matching Afros */}
            <div className="lg:col-span-7 relative flex justify-center items-center py-6">
              <div className="relative w-full max-w-xl aspect-[16/12]">
                {/* 1. Top-Right Card: Afro Pops & Box with Yellow Background (100% visible) */}
                <div className="absolute top-0 right-0 w-[58%] z-10 shadow-xl rounded-2xl overflow-hidden bg-[#F3CD17] border border-black/10 transform hover:scale-102 transition-transform duration-300">
                  <img
                    src="/assets/afros/pages/Main Page-2 Image 2 afros-pops.png"
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

                {/* 3. Bottom-Left Card: Strips Plate overlapping only bottom-left tip of Pops card */}
                <div className="absolute bottom-0 left-6 sm:left-10 w-[60%] z-20 shadow-2xl rounded-2xl overflow-hidden border-2 border-white bg-white transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="/assets/afros/pages/Main Page-2 image 1 afros-chicken-strip.jpg"
                    alt="Chicken Strips and Hand-cut Tjips"
                    className="w-full h-auto object-cover block"
                  />
                </div>

                {/* 4. Bottom-Right: Black Seeds / Sprinkles Motif below Pops card */}
                <div className="absolute bottom-2 right-4 sm:right-6 w-32 sm:w-40 h-32 sm:h-40 z-10 pointer-events-none opacity-90">
                  <svg viewBox="0 0 100 100" fill="black" className="w-full h-full">
                    <rect x="10" y="15" width="22" height="7" rx="3.5" transform="rotate(-15 10 15)" />
                    <rect x="52" y="10" width="24" height="7" rx="3.5" transform="rotate(25 52 10)" />
                    <rect x="25" y="45" width="22" height="7" rx="3.5" transform="rotate(40 25 45)" />
                    <rect x="75" y="35" width="20" height="7" rx="3.5" transform="rotate(-30 75 35)" />
                    <rect x="15" y="75" width="25" height="7" rx="3.5" transform="rotate(10 15 75)" />
                    <rect x="62" y="65" width="22" height="7" rx="3.5" transform="rotate(-45 62 65)" />
                    <rect x="80" y="80" width="18" height="7" rx="3.5" transform="rotate(15 80 80)" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. SLIDING BANNER: HOWZIT.HEITA.HELLO.HOEGAANIT (RIGHT TO LEFT) ── */}
      <section className="bg-white py-6 sm:py-10 overflow-hidden border-y border-zinc-200 select-none">
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
      <section className="bg-white">
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
              src="/assets/afros/pages/Main Page 3 - Image Quick Bites afros-side-chicks-sarmie.png"
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
              src="/assets/afros/pages/Main Page-3 - Image Strips afros-crispy-strips-and-side.png"
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
      <section id="hillcrest-shop" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block px-3.5 py-1 bg-[#FFD100] text-black font-black-grotesque text-xs uppercase tracking-wider rounded-full">
                  Flagship Store
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
                  className="px-8 py-4 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black-grotesque text-base uppercase tracking-wider shadow-lg transition-all text-center cursor-pointer"
                >
                  Order Collection or Delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

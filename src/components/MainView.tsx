import React from 'react';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { FLAVOURS } from '../data/menuData';
import { STORES } from '../data/stores';
import { CategoryId, MenuItem, PageView } from '../types';

interface MainViewProps {
  onNavigate: (view: PageView, categoryId?: CategoryId) => void;
  onSelectItem?: (item: MenuItem) => void;
}

export const MainView: React.FC<MainViewProps> = ({ onNavigate }) => {
  const store = STORES[0];

  const foodOptions = [
    {
      id: 'flamed' as CategoryId,
      name: 'FLAMED',
      image: '/assets/afros/pages/Main Page-3 -Image FLAMED afros-chicekn-and-chips.jpg',
    },
    {
      id: 'quick_bites' as CategoryId,
      name: 'QUICK BITES',
      image: '/assets/afros/pages/Main Page 3 - Image Quick Bites afros-side-chicks-sarmie.png',
    },
    {
      id: 'burgers' as CategoryId,
      name: 'BURGERS',
      image: '/assets/afros/pages/Main Page 3 Image Burgers afros-burger-and-chips.jpg',
    },
    {
      id: 'breakfast' as CategoryId,
      name: 'BREAKFAST',
      image: '/assets/afros/pages/Main Page-3 - Image Breakfast afros-burger.jpg',
    },
    {
      id: 'salads' as CategoryId,
      name: 'SALADS',
      image: '/assets/afros/pages/Main Page-3 - Image Salads afros-crispy-chicken-salad.jpg',
    },
    {
      id: 'strips' as CategoryId,
      name: 'STRIPS',
      image: '/assets/afros/pages/Main Page-3 - Image Strips afros-crispy-strips-and-side.png',
    },
    {
      id: 'wraps' as CategoryId,
      name: 'WRAPS',
      image: '/assets/afros/pages/Main Page-3 - Image Wraps afros-crispy-wrap-and-side.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#FFD100] selection:text-black">
      {/* ── 1. HERO BANNER: THE REAL MAKOYA ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F3CD17] min-h-[440px] sm:min-h-[500px] md:min-h-[580px] lg:min-h-[640px] flex items-center border-b border-black/10">
        {/* Full-width high-res background image on medium & larger screens */}
        <div
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{
            backgroundImage: "url('/assets/afros/pages/Main Page-1-top-image.png')",
          }}
          aria-hidden="true"
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-10 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Mobile Hero Visual */}
            <div className="md:hidden flex flex-col items-center text-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto mb-6">
                <img
                  src="/assets/afros/images/afros-burger-and-chips.jpg"
                  alt="The Real Makoya Burger"
                  className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
                />
                <img
                  src="/assets/afros/logos/afros-yellow-waves-align.png"
                  alt="Wave motif"
                  className="absolute -top-3 left-6 h-6 w-auto object-contain"
                />
              </div>
            </div>

            {/* Empty Spacer on Desktop Left (Where burger on cutting board is in the background image) */}
            <div className="hidden md:block md:col-span-6 lg:col-span-7 pointer-events-none">
              <div className="relative pl-8 pt-4">
                <img
                  src="/assets/afros/logos/afros-yellow-waves-align.png"
                  alt="Wave doodle"
                  className="h-8 w-auto object-contain drop-shadow-sm"
                />
              </div>
            </div>

            {/* Right: Stacked Black Badges in Brandon Grotesque Black (Up to 100px size) */}
            <div className="md:col-span-6 lg:col-span-5 flex flex-col items-center md:items-end text-center md:text-right">
              <div className="flex flex-col items-center md:items-end space-y-2 sm:space-y-3 mb-6 sm:mb-8 font-black-grotesque">
                <div>
                  <span className="inline-block bg-black text-white px-5 sm:px-8 py-1 sm:py-2 text-5xl sm:text-7xl lg:text-[92px] font-black uppercase tracking-tight shadow-2xl leading-none">
                    THE
                  </span>
                </div>
                <div>
                  <span className="inline-block bg-black text-white px-5 sm:px-8 py-1 sm:py-2 text-5xl sm:text-7xl lg:text-[92px] font-black uppercase tracking-tight shadow-2xl leading-none">
                    REAL
                  </span>
                </div>
                <div>
                  <span className="inline-block bg-black text-white px-5 sm:px-8 py-1 sm:py-2 text-5xl sm:text-7xl lg:text-[92px] font-black uppercase tracking-tight shadow-2xl leading-none">
                    MAKOYA
                  </span>
                </div>
              </div>

              {/* VIEW MENU CTA BUTTON */}
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
      </section>

      {/* ── 2. ORIGIN STORY & COLLAGE (MATCHING SCREENSHOT 1 & 2) ───────────── */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Chunky Brandon Grotesque Bold/Black Text */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black-grotesque text-black leading-[1.12] tracking-tight">
                Afro’s Chicken Shop was founded in 2012 as a food truck in Durban,
              </h2>

              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold-grotesque text-black leading-[1.15] tracking-tight">
                We’re a proudly local chicken shop that believes in serving fresh,
              </p>

              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold-grotesque text-black leading-[1.15] tracking-tight">
                uncomplicated food made well
              </p>

              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold-grotesque text-black leading-[1.15] tracking-tight">
                with the best ingredients.
              </p>

              <div className="pt-6 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="px-8 py-3.5 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black-grotesque text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Order Online
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="px-7 py-3.5 bg-white hover:bg-zinc-100 text-black font-bold-grotesque text-sm uppercase tracking-wider border-2 border-black transition-all cursor-pointer"
                >
                  Read Our Story
                </button>
              </div>
            </div>

            {/* Right Column: Visual Collage with Pops, Strips Plate, Yellow Circle & Black Dashes */}
            <div className="lg:col-span-6 relative flex justify-center items-center py-6">
              <div className="relative w-full max-w-lg aspect-[4/3] sm:aspect-[16/13]">
                {/* 1. Top Right: Afro Pops in enamel bowl & takeaway box */}
                <div className="absolute top-0 right-0 w-[68%] z-10 shadow-lg rounded-2xl overflow-hidden bg-[#F3CD17] border border-black/10 transform hover:scale-102 transition-transform">
                  <img
                    src="/assets/afros/pages/Main Page-2 Image 2 afros-pops.png"
                    alt="Afro Pops & Box"
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* 2. Yellow Circle Accent peeking behind the chicken plate */}
                <div className="absolute -bottom-4 left-4 w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-[#FFD100] z-0 pointer-events-none" />

                {/* 3. Center/Left: Overlapping Strips Plate with Chips & Slaw */}
                <div className="absolute bottom-2 left-6 w-[72%] z-20 shadow-2xl rounded-2xl overflow-hidden border-2 border-white bg-white transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="/assets/afros/pages/Main Page-2 image 1 afros-chicken-strip.jpg"
                    alt="Chicken Strips and Hand-cut Tjips"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* 4. Bottom Right: Scattered Black Dashes / Sprinkles Motif */}
                <div className="absolute bottom-4 right-2 w-28 sm:w-36 h-28 sm:h-36 z-10 pointer-events-none opacity-90">
                  <svg viewBox="0 0 100 100" fill="black" className="w-full h-full">
                    <rect x="10" y="15" width="22" height="7" rx="3.5" transform="rotate(-15 10 15)" />
                    <rect x="50" y="10" width="24" height="7" rx="3.5" transform="rotate(25 50 10)" />
                    <rect x="25" y="45" width="22" height="7" rx="3.5" transform="rotate(40 25 45)" />
                    <rect x="75" y="35" width="20" height="7" rx="3.5" transform="rotate(-30 75 35)" />
                    <rect x="15" y="75" width="25" height="7" rx="3.5" transform="rotate(10 15 75)" />
                    <rect x="60" y="65" width="22" height="7" rx="3.5" transform="rotate(-45 60 65)" />
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

      {/* ── 4. SEAMLESS FOOD OPTIONS MOSAIC GRID (MATCHING SCREENSHOT 3 & 4) ─── */}
      <section className="bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {foodOptions.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('menu', item.id)}
              className="relative aspect-[4/3] overflow-hidden group cursor-pointer bg-zinc-100"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/afros/images/afros-burger.jpg';
                }}
              />
              {/* Subtle dark gradient overlay so white text always pops */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />

              {/* Centered Large White Text in Brandon Grotesque Black */}
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black-grotesque text-white uppercase tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform duration-300">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. THE 5 SIGNATURE DURBAN BASTINGS STRIP ────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#FFFDF0] border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block bg-[#FFD100] text-black font-black-grotesque text-xs px-3 py-1 uppercase tracking-widest mb-2">
              THE SECRET IN THE FLAVOUR
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black-grotesque text-black uppercase tracking-tight">
              5 Signature Durban Bastings
            </h2>
            <p className="text-zinc-600 font-bold-grotesque text-sm sm:text-base mt-2">
              Choose your basting sauce with every meal. Grilled hot over the coals.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {FLAVOURS.map((f) => (
              <div
                key={f.id}
                onClick={() => onNavigate('menu')}
                className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-black shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center transform hover:-translate-y-1 group"
              >
                <div className="w-18 h-18 sm:w-22 sm:h-22 mb-3 relative flex items-center justify-center">
                  {f.badgeUrl ? (
                    <img
                      src={f.badgeUrl}
                      alt={f.name}
                      className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-108 transition-transform"
                    />
                  ) : (
                    <span className="text-3xl">{f.emoji}</span>
                  )}
                </div>
                <h3 className="font-black-grotesque text-sm sm:text-base text-black uppercase group-hover:text-[#b89500] transition-colors">
                  {f.name}
                </h3>
                <p className="font-medium-grotesque text-xs text-zinc-600 mt-1 line-clamp-2 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. HILLCREST SHOP LOCATION (ANCHOR: hillcrest-shop) ──────────────── */}
      <section id="hillcrest-shop" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-zinc-50 border-2 border-black p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD100] text-black font-black-grotesque text-xs uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Hillcrest Flagship Store</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black-grotesque uppercase text-black">
                  Afro’s Chicken Shop — Hillcrest
                </h3>
                <p className="text-zinc-700 font-medium-grotesque text-sm sm:text-base leading-relaxed">
                  Shop 5, The Junction, 5 Inanda Road, Hillcrest 3650. Drop in for hot flame-grilled meals, order for collection, or enjoy prompt delivery across Hillcrest, Kloof, and Gillitts.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm font-bold-grotesque">
                  <div className="p-4 rounded-xl bg-white border border-zinc-200">
                    <span className="block text-xs text-zinc-500 uppercase font-black-grotesque">Trading Hours</span>
                    <span className="font-bold text-black">Monday – Sunday: 10:00 – 20:00</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-zinc-200">
                    <span className="block text-xs text-zinc-500 uppercase font-black-grotesque">Direct Contact</span>
                    <a href="tel:0789057975" className="font-bold text-black hover:text-[#b89500]">
                      078 905 7975
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3.5">
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="w-full py-4 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black-grotesque text-base uppercase tracking-wider shadow-md hover:shadow-lg transition-all text-center cursor-pointer border border-black/10"
                >
                  Order Collection or Delivery
                </button>

                <a
                  href="https://maps.google.com/?q=The+Junction+5+Inanda+Road+Hillcrest+3650"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-black hover:bg-zinc-800 text-white font-black-grotesque text-sm uppercase tracking-wider text-center transition-all"
                >
                  Get Directions
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate('functions')}
                  className="w-full py-3 bg-white hover:bg-zinc-100 text-black font-bold-grotesque text-xs uppercase tracking-wider border border-zinc-300 text-center transition-all"
                >
                  Inquire About Catering &amp; Functions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

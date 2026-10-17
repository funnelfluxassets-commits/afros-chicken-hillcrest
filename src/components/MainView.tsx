import React from 'react';
import { Flame, ArrowRight, Sparkles, Clock, MapPin, Phone, ChefHat, Check } from 'lucide-react';
import { FLAVOURS } from '../data/menuData';
import { STORES } from '../data/stores';
import { CategoryId, MenuItem, PageView } from '../types';

interface MainViewProps {
  onNavigate: (view: PageView, categoryId?: CategoryId) => void;
  onSelectItem?: (item: MenuItem) => void;
}

export const MainView: React.FC<MainViewProps> = ({ onNavigate }) => {
  const store = STORES[0];

  const categoryHighlights = [
    {
      id: 'strips' as CategoryId,
      name: 'Strips & Tjips',
      image: '/assets/afros/pages/Main Page-3 - Image Strips afros-crispy-strips-and-side.png',
      tag: 'Bestseller',
      desc: 'Tender chicken breast strips grilled or crispy fried with hand-cut real potato tjips.',
    },
    {
      id: 'burgers' as CategoryId,
      name: 'Burgers & Sarmies',
      image: '/assets/afros/pages/Main Page 3 Image Burgers afros-burger-and-chips.jpg',
      tag: 'Local Legend',
      desc: 'Artisanal rolls with flame-grilled chicken, fresh slaw and signature Durban basting.',
    },
    {
      id: 'wraps' as CategoryId,
      name: 'Wraps',
      image: '/assets/afros/pages/Main Page-3 - Image Wraps afros-crispy-wrap-and-side.jpg',
      tag: 'Fresh & Fast',
      desc: 'Toasted flour tortillas packed with chicken, crisp greens, and zesty dressing.',
    },
    {
      id: 'flamed' as CategoryId,
      name: 'Flamed Chicken',
      image: '/assets/afros/pages/Main Page-3 -Image FLAMED afros-chicekn-and-chips.jpg',
      tag: 'Flame-Kissed',
      desc: 'Quarter, half or whole chicken grilled over real flames with Durban spice.',
    },
    {
      id: 'schnitzel_pops' as CategoryId,
      name: 'Afro Pops & Livers',
      image: '/assets/afros/images/afros-pops.png',
      tag: 'Snack Craze',
      desc: 'Bite-sized chicken pops and tender peri-peri livers in fiery sauce.',
    },
    {
      id: 'salads' as CategoryId,
      name: 'Salads & Greens',
      image: '/assets/afros/pages/Main Page-3 - Image Salads afros-crispy-chicken-salad.jpg',
      tag: 'Freshly Cut',
      desc: 'Crisp seasonal greens, fresh tomatoes and shredded chicken with dressing.',
    },
    {
      id: 'quick_bites' as CategoryId,
      name: 'Quick Bites',
      image: '/assets/afros/pages/Main Page 3 - Image Quick Bites afros-side-chicks-sarmie.png',
      tag: 'On the Go',
      desc: 'Side-chicks sarmies and quick bite-sized snacks for busy days.',
    },
    {
      id: 'breakfast' as CategoryId,
      name: 'Breakfast',
      image: '/assets/afros/pages/Main Page-3 - Image Breakfast afros-burger.jpg',
      tag: 'Early Jol',
      desc: 'Egg and chicken breakfast rolls cooked hot and fresh to kickstart your day.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#FFD100] selection:text-black">
      {/* 1. HERO BANNER: THE REAL MAKOYA (EXACT REPLICA OF AFRO'S BANNER) */}
      <section className="relative overflow-hidden bg-[#F3CD17] border-b border-black/10 min-h-[460px] sm:min-h-[520px] md:min-h-[580px] flex items-center">
        {/* Full-width high-res background image */}
        <div
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{
            backgroundImage: "url('/assets/afros/pages/Main Page-1-top-image.png')",
          }}
          aria-hidden="true"
        />

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left for Mobile (Burger photo shown if background isn't visible) */}
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

            {/* Empty spacer for desktop left (where the burger on the cutting board is in the background image) */}
            <div className="hidden md:block md:col-span-6 lg:col-span-7 pointer-events-none">
              <div className="relative pl-8 pt-4">
                <img
                  src="/assets/afros/logos/afros-yellow-waves-align.png"
                  alt="Wave doodle"
                  className="h-8 w-auto object-contain drop-shadow-sm"
                />
              </div>
            </div>

            {/* Right: Stacked Black Typography Badges (THE / REAL / MAKOYA) & View Menu CTA */}
            <div className="md:col-span-6 lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
                <div>
                  <span className="inline-block bg-black text-white px-5 sm:px-7 py-1.5 sm:py-2.5 text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider shadow-xl">
                    THE
                  </span>
                </div>
                <div>
                  <span className="inline-block bg-black text-white px-5 sm:px-7 py-1.5 sm:py-2.5 text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider shadow-xl">
                    REAL
                  </span>
                </div>
                <div>
                  <span className="inline-block bg-black text-white px-5 sm:px-7 py-1.5 sm:py-2.5 text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider shadow-xl">
                    MAKOYA
                  </span>
                </div>
              </div>

              {/* VIEW MENU CTA BUTTON */}
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black text-lg sm:text-xl uppercase tracking-wider shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer border-2 border-black/10"
              >
                <span>VIEW MENU</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TICKER BANNER: HOWZIT . HEITA . HELLO . HOEGAANIT */}
      <section className="bg-black text-white py-3 overflow-hidden border-b border-black select-none">
        <div className="flex items-center whitespace-nowrap gap-8 text-xs sm:text-sm font-black uppercase tracking-widest">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-8 shrink-0">
              <span>HOWZIT</span>
              <span className="text-[#FFD100]">•</span>
              <span>HEITA</span>
              <span className="text-[#FFD100]">•</span>
              <span>HELLO</span>
              <span className="text-[#FFD100]">•</span>
              <span>HOEGAANIT</span>
              <span className="text-[#FFD100]">•</span>
              <span>SIMPLE DONE RIGHT</span>
              <span className="text-[#FFD100]">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ORIGIN STORY SECTION (DIRECTLY FROM SCREENSHOT) */}
      <section className="py-16 sm:py-24 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Chunky Authentic Copy */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-black uppercase tracking-tight leading-[1.08]">
                Afro’s Chicken Shop was founded in 2012 as a food truck in Durban,
              </h2>

              <p className="text-lg sm:text-2xl font-bold text-zinc-800 leading-snug">
                We’re a proudly local chicken shop that believes in serving fresh, uncomplicated food made well with the best ingredients.
              </p>

              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-medium max-w-xl">
                From Durban beachfront surf breaks to Hillcrest, our recipe hasn’t changed: 100% fresh, never-frozen chicken basted in genuine peri-peri, with hand-peeled real potato tjips seasoned with sea salt.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="px-8 py-3.5 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Order Online
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="px-7 py-3.5 bg-white hover:bg-zinc-100 text-black font-black text-sm uppercase tracking-wider border-2 border-black transition-all cursor-pointer"
                >
                  Our Full Story
                </button>
              </div>
            </div>

            {/* Right Column: Afro Pops & Takeaway Card matching the screenshot */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-[#F3CD17] p-6 sm:p-8 shadow-xl border border-black/10 group">
                <img
                  src="/assets/afros/pages/Main Page-2 Image 2 afros-pops.png"
                  alt="Afro Pops Enamel Bowl and Branded Takeaway Box"
                  className="w-full h-auto object-contain transform group-hover:scale-102 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/afros/images/afros-pops.png';
                  }}
                />
                <div className="mt-4 text-center">
                  <span className="inline-block bg-black text-white px-4 py-1 text-xs font-black uppercase tracking-wider">
                    CRISPY AFRO POPS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 5 SIGNATURE DURBAN BASTINGS */}
      <section className="py-16 sm:py-20 bg-[#FFFDF0] border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block bg-[#FFD100] text-black font-black text-xs px-3 py-1 uppercase tracking-widest mb-2">
              THE SECRET IN THE FLAVOUR
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black uppercase tracking-tight">
              5 Signature Durban Bastings
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-2 font-medium">
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
                <h3 className="font-black text-sm sm:text-base text-black uppercase group-hover:text-[#b89500] transition-colors">
                  {f.name}
                </h3>
                <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXPLORE OUR MENU (CATEGORY SHOWCASE WITH AUTHENTIC AFRO'S PHOTOS) */}
      <section className="py-16 sm:py-24 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#b89500] block mb-1">
                SIMPLE • DONE RIGHT
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-black tracking-tight">
                Explore Our Menu
              </h2>
            </div>
            <button
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-2 text-black hover:text-[#b89500] font-black text-sm tracking-wide uppercase transition-colors group cursor-pointer"
            >
              <span>View Full Online Menu</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform stroke-[3]" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categoryHighlights.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate('menu', cat.id)}
                className="group rounded-2xl overflow-hidden bg-white border border-zinc-200 hover:border-black shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/afros/images/afros-burger.jpg';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 bg-black text-white text-[10px] font-black uppercase tracking-wider">
                      {cat.tag}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-base sm:text-lg text-black uppercase group-hover:text-[#b89500] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-600 mt-1 line-clamp-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-black text-black">
                    <span>ORDER</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3] transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HILLCREST SHOP LOCATION (ID: hillcrest-shop) */}
      <section id="hillcrest-shop" className="py-16 sm:py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-white border-2 border-black p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD100] text-black font-black text-xs uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Hillcrest Flagship Store</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black uppercase text-black">
                  Afro’s Chicken Shop — Hillcrest
                </h3>
                <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
                  Shop 5, The Junction, 5 Inanda Road, Hillcrest 3650. Drop in for hot flame-grilled meals, order for collection, or enjoy prompt delivery across Hillcrest, Kloof, and Gillitts.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                    <span className="block text-xs text-zinc-500 uppercase font-black">Trading Hours</span>
                    <span className="font-bold text-black">Monday – Sunday: 10:00 – 20:00</span>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                    <span className="block text-xs text-zinc-500 uppercase font-black">Direct Contact</span>
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
                  className="w-full py-4 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black text-base uppercase tracking-wider shadow-md hover:shadow-lg transition-all text-center cursor-pointer border border-black/10"
                >
                  Order Collection or Delivery
                </button>

                <a
                  href="https://maps.google.com/?q=The+Junction+5+Inanda+Road+Hillcrest+3650"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-black hover:bg-zinc-800 text-white font-black text-sm uppercase tracking-wider text-center transition-all"
                >
                  Get Directions
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate('functions')}
                  className="w-full py-3 bg-white hover:bg-zinc-100 text-black font-bold text-xs uppercase tracking-wider border border-zinc-300 text-center transition-all"
                >
                  Inquire About Catering & Functions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

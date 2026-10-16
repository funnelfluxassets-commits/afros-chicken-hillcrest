import React from 'react';
import { Flame, ArrowRight, Sparkles, Clock, MapPin, Phone, ShieldCheck, Heart, ChefHat } from 'lucide-react';
import { FLAVOURS, CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { STORES } from '../data/stores';
import { CategoryId, MenuItem, PageView } from '../types';

interface MainViewProps {
  onNavigate: (view: PageView, categoryId?: CategoryId) => void;
  onSelectItem?: (item: MenuItem) => void;
}

export const MainView: React.FC<MainViewProps> = ({ onNavigate, onSelectItem }) => {
  const store = STORES[0];

  // Category showcase items with their visual image mappings
  const categoryHighlights = [
    {
      id: 'strips' as CategoryId,
      name: 'Strips & Tjips',
      image: '/assets/afros/images/afros-crispy-strips-and-side.png',
      tag: 'Bestseller',
      desc: 'Tender chicken breast strips grilled or crispy fried with hand-cut tjips.',
    },
    {
      id: 'burgers' as CategoryId,
      name: 'Burgers & Sarmies',
      image: '/assets/afros/images/afros-burger-and-chips.jpg',
      tag: 'Local Legend',
      desc: 'Artisanal rolls with flame-grilled chicken, fresh slaw and signature basting.',
    },
    {
      id: 'wraps' as CategoryId,
      name: 'Wraps',
      image: '/assets/afros/images/afros-crispy-wrap-and-side.jpg',
      tag: 'Fresh & Fast',
      desc: 'Toasted flour tortillas packed with chicken, crisp greens, and zesty dressing.',
    },
    {
      id: 'flamed' as CategoryId,
      name: 'Flamed Chicken',
      image: '/assets/afros/images/afros-chicekn-and-chips.jpg',
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
      image: '/assets/afros/images/afros-crispy-chicken-salad.jpg',
      tag: 'Freshly Cut',
      desc: 'Crisp seasonal greens, fresh tomatoes and shredded chicken with dressing.',
    },
    {
      id: 'quick_bites' as CategoryId,
      name: 'Quick Bites',
      image: '/assets/afros/images/afros-side-chicks-sarmie.png',
      tag: 'On the Go',
      desc: 'Side-chicks sarmies and quick bite-sized snacks for busy days.',
    },
    {
      id: 'breakfast' as CategoryId,
      name: 'Breakfast',
      image: '/assets/afros/images/afros-burger.jpg',
      tag: 'Early Jol',
      desc: 'Egg and chicken breakfast rolls cooked hot and fresh to kickstart your day.',
    },
  ];

  const featuredItems = MENU_ITEMS.filter((item) =>
    ['item-strips-reg', 'item-burger-single', 'item-pops-reg', 'item-half-chicken'].includes(item.id)
  );

  return (
    <div className="min-h-screen bg-[#18181B] text-white selection:bg-[#FFD100] selection:text-black">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-black border-b border-white/10">
        {/* Banner Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/afros/images/afros-home-page-banner.png"
            alt="Afro's Chicken Banner"
            className="w-full h-full object-cover object-center opacity-45 transform scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFD100]/15 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20 sm:pb-28 text-center">
          {/* Heritage Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD100] text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase mb-6 shadow-lg shadow-[#FFD100]/20 animate-pulse">
            <Sparkles className="w-4 h-4 text-black" />
            <span>Durban Beachfront Roots • Est. 2012</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-none">
            Howzit, <span className="text-[#FFD100] underline decoration-[#FFD100]/60 decoration-wavy">Hello!</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-zinc-300 font-medium leading-relaxed mb-10">
            Afro’s Chicken Shop was founded in 2012 as a food truck in Durban. We’re a proudly local chicken shop that
            believes in serving fresh, uncomplicated food made well with the best ingredients.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate('menu')}
              className="w-full sm:w-auto px-8 py-4 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-extrabold text-lg rounded-2xl shadow-xl shadow-[#FFD100]/25 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer"
            >
              <Flame className="w-5 h-5 fill-black" />
              <span>Order Online Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('functions')}
              className="w-full sm:w-auto px-7 py-4 bg-zinc-900/90 hover:bg-zinc-800 text-white font-bold text-base rounded-2xl border border-white/15 transition-all hover:border-[#FFD100]/60 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>We Do Functions & Catering</span>
            </button>
          </div>

          {/* Store Quick Info Ribbon */}
          <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-zinc-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FFD100]" />
              <span className="font-semibold">Shop 5, The Junction, Hillcrest</span>
            </div>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FFD100]" />
              <span>Open Daily: 10:00 - 20:00</span>
            </div>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#FFD100]" />
              <a href="tel:0789057975" className="hover:text-[#FFD100] transition-colors font-semibold">
                078 905 7975
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5 SIGNATURE BASTINGS STRIP */}
      <section className="py-12 bg-[#121215] border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-[#FFD100] font-bold text-xs uppercase tracking-widest mb-1">The Flavour Secret</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              5 Legendary Signature Bastings
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-1">
              Every piece of chicken is basted fresh over the grill in your choice of flavour.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {FLAVOURS.map((f) => (
              <div
                key={f.id}
                onClick={() => onNavigate('menu')}
                className="group p-4 rounded-2xl bg-zinc-900/90 border border-white/10 hover:border-[#FFD100] transition-all cursor-pointer flex flex-col items-center text-center transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 relative flex items-center justify-center">
                  {f.badgeUrl ? (
                    <img
                      src={f.badgeUrl}
                      alt={f.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <span className="text-3xl">{f.emoji}</span>
                  )}
                </div>
                <h3 className="font-black text-sm sm:text-base text-white group-hover:text-[#FFD100] transition-colors uppercase">
                  {f.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPOTLIGHT SECTION: AFRO POPS & STRIPS */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Afro Pops */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 p-8 sm:p-10 flex flex-col justify-between group hover:border-[#FFD100]/60 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD100]/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <span className="px-3 py-1 rounded-full bg-[#FFD100] text-black font-extrabold text-xs uppercase tracking-wider">
                Fan Favorite
              </span>
              <h3 className="text-3xl sm:text-4xl font-black uppercase text-white mt-4 mb-2">Afro Pops</h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                Crunchy, juicy bite-sized chicken pops tossed in your favourite basting. Perfect for dipping, sharing, or
                keeping all to yourself.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
              <div className="w-44 h-44 flex-shrink-0 relative">
                <img
                  src="/assets/afros/images/afros-pops.png"
                  alt="Afro Pops"
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <button
                onClick={() => onNavigate('menu', 'schnitzel_pops')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black text-sm uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#FFD100]/20"
              >
                <span>Order Afro Pops</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Chicken Strips & Tjips */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 p-8 sm:p-10 flex flex-col justify-between group hover:border-[#FFD100]/60 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <span className="px-3 py-1 rounded-full bg-white/15 text-white font-extrabold text-xs uppercase tracking-wider">
                The Classic
              </span>
              <h3 className="text-3xl sm:text-4xl font-black uppercase text-white mt-4 mb-2">Strips & Tjips</h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                Our legendary chicken breast strips grilled over open flames or fried crispy golden, accompanied by fresh
                hand-cut real potato tjips.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
              <div className="w-44 h-44 flex-shrink-0 relative">
                <img
                  src="/assets/afros/images/afros-chicken-strip.jpg"
                  alt="Chicken Strips"
                  className="w-full h-full object-cover rounded-2xl filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <button
                onClick={() => onNavigate('menu', 'strips')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-zinc-200 text-black font-black text-sm uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/10"
              >
                <span>Order Strips</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE THE MENU: CATEGORY SHOWCASE */}
      <section className="py-14 sm:py-20 bg-[#121215] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-[#FFD100] text-xs font-bold uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Proper Food, Done Simple</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Explore Our Menu</h2>
            </div>
            <button
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-2 text-[#FFD100] hover:text-[#ffe14d] font-bold text-sm tracking-wide uppercase transition-colors group cursor-pointer"
            >
              <span>View Full Menu</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categoryHighlights.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate('menu', cat.id)}
                className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-[#FFD100] transition-all cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-950 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/afros/images/afros-burger.jpg';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-[#FFD100] uppercase tracking-wider border border-white/10">
                      {cat.tag}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-base sm:text-lg text-white group-hover:text-[#FFD100] transition-colors uppercase">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{cat.desc}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#FFD100]">
                    <span>Order Category</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AFRO'S MANIFESTO / ABOUT TEASER */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FFD100]/15 text-[#FFD100] mb-6 border border-[#FFD100]/30">
          <ChefHat className="w-7 h-7" />
        </div>
        <p className="text-[#FFD100] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-2">
          The Afro’s Mantra
        </p>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6">
          Keep Things Simple
        </h2>
        <p className="text-base sm:text-xl text-zinc-300 font-medium leading-relaxed max-w-3xl mx-auto mb-8">
          At Afro’s, we keep things simple — because simple, done right, is our mantra. We use fresh, locally sourced
          ingredients and a focused menu to make sure every meal is consistent, high-quality, and full of flavour.
          No shortcuts. No unnecessary additives. Just proper food.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('about')}
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm rounded-xl border border-white/20 hover:border-[#FFD100] transition-all cursor-pointer"
          >
            Learn More About Our Story
          </button>
          <button
            onClick={() => onNavigate('menu')}
            className="px-6 py-3 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-extrabold text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-[#FFD100]/20"
          >
            Taste the Flavour
          </button>
        </div>
      </section>

      {/* STORE LOCATION BANNER */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-zinc-900 border border-white/10 p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-[#FFD100]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-[#FFD100] font-bold text-xs uppercase tracking-widest mb-2">
                <MapPin className="w-4 h-4" />
                <span>Visit Us In Hillcrest</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black uppercase text-white mb-3">
                Afro’s Chicken Shop — Hillcrest
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                Shop 5, The Junction, 5 Inanda Road, Hillcrest 3650. Drop in for hot flame-grilled meals, order for
                collection, or enjoy prompt delivery straight to your doorstep in Hillcrest and surrounding areas.
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-zinc-300">
                <div>
                  <span className="block text-xs text-zinc-400 uppercase font-semibold">Trading Hours</span>
                  <span className="font-bold text-white">Monday – Sunday: 10:00 – 20:00</span>
                </div>
                <div>
                  <span className="block text-xs text-zinc-400 uppercase font-semibold">Direct Contact</span>
                  <a href="tel:0789057975" className="font-bold text-[#FFD100] hover:underline">
                    078 905 7975
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => onNavigate('menu')}
                className="w-full py-4 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-extrabold text-base rounded-2xl shadow-lg shadow-[#FFD100]/25 transition-all text-center cursor-pointer"
              >
                Order Collection or Delivery
              </button>
              <a
                href="https://maps.google.com/?q=The+Junction+5+Inanda+Road+Hillcrest+3650"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm rounded-2xl border border-white/10 text-center transition-all"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { Sparkles, MapPin, Phone, Clock, ArrowRight, CheckCircle2, Flame, Heart, Award } from 'lucide-react';
import { FLAVOURS } from '../data/menuData';
import { PageView } from '../types';

interface AboutViewProps {
  onNavigate: (view: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const pillars = [
    {
      title: 'Real Hand-Cut Potato Tjips',
      desc: 'Our chips are hand-cut from real potatoes, skin on, cooked fresh to golden perfection, and seasoned with nothing but pure sea salt.',
      image: '/assets/afros/images/q3.png',
      badge: 'Real Potatoes',
    },
    {
      title: 'Fresh, Never Frozen Chicken',
      desc: 'We use fresh, locally sourced chicken. No shortcuts, no unnecessary additives, and no frozen shortcuts. Just tender, juicy chicken cooked over hot flames.',
      image: '/assets/afros/images/afros-chicken-strip.jpg',
      badge: '100% Fresh',
    },
    {
      title: 'Small-Batch Daily Coleslaw',
      desc: 'Our coleslaw is made in small batches every single morning so it stays crisp, crunchy, and refreshing beside your grilled meal.',
      image: '/assets/afros/images/afros-crispy-chicken-salad.jpg',
      badge: 'Made Daily',
    },
    {
      title: '5 Signature Durban Bastings',
      desc: 'From our mild zesty Lemony to fiery peri-peri Chilli and the iconic 50/50 blend, our basting sauces are authentic Durban creations.',
      image: '/assets/afros/images/afros_flavour_icons-50-50-300x300.png',
      badge: '5 Flavours',
    },
  ];

  return (
    <div className="min-h-screen bg-[#18181B] text-white selection:bg-[#FFD100] selection:text-black pt-6 pb-20">
      {/* HEADER HERO */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-white/10 bg-black text-center">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="/assets/afros/images/afros-home-page-banner.png"
            alt="Afro's Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-[#18181B]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD100] text-black font-extrabold text-xs tracking-wider uppercase mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Our Story & Philosophy</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
            Keep Things <span className="text-[#FFD100]">Simple.</span>
          </h1>

          <p className="text-lg sm:text-2xl text-zinc-300 font-medium leading-relaxed max-w-3xl mx-auto">
            At Afro’s, we keep things simple — because simple, done right, is our mantra.
          </p>
        </div>
      </section>

      {/* CORE PHILOSOPHY / ESSAY SECTION */}
      <section className="py-14 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-zinc-900/80 rounded-3xl border border-white/10 p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#FFD100]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="prose prose-invert max-w-none space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed">
            <p className="text-xl sm:text-2xl font-bold text-white leading-snug">
              We use fresh, locally sourced ingredients and a small, focused menu to make sure every meal is consistent,
              high-quality, and full of flavour. No shortcuts. No unnecessary additives. Just proper food.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
              <div className="p-5 rounded-2xl bg-black/50 border border-white/10 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#FFD100] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-base">Real Hand-Cut Chips</h4>
                  <p className="text-sm text-zinc-400 mt-1">
                    Cut from real potatoes, skin on, cooked fresh, and seasoned with nothing but salt.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/50 border border-white/10 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#FFD100] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-base">Small-Batch Daily Slaw</h4>
                  <p className="text-sm text-zinc-400 mt-1">
                    Our coleslaw is made in small batches every single day so it’s always crisp and fresh.
                  </p>
                </div>
              </div>
            </div>

            <p>
              Everything we do is built around one idea:{' '}
              <span className="font-extrabold text-[#FFD100]">
                Give people restaurant-quality food — without the wait.
              </span>
            </p>

            <p className="font-medium text-zinc-200">
              Because when you're short on time, you shouldn’t have to compromise on taste.
            </p>
          </div>
        </div>
      </section>

      {/* 4 PILLARS GRID */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-[#FFD100] font-bold text-xs uppercase tracking-widest mb-1">The Standards We Live By</p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Proper Food, No Compromise</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden flex flex-col group hover:border-[#FFD100]/60 transition-all"
            >
              <div className="aspect-video w-full overflow-hidden bg-black relative">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/afros/images/afros-burger.jpg';
                  }}
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-[#FFD100] uppercase tracking-wider border border-white/10">
                  {p.badge}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-lg text-white group-hover:text-[#FFD100] transition-colors mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE 5 FLAVOURS SHOWCASE */}
      <section className="py-14 sm:py-20 bg-[#121215] border-y border-white/10 my-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[#FFD100] text-xs font-bold uppercase tracking-widest">Durban Born Recipes</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1 mb-10">
            Our 5 Signature Bastings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {FLAVOURS.map((f) => (
              <div
                key={f.id}
                className="p-6 rounded-2xl bg-zinc-900 border border-white/10 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 mb-4 relative flex items-center justify-center">
                  {f.badgeUrl ? (
                    <img src={f.badgeUrl} alt={f.name} className="w-full h-full object-contain filter drop-shadow" />
                  ) : (
                    <span className="text-4xl">{f.emoji}</span>
                  )}
                </div>
                <h3 className="font-black text-base uppercase text-white mb-2">{f.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HILLCREST LOCATION & CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-zinc-900 border border-white/10 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FFD100]/20 text-[#FFD100] mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-black uppercase text-white mb-2">Visit Us In Hillcrest</h3>
          <p className="text-zinc-300 text-base max-w-xl mx-auto mb-6">
            Shop 5, The Junction, 5 Inanda Road, Hillcrest 3650. Experience the taste in person or order online for fast
            delivery.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('menu')}
              className="px-8 py-3.5 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-extrabold text-base rounded-xl transition-all shadow-lg shadow-[#FFD100]/25 cursor-pointer"
            >
              Order Online Now
            </button>
            <a
              href="tel:0789057975"
              className="px-7 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-base rounded-xl border border-white/10 transition-all"
            >
              Call 078 905 7975
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

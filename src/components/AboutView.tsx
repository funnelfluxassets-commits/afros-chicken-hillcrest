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
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#FFD100] selection:text-black pb-20">
      {/* HEADER HERO */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-zinc-200 bg-[#FFFDF0] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-[#FFD100] font-black text-xs tracking-widest uppercase mb-6 shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>OUR STORY &amp; PHILOSOPHY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-black mb-6 leading-tight">
            Keep Things <span className="bg-[#FFD100] text-black px-3 py-0.5">Simple.</span>
          </h1>

          <p className="text-xl sm:text-3xl text-zinc-800 font-black leading-snug max-w-3xl mx-auto">
            At Afro’s, we keep things simple — because simple, done right, is our mantra.
          </p>
        </div>
      </section>

      {/* CORE PHILOSOPHY / ESSAY SECTION */}
      <section className="py-14 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border-2 border-black p-8 sm:p-14 shadow-xl">
          <div className="space-y-6 text-zinc-800 text-base sm:text-lg leading-relaxed">
            <p className="text-xl sm:text-2xl font-black text-black leading-snug">
              We use fresh, locally sourced ingredients and a small, focused menu to make sure every meal is consistent,
              high-quality, and full of flavour. No shortcuts. No unnecessary additives. Just proper food.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#b89500] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-black text-base uppercase">Real Hand-Cut Chips</h4>
                  <p className="text-sm text-zinc-600 mt-1 font-medium">
                    Cut from real potatoes, skin on, cooked fresh, and seasoned with nothing but salt.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#b89500] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-black text-base uppercase">Small-Batch Daily Slaw</h4>
                  <p className="text-sm text-zinc-600 mt-1 font-medium">
                    Our coleslaw is made in small batches every single day so it’s always crisp and fresh.
                  </p>
                </div>
              </div>
            </div>

            <p className="font-bold text-black text-lg">
              Everything we do is built around one idea:{' '}
              <span className="bg-[#FFD100] text-black px-2 py-0.5 font-black">
                Give people restaurant-quality food — without the wait.
              </span>
            </p>

            <p className="font-medium text-zinc-700">
              Because when you're short on time, you shouldn’t have to compromise on taste.
            </p>
          </div>
        </div>
      </section>

      {/* 4 PILLARS GRID */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#b89500] block mb-1">THE STANDARDS WE LIVE BY</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">Proper Food, No Compromise</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-zinc-200 shadow-xs overflow-hidden flex flex-col group hover:border-black hover:shadow-lg transition-all"
            >
              <div className="aspect-video w-full overflow-hidden bg-zinc-100 relative">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/afros/images/afros-burger.jpg';
                  }}
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-black text-white text-[10px] font-black uppercase tracking-wider">
                  {p.badge}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-lg text-black uppercase mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-medium">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE 5 FLAVOURS SHOWCASE */}
      <section className="py-14 sm:py-20 bg-zinc-50 border-y border-zinc-200 my-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[#b89500] text-xs font-black uppercase tracking-widest block mb-1">DURBAN BORN RECIPES</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black mb-10">
            Our 5 Signature Bastings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {FLAVOURS.map((f) => (
              <div
                key={f.id}
                className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-2xs flex flex-col items-center text-center hover:border-black transition-colors"
              >
                <div className="w-20 h-20 mb-4 relative flex items-center justify-center">
                  {f.badgeUrl ? (
                    <img src={f.badgeUrl} alt={f.name} className="w-full h-full object-contain filter drop-shadow-sm" />
                  ) : (
                    <span className="text-4xl">{f.emoji}</span>
                  )}
                </div>
                <h3 className="font-black text-base uppercase text-black mb-2">{f.name}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-medium">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HILLCREST LOCATION & CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-white border-2 border-black p-8 sm:p-12 text-center shadow-xl">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FFD100] text-black mb-4">
            <MapPin className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h3 className="text-3xl font-black uppercase text-black mb-2">Visit Us In Hillcrest</h3>
          <p className="text-zinc-700 text-base max-w-xl mx-auto mb-6 font-medium">
            Shop 5, The Junction, 5 Inanda Road, Hillcrest 3650. Experience the taste in person or order online for fast
            delivery across Hillcrest and surrounding areas.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('menu')}
              className="px-8 py-3.5 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer border border-black/10"
            >
              Order Online Now
            </button>
            <a
              href="tel:0789057975"
              className="px-7 py-3.5 bg-black hover:bg-zinc-800 text-white font-black text-sm uppercase tracking-wider transition-all"
            >
              Call 078 905 7975
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useEffect } from 'react';
import { Users, Heart, Sparkles, MapPin, Phone, MessageSquare, Clock, ArrowRight, UtensilsCrossed, Flame, CheckCircle } from 'lucide-react';
import { PageView } from '../types';

interface TeamViewProps {
  onNavigate?: (view: PageView) => void;
  onOpenStoreModal?: () => void;
}

export const TeamView: React.FC<TeamViewProps> = ({ onNavigate, onOpenStoreModal }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const teamHighlights = [
    {
      image: '/assets/afros/team/S1.webp',
      tag: 'COUNTER & KITCHEN CREW',
      title: 'The Front & Kitchen Family',
      desc: 'Our frontline and kitchen team operate with high energy and deep pride. From taking your order with genuine smiles to hand-cutting real potato tjips and grilling over open flame, every shift is a shared effort.',
      highlight: 'Warm Smiles & Fast Service',
    },
    {
      image: '/assets/afros/team/S2.webp',
      tag: 'THE REAL MAKOYA',
      title: 'Proudly Local & Hillcrest Rooted',
      desc: 'Standing tall with our signature Afro’s banner at The Junction, 5 Inanda Road. We are deeply committed to training, mentoring, and empowering local talent right here in the Upper Highway community.',
      highlight: 'Locally Owned & Operated',
    },
    {
      image: '/assets/afros/team/S3.webp',
      tag: 'DURBAN HOSPITALITY',
      title: 'Care in Every Single Meal',
      desc: 'Led by Nonto, every order is checked, basted, and packed hot in our iconic Afro’s takeaway bags. We believe restaurant-quality food should come with personal warmth and zero compromise on taste.',
      highlight: 'Packed Fresh With Love',
    },
    {
      image: '/assets/afros/team/S4.webp',
      tag: 'THE HILLCREST SPACE',
      title: 'Pull In For A Chow',
      desc: 'Our relaxed sit-down dining area with handcrafted woven pendant lights and solid wooden tables is designed for everyone — from quick business lunches to vibrant family dinners and weekend gatherings.',
      highlight: 'Relaxed Community Hangout',
    },
  ];

  const pillars = [
    {
      icon: '🥔',
      title: 'Hand-Cut Real Tjips',
      desc: 'Cut fresh every single day from real South African potatoes, skin on, and seasoned with pure sea salt.',
    },
    {
      icon: '🍗',
      title: 'Proper Flame-Grilled Chicken',
      desc: 'Fresh, never-frozen chicken basted generously in our legendary Durban sauces over hot coals.',
    },
    {
      icon: '⚡',
      title: 'Fast Without Compromise',
      desc: 'High-quality restaurant-standard food served without the long wait — simple, done right.',
    },
    {
      icon: '💛',
      title: 'Genuine Durban Gees',
      desc: 'Welcoming every single customer like an old friend with authentic South African warmth and energy.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#FFD100] selection:text-black w-full max-w-full overflow-x-hidden pb-20">
      
      {/* ── 1. HERO BANNER WITH "OUR TEAM" ── */}
      <section className="relative w-full h-[260px] xs:h-[320px] sm:h-[400px] md:h-[460px] lg:h-[520px] overflow-hidden bg-black flex items-center justify-center">
        {/* Authentic Team Member with Afro's Box Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/afros/team/our-team-hero.webp')",
          }}
          aria-hidden="true"
        />

        {/* Subtle dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" aria-hidden="true" />

        {/* Big Bold White Centered "OUR TEAM" Title */}
        <div className="relative z-10 text-center px-4 select-none pointer-events-none">
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-black font-black-grotesque uppercase text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] leading-none">
            OUR TEAM
          </h1>
        </div>
      </section>

      {/* ── 2. INTRO STORY SECTION ── */}
      <section className="bg-white py-14 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl lg:max-w-5xl mx-auto text-center space-y-8 sm:space-y-10 text-zinc-900 font-medium-grotesque">
          {/* Main Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[62px] font-bold font-bold-grotesque tracking-tight text-black leading-tight">
            The Family Behind <span className="text-[#00C4D6]">The Grill</span>
          </h2>

          {/* Paragraph 1 */}
          <p className="text-lg sm:text-xl md:text-[22px] lg:text-[24px] leading-relaxed text-zinc-900">
            At Afro’s Chicken Shop Hillcrest, our team is the heartbeat of every fresh meal we serve.
          </p>

          {/* Paragraph 2 */}
          <p className="text-lg sm:text-xl md:text-[22px] lg:text-[24px] leading-relaxed text-zinc-900">
            From the fiery precision of our grill masters to the genuine smiles at the order counter — we’re all about great gees, simple fresh ingredients, and proper food made fast.
          </p>

          {/* Paragraph 3 */}
          <div className="space-y-2 sm:space-y-2.5 text-lg sm:text-xl md:text-[22px] lg:text-[24px] leading-relaxed text-zinc-900">
            <p>We use fresh, locally sourced ingredients to make sure every burger, wrap, and strip meal is full of flavour.</p>
            <p>Our goal is simple: give you restaurant-quality food without the wait, served with real South African hospitality.</p>
          </div>
        </div>
      </section>

      {/* ── 3. 4 TEAM CONTENT CARDS (BLOCK OF 4: 2 PER LINE ON PC) ── */}
      <section className="bg-zinc-50 py-16 sm:py-24 border-y border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#b89500] block mb-2">
              MEET THE AFRO'S HILLCREST FAMILY
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-[46px] font-bold font-bold-grotesque tracking-tight text-black">
              Passion In Every <span className="text-[#00C4D6]">Bite &amp; Smile</span>
            </h3>
            <p className="text-zinc-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-3 font-medium">
              Get to know the faces behind the counter, on the grill, and welcoming you to The Junction.
            </p>
          </div>

          {/* 2 per line on desktop / tablet, 1 per line on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {teamHighlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#b89500] block mb-2">
                      {item.tag}
                    </span>
                    <h4 className="font-bold font-bold-grotesque text-2xl sm:text-3xl text-black uppercase leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-base sm:text-lg text-zinc-700 mt-3 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-black">
                      <Sparkles className="w-4 h-4 text-[#FFD100]" />
                      <span>{item.highlight}</span>
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      Afro's Hillcrest
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. BRAND PILLARS STRIP ── */}
      <section className="bg-white py-16 sm:py-20 border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#b89500] block mb-2">
              OUR STANDARDS
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold font-bold-grotesque tracking-tight text-black">
              What We Stand For Every Day
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-3 hover:border-black transition-colors"
              >
                <div className="text-3xl">{pillar.icon}</div>
                <h4 className="text-lg font-bold font-bold-grotesque text-black uppercase">
                  {pillar.title}
                </h4>
                <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. VISIT US & CALL TO ACTION ── */}
      <section className="py-16 sm:py-24 bg-[#FFFDF0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-[#FFD100] text-black flex items-center justify-center mx-auto text-3xl font-bold shadow-sm">
            👋
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black">
            Pull In And Say Howzit!
          </h2>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-black max-w-lg mx-auto text-center space-y-3 shadow-xl">
            <div className="flex items-center justify-center gap-2 text-black font-black text-sm uppercase">
              <MapPin className="w-4 h-4 text-[#FFD100] fill-black" />
              <span>The Junction, 5 Inanda Rd, Hillcrest</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 font-medium">
              Centrally located with convenient parking right outside the store.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-bold text-zinc-800 pt-3 border-t border-zinc-100">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#b89500]" />
                <span>Mon – Sun: 9:00 AM – 8:00 PM</span>
              </div>
              <a
                href="tel:0789057975"
                className="flex items-center gap-1.5 text-black hover:text-[#00C4D6] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#00C4D6]" />
                <span>078 905 7975</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => onNavigate?.('menu')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black text-sm uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-black/10 flex items-center justify-center gap-2"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Order From Our Menu</span>
            </button>
            <a
              href="https://wa.me/27789057975?text=Howzit%20Afro's%20Hillcrest!%20I'd%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 bg-black hover:bg-zinc-800 text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#FFD100]" />
              <span>WhatsApp (078 905 7975)</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

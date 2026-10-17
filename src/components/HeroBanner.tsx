import React from 'react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden w-full max-w-full h-44 sm:h-56 md:h-72 lg:h-80 flex items-center justify-center select-none bg-zinc-950">
      {/* Authentic Afros Menu Header Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-102"
        style={{
          backgroundImage: "url('/assets/afros/images/afros-menu-header.jpg')",
        }}
        aria-hidden="true"
      />

      {/* Subtle darkening overlay to ensure MENU pops vividly */}
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      {/* Centered Large Bold White MENU Title matching reference media_1792250052103.png */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-black font-black-grotesque text-white uppercase tracking-wider drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] leading-none">
          MENU
        </h1>
      </div>
    </section>
  );
};

import React from 'react';
import { MenuItem } from '../types';
import { Plus, Flame, Sparkles } from 'lucide-react';
import { FLAVOURS } from '../data/menuData';

interface FoodCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(item)}
      className="group relative rounded-2xl bg-zinc-900/95 border border-white/10 hover:border-[#FFD100] transition-all duration-300 hover:shadow-xl hover:shadow-[#FFD100]/10 overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Food Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/afros/images/afros-burger.jpg';
              }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-500 p-4 text-center">
              <span className="text-4xl mb-1">🍗</span>
              <span className="text-xs font-bold text-zinc-400">Afro’s Chicken Shop</span>
            </div>
          )}

          {/* Badge */}
          {item.badge && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#FFD100] text-black text-[10px] font-black uppercase tracking-wider shadow-md">
              {item.badge}
            </div>
          )}

          {/* Includes Side Indicator */}
          {item.includesSide && (
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-[#FFD100] border border-[#FFD100]/40 text-[10px] font-extrabold">
              + TJIPS INCLUDED
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#FFD100] transition-colors leading-snug">
              {item.name}
            </h3>
          </div>

          <p className="text-[13px] sm:text-[14px] text-zinc-300 line-clamp-2 mb-3 leading-relaxed">
            {item.description}
          </p>

          {/* Flavours Available Pills */}
          {item.hasFlavourChoice && (
            <div className="flex items-center gap-1.5 mb-3 pt-2 border-t border-white/5">
              <span className="text-[11px] font-bold text-[#FFD100] uppercase tracking-wider mr-1">5 Bastings:</span>
              <div className="flex -space-x-1">
                {FLAVOURS.map((f) => (
                  <span
                    key={f.id}
                    title={f.name}
                    className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] overflow-hidden"
                  >
                    {f.badgeUrl ? (
                      <img src={f.badgeUrl} alt={f.name} className="w-full h-full object-contain" />
                    ) : (
                      f.emoji
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Price & Add Button */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 flex items-center justify-between gap-3 border-t border-white/5 mt-auto">
        <div>
          <span className="text-[11px] font-bold text-zinc-400 uppercase block">Price</span>
          <span className="text-lg sm:text-xl font-black text-[#FFD100]">
            R{item.price.toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
          className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-[#FFD100]/25 group-hover:scale-105 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

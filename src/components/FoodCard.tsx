import React from 'react';
import { MenuItem } from '../types';
import { Plus } from 'lucide-react';
import { FLAVOURS } from '../data/menuData';

interface FoodCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(item)}
      className="group relative rounded-2xl bg-white border border-zinc-200 hover:border-black transition-all duration-300 hover:shadow-xl overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Food Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
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
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 text-zinc-400 p-4 text-center">
              <span className="text-4xl mb-1">🍗</span>
              <span className="text-xs font-bold text-zinc-500">Afro’s Chicken Shop</span>
            </div>
          )}

          {/* Badge */}
          {item.badge && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-black text-[#FFD100] text-[10px] font-black uppercase tracking-wider shadow-sm">
              {item.badge}
            </div>
          )}

          {/* Includes Side Indicator */}
          {item.includesSide && (
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-black text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
              + TJIPS INCLUDED
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-base sm:text-lg font-black text-black group-hover:text-[#b89500] transition-colors leading-snug uppercase">
              {item.name}
            </h3>
          </div>

          <p className="text-[13px] sm:text-[14px] text-zinc-600 line-clamp-2 mb-3 leading-relaxed font-medium">
            {item.description}
          </p>

          {/* Flavours Available Pills */}
          {item.hasFlavourChoice && (
            <div className="flex items-center gap-1.5 mb-3 pt-2 border-t border-zinc-100">
              <span className="text-[11px] font-black text-black uppercase tracking-wider mr-1">5 Bastings:</span>
              <div className="flex -space-x-1">
                {FLAVOURS.map((f) => (
                  <span
                    key={f.id}
                    title={f.name}
                    className="w-5 h-5 rounded-full bg-white border border-zinc-300 flex items-center justify-center text-[10px] overflow-hidden shadow-2xs"
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
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 flex items-center justify-between gap-3 border-t border-zinc-100 mt-auto">
        <div>
          <span className="text-[11px] font-bold text-zinc-400 uppercase block">Price</span>
          <span className="text-lg sm:text-xl font-black text-black">
            R{item.price.toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
          className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer border border-black/10"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

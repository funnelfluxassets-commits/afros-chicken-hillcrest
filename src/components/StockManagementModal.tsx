import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import { MenuItem, CategoryId } from '../types';
import { getCdnThumbnailUrl } from '../utils/cdn';
import { setItemStockStatus, resetAllToInStock } from '../services/stockService';
import {
  X,
  Search,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Package,
  PackageX,
  Sparkles,
} from 'lucide-react';

interface StockManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  outOfStockIds: string[];
}

export const StockManagementModal: React.FC<StockManagementModalProps> = ({
  isOpen,
  onClose,
  outOfStockIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all' | 'out_only'>('all');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const outOfStockCount = outOfStockIds.length;

  // Filter items by category, out_only tab, and search query (Always call unconditionally at top level)
  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS;

    // Filter by special "Out of stock only" tab or category
    if (selectedCategory === 'out_only') {
      items = items.filter((item) => outOfStockIds.includes(item.id));
    } else if (selectedCategory !== 'all') {
      items = items.filter((item) => item.categoryId === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.subtitle?.toLowerCase().includes(q) ||
          item.categoryId.toLowerCase().includes(q)
      );
    }

    return items;
  }, [selectedCategory, searchQuery, outOfStockIds]);

  const handleToggleStock = async (item: MenuItem) => {
    const isCurrentlyOut = outOfStockIds.includes(item.id);
    setIsUpdating(item.id);
    try {
      await setItemStockStatus(item.id, isCurrentlyOut); // if currently out, set to in-stock (true), else false
    } finally {
      setIsUpdating(null);
    }
  };

  const handleResetAll = async () => {
    if (outOfStockCount === 0) return;
    if (window.confirm('Restore all menu items to "In Stock"? All items will immediately become available to customers.')) {
      await resetAllToInStock();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#121218] border border-white/10 rounded-3xl shadow-2xl shadow-black/90 flex flex-col overflow-hidden text-white">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between gap-3 shrink-0 bg-[#161620]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FFD100] text-black flex items-center justify-center font-black shadow-md shrink-0">
              <PackageX className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black font-black-grotesque uppercase tracking-wide text-white">
                  Kitchen Stock Availability
                </h2>
                {outOfStockCount > 0 ? (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black text-[11px] font-black uppercase tracking-wider">
                    {outOfStockCount} Out of Stock
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
                    All In Stock
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Tap any product to instantly mark it Out of Stock or restore it to In Stock.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {outOfStockCount > 0 && (
              <button
                type="button"
                onClick={handleResetAll}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-bold border border-white/10 transition-colors cursor-pointer"
                title="Restore all items to in-stock"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore All</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
              title="Close Stock Manager"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-3 sm:p-4 bg-[#14141c] border-b border-white/10 space-y-3 shrink-0">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search food by name (e.g. Schnitzel, Strips, Paella, Chips, Fanta)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-[#FFD100] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#FFD100] text-black font-black shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              All Items ({MENU_ITEMS.length})
            </button>

            {outOfStockCount > 0 && (
              <button
                type="button"
                onClick={() => setSelectedCategory('out_only')}
                className={`px-3 py-1.5 rounded-xl font-black whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === 'out_only'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Out of Stock Only ({outOfStockCount})</span>
              </button>
            )}

            {CATEGORIES.map((cat) => {
              const catCount = MENU_ITEMS.filter((i) => i.categoryId === cat.id).length;
              const catOutCount = MENU_ITEMS.filter(
                (i) => i.categoryId === cat.id && outOfStockIds.includes(i.id)
              ).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-white text-black font-black shadow-sm'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{cat.name}</span>
                  {catOutCount > 0 ? (
                    <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-black">
                      {catOutCount} Out
                    </span>
                  ) : (
                    <span className="text-[10px] text-zinc-500">({catCount})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-2.5 divide-y divide-white/5">
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center text-zinc-400 space-y-2">
              <Package className="w-10 h-10 mx-auto text-zinc-600 mb-2" />
              <p className="text-sm font-bold text-white">No items found matching your filter</p>
              <p className="text-xs text-zinc-500">Try adjusting your search query or category.</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isOut = outOfStockIds.includes(item.id);
              const isLoading = isUpdating === item.id;

              return (
                <div
                  key={item.id}
                  className={`pt-2.5 first:pt-0 p-3 rounded-2xl transition-colors flex items-center justify-between gap-3 ${
                    isOut
                      ? 'bg-amber-950/20 border border-amber-500/30'
                      : 'bg-zinc-900/60 border border-white/5 hover:bg-zinc-900'
                  }`}
                >
                  {/* Left: Thumbnail & Item Info */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    {item.image && (
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-white/10">
                        <img
                          src={getCdnThumbnailUrl(item.image)}
                          alt={item.name}
                          className={`w-full h-full object-cover ${
                            isOut ? 'grayscale contrast-75 opacity-60' : ''
                          }`}
                          loading="lazy"
                        />
                        {isOut && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-[8px] font-black text-amber-300 uppercase tracking-tight">
                              OUT
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4
                          className={`text-xs sm:text-sm font-black uppercase tracking-wide truncate ${
                            isOut ? 'text-amber-200 line-through decoration-amber-400/60' : 'text-white'
                          }`}
                        >
                          {item.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-wider shrink-0">
                          {item.categoryId}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      )}
                      <div className="text-xs font-extrabold text-[#FFD100] mt-0.5">
                        R{item.price.toFixed(0)}
                      </div>
                    </div>
                  </div>

                  {/* Right: Big Kitchen Touch Switch */}
                  <div className="shrink-0">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleToggleStock(item)}
                      className={`min-w-[130px] sm:min-w-[150px] py-2.5 px-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md select-none ${
                        isOut
                          ? 'bg-amber-500 hover:bg-amber-400 text-black border border-amber-300 active:scale-95'
                          : 'bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 active:scale-95'
                      } ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
                    >
                      {isOut ? (
                        <>
                          <AlertCircle className="w-4 h-4 text-black shrink-0" />
                          <span>Out of Stock</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>In Stock</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer with Shift Quick Tip */}
        <div className="p-3 sm:p-4 bg-[#14141c] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Changes reflect immediately on all customer devices in real time.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider text-xs transition-colors cursor-pointer ml-auto"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

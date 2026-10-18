import React, { useState } from 'react';
import { MenuItem, FlavourId } from '../types';
import { FLAVOURS, SIDES_LIST, MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Flame, Check, Sparkles, ChevronDown } from 'lucide-react';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const BASE_EXTRAS_OPTIONS = [
  { name: 'Extra Bacon', price: 18.0 },
  { name: 'Extra Avo', price: 18.0 },
  { name: 'Extra Cheese', price: 10.0 },
  { name: 'Extra Egg', price: 5.0 },
  { name: 'Extra Roll', price: 6.0 },
  { name: 'Extra Chicken Fillet', price: 28.0 },
];

const DRINK_GROUPS = [
  {
    id: 'water' as const,
    title: '💧 Still & Sparkling Spring Water',
    priceText: '+R15.00',
    drinks: [
      { id: 'drink-valpre-water-500ml', name: 'Valpré Still Spring Water (500ml)', price: 15.00, badge: 'STILL WATER' },
      { id: 'drink-valpre-sparkling-500ml', name: 'Valpré Sparkling Spring Water (500ml)', price: 15.00, badge: 'SPARKLING WATER' },
    ],
  },
  {
    id: 'sharing' as const,
    title: '🍾 1.5L Sharing Bottles',
    priceText: '+R25.00',
    drinks: [
      { id: 'drink-coke-original-15l', name: 'Coca-Cola Original (1.5L)', price: 25.00, badge: '1.5L SHARING' },
    ],
  },
  {
    id: 'buddies' as const,
    title: '🥤 440ml Cold Buddy Sodas',
    priceText: '+R18.00',
    drinks: [
      { id: 'drink-coke-original-440ml', name: 'Coca-Cola Original (440ml)', price: 18.00, badge: '440ML BUDDY' },
      { id: 'drink-fanta-orange-440ml', name: 'Fanta Orange (440ml)', price: 18.00, badge: '440ML BUDDY' },
      { id: 'drink-sprite-440ml', name: 'Sprite (440ml)', price: 18.00, badge: '440ML BUDDY' },
      { id: 'drink-stoney-440ml', name: 'Stoney Ginger Beer (440ml)', price: 18.00, badge: 'KWETZA' },
    ],
  },
];

export const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
  const { addItem } = useCart();

  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedFlavour, setSelectedFlavour] = useState<FlavourId>(
    item.hasFlavourChoice ? 'lemony' : 'lemony'
  );
  const availableSides = item.sideOptions || (item.includesSide ? SIDES_LIST : []);
  const availableDrinks = MENU_ITEMS.filter((m) => m.categoryId === 'tjips_drinks');
  const [isDrinksExpanded, setIsDrinksExpanded] = useState(false);
  const [drinkCategoryFilter, setDrinkCategoryFilter] = useState<'all' | 'water' | 'sharing' | 'buddies'>('all');
  const [selectedSide, setSelectedSide] = useState<string>(
    availableSides.length > 0 ? availableSides[0] : ''
  );
  const [selectedExtras, setSelectedExtras] = useState<{ name: string; price: number }[]>([]);
  const [extraSauceFlavour, setExtraSauceFlavour] = useState<string>('Lemony');
  const [notes, setNotes] = useState('');

  const isExtraSauceSelected = selectedExtras.some((e) => e.name.startsWith('Extra Sauce'));

  const handleToggleExtraSauce = () => {
    if (isExtraSauceSelected) {
      setSelectedExtras((prev) => prev.filter((e) => !e.name.startsWith('Extra Sauce')));
    } else {
      setSelectedExtras((prev) => [
        ...prev,
        { name: `Extra Sauce (${extraSauceFlavour})`, price: 8.0 },
      ]);
    }
  };

  const handleExtraSauceChange = (newFlavour: string) => {
    setExtraSauceFlavour(newFlavour);
    if (isExtraSauceSelected) {
      setSelectedExtras((prev) =>
        prev.map((e) =>
          e.name.startsWith('Extra Sauce')
            ? { ...e, name: `Extra Sauce (${newFlavour})` }
            : e
        )
      );
    }
  };

  const toggleExtra = (extra: { name: string; price: number }) => {
    if (selectedExtras.some((e) => e.name === extra.name)) {
      setSelectedExtras(selectedExtras.filter((e) => e.name !== extra.name));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const extrasSum = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const singleUnitPrice = item.price + extrasSum;
  const totalPrice = singleUnitPrice * quantity;

  const handleAddToCart = () => {
    addItem(item, quantity, {
      flavour: item.hasFlavourChoice ? selectedFlavour : undefined,
      side: availableSides.length > 0 ? selectedSide : undefined,
      extras: selectedExtras.length > 0 ? selectedExtras : undefined,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl bg-white border border-zinc-200 shadow-2xl flex flex-col overflow-hidden text-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Image & Close Button */}
        <div className="relative aspect-[4/3] max-h-64 sm:max-h-80 w-full shrink-0 bg-zinc-950 overflow-hidden">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-4xl">
              🔥
            </div>
          )}
          
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-black border border-zinc-300 shadow-sm transition-all cursor-pointer shadow-md"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {item.badge && (
            <div className="absolute bottom-3 left-4 px-3 py-1 rounded-lg bg-[#FFD100] text-black text-[11px] font-black uppercase tracking-wider shadow-lg">
              {item.badge}
            </div>
          )}
        </div>

        {/* Scrollable Customization Options */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-black uppercase">{item.name}</h2>
              <span className="text-xl font-black text-black">R{item.price.toFixed(2)}</span>
            </div>
            <p className="text-[13px] sm:text-[15px] text-zinc-600 mt-1 leading-relaxed font-medium">{item.description}</p>
          </div>

          {/* 1. Flavour / Heat Choice */}
          {item.hasFlavourChoice && (
            <div className="space-y-3 pt-2 border-t border-zinc-200">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#FFD100]" />
                  <span>Choose Your Basting Flavour</span>
                </label>
                <span className="text-[11px] font-bold text-[#FFD100] uppercase">Required</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FLAVOURS.map((f) => {
                  const isSelected = selectedFlavour === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFlavour(f.id)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#FFD100]/25 border-2 border-black text-black font-black shadow-xs'
                          : 'bg-zinc-100 hover:bg-zinc-200/70 border-zinc-300 text-zinc-900 font-bold'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-white border border-zinc-200 flex items-center justify-center shrink-0 shadow-2xs">
                          {f.badgeUrl ? (
                            <img
                              src={f.badgeUrl}
                              alt={f.name}
                              className="w-full h-full object-contain p-0.5"
                            />
                          ) : (
                            <span className="text-base">{f.emoji}</span>
                          )}
                        </div>
                        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-black">
                          {f.name}
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                          isSelected
                            ? 'border-black bg-[#FFD100] text-black font-black'
                            : 'border-zinc-400 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Side Choice */}
          {availableSides.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-zinc-200">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-800">
                  🍟 Choose Your Side
                </label>
                <span className="text-[11px] font-bold text-[#FFD100] uppercase">Included</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availableSides.map((side) => {
                  const isSelected = selectedSide === side;
                  return (
                    <button
                      key={side}
                      type="button"
                      onClick={() => setSelectedSide(side)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer font-black text-xs ${
                        isSelected
                          ? 'bg-[#FFD100] border-2 border-black text-black shadow-xs'
                          : 'bg-zinc-100 hover:bg-zinc-200/70 border-zinc-300 text-black'
                      }`}
                    >
                      <div>{side}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Add-ons & Extras */}
          <div className="space-y-3 pt-2 border-t border-zinc-200">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black flex items-center gap-2">
                <span className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-md border border-black bg-[#FFD100] flex items-center justify-center shrink-0">
                  <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black stroke-[3]" />
                </span>
                <span>Delicious Optional Extras (Optional)</span>
              </label>
            </div>

            <div className="space-y-2">
              {/* First 5 Extras: Extra Bacon, Extra Avo, Extra Cheese, Extra Egg, Extra Roll */}
              {BASE_EXTRAS_OPTIONS.slice(0, 5).map((extra) => {
                const isSelected = selectedExtras.some((e) => e.name === extra.name);
                return (
                  <button
                    key={extra.name}
                    type="button"
                    onClick={() => toggleExtra(extra)}
                    className={`w-full p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFD100]/20 border-2 border-black text-black font-black shadow-2xs'
                        : 'bg-zinc-100 hover:bg-zinc-200/70 border-zinc-300 text-black font-bold'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold text-black">{extra.name}</span>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs sm:text-sm font-black text-black">+R{extra.price.toFixed(2)}</span>
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-black bg-[#FFD100] text-black font-black' : 'border-zinc-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* 6. Extra Sauce with Custom Sauce Flavour Dropdown */}
              <div
                className={`p-2.5 sm:p-3 rounded-xl border transition-all ${
                  isExtraSauceSelected
                    ? 'bg-[#FFD100]/20 border-2 border-black text-black font-black shadow-2xs'
                    : 'bg-zinc-100 hover:bg-zinc-200/70 border-zinc-300 text-black font-bold'
                }`}
              >
                <div
                  onClick={handleToggleExtraSauce}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-black">
                    Extra Sauce {isExtraSauceSelected ? `(${extraSauceFlavour})` : ''}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs sm:text-sm font-black text-black">+R8.00</span>
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                        isExtraSauceSelected ? 'border-black bg-[#FFD100] text-black font-black' : 'border-zinc-300 bg-white'
                      }`}
                    >
                      {isExtraSauceSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>

                {isExtraSauceSelected && (
                  <div className="mt-2.5 pt-2 border-t border-zinc-200 flex items-center justify-between gap-2">
                    <label className="text-xs font-bold text-zinc-700">
                      Choose Extra Sauce:
                    </label>
                    <select
                      value={extraSauceFlavour}
                      onChange={(e) => handleExtraSauceChange(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-zinc-300 text-xs font-bold text-black focus:outline-none focus:border-black cursor-pointer shadow-2xs"
                    >
                      {FLAVOURS.map((f) => (
                        <option key={f.id} value={f.name}>
                          {f.emoji} {f.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* 7. Extra Chicken Fillet */}
              {BASE_EXTRAS_OPTIONS.slice(5).map((extra) => {
                const isSelected = selectedExtras.some((e) => e.name === extra.name);
                return (
                  <button
                    key={extra.name}
                    type="button"
                    onClick={() => toggleExtra(extra)}
                    className={`w-full p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFD100]/20 border-2 border-black text-black font-black shadow-2xs'
                        : 'bg-zinc-100 hover:bg-zinc-200/70 border-zinc-300 text-black font-bold'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold text-black">{extra.name}</span>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs sm:text-sm font-black text-black">+R{extra.price.toFixed(2)}</span>
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-black bg-[#FFD100] text-black font-black' : 'border-zinc-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Add Drink - Expandable View of All Available Menu Drinks */}
              {(() => {
                const selectedDrinkItems = selectedExtras.filter((e) =>
                  availableDrinks.some((d) => d.name === e.name)
                );
                const hasSelectedDrinks = selectedDrinkItems.length > 0;

                const filteredGroups =
                  drinkCategoryFilter === 'all'
                    ? DRINK_GROUPS
                    : DRINK_GROUPS.filter((g) => g.id === drinkCategoryFilter);

                return (
                  <div
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      hasSelectedDrinks
                        ? 'border-2 border-black bg-[#FFD100]/15'
                        : 'border-zinc-300 bg-zinc-100 hover:bg-zinc-200/70'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setIsDrinksExpanded(!isDrinksExpanded)}
                      className="w-full p-2.5 sm:p-3 flex items-center justify-between text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <span className="text-base shrink-0">🥤</span>
                        <div className="min-w-0">
                          <div className="text-xs font-black text-black flex items-center gap-1.5 flex-wrap">
                            <span>Add drink</span>
                            {hasSelectedDrinks && (
                              <span className="px-1.5 py-0.2 rounded-full bg-[#FFD100] text-black font-black text-[10px]">
                                {selectedDrinkItems.length} selected
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-zinc-500 font-medium truncate">
                            {hasSelectedDrinks
                              ? selectedDrinkItems.map((d) => d.name).join(', ')
                              : '1.5L Coke, Waters & 440ml Cold Buddies'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs sm:text-sm font-black text-black">
                          {hasSelectedDrinks
                            ? `+R${selectedDrinkItems.reduce((sum, d) => sum + d.price, 0).toFixed(2)}`
                            : 'From +R15.00'}
                        </span>
                        <div
                          className={`p-1 rounded-md bg-zinc-200 text-black transition-transform ${
                            isDrinksExpanded ? 'rotate-180 bg-black text-[#FFD100]' : ''
                          }`}
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </button>

                    {/* Expanded View of All Available Menu Drinks */}
                    {isDrinksExpanded && (
                      <div className="p-3 pt-2 border-t border-zinc-200 bg-white space-y-3 max-h-80 sm:max-h-96 overflow-y-auto">
                        
                        {/* Quick Category Filter Pills */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-bold">
                          <button
                            type="button"
                            onClick={() => setDrinkCategoryFilter('all')}
                            className={`px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer ${
                              drinkCategoryFilter === 'all'
                                ? 'bg-black text-[#FFD100] font-black'
                                : 'bg-zinc-100 text-zinc-700 hover:text-black font-bold'
                            }`}
                          >
                            All ({availableDrinks.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setDrinkCategoryFilter('water')}
                            className={`px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer ${
                              drinkCategoryFilter === 'water'
                                ? 'bg-black text-[#FFD100] font-black'
                                : 'bg-zinc-100 text-zinc-700 hover:text-black font-bold'
                            }`}
                          >
                            💧 Water (2)
                          </button>
                          <button
                            type="button"
                            onClick={() => setDrinkCategoryFilter('sharing')}
                            className={`px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer ${
                              drinkCategoryFilter === 'sharing'
                                ? 'bg-black text-[#FFD100] font-black'
                                : 'bg-zinc-100 text-zinc-700 hover:text-black font-bold'
                            }`}
                          >
                            🍾 1.5L Coke (1)
                          </button>
                          <button
                            type="button"
                            onClick={() => setDrinkCategoryFilter('buddies')}
                            className={`px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer ${
                              drinkCategoryFilter === 'buddies'
                                ? 'bg-black text-[#FFD100] font-black'
                                : 'bg-zinc-100 text-zinc-700 hover:text-black font-bold'
                            }`}
                          >
                            🥤 440ml Buddies (9)
                          </button>
                        </div>

                        {/* Grouped Drink Sections */}
                        {filteredGroups.map((group) => (
                          <div key={group.id} className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-black pt-2 border-t border-zinc-100 first:border-0 first:pt-0">
                              <span>{group.title}</span>
                              <span className="text-zinc-500 font-bold">{group.priceText}</span>
                            </div>

                            <div className="space-y-1">
                              {group.drinks.map((drink) => {
                                const isSelected = selectedExtras.some((e) => e.name === drink.name);
                                return (
                                  <button
                                    key={drink.id}
                                    type="button"
                                    onClick={() => toggleExtra({ name: drink.name, price: drink.price })}
                                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#FFD100]/25 border-2 border-black text-black font-black'
                                        : 'bg-zinc-100 hover:bg-zinc-200/70 border-zinc-300 text-black'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 min-w-0 pr-2">
                                      <span className="text-xs font-bold text-black truncate">{drink.name}</span>
                                      {drink.badge && (
                                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 shrink-0 hidden sm:inline">
                                          {drink.badge}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <span className="text-xs font-black text-black">+R{drink.price.toFixed(2)}</span>
                                      <div
                                        className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                          isSelected
                                            ? 'border-black bg-[#FFD100] text-black font-black'
                                            : 'border-zinc-300 bg-white'
                                        }`}
                                      >
                                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* 4. Special Kitchen Instructions */}
          <div className="space-y-1.5 pt-2 border-t border-zinc-200">
            <label className="text-xs font-bold text-zinc-800">Special Instructions for Kitchen:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Extra sauce, no garnish, chips extra crispy..."
              rows={2}
              className="w-full px-3 py-2 rounded-xl bg-zinc-100 border border-zinc-300 text-xs text-black placeholder-zinc-500 focus:outline-none focus:border-[#FFD100]"
            />
          </div>

        </div>

        {/* Footer / Quantity & Add to Cart Action */}
        <div className="p-4 sm:p-5 bg-zinc-950 border-t border-zinc-200 flex items-center justify-between gap-4 mt-auto">
          {/* Quantity Controls */}
          <div className="flex items-center bg-white border border-zinc-300 rounded-xl p-1 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-black hover:bg-zinc-100 disabled:opacity-40 cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-black text-black">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-black hover:bg-zinc-100 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3 px-5 rounded-xl bg-[#FFD100] hover:bg-[#ffe14d] text-black font-black text-sm tracking-wide shadow-lg shadow-[#FFD100]/25 transition-all hover:scale-[1.02] flex items-center justify-between cursor-pointer"
          >
            <span>ADD TO ORDER</span>
            <span>R{totalPrice.toFixed(2)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

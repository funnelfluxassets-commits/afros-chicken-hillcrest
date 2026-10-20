import React from 'react';
import { useCart } from '../context/CartContext';
import { isItemOutOfStock } from '../services/stockService';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { ChickenWingIcon } from './icons/ChickenWingIcon';
import { DeliveryMotorbikeIcon } from './icons/DeliveryMotorbikeIcon';
import { getCdnThumbnailUrl } from '../utils/cdn';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    subtotal,
    deliveryFee,
    tip,
    setTip,
    grandTotal,
    orderMode,
    setOrderMode,
    selectedStore,
    clearCart,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-md h-full bg-white border-l border-zinc-200 shadow-2xl flex flex-col text-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FFD100]/15 text-[#FFD100]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">Your Order</h2>
              <p className="text-[11px] text-zinc-600 font-medium">
                Afro’s Chicken (Hillcrest)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="py-1.5 px-3 rounded-xl bg-[#FFD100] hover:bg-[#e6bd00] border-2 border-black text-black transition-all text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-xs"
            aria-label="Add More Items"
            title="Return to menu to add more items"
          >
            <Plus className="w-3.5 h-3.5 text-black stroke-[3]" />
            <span>ADD ITEMS</span>
          </button>
        </div>

        {/* Order Mode Toggle (Collection vs Delivery) */}
        <div className="p-3 bg-zinc-50 border-b border-zinc-200">
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-100 rounded-xl border border-zinc-300 text-xs font-bold">
            <button
              type="button"
              onClick={() => setOrderMode('collection')}
              className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                orderMode === 'collection'
                  ? 'bg-[#FFD100] text-black font-black border-2 border-black shadow-xs'
                  : 'text-zinc-600 hover:text-black font-bold'
              }`}
            >
              <span>🛍️ Collection</span>
              {orderMode === 'collection' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </button>
            <div
              title="Doorstep Delivery is coming soon to Afro's Hillcrest!"
              className="py-2 rounded-lg flex items-center justify-center gap-1.5 bg-zinc-200/60 text-zinc-400 border border-zinc-300/80 select-none cursor-not-allowed opacity-75"
            >
              <DeliveryMotorbikeIcon className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
              <span className="line-through decoration-zinc-400">Delivery</span>
              <span className="text-[9px] bg-zinc-300/90 text-zinc-700 font-black px-1.5 py-0.5 rounded tracking-wide uppercase">
                COMING SOON
              </span>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-white">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
              <div className="w-16 h-16 rounded-full bg-[#FFD100] border-2 border-black flex items-center justify-center mb-3 shadow-md">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-base font-black text-black">Your basket is empty</h3>
              <p className="text-xs text-zinc-600 mt-1 max-w-xs font-medium">
                Explore our flame-grilled chicken, burgers, strips, and hand-cut tjips to build your feast.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const isOut = isItemOutOfStock(item.menuItem.id);

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border flex items-start gap-3 relative group shadow-xs ${
                    isOut ? 'bg-amber-50/60 border-amber-300' : 'bg-zinc-100 border-zinc-300'
                  }`}
                >
                {/* Item Thumbnail */}
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 border border-zinc-300">
                  {item.menuItem.image ? (
                    <img
                      src={getCdnThumbnailUrl(item.menuItem.image)}
                      alt={item.menuItem.name}
                      width="56"
                      height="56"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (item.menuItem.image && target.src !== item.menuItem.image) {
                          target.src = item.menuItem.image;
                        } else {
                          target.src = '/assets/afros/images/afros-burger.jpg';
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl">🔥</div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs sm:text-sm font-black text-black truncate">
                      {item.menuItem.name}
                    </h4>
                    <span className="text-xs sm:text-sm font-black text-black shrink-0">
                      R{item.itemTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Customizations */}
                  <div className="text-[11px] text-zinc-700 mt-1 space-y-0.5">
                    {item.customization?.flavour && (
                      <div className="capitalize text-black font-black bg-[#FFD100]/40 px-1.5 py-0.5 rounded inline-block text-[10px] mr-1">
                        Flavour: {item.customization.flavour}
                      </div>
                    )}
                    {item.customization?.side && (
                      <div className="font-semibold text-zinc-700">Side: {item.customization.side}</div>
                    )}
                    {item.customization?.extras?.map((e) => (
                      <div key={e.name} className="text-zinc-600 font-medium">
                        + {e.name}
                      </div>
                    ))}
                    {item.customization?.notes && (
                      <div className="italic text-zinc-500">"{item.customization.notes}"</div>
                    )}
                    {isOut && (
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-amber-800 bg-amber-100/90 px-2.5 py-1 rounded-lg">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Item is sold out today. Please remove to continue.</span>
                      </div>
                    )}
                  </div>

                  {/* Quantity & Remove controls */}
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-zinc-200">
                    <div className="flex items-center bg-white border border-zinc-300 rounded-lg p-0.5 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-zinc-700 hover:text-black hover:bg-zinc-100 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-black text-black">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-zinc-700 hover:text-black hover:bg-zinc-100 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
          )}
        </div>

        {/* Drawer Footer / Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-zinc-50 border-t border-zinc-200 space-y-3">
            <div className="space-y-1.5 text-xs text-zinc-700">
              <div className="flex justify-between">
                <span className="font-semibold text-zinc-600">Subtotal</span>
                <span className="text-black font-black text-sm">R{subtotal.toFixed(2)}</span>
              </div>
              {orderMode === 'delivery' && (
                <>
                  <div className="flex justify-between">
                    <span className="font-semibold text-zinc-600">Delivery Fee</span>
                    <span className="text-black font-black text-sm">R{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-t border-zinc-200 my-0.5">
                    <span className="text-zinc-800 font-bold text-xs">Add Driver Tip:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setTip(tip === 5 ? 0 : 5)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                          tip === 5
                            ? 'bg-[#FFD100] text-black border-2 border-black shadow-xs'
                            : 'bg-white text-zinc-700 hover:text-black hover:bg-zinc-200 border border-zinc-300'
                        }`}
                        title={tip === 5 ? 'Click to remove tip' : 'Add R5 tip'}
                      >
                        R5
                      </button>
                      <button
                        type="button"
                        onClick={() => setTip(tip === 10 ? 0 : 10)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                          tip === 10
                            ? 'bg-[#FFD100] text-black border-2 border-black shadow-xs'
                            : 'bg-white text-zinc-700 hover:text-black hover:bg-zinc-200 border border-zinc-300'
                        }`}
                        title={tip === 10 ? 'Click to remove tip' : 'Add R10 tip'}
                      >
                        R10
                      </button>
                    </div>
                  </div>
                  {tip > 0 && (
                    <div className="flex justify-between text-xs text-black font-bold">
                      <span>Driver Tip</span>
                      <span>+R{tip.toFixed(2)}</span>
                    </div>
                  )}
                </>
              )}
              <div className="flex justify-between items-center text-sm sm:text-base font-black text-black pt-2.5 border-t border-zinc-200">
                <span className="uppercase tracking-wider">Total Due</span>
                <span className="text-lg font-black text-black bg-[#FFD100] px-3 py-1 rounded-xl border border-black/10">
                  R{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {(() => {
              const hasOutOfStockItem = items.some((i) => isItemOutOfStock(i.menuItem.id));

              return (
                <button
                  type="button"
                  disabled={hasOutOfStockItem}
                  onClick={() => {
                    if (hasOutOfStockItem) return;
                    setIsCartOpen(false);
                    onOpenCheckout();
                  }}
                  className={`w-full py-4 px-5 rounded-2xl font-black text-sm sm:text-base tracking-wide shadow-md transition-all flex items-center justify-center gap-2 border-2 ${
                    hasOutOfStockItem
                      ? 'bg-zinc-200 text-zinc-500 border-zinc-300 cursor-not-allowed select-none'
                      : 'bg-[#FFD100] hover:bg-[#e6bd00] text-black border-black cursor-pointer hover:shadow-lg'
                  }`}
                >
                  <span>{hasOutOfStockItem ? 'REMOVE SOLD OUT ITEMS TO PROCEED' : 'PROCEED TO CHECKOUT'}</span>
                  {!hasOutOfStockItem && <ArrowRight className="w-4 h-4 stroke-[3]" />}
                </button>
              );
            })()}

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="w-full py-2 text-center text-xs font-bold text-zinc-600 hover:text-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add More Items to Order</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

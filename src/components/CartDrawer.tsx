import React, { useState } from 'react';
import { CartItem, Language } from '../types';
import { translations } from '../data/translations';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ArrowLeft, Tag, Check } from 'lucide-react';

interface CartDrawerProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  lang,
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const itemUnitPrice = item.item.price + (item.selectedSize ? item.selectedSize.priceExtra : 0);
    return acc + itemUnitPrice * item.quantity;
  }, 0);

  const discountAmount = discountApplied ? subtotal * 0.1 : 0;
  const deliveryFee = subtotal >= 30 || cartItems.length === 0 ? 0 : 3.50;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'KANZ10') {
      setDiscountApplied(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right rtl:slide-in-from-left duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 bg-amber-900 text-amber-50 flex items-center justify-between border-b border-amber-800">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            <h2 className="font-serif text-xl font-bold">
              {t.shoppingCart}
            </h2>
            <span className="bg-amber-800 text-amber-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-amber-800 text-amber-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-stone-100">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-stone-500">
              <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <p className="font-bold text-stone-800 text-lg">{t.emptyCart}</p>
              <p className="text-xs text-stone-500 max-w-xs">{t.emptyCartSubtext}</p>
            </div>
          ) : (
            cartItems.map((cItem) => {
              const unitPrice = cItem.item.price + (cItem.selectedSize ? cItem.selectedSize.priceExtra : 0);
              const itemTotal = unitPrice * cItem.quantity;

              return (
                <div key={cItem.cartItemId} className="pt-4 first:pt-0 flex gap-3 items-center">
                  <img
                    src={cItem.item.image}
                    alt={cItem.item.name[lang]}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-amber-200/60"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-stone-900 text-sm truncate">
                      {cItem.item.name[lang]}
                    </h4>

                    {cItem.selectedSize && (
                      <span className="text-[11px] text-amber-800 font-semibold block">
                        Size: {cItem.selectedSize.name[lang]}
                      </span>
                    )}

                    {cItem.specialNotes && (
                      <p className="text-[11px] text-stone-500 italic truncate">
                        "{cItem.specialNotes}"
                      </p>
                    )}

                    <span className="font-bold text-stone-900 text-sm block mt-1">
                      ${itemTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200/80">
                    <button
                      onClick={() => onUpdateQuantity(cItem.cartItemId, cItem.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white text-stone-800 hover:bg-stone-200 flex items-center justify-center font-bold text-xs cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center font-bold text-xs">{cItem.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(cItem.cartItemId, cItem.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white text-stone-800 hover:bg-stone-200 flex items-center justify-center font-bold text-xs cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(cItem.cartItemId)}
                    className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-amber-50/80 border-t border-amber-200 space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-stone-400 absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Promo Code (Try KANZ10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-9 rtl:pr-9 rtl:pl-3 pr-3 py-2 rounded-xl border border-stone-200 text-xs bg-white focus:outline-hidden"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-amber-900 text-amber-50 text-xs font-bold hover:bg-amber-800 transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {discountApplied && (
              <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                KANZ10 code applied (-10% off!)
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-700 font-medium pt-2 border-t border-amber-200/60">
              <div className="flex justify-between">
                <span>{t.subtotal}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount (10%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t.deliveryFee}</span>
                <span>{deliveryFee === 0 ? t.freeDelivery : `$${deliveryFee.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-amber-950 pt-2 border-t border-stone-200">
                <span>{t.grandTotal}</span>
                <span className="font-serif text-xl">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full py-4 rounded-2xl bg-amber-900 hover:bg-amber-800 text-amber-50 font-bold text-base shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
            >
              <span>{t.checkoutButton}</span>
              <ArrowIcon className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

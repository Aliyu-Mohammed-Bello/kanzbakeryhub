import React, { useState } from 'react';
import { CartItem, Language } from '../types';
import { translations } from '../data/translations';
import { X, CheckCircle, CreditCard, Smartphone, Banknote, MapPin, Store, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

interface CheckoutModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  lang,
  isOpen,
  onClose,
  cartItems,
  onClearCart,
}) => {
  const t = translations[lang];

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'cash'>('card');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [address, setAddress] = useState('');

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const itemUnitPrice = item.item.price + (item.selectedSize ? item.selectedSize.priceExtra : 0);
    return acc + itemUnitPrice * item.quantity;
  }, 0);

  const deliveryFee = orderType === 'delivery' ? (subtotal >= 30 ? 0 : 3.50) : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    const generatedId = `KANZ-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-200 animate-in zoom-in-95 duration-200 relative p-6 sm:p-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:left-4 rtl:right-auto p-2 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {orderComplete ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10 animate-bounce" />
            </div>

            <h2 className="text-3xl font-serif font-bold text-stone-900">
              {t.orderSuccessTitle}
            </h2>

            <p className="text-stone-600 max-w-md mx-auto text-sm">
              {t.orderSuccessMsg}
            </p>

            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 max-w-md mx-auto text-left rtl:text-right space-y-2 text-sm text-stone-800">
              <div className="flex justify-between border-b border-amber-200 pb-2">
                <span className="font-bold text-amber-900">{t.orderNumber}:</span>
                <span className="font-mono font-bold text-base">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer Name:</span>
                <span className="font-semibold">{customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Method:</span>
                <span className="font-semibold capitalize">{orderType}</span>
              </div>
              <div className="flex justify-between border-t border-amber-200 pt-2 font-bold text-amber-950">
                <span>Total Paid:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-2xl bg-amber-900 text-amber-50 font-bold hover:bg-amber-800 transition-colors cursor-pointer"
            >
              {t.backToHome}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                {t.checkoutTitle}
              </h2>
            </div>

            {/* Order Type Toggle */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                {t.orderType}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`p-4 rounded-2xl border flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer ${
                    orderType === 'delivery'
                      ? 'border-amber-900 bg-amber-900 text-amber-50 shadow-xs'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>{t.delivery}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`p-4 rounded-2xl border flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer ${
                    orderType === 'pickup'
                      ? 'border-amber-900 bg-amber-900 text-amber-50 shadow-xs'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>{t.pickup}</span>
                </button>
              </div>
            </div>

            {/* Customer Contact Details */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-stone-800">Contact & Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder={t.contactNamePlaceholder}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="p-3 rounded-2xl border border-stone-200 text-sm bg-stone-50 focus:outline-hidden"
                />
                <input
                  type="tel"
                  required
                  placeholder={t.contactPhonePlaceholder}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="p-3 rounded-2xl border border-stone-200 text-sm bg-stone-50 focus:outline-hidden"
                />
              </div>

              {orderType === 'delivery' && (
                <input
                  type="text"
                  required
                  placeholder={t.deliveryAddressPlaceholder}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-stone-200 text-sm bg-stone-50 focus:outline-hidden"
                />
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                {t.paymentMethod}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-amber-900 bg-amber-50 text-amber-950 font-bold'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-800" />
                  <span>{t.payCard}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'apple'
                      ? 'border-amber-900 bg-amber-50 text-amber-950 font-bold'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-amber-800" />
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'cash'
                      ? 'border-amber-900 bg-amber-50 text-amber-950 font-bold'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-amber-800" />
                  <span>{t.payCash}</span>
                </button>
              </div>
            </div>

            {/* Summary & Submit */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-sm">
              <div className="flex justify-between text-stone-700">
                <span>Items ({cartItems.length}):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-700">
                <span>{t.deliveryFee}:</span>
                <span>{deliveryFee === 0 ? t.freeDelivery : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-amber-950 pt-2 border-t border-amber-200">
                <span>{t.grandTotal}:</span>
                <span className="font-serif text-xl">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-amber-900 hover:bg-amber-800 text-amber-50 font-bold text-base shadow-lg transition-all cursor-pointer active:scale-98"
            >
              {t.placeOrder}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MenuItem, Review, Language } from '../types';
import { translations } from '../data/translations';
import { X, Star, Plus, Minus, ShoppingBag, Clock, ShieldCheck, Heart } from 'lucide-react';

interface ItemDetailModalProps {
  lang: Language;
  item: MenuItem;
  reviews: Review[];
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    size?: { id: string; name: { en: string; ar: string }; priceExtra: number },
    option?: string,
    specialNotes?: string
  ) => void;
  onSubmitReview: (itemId: string, rating: number, comment: string, name: string) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  lang,
  item,
  reviews,
  onClose,
  onAddToCart,
  onSubmitReview,
}) => {
  const t = translations[lang];

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(item.customizations?.sizes?.[0]);
  const [selectedOption, setSelectedOption] = useState(
    item.customizations?.warmOrSlice?.[0]?.name[lang] || item.customizations?.heatingOptions?.[0]?.name[lang] || ''
  );
  const [specialNotes, setSpecialNotes] = useState('');

  // Review Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const itemReviews = reviews.filter((r) => r.itemId === item.id);

  const calculatedUnitPrice = item.price + (selectedSize ? selectedSize.priceExtra : 0);
  const totalPrice = calculatedUnitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(item, quantity, selectedSize, selectedOption, specialNotes);
    onClose();
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;
    onSubmitReview(item.id, reviewRating, reviewName.trim(), reviewComment.trim());
    setReviewName('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-200/80 animate-in fade-in zoom-in-95 duration-200 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:left-4 rtl:right-auto z-10 w-10 h-10 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Image */}
        <div className="relative h-64 sm:h-72 w-full bg-stone-100">
          <img
            src={item.image}
            alt={item.name[lang]}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-6 rtl:right-6 rtl:left-auto text-white">
            <div className="flex items-center gap-2 mb-1">
              {item.dietaryTags.map((tag) => (
                <span key={tag} className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/80 text-amber-950 uppercase">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
              {item.name[lang]}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Price & Rating Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <span className="text-xs text-stone-400 block font-medium">Unit Price</span>
              <span className="text-2xl font-bold font-serif text-amber-950">
                ${calculatedUnitPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-200/80">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span className="font-bold text-stone-900 text-sm">{item.rating.toFixed(1)}</span>
              <span className="text-xs text-stone-500 font-normal">({item.reviewCount} {t.reviewsCount})</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            {item.description[lang]}
          </p>

          {/* Customization Options */}
          {item.customizations?.sizes && item.customizations.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                {t.selectSize}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.customizations.sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSize(s)}
                    className={`p-3 rounded-2xl border text-sm font-semibold text-left rtl:text-right flex items-center justify-between transition-all cursor-pointer ${
                      selectedSize?.id === s.id
                        ? 'border-amber-800 bg-amber-50 text-amber-950 ring-2 ring-amber-800/20'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <span>{s.name[lang]}</span>
                    {s.priceExtra > 0 && (
                      <span className="text-xs text-amber-800 font-bold">+${s.priceExtra.toFixed(2)}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Notes input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
              {t.specialNotes}
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder={t.specialNotesPlaceholder}
              className="w-full p-3 rounded-2xl border border-stone-200 text-sm focus:outline-hidden focus:border-amber-700 bg-stone-50/50"
            />
          </div>

          {/* Quantity and Add to Cart Button */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-stone-100 p-1.5 rounded-2xl border border-stone-200/80">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-xl bg-white text-stone-800 hover:bg-stone-200 flex items-center justify-center font-bold transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-stone-900 text-base">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-xl bg-white text-stone-800 hover:bg-stone-200 flex items-center justify-center font-bold transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Submit Add to Basket */}
            <button
              onClick={handleAdd}
              className="flex-1 w-full py-3.5 px-6 rounded-2xl bg-amber-900 hover:bg-amber-800 text-amber-50 font-bold text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{t.addToCart} • ${totalPrice.toFixed(2)}</span>
            </button>
          </div>

          {/* Customer Reviews Section */}
          <div className="pt-6 border-t border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-900">
                {t.reviewsAndRatings}
              </h3>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200 transition-colors cursor-pointer"
              >
                {t.writeAReview}
              </button>
            </div>

            {/* Review submission inline form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-700">{t.yourRating}:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-amber-400' : 'text-stone-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  required
                  placeholder={t.yourName}
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-amber-200 text-sm bg-white"
                />

                <textarea
                  required
                  rows={3}
                  placeholder={t.yourReviewPlaceholder}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-amber-200 text-sm bg-white"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-3 py-1.5 rounded-xl text-xs text-stone-600 hover:bg-stone-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-amber-900 text-amber-50 text-xs font-bold hover:bg-amber-800"
                  >
                    {t.submitReview}
                  </button>
                </div>
              </form>
            )}

            {/* List of Reviews */}
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {itemReviews.length === 0 ? (
                <p className="text-xs text-stone-500 italic">No customer reviews yet. Be the first to rate!</p>
              ) : (
                itemReviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/60 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 text-xs">{rev.userName}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-stone-600 text-xs leading-relaxed">{rev.comment}</p>
                    <span className="text-[10px] text-stone-400 block">{rev.date}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

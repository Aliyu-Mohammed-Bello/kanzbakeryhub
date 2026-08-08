import React, { useState } from 'react';
import { MenuItem, Language } from '../types';
import { translations } from '../data/translations';
import { X, Star, Check } from 'lucide-react';

interface RateItemModalProps {
  lang: Language;
  item: MenuItem;
  onClose: () => void;
  onSubmitReview: (itemId: string, rating: number, comment: string, name: string) => void;
}

export const RateItemModal: React.FC<RateItemModalProps> = ({
  lang,
  item,
  onClose,
  onSubmitReview,
}) => {
  const t = translations[lang];

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    onSubmitReview(item.id, rating, name.trim(), comment.trim());
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-amber-200/80 animate-in zoom-in-95 duration-200 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-stone-400 hover:text-stone-700 p-2 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">
              {t.reviewSubmittedToast}
            </h3>
            <p className="text-xs text-stone-500">
              Your feedback helps Kanz Bakery keep baking perfection!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full inline-block mb-2">
                {t.rateThisItem}
              </span>
              <h3 className="text-xl font-bold font-serif text-stone-900">
                {item.name[lang]}
              </h3>
            </div>

            {/* Interactive Stars */}
            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 cursor-pointer transform hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating)
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-stone-200 fill-stone-100'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.yourName}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Fatima Al-Ali"
                  className="w-full p-3 rounded-2xl border border-stone-200 text-sm focus:outline-hidden focus:border-amber-700 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.yourReview}
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t.yourReviewPlaceholder}
                  className="w-full p-3 rounded-2xl border border-stone-200 text-sm focus:outline-hidden focus:border-amber-700 bg-stone-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-amber-900 hover:bg-amber-800 text-amber-50 font-bold text-sm shadow-md transition-all cursor-pointer active:scale-95"
            >
              {t.submitReview}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

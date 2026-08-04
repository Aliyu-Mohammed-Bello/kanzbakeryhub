import React, { useState, useMemo } from 'react';
import { MenuItem, Category, DietaryTag, Language } from '../types';
import { translations } from '../data/translations';
import { Star, Search, Filter, Plus, Flame, Clock, SlidersHorizontal, Check, Sparkles } from 'lucide-react';

interface MenuSectionProps {
  lang: Language;
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAddToCart: (item: MenuItem, e: React.MouseEvent) => void;
  onOpenRateModal: (item: MenuItem, e: React.MouseEvent) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  lang,
  items,
  onSelectItem,
  onQuickAddToCart,
  onOpenRateModal,
}) => {
  const t = translations[lang];

  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-asc' | 'price-desc'>('popular');

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: t.categoryAll },
    { id: 'breads', label: t.categoryBreads },
    { id: 'pastries', label: t.categoryPastries },
    { id: 'sweets', label: t.categorySweets },
    { id: 'cakes', label: t.categoryCakes },
    { id: 'savory', label: t.categorySavory },
    { id: 'drinks', label: t.categoryDrinks },
  ];

  const dietaryTagsList: { id: DietaryTag | 'all'; label: string }[] = [
    { id: 'all', label: t.dietaryAll },
    { id: 'signature', label: t.dietarySignature },
    { id: 'organic', label: t.dietaryOrganic },
    { id: 'vegan', label: t.dietaryVegan },
    { id: 'gluten-free', label: t.dietaryGlutenFree },
    { id: 'nut-free', label: t.dietaryNutFree },
    { id: 'halal', label: t.dietaryHalal },
  ];

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Category filter
        if (activeCategory !== 'all' && item.category !== activeCategory) {
          return false;
        }

        // Dietary filter
        if (selectedDietary !== 'all' && !item.dietaryTags.includes(selectedDietary)) {
          return false;
        }

        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase().trim();
          const nameMatch = item.name.en.toLowerCase().includes(q) || item.name.ar.includes(q);
          const descMatch = item.description.en.toLowerCase().includes(q) || item.description.ar.includes(q);
          if (!nameMatch && !descMatch) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        // popular default
        return b.reviewCount - a.reviewCount;
      });
  }, [items, activeCategory, selectedDietary, searchQuery, sortBy]);

  return (
    <section id="menu-section" className="py-12 sm:py-16 bg-amber-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-100/80 px-3.5 py-1 rounded-full mb-3 border border-amber-200">
            {t.brandName}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-3">
            {t.menuTitle}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            {t.menuSubtitle}
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar mb-6 scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-amber-900 text-amber-50 shadow-md scale-105'
                  : 'bg-white text-stone-700 hover:bg-amber-100/80 border border-stone-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search, Filter Bar, and Sort dropdown */}
        <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 rtl:right-3.5 rtl:left-auto top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-amber-600 text-sm bg-stone-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-600 p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Dietary Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <Filter className="w-4 h-4 text-amber-800 shrink-0 ml-1 rtl:mr-1 rtl:ml-0" />
            {dietaryTagsList.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedDietary(tag.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                  selectedDietary === tag.id
                    ? 'bg-amber-800 text-amber-50 font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-stone-500" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="text-xs sm:text-sm font-semibold bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-hidden cursor-pointer"
            >
              <option value="popular">{t.sortPopular}</option>
              <option value="rating">{t.sortRating}</option>
              <option value="price-asc">{t.sortPriceAsc}</option>
              <option value="price-desc">{t.sortPriceDesc}</option>
            </select>
          </div>
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-amber-200 max-w-md mx-auto my-12">
            <p className="text-stone-700 font-semibold mb-3">{t.noItemsFound}</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-amber-900 text-amber-50 text-xs font-bold hover:bg-amber-800 transition-colors cursor-pointer"
            >
              {t.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group bg-white rounded-3xl border border-amber-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1 relative"
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name[lang]}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Dietary Badges overlay */}
                  <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto flex flex-wrap gap-1 max-w-[80%]">
                    {item.dietaryTags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-xs ${
                          tag === 'signature'
                            ? 'bg-amber-900/90 text-amber-200 border border-amber-400/40'
                            : 'bg-stone-900/80 text-white'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Rating Badge Top Right */}
                  <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-stone-900 shadow-md flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{item.rating.toFixed(1)}</span>
                    <span className="text-stone-400 font-normal text-[10px]">({item.reviewCount})</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-stone-900 text-lg leading-snug group-hover:text-amber-800 transition-colors mb-1.5">
                      {item.name[lang]}
                    </h3>
                    <p className="text-stone-600 text-xs line-clamp-2 leading-relaxed mb-4">
                      {item.description[lang]}
                    </p>
                  </div>

                  <div>
                    {/* Calories / Prep info */}
                    <div className="flex items-center gap-3 text-[11px] text-stone-500 font-medium mb-4">
                      {item.calories && (
                        <span>{item.calories} {t.caloriesLabel}</span>
                      )}
                      {item.prepTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          {item.prepTime}
                        </span>
                      )}
                    </div>

                    {/* Price and Add/Rate buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                      <div>
                        <span className="text-xs text-stone-400 font-medium block">Price</span>
                        <span className="text-xl font-bold font-serif text-amber-950">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Rate button */}
                        <button
                          onClick={(e) => onOpenRateModal(item, e)}
                          className="p-2 rounded-xl text-stone-400 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                          title={t.rateThisItem}
                        >
                          <Star className="w-4 h-4" />
                        </button>

                        {/* Add to Cart */}
                        <button
                          onClick={(e) => onQuickAddToCart(item, e)}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{t.addToCart}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

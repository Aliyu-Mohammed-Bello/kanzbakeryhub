import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowRight, ArrowLeft, Flame, Sparkles, UtensilsCrossed, Wheat } from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  onExploreMenu: () => void;
  onOpenCatering: () => void;
  onOpenAbout: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onExploreMenu,
  onOpenCatering,
  onOpenAbout,
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative bg-stone-900 text-stone-100 overflow-hidden">
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/kanz_bakery_hero_1785417010584.jpg"
          alt="Kanz Bakery Artisanal Breads and Pastries"
          className="w-full h-full object-cover object-center opacity-40 transform scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-r from-stone-950/90 via-stone-900/75 to-stone-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{t.brandTagline}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-amber-50 leading-tight mb-6">
            {t.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-stone-300 leading-relaxed font-light mb-8 max-w-2xl">
            {t.heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={onExploreMenu}
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-amber-600 hover:bg-amber-500 text-amber-950 font-bold text-base transition-all cursor-pointer shadow-lg hover:shadow-amber-600/30 active:scale-95"
            >
              <span>{t.heroCtaMenu}</span>
              <ArrowIcon className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenCatering}
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-stone-800/90 hover:bg-stone-700 text-amber-100 font-semibold text-base border border-amber-500/30 transition-all cursor-pointer shadow-md backdrop-blur-xs active:scale-95"
            >
              <UtensilsCrossed className="w-5 h-5 text-amber-400" />
              <span>{t.heroCtaCatering}</span>
            </button>

            <button
              onClick={onOpenAbout}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-full text-stone-300 hover:text-amber-200 text-sm font-medium transition-colors cursor-pointer"
            >
              <span>{t.heroCtaAbout}</span>
            </button>
          </div>
        </div>

        {/* Feature Badges Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 bg-stone-900/60 p-3.5 rounded-2xl border border-stone-800/80 backdrop-blur-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Wheat className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400 font-medium">{t.featureOrganic}</p>
              <p className="text-sm font-semibold text-amber-100">100% Organic</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-stone-900/60 p-3.5 rounded-2xl border border-stone-800/80 backdrop-blur-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400 font-medium">{t.featureStoneOven}</p>
              <p className="text-sm font-semibold text-amber-100">Traditional Hearth</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-stone-900/60 p-3.5 rounded-2xl border border-stone-800/80 backdrop-blur-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400 font-medium">{t.featureFresh}</p>
              <p className="text-sm font-semibold text-amber-100">Daily Limited Batches</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-stone-900/60 p-3.5 rounded-2xl border border-stone-800/80 backdrop-blur-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400 font-medium">{t.featureHeritage}</p>
              <p className="text-sm font-semibold text-amber-100">Authentic Recipes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Home, UtensilsCrossed, ShoppingBag, Info, Sparkles, Globe } from 'lucide-react';

interface MobileBottomBarProps {
  lang: Language;
  onToggleLang: () => void;
  activeTab: 'home' | 'menu' | 'about' | 'catering';
  setActiveTab: (tab: 'home' | 'menu' | 'about' | 'catering') => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAiAssistant: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  lang,
  onToggleLang,
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenAiAssistant,
}) => {
  const t = translations[lang];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-amber-950/95 text-amber-100 backdrop-blur-md border-t border-amber-800/60 shadow-2xl px-2 py-2 flex items-center justify-around">
      {/* Home */}
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center justify-center p-1.5 rounded-xl cursor-pointer transition-colors ${
          activeTab === 'home' ? 'text-amber-400 font-bold' : 'text-stone-300 hover:text-white'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">{t.navHome}</span>
      </button>

      {/* Menu */}
      <button
        onClick={() => setActiveTab('menu')}
        className={`flex flex-col items-center justify-center p-1.5 rounded-xl cursor-pointer transition-colors ${
          activeTab === 'menu' ? 'text-amber-400 font-bold' : 'text-stone-300 hover:text-white'
        }`}
      >
        <UtensilsCrossed className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">{t.navMenu}</span>
      </button>

      {/* AI Assistant FAB */}
      <button
        onClick={onOpenAiAssistant}
        className="flex flex-col items-center justify-center p-2 rounded-full bg-amber-600 text-amber-950 font-bold shadow-lg transform -translate-y-2 cursor-pointer border-2 border-amber-950 active:scale-90"
      >
        <Sparkles className="w-5 h-5" />
      </button>

      {/* Catering */}
      <button
        onClick={() => setActiveTab('catering')}
        className={`flex flex-col items-center justify-center p-1.5 rounded-xl cursor-pointer transition-colors ${
          activeTab === 'catering' ? 'text-amber-400 font-bold' : 'text-stone-300 hover:text-white'
        }`}
      >
        <Info className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">{t.navCatering}</span>
      </button>

      {/* Cart Button */}
      <button
        onClick={onOpenCart}
        className="relative flex flex-col items-center justify-center p-1.5 rounded-xl text-stone-300 hover:text-white cursor-pointer"
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">{t.cart}</span>
        {cartCount > 0 && (
          <span className="absolute top-0 right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-amber-900">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
};

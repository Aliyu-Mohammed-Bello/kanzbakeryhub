import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ShoppingBag, Sparkles, Globe, Menu as MenuIcon, X, MapPin, Phone, Award } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  activeTab: 'home' | 'menu' | 'about' | 'catering';
  setActiveTab: (tab: 'home' | 'menu' | 'about' | 'catering') => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAiAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenAiAssistant,
}) => {
  const t = translations[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'menu', label: t.navMenu },
    { id: 'about', label: t.navAbout },
    { id: 'catering', label: t.navCatering },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-amber-50/90 backdrop-blur-md border-b border-amber-200/60 shadow-xs transition-colors duration-300">
      {/* Top Bar - Announcement / Hours */}
      <div className="bg-amber-900 text-amber-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-between max-w-7xl mx-auto">
        <div className="hidden sm:flex items-center gap-4 text-amber-200/80">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            {t.locationAddress}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            {t.contactPhone}
          </span>
        </div>

        <div className="mx-auto sm:mx-0 flex items-center gap-2">
          <Award className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>{t.featureFresh}</span>
        </div>

        <div className="hidden md:block text-amber-300 font-semibold">
          {t.openingHours}
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand Name */}
          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 text-left rtl:text-right group cursor-pointer focus:outline-hidden"
          >
            <div className="w-11 h-11 rounded-full bg-linear-to-br from-amber-600 to-amber-800 text-amber-50 flex items-center justify-center font-serif text-2xl font-bold shadow-md group-hover:scale-105 transition-transform">
              K
            </div>
            <div>
              <span className="block font-serif text-2xl font-bold text-stone-900 leading-none tracking-tight group-hover:text-amber-700 transition-colors">
                {t.brandName}
              </span>
              <span className="block text-xs font-medium text-amber-700 tracking-wider mt-0.5">
                {t.brandTagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-amber-900 text-amber-50 shadow-xs'
                    : 'text-stone-700 hover:text-amber-900 hover:bg-amber-100/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-amber-100 border border-amber-300/80 text-amber-900 text-xs sm:text-sm font-medium hover:bg-amber-200/80 transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
              title={t.navAiChef}
            >
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin-slow" />
              <span className="hidden sm:inline font-semibold">{t.navAiChef}</span>
              <span className="sm:hidden font-semibold">AI</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold transition-all cursor-pointer border border-stone-200/80"
              title="Change Language / تغيير اللغة"
            >
              <Globe className="w-4 h-4 text-stone-600" />
              <span>{lang === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-amber-900 text-amber-50 hover:bg-amber-800 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              aria-label={t.cart}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-amber-50 shadow-xs animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-stone-700 hover:bg-amber-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-amber-50/95 border-b border-amber-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left rtl:text-right px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-amber-900 text-amber-50 shadow-xs'
                    : 'text-stone-800 hover:bg-amber-100/80'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-amber-200/80 mt-2 flex flex-col gap-2">
              <div className="text-xs text-stone-600 px-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>{t.locationAddress}</span>
              </div>
              <div className="text-xs text-stone-600 px-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-700" />
                <span>{t.contactPhone}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

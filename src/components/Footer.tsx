import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Award } from 'lucide-react';

interface FooterProps {
  lang: Language;
  setActiveTab: (tab: 'home' | 'menu' | 'about' | 'catering') => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, setActiveTab }) => {
  const t = translations[lang];

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-24 md:pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-amber-950 flex items-center justify-center font-serif text-xl font-bold">
                K
              </div>
              <span className="font-serif text-2xl font-bold text-amber-100">
                {t.brandName}
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-400 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-amber-100">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-medium">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.navHome}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('menu')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.navMenu}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('catering')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {t.navCatering}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-amber-100">
              {t.hoursHeader}
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.monFri}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.satSun}</span>
              </p>
            </div>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-amber-100">
              {t.locationHeading}
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{t.locationAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.contactPhone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.contactEmail}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} {t.brandName}. {t.rightsReserved}</p>
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <Award className="w-4 h-4" />
            <span>Crafted with Organic Passion & Artisanal Tradition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

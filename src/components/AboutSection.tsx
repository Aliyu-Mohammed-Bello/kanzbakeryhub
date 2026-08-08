import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { aboutTimeline, bakerTeam } from '../data/aboutData';
import { Clock, MapPin, Phone, Mail, Award, Flame, Wheat, HeartHandshake } from 'lucide-react';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="bg-amber-50/40 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-200/60 px-3.5 py-1 rounded-full mb-3">
            {t.navAbout}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight mb-4">
            {t.aboutTitle}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            {t.aboutSubtitle}
          </p>
        </div>

        {/* Story Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950">
              {t.ourStoryHeading}
            </h3>
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed">
              {t.ourStoryText1}
            </p>
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed">
              {t.ourStoryText2}
            </p>

            {/* Quote card */}
            <div className="p-6 rounded-2xl bg-amber-100/70 border-l-4 border-amber-700 text-stone-800 italic relative my-6">
              <p className="text-stone-900 font-medium text-lg mb-3">
                {t.bakerQuote}
              </p>
              <div className="not-italic text-sm">
                <span className="font-bold text-amber-950 block">{t.bakerName}</span>
                <span className="text-amber-800 text-xs">{t.bakerTitle}</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200"
              alt="Artisanal Bakery Oven at Kanz Bakery"
              className="w-full h-[420px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-8">
              <div className="text-white">
                <p className="font-serif text-2xl font-bold text-amber-200">Kanz Oven Room</p>
                <p className="text-sm text-stone-300">Stone deck baking at 260°C every morning</p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Highlights - 3 Columns */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {t.ourProcessHeading}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-amber-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
                <Clock className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-stone-900 mb-2">
                {t.process1Title}
              </h4>
              <p className="text-stone-600 text-sm leading-relaxed">
                {t.process1Desc}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-amber-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
                <Wheat className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-stone-900 mb-2">
                {t.process2Title}
              </h4>
              <p className="text-stone-600 text-sm leading-relaxed">
                {t.process2Desc}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-amber-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-stone-900 mb-2">
                {t.process3Title}
              </h4>
              <p className="text-stone-600 text-sm leading-relaxed">
                {t.process3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-amber-200/80 shadow-sm mb-20">
          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-8 text-center">
            Key Milestones in Kanz History
          </h3>
          <div className="space-y-8">
            {aboutTimeline.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
                <div className="shrink-0 bg-amber-900 text-amber-50 font-serif font-bold text-xl px-5 py-2 rounded-2xl shadow-xs">
                  {item.year}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-stone-900 mb-1">
                    {item.title[lang]}
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {item.desc[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Master Bakers Team Spotlight */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-2">
              Meet Our Artisan Bakers
            </h3>
            <p className="text-stone-600">The passionate hands behind every loaf and pastry</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {bakerTeam.map((baker, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center p-6 gap-6">
                <img
                  src={baker.image}
                  alt={baker.name[lang]}
                  className="w-28 h-28 rounded-2xl object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xl font-bold text-stone-900 mb-1">
                    {baker.name[lang]}
                  </h4>
                  <p className="text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
                    {baker.role[lang]}
                  </p>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {baker.bio[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Opening Hours Card */}
        <div className="bg-amber-900 text-amber-50 rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-serif font-bold text-amber-100 mb-2">
              {t.locationHeading}
            </h3>
            <p className="text-amber-200/80 text-sm leading-relaxed mb-6">
              Drop by for a warm cup of Karak tea and freshly baked sourdough right out of our stone deck oven.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-800 text-amber-200 text-xs font-bold">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Baking Fresh at 6:00 AM</span>
            </div>
          </div>

          <div className="space-y-4 text-sm text-amber-100">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-white">Main Bakery Flagship:</span>
                <span>{t.locationAddress}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-white">Store Hours:</span>
                <span>{t.openingHours}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm text-amber-100 lg:border-l lg:border-amber-800 lg:pl-8 rtl:lg:border-r rtl:lg:border-l-0 rtl:lg:pr-8 rtl:lg:pl-0">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-xs text-amber-300 block">Telephone Inquiry</span>
                <span className="font-bold">{t.contactPhone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-xs text-amber-300 block">Email Us</span>
                <span className="font-bold">{t.contactEmail}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

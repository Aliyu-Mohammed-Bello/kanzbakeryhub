import React, { useState } from 'react';
import { Language, CateringRequest } from '../types';
import { translations } from '../data/translations';
import { cateringPackages } from '../data/cateringPackages';
import { Calendar, Users, Clock, MapPin, Check, Send, Award, Sparkles, Utensils, CheckCircle } from 'lucide-react';

interface CateringSectionProps {
  lang: Language;
}

export const CateringSection: React.FC<CateringSectionProps> = ({ lang }) => {
  const t = translations[lang];

  // Guest count estimator state
  const [guestCount, setGuestCount] = useState(25);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>('morning-artisan-box');

  // Form inputs
  const [eventType, setEventType] = useState('corporate');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('10:00');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [dietaryOptions, setDietaryOptions] = useState<{ [key: string]: boolean }>({
    vegan: false,
    nutFree: false,
    halal: true,
    glutenFree: false,
  });

  // Submission state
  const [submittedRequest, setSubmittedRequest] = useState<CateringRequest | null>(null);

  // Price calculation
  const selectedPackage = cateringPackages.find((p) => p.id === selectedPackageId);
  const baseCost = selectedPackage ? selectedPackage.price : 150;
  const pricePerGuest = 12; // base rate
  const estimatedTotal = Math.max(baseCost, guestCount * pricePerGuest);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim() || !eventDate) return;

    const request: CateringRequest = {
      id: `KANZ-CAT-${Math.floor(100000 + Math.random() * 900000)}`,
      eventType,
      guestCount,
      eventDate,
      eventTime,
      packageSelected: selectedPackage ? selectedPackage.title[lang] : 'Custom Catering',
      dietaryPreferences: Object.keys(dietaryOptions).filter((k) => dietaryOptions[k]),
      deliveryType,
      contactName,
      contactPhone,
      contactEmail,
      deliveryAddress,
      specialNotes,
      estimatedTotal,
      status: 'submitted',
      createdAt: new Date().toLocaleDateString(),
    };

    setSubmittedRequest(request);
  };

  return (
    <div className="bg-amber-50/30 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-200/60 px-3.5 py-1 rounded-full mb-3 border border-amber-300">
            {t.navCatering}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
            {t.cateringTitle}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            {t.cateringSubtitle}
          </p>
        </div>

        {/* Pre-made Catering Packages Showcase */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif font-bold text-stone-900 mb-8 text-center">
            {t.cateringTabPackages}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cateringPackages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`bg-white rounded-3xl overflow-hidden border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPackageId === pkg.id
                    ? 'border-amber-800 shadow-xl ring-2 ring-amber-800/20 scale-102'
                    : 'border-amber-200/80 hover:border-amber-400 shadow-xs'
                }`}
              >
                <div>
                  {/* Image */}
                  <div className="relative h-48 w-full">
                    <img
                      src={pkg.image}
                      alt={pkg.title[lang]}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {pkg.badge && (
                      <span className="absolute top-3 left-3 rtl:right-3 rtl:left-auto bg-amber-900 text-amber-100 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                        {pkg.badge[lang]}
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <h4 className="font-serif text-xl font-bold text-stone-900 mb-2">
                      {pkg.title[lang]}
                    </h4>
                    <p className="text-stone-600 text-xs leading-relaxed mb-4">
                      {pkg.description[lang]}
                    </p>

                    <div className="flex items-center justify-between text-xs text-amber-900 font-bold bg-amber-50 p-2.5 rounded-xl mb-4">
                      <span>{t.packageServings}</span>
                      <span>{pkg.servings}</span>
                    </div>

                    {/* Included Items list */}
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {pkg.itemsList[lang].map((itemStr, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <span>{itemStr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between mt-4">
                  <div>
                    <span className="text-xs text-stone-400 block">Package Price</span>
                    <span className="text-2xl font-serif font-bold text-amber-950">${pkg.price}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPackageId(pkg.id);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                      selectedPackageId === pkg.id
                        ? 'bg-amber-900 text-amber-50'
                        : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                    }`}
                  >
                    {selectedPackageId === pkg.id ? 'Selected' : t.bookThisPackage}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Guest Count & Price Estimator Calculator */}
        <div className="bg-amber-900 text-amber-50 rounded-3xl p-8 sm:p-10 shadow-xl mb-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-2xl font-serif font-bold text-amber-100">
              {t.cateringGuestCalculator}
            </h3>

            {/* Slider */}
            <div className="space-y-3 bg-amber-950/60 p-6 rounded-2xl border border-amber-800">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-amber-200">{t.selectGuestCount}:</span>
                <span className="text-2xl font-serif font-bold text-amber-400">{guestCount} Guests</span>
              </div>

              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-amber-800 rounded-lg"
              />

              <div className="flex justify-between text-[11px] text-amber-300/80">
                <span>10 Guests (Small Gathering)</span>
                <span>100 Guests (Corporate)</span>
                <span>300+ Guests (Wedding)</span>
              </div>
            </div>

            {/* Total Estimate Display */}
            <div className="inline-flex items-center gap-4 bg-amber-50 text-amber-950 px-8 py-4 rounded-2xl shadow-lg">
              <div className="text-left rtl:text-right">
                <span className="text-xs text-amber-800 font-bold block">{t.estimatedTotalLabel}</span>
                <span className="text-3xl font-serif font-extrabold text-amber-900">${estimatedTotal}</span>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                (~${(estimatedTotal / guestCount).toFixed(1)} {t.perPerson})
              </span>
            </div>
          </div>
        </div>

        {/* Catering Request Form or Success State */}
        <div className="bg-white rounded-3xl border border-amber-200 shadow-xl p-8 sm:p-12 max-w-4xl mx-auto">
          {submittedRequest ? (
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h3 className="text-3xl font-serif font-bold text-stone-900">
                {t.cateringSuccessTitle}
              </h3>

              <p className="text-stone-600 max-w-lg mx-auto text-base">
                {t.cateringSuccessMessage}
              </p>

              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 max-w-md mx-auto text-left rtl:text-right space-y-2 text-sm text-stone-800">
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="font-bold text-amber-900">{t.cateringReference}:</span>
                  <span className="font-mono font-bold">{submittedRequest.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact:</span>
                  <span className="font-semibold">{submittedRequest.contactName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Event Date:</span>
                  <span className="font-semibold">{submittedRequest.eventDate} @ {submittedRequest.eventTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guest Count:</span>
                  <span className="font-semibold">{submittedRequest.guestCount} Guests</span>
                </div>
                <div className="flex justify-between border-t border-amber-200 pt-2 font-bold text-amber-950">
                  <span>Estimated Total:</span>
                  <span>${submittedRequest.estimatedTotal}</span>
                </div>
              </div>

              <button
                onClick={() => setSubmittedRequest(null)}
                className="px-8 py-3.5 rounded-2xl bg-amber-900 text-amber-50 font-bold hover:bg-amber-800 transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="border-b border-stone-200 pb-4">
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  {t.eventDetails}
                </h3>
                <p className="text-stone-500 text-xs">Fill in your schedule to receive a official quote within 2 hours.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Type */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    {t.eventType}
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full p-3.5 rounded-2xl border border-stone-200 text-sm font-medium bg-stone-50 focus:outline-hidden focus:border-amber-700 cursor-pointer"
                  >
                    <option value="corporate">{t.eventTypeCorporate}</option>
                    <option value="wedding">{t.eventTypeWedding}</option>
                    <option value="ramadan">{t.eventTypeRamadan}</option>
                    <option value="birthday">{t.eventTypeBirthday}</option>
                    <option value="private">{t.eventTypePrivate}</option>
                    <option value="other">{t.eventTypeOther}</option>
                  </select>
                </div>

                {/* Event Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      {t.eventDate}
                    </label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full p-3.5 rounded-2xl border border-stone-200 text-sm font-medium bg-stone-50 focus:outline-hidden focus:border-amber-700 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      {t.eventTime}
                    </label>
                    <input
                      type="time"
                      required
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      className="w-full p-3.5 rounded-2xl border border-stone-200 text-sm font-medium bg-stone-50 focus:outline-hidden focus:border-amber-700 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Delivery Type Toggle */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    {t.deliveryType}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                        deliveryType === 'delivery'
                          ? 'border-amber-800 bg-amber-900 text-amber-50'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {t.optionDelivery}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('pickup')}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                        deliveryType === 'pickup'
                          ? 'border-amber-800 bg-amber-900 text-amber-50'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {t.optionPickup}
                    </button>
                  </div>
                </div>

                {/* Address if delivery */}
                {deliveryType === 'delivery' && (
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      {t.deliveryAddress}
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder={t.deliveryAddressPlaceholder}
                      className="w-full p-3.5 rounded-2xl border border-stone-200 text-sm bg-stone-50 focus:outline-hidden focus:border-amber-700"
                    />
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <h4 className="text-base font-bold text-stone-900">
                  {t.contactInfo}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    placeholder={t.contactNamePlaceholder}
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="p-3.5 rounded-2xl border border-stone-200 text-sm bg-stone-50 focus:outline-hidden focus:border-amber-700"
                  />
                  <input
                    type="tel"
                    required
                    placeholder={t.contactPhonePlaceholder}
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="p-3.5 rounded-2xl border border-stone-200 text-sm bg-stone-50 focus:outline-hidden focus:border-amber-700"
                  />
                  <input
                    type="email"
                    placeholder={t.contactEmailPlaceholder}
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="p-3.5 rounded-2xl border border-stone-200 text-sm bg-stone-50 focus:outline-hidden focus:border-amber-700"
                  />
                </div>
              </div>

              {/* Dietary Preferences Checkboxes */}
              <div className="space-y-3 pt-4 border-t border-stone-100">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {t.dietaryPreferencesLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { key: 'vegan', label: t.dietaryVeganOpt },
                    { key: 'nutFree', label: t.dietaryNutFreeOpt },
                    { key: 'halal', label: t.dietaryHalalOpt },
                    { key: 'glutenFree', label: t.dietaryGlutenFreeOpt },
                  ].map((opt) => (
                    <label key={opt.key} className="flex items-center gap-2 p-3 rounded-2xl border border-stone-200 text-xs font-semibold cursor-pointer hover:bg-stone-50">
                      <input
                        type="checkbox"
                        checked={dietaryOptions[opt.key]}
                        onChange={(e) => setDietaryOptions({ ...dietaryOptions, [opt.key]: e.target.checked })}
                        className="accent-amber-800 rounded-sm w-4 h-4"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  {t.specialNotes}
                </label>
                <textarea
                  rows={3}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder={t.specialNotesPlaceholder}
                  className="w-full p-3.5 rounded-2xl border border-stone-200 text-sm bg-stone-50 focus:outline-hidden focus:border-amber-700"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-amber-900 hover:bg-amber-800 text-amber-50 font-bold text-base shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                <Send className="w-5 h-5" />
                <span>{t.cateringSubmit}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

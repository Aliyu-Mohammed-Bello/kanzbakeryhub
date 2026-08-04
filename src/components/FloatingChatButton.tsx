import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sparkles, Bot, MessageSquare } from 'lucide-react';

interface FloatingChatButtonProps {
  lang: Language;
  onOpenAiAssistant: () => void;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({
  lang,
  onOpenAiAssistant,
}) => {
  const t = translations[lang];

  return (
    <button
      onClick={onOpenAiAssistant}
      className="fixed bottom-20 md:bottom-8 right-5 rtl:left-5 rtl:right-auto z-40 bg-amber-900 text-amber-50 hover:bg-amber-800 p-3 sm:p-3.5 px-4 sm:px-5 rounded-full shadow-2xl border-2 border-amber-300/80 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 group cursor-pointer animate-bounce-subtle"
      title={lang === 'ar' ? 'المساعد الذكي - الشيف كنز' : 'Chef Kanz AI Chatbot'}
      aria-label="Open AI Assistant Chatbot"
    >
      <div className="relative flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center text-amber-300 border border-amber-400/40">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        </div>
        <span className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto w-3 h-3 bg-emerald-500 rounded-full border-2 border-amber-900"></span>
      </div>

      <div className="flex flex-col text-left rtl:text-right">
        <span className="font-serif font-bold text-xs sm:text-sm text-amber-100 leading-tight">
          {lang === 'ar' ? 'اسأل الشيف كنز' : 'Ask Chef Kanz'}
        </span>
        <span className="text-[10px] text-amber-300/80 font-medium hidden sm:inline-block">
          {lang === 'ar' ? 'مساعدك الذكي 24/7' : '24/7 AI Concierge'}
        </span>
      </div>
    </button>
  );
};

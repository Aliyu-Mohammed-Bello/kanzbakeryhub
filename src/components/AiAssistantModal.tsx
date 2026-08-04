import React, { useState } from 'react';
import { AiMessage, Language, MenuItem } from '../types';
import { translations } from '../data/translations';
import { X, Sparkles, Send, Bot, User, Plus, ArrowRight } from 'lucide-react';

interface AiAssistantModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onQuickAddToCart: (item: MenuItem, e: React.MouseEvent) => void;
}

const cleanText = (raw: string): string => {
  if (!raw) return '';
  return raw
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^\s*[\*\-]\s+/gm, '• ')
    .replace(/\*/g, '')
    .replace(/^#+\s*/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  lang,
  isOpen,
  onClose,
  menuItems,
  onQuickAddToCart,
}) => {
  const t = translations[lang];

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `kanz-session-${Math.random().toString(36).substring(2, 9)}`);
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: lang === 'ar'
        ? `أهلاً بك! أنا "الشيف كنز الذكي". يسعدني مساعدتك في اختيار المخبوزات، اقتراح المشروبات، أو تقديم أفكار لضيافتك ومناسباتك.`
        : `Welcome to Kanz Bakery! I am "Chef Kanz AI". How can I assist you with pastry selections, beverage pairings, or catering ideas today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  if (!isOpen) return null;

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputPrompt.trim() || loading) return;

    const userMsgText = inputPrompt.trim();
    const userMsg: AiMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsgText,
          sessionId,
          lang,
        }),
      });

      const data = await response.json();

      const aiMsg: AiMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: cleanText(data.text) || (lang === 'ar' ? 'شكراً لسؤالك! نوصي بتجربة كرواسون الفستق والكنافة المميز.' : 'Thank you! We recommend our Pistachio Kunafa Croissant.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedItemIds: data.recommendedItemIds || [],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI error:', err);
      const fallbackMsg: AiMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: lang === 'ar'
          ? 'يسعدني مساعدتك! نوصي بتجربة خبز الساوردو الطبيعي مع اللاتيه بالهيل والعسل.'
          : 'I recommend pairing our Organic Sourdough Boule with our Kanz Cardamom Latte!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedItemIds: ['kanz-sourdough-boule', 'kanz-cardamom-latte'],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[85vh] shadow-2xl border border-amber-200 flex flex-col justify-between animate-in zoom-in-95 duration-200 relative overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-amber-900 text-amber-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-800 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-amber-100">
                {t.aiTitle}
              </h3>
              <p className="text-[11px] text-amber-200/80">
                Artisan Baking Sommelier
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-amber-800 text-amber-200 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-amber-50/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-amber-900 text-amber-100 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-900 text-amber-50 rounded-tr-none'
                    : 'bg-white text-stone-800 border border-amber-200/80 shadow-2xs rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{cleanText(msg.text)}</p>

                {/* Render recommended items cards */}
                {msg.recommendedItemIds && msg.recommendedItemIds.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-stone-100 space-y-2">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                      Recommended Bakery Items:
                    </span>
                    {msg.recommendedItemIds.map((itemId) => {
                      const item = menuItems.find((m) => m.id === itemId);
                      if (!item) return null;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2 rounded-xl bg-amber-50 border border-amber-200 text-stone-900"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <img src={item.image} alt={item.name[lang]} className="w-9 h-9 rounded-lg object-cover" />
                            <div className="min-w-0">
                              <span className="font-bold text-xs truncate block">{item.name[lang]}</span>
                              <span className="text-[11px] text-amber-900 font-bold">${item.price.toFixed(2)}</span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => onQuickAddToCart(item, e)}
                            className="p-1.5 rounded-lg bg-amber-900 text-amber-50 text-xs font-bold hover:bg-amber-800 shrink-0 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                <span className="text-[9px] opacity-60 block text-right mt-1">
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-stone-300 text-stone-700 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-center text-xs text-amber-800 font-medium italic p-2 bg-white rounded-2xl border border-amber-200 w-fit">
              <Sparkles className="w-4 h-4 animate-spin text-amber-600" />
              <span>Chef Kanz is thinking...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-amber-200 flex gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={t.aiPlaceholder}
            className="flex-1 p-3 rounded-2xl border border-stone-200 text-xs sm:text-sm bg-stone-50 focus:outline-hidden focus:border-amber-700"
          />
          <button
            type="submit"
            disabled={loading || !inputPrompt.trim()}
            className="px-4 py-3 rounded-2xl bg-amber-900 text-amber-50 text-xs font-bold hover:bg-amber-800 disabled:opacity-50 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};

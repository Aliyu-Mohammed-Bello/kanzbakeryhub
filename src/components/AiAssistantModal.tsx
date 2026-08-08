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

const extractRecommendedItems = (text: string): string[] => {
  if (!text) return ['pistachio-kunafa-croissant', 'kanz-sourdough-boule'];
  const lower = text.toLowerCase();
  const matched: string[] = [];

  const checks: { id: string; keywords: string[] }[] = [
    { id: 'pistachio-kunafa-croissant', keywords: ['kunafa', 'croissant', 'pistachio', 'كنافة', 'كرواسون', 'فستق'] },
    { id: 'kanz-sourdough-boule', keywords: ['sourdough', 'boule', 'bread', 'ساوردو', 'خبز'] },
    { id: 'zaatar-olive-focaccia', keywords: ['focaccia', 'zaatar', "za'atar", 'olive', 'فوكاشيا', 'زعتر', 'زيتون'] },
    { id: 'classic-baklava-trio', keywords: ['baklava', 'بقلاوة'] },
    { id: 'saffron-milk-cake', keywords: ['saffron', 'tres leches', 'milk cake', 'زعفران', 'كيكة الحليب'] },
    { id: 'kanz-cardamom-latte', keywords: ['cardamom', 'latte', 'لاتيه', 'هيل'] },
    { id: 'karak-tea-pot', keywords: ['karak', 'tea', 'كرك', 'شاي'] },
    { id: 'rosewater-pistachio-cake', keywords: ['rosewater', 'ورد', 'كيكة'] },
    { id: 'halloumi-pesto-croissant', keywords: ['halloumi', 'pesto', 'حلوم', 'بيستو'] },
    { id: 'date-walnut-maamoul', keywords: ['maamoul', "ma'amoul", 'date', 'معمول', 'تمره'] },
    { id: 'sesame-simit-ring', keywords: ['simit', 'sesame', 'سميط', 'سمسم'] },
    { id: 'basbousa-cream-tart', keywords: ['basbousa', 'ashta', 'بسبوسة', 'قشطة'] },
  ];

  for (const c of checks) {
    if (c.keywords.some((k) => lower.includes(k))) {
      matched.push(c.id);
    }
  }

  return matched.length > 0 ? matched.slice(0, 3) : ['pistachio-kunafa-croissant', 'kanz-sourdough-boule'];
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
      let responseText = '';
      let itemIds: string[] = [];

      // 1. Primary attempt: Call local server endpoint /api/ai/recommend
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

        if (response.ok) {
          const data = await response.json();
          if (data && data.text) {
            responseText = cleanText(data.text);
            itemIds = data.recommendedItemIds || [];
          }
        }
      } catch (apiErr) {
        console.warn('Backend API endpoint not reachable, trying direct n8n connection...', apiErr);
      }

      // 2. Secondary attempt: Call production n8n webhook directly from browser
      if (!responseText) {
        try {
          const n8nRes = await fetch('https://medinat.app.n8n.cloud/webhook/website-chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chatInput: userMsgText,
              prompt: userMsgText,
              message: userMsgText,
              query: userMsgText,
              sessionId,
              lang,
            }),
          });

          if (n8nRes.ok) {
            const contentType = n8nRes.headers.get('content-type') || '';
            let rawData = '';
            if (contentType.includes('application/json')) {
              const data = await n8nRes.json();
              if (typeof data === 'string') {
                rawData = data;
              } else if (Array.isArray(data) && data.length > 0) {
                const item = data[0];
                rawData = item.output || item.response || item.text || item.message || (typeof item === 'string' ? item : JSON.stringify(item));
              } else if (data && typeof data === 'object') {
                rawData = data.output || data.response || data.text || data.message || data.result || JSON.stringify(data);
              }
            } else {
              rawData = await n8nRes.text();
            }

            if (rawData && rawData.trim()) {
              responseText = cleanText(rawData);
            }
          }
        } catch (n8nErr) {
          console.warn('Direct client n8n webhook error:', n8nErr);
        }
      }

      // 3. Fallback: Dynamic contextual response based on query
      if (!responseText) {
        const lower = userMsgText.toLowerCase();
        if (lower.includes('coffee') || lower.includes('latte') || lower.includes('tea') || lower.includes('قهوة') || lower.includes('شاي') || lower.includes('هيل')) {
          responseText = lang === 'ar'
            ? 'نوصي بتجربة لاتيه الهيل والعسل الملكي من مخبز كنز مع شاي الكرك الذهبي.'
            : 'For beverages, I highly recommend our Kanz Signature Green Cardamom & Honey Latte or our Royal Golden Karak Tea!';
        } else if (lower.includes('cake') || lower.includes('sweet') || lower.includes('حلا') || lower.includes('كيك')) {
          responseText = lang === 'ar'
            ? 'تفضل بتجربة كيكة الزعفران بالحليب الملكية أو كيكة الفستق وماء الورد.'
            : 'For something sweet, our Spanish Saffron Tres Leches Milk Cake or Rosewater & Cardamom Pistachio Cake are divine choices!';
        } else if (lower.includes('bread') || lower.includes('sourdough') || lower.includes('خبز') || lower.includes('ساوردو')) {
          responseText = lang === 'ar'
            ? 'نوصيك بتجربة خبز الساوردو العضوي المخمر لمدة 48 ساعة أو فوكاشيا الزعتر البري والزيتون.'
            : 'Our Signature 48-Hour Cold Fermented Sourdough Boule and Wild Zaatar Focaccia are customer favorites!';
        } else {
          responseText = lang === 'ar'
            ? `أهلاً بك في مخبز كنز! يسعدني إجابة استفسارك بخصوص "${userMsgText}". أنصحك بتجربة كرواسون الفستق والكنافة الملكي مع خبز الساوردو العضوي.`
            : `Welcome to Kanz Bakery! Regarding "${userMsgText}", I recommend trying our Pistachio Kunafa Supreme Croissant along with our Signature Organic Sourdough Boule.`;
        }
      }

      // Extract recommended menu item IDs matching the response text
      if (itemIds.length === 0) {
        itemIds = extractRecommendedItems(responseText + ' ' + userMsgText);
      }

      const aiMsg: AiMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedItemIds: itemIds,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI Assistant Error:', err);
      const fallbackMsg: AiMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: lang === 'ar'
          ? `يسعدني مساعدتك بخصوص "${userMsgText}". نوصي بتجربة كرواسون الفستق والكنافة وخبر الساوردو المميز.`
          : `I am delighted to assist you with "${userMsgText}". We recommend trying our Pistachio Kunafa Supreme Croissant!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedItemIds: ['pistachio-kunafa-croissant', 'kanz-sourdough-boule'],
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

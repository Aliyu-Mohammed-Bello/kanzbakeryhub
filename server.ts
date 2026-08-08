import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for AI Chef Recommendations
app.post('/api/ai/recommend', async (req, res) => {
  try {
    const { prompt, lang = 'en', cartItems = [], sessionId = `kanz-${Date.now()}` } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const n8nWebhookUrl = 'https://medinat.app.n8n.cloud/webhook/website-chatbot';
    let responseText = '';
    let usedN8n = false;

    // 1. Try calling the production n8n chatbot webhook first
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

      const n8nRes = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          chatInput: prompt,
          prompt,
          message: prompt,
          query: prompt,
          sessionId,
          lang,
          cartItems,
        }),
      });

      clearTimeout(timeoutId);

      if (n8nRes.ok) {
        const contentType = n8nRes.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await n8nRes.json();
          if (typeof data === 'string') {
            responseText = data;
          } else if (Array.isArray(data) && data.length > 0) {
            const item = data[0];
            responseText = item.output || item.response || item.text || item.message || (typeof item === 'string' ? item : JSON.stringify(item));
          } else if (data && typeof data === 'object') {
            responseText = data.output || data.response || data.text || data.message || data.result || JSON.stringify(data);
          }
        } else {
          responseText = await n8nRes.text();
        }

        if (responseText && typeof responseText === 'string' && responseText.trim().length > 0) {
          usedN8n = true;
        }
      }
    } catch (n8nErr) {
      console.warn('n8n webhook call failed, falling back to Gemini knowledge base:', n8nErr);
    }

    // 2. Fallback to Gemini API if n8n response was empty
    if (!responseText) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });

        const systemInstruction = `You are "Chef Kanz AI" (الشيف كنز الذكي), the master artisan baker, sommelier, and guest experience concierge at Kanz Bakery (مخبز كنز).

=== KANZ BAKERY KNOWLEDGE BASE & SYSTEM INSTRUCTIONS ===

1. BRAND IDENTITY & MISSION:
- Brand Name: Kanz Bakery (مخبز كنز)
- Tagline: "Artisanal Tradition Meets Modern Elegance" / "المخبوزات التقليدية الأصيلة بلمسة عصرية"
- Concept: An boutique artisanal bakery combining time-honored European sourdough baking techniques with rich Middle Eastern heritage flavors (saffron, cardamom, pistachio, za'atar, rosewater, date molasses, ashta, and sesame).
- Tone & Voice: Warm, hospitable, eloquent, knowledgeable, passionate about baking, and welcoming.

2. MENU KNOWLEDGE BASE:
[BREADS & SOURDOUGHS]
- Signature Organic Sourdough Boule (ID: kanz-sourdough-boule) - $8.50 | 48-hour wild cold-fermented organic wheat flour with a golden caramelized crust and soft airy crumb. [Vegan, Organic]
- Wild Za'atar & Kalamata Olive Focaccia (ID: zaatar-olive-focaccia) - $9.00 | Italian olive oil focaccia topped with organic Palestinian wild za'atar, sumac, and pitted Kalamata olives. [Vegan, Organic]
- Toasted Sesame Molasses Simit Ring (ID: sesame-simit-ring) - $3.50 | Artisanal Turkish-style bread ring dipped in grape molasses and crusted with toasted white sesame seeds. [Vegan]

[PASTRIES & VIENNOISERIE]
- Pistachio Kunafa Supreme Croissant (ID: pistachio-kunafa-croissant) - $7.00 | Flaky French butter croissant stuffed with rich pistachio cream and topped with crunchy roasted kunafa pastry. [Signature]
- Grilled Halloumi & Mint Pesto Sandwich (ID: halloumi-pesto-croissant) - $8.50 | Warm croissant with pan-seared halloumi cheese, fresh mint pesto, sun-dried tomatoes, and baby arugula.

[CAKES & TRADITIONAL SWEETS]
- Royal Baklava & Cashew Trio Box (ID: classic-baklava-trio) - $18.00 | Assorted golden filo pastry layers filled with antep pistachios, cashews, and wild blossom honey syrup.
- Rosewater & Cardamom Pistachio Sponge Cake (ID: rosewater-pistachio-cake) - $38.00 | Delicate sponge cake layered with rosewater cream, ground cardamom, and toasted pistachios.
- Spanish Saffron Tres Leches Milk Cake (ID: saffron-milk-cake) - $9.50 | Light sponge soaked in three milks infused with saffron strands and topped with whipped cream.
- Heritage Omani Date & Walnut Ma'amoul (ID: date-walnut-maamoul) - $14.00 | Melt-in-your-mouth semolina cookies filled with premium Omani date paste and roasted walnuts.
- Golden Basbousa Tart with Ashta Cream (ID: basbousa-cream-tart) - $8.00 | Semolina cake tart soaked in orange blossom syrup, filled with fresh homemade clotted cream (ashta).

[BEVERAGES & PAIRINGS]
- Kanz Signature Green Cardamom & Honey Latte (ID: kanz-cardamom-latte) - $5.50 | Espresso with steamed oat or dairy milk, organic green cardamom pods, and raw honey.
- Royal Golden Karak Tea Pot (ID: karak-tea-pot) - $6.00 | Slow-simmered black tea brewed with evaporated milk, saffron, cardamom, and cloves.

3. SPECIAL SERVICES & CATERING:
- Corporate & Event Catering: Custom pastry boxes, mini croissant trays, baklava towers, and artisan sourdough boards for corporate breakfasts, weddings, and private events.
- Special Dietary Options: Vegan breads (Sourdough, Focaccia, Simit), nut-free options available upon request.

4. RESPONSE GUIDELINES:
- Language: Respond in the user's preferred language (${lang === 'ar' ? 'Arabic' : 'English'}). If spoken to in Arabic, reply in natural, hospitable Arabic.
- CRITICAL NO-ASTERISKS RULE: Do NOT use any asterisks (* or **), hashtags (#), or raw markdown formatting symbols in your text response. Present all text in clean, professional, unformatted paragraphs and lists.
- Structure: Keep responses clear, delightful, and concise. Provide 1 to 3 specific menu recommendations matching their desire (breakfast, coffee pairing, catering, sweet/savory).
- Item References: When recommending items, include their full name and highlight why it pairs well or fits their desire.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        });

        responseText = response.text || '';
      }
    }

    // 3. Fallback text if still empty
    if (!responseText) {
      responseText = lang === 'ar'
        ? `أهلاً بك في مخبز كنز! يسعدنا مساعدتك. نوصيك بـ "خبز الساوردو العضوي الملكي" مع "كرواسون الفستق والكنافة" لإفطار مميز، أو "صندوق البقلاوة الملكي" لمناسباتك.`
        : `Welcome to Kanz Bakery! We recommend trying our Signature Organic Sourdough Boule paired with the Pistachio Kunafa Croissant for breakfast, or the Royal Baklava Trio for special occasions.`;
    }

    // Sanitize responseText to completely remove any raw asterisks or markdown artifacts
    const sanitizedText = responseText
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/^\s*[\*\-]\s+/gm, '• ')
      .replace(/\*/g, '')
      .replace(/^#+\s*/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    // Extract item IDs mentioned or relevant using flexible keyword matching
    const lower = (sanitizedText + ' ' + prompt).toLowerCase();
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

    const matchedIds: string[] = [];
    for (const c of checks) {
      if (c.keywords.some(k => lower.includes(k))) {
        matchedIds.push(c.id);
      }
    }

    const recommendedItemIds = matchedIds.length > 0 ? matchedIds.slice(0, 3) : ['pistachio-kunafa-croissant', 'kanz-sourdough-boule'];

    res.json({
      text: sanitizedText,
      recommendedItemIds,
      source: usedN8n ? 'n8n_webhook' : 'gemini_knowledge_base'
    });

  } catch (error: any) {
    console.error('AI Recommend Error:', error);
    res.status(500).json({ error: 'Failed to generate recommendation', details: error?.message });
  }
});

// Vite middleware for dev or static server for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kanz Bakery server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

import { MenuItem, Review } from '../types';

export const initialMenuItems: MenuItem[] = [
  {
    id: 'kanz-sourdough-boule',
    name: {
      en: 'Signature Organic Sourdough Boule',
      ar: 'خبز الساوردو العضوي الملكي'
    },
    description: {
      en: '48-hour slow cold-fermented wild yeast sourdough boule with a crisp dark blistered crust and open airy crumb.',
      ar: 'خبز ساوردو مخمر طبيعياً لمدة ٤٨ ساعة بخميرة حرة، بقشرة محمصة مقرمشة وقوام داخلي هوري طري.'
    },
    price: 8.50,
    category: 'breads',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewCount: 128,
    dietaryTags: ['signature', 'organic', 'vegan', 'halal'],
    calories: 220,
    prepTime: 'Fresh Daily 6AM',
    featured: true,
    customizations: {
      sizes: [
        { id: 'standard', name: { en: 'Standard Loaf (650g)', ar: 'رغيف قياسي (٦٥٠ جم)' }, priceExtra: 0 },
        { id: 'large', name: { en: 'Family Boule (1kg)', ar: 'رغيف عائلي كنز (١ كجم)' }, priceExtra: 4.00 }
      ],
      warmOrSlice: [
        { id: 'whole', name: { en: 'Keep Whole (Preserves freshness)', ar: 'رغيف كامل (يحافظ على الطراوة)' } },
        { id: 'thick-slice', name: { en: 'Thick Artisan Slice', ar: 'مقطع شرائح سميكة' } },
        { id: 'thin-slice', name: { en: 'Thin Sandwich Slice', ar: 'مقطع شرائح رفيعة للسندويشات' } }
      ]
    }
  },
  {
    id: 'pistachio-kunafa-croissant',
    name: {
      en: 'Pistachio Kunafa Supreme Croissant',
      ar: 'كرواسون الفستق والكنافة الملكية'
    },
    description: {
      en: 'Flaky pure French butter croissant filled with creamy pistachio praline, topped with golden crispy kunafa dough and crushed Gazan pistachios.',
      ar: 'كرواسون فرنسي هش بالزبدة الفاخرة، محشو بكريمة الفستق الحلبي ومغطى بالكنافة الذهبية المقرمشة بالفستق.'
    },
    price: 7.00,
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviewCount: 215,
    dietaryTags: ['signature', 'halal'],
    calories: 420,
    prepTime: '20 mins',
    featured: true,
    customizations: {
      heatingOptions: [
        { id: 'warm', name: { en: 'Warmed in Stone Oven', ar: 'مسخن في فرن الحجر' } },
        { id: 'room-temp', name: { en: 'Room Temperature', ar: 'حرارة الغرفة العادية' } }
      ]
    }
  },
  {
    id: 'classic-baklava-trio',
    name: {
      en: 'Royal Baklava & Cashew Trio Box',
      ar: 'صندوق البقلاوة الملكي بالفستق والكاجو'
    },
    description: {
      en: 'Paper-thin filo layers brushed with clarified ghee, stuffed with crushed green pistachios & roasted cashews, drizzled with orange blossom syrup.',
      ar: 'طبقات رقائق الفيلو الذهبية الهشة المدهونة بالسمن الحيواني الصافي، المحشوة بالفستق والكاجو والمشرّبة بماء الزهر.'
    },
    price: 18.00,
    category: 'sweets',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewCount: 94,
    dietaryTags: ['signature', 'halal', 'organic'],
    calories: 380,
    featured: true,
    customizations: {
      sizes: [
        { id: 'box-12', name: { en: 'Small Box (12 pcs)', ar: 'علبة صغيرة (١٢ قطعة)' }, priceExtra: 0 },
        { id: 'box-24', name: { en: 'Medium Gift Box (24 pcs)', ar: 'علبة هدايا متوسطة (٢٤ قطعة)' }, priceExtra: 14.00 },
        { id: 'box-48', name: { en: 'Large Hospitality Tray (48 pcs)', ar: 'صينية الضيافة الكبيرة (٤٨ قطعة)' }, priceExtra: 36.00 }
      ],
      sweetnessLevels: [
        { id: 'balanced', name: { en: 'Traditional Sweetness', ar: 'حلاوة تقليدية موزونة' } },
        { id: 'light-syrup', name: { en: 'Light Blossom Syrup', ar: 'شيرة خفيفة مع زهر البرتقال' } }
      ]
    }
  },
  {
    id: 'zaatar-olive-focaccia',
    name: {
      en: 'Wild Za\'atar & Kalamata Olive Focaccia',
      ar: 'فوكاشيا الزعتر البري وزيتون الكالاماتا'
    },
    description: {
      en: 'Extra virgin olive oil soaked flatbread layered with aromatic Palestinian mountain za\'atar, sea salt flakes, and pitted Kalamata olives.',
      ar: 'خبز الفوكاشيا الغني بزبادي زيت الزيتون الصافي المعصور على البارد، المغطى بالزعتر الجبلي الفلسطيني والزيتون.'
    },
    price: 9.00,
    category: 'breads',
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewCount: 82,
    dietaryTags: ['vegan', 'halal', 'organic'],
    calories: 290,
    prepTime: 'Daily'
  },
  {
    id: 'rosewater-pistachio-cake',
    name: {
      en: 'Rosewater & Cardamom Pistachio Sponge Cake',
      ar: 'كيكة الهيل وماء الورد بالفستق الحلبي'
    },
    description: {
      en: 'Moist pistachio flour sponge infused with organic Iranian rosewater, layered with light cardamom cream and edible dried rose petals.',
      ar: 'كيكة الفستق الناعمة المعطرة بماء الورد الإيراني العضوي، المحشوة بكريمة الهيل الخفيفة والمزينة ببتلات الورد.'
    },
    price: 38.00,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviewCount: 76,
    dietaryTags: ['signature', 'halal', 'organic'],
    calories: 340,
    featured: true,
    customizations: {
      sizes: [
        { id: 'slice', name: { en: 'Single Generous Slice', ar: 'شريحة واحدة مشبعة' }, priceExtra: 0 },
        { id: '6-inch', name: { en: 'Whole 6" Cake (Serves 6-8)', ar: 'كيكة كاملة ٦ بوصة (تكفي ٦-٨ أفراد)' }, priceExtra: 26.00 },
        { id: '8-inch', name: { en: 'Whole 8" Celebration Cake (Serves 10-14)', ar: 'كيكة كاملة ٨ بوصة للمناسبات (تكفي ١٠-١٤ فرد)' }, priceExtra: 48.00 }
      ]
    }
  },
  {
    id: 'halloumi-pesto-croissant',
    name: {
      en: 'Grilled Halloumi & Mint Pesto Sandwich',
      ar: 'سندويش الحلوم المشوي ببيستو النعناع'
    },
    description: {
      en: 'Crispy warm butter croissant with thick grilled Cypriot halloumi, fresh mint pesto, sun-dried tomatoes, and baby arugula.',
      ar: 'كرواسون دافئ بالزبدة محشو بجبن الحلوم المشوي، بيستو النعناع الطازج، الطماطم المجففة وجرجير الجبال.'
    },
    price: 8.50,
    category: 'savory',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviewCount: 110,
    dietaryTags: ['halal'],
    calories: 450,
    prepTime: 'Made Fresh'
  },
  {
    id: 'date-walnut-maamoul',
    name: {
      en: 'Heritage Omani Date & Walnut Ma\'amoul',
      ar: 'معمول التمر العماني والجوز العريق'
    },
    description: {
      en: 'Melt-in-mouth semolina shortbread stuffed with smooth spiced date paste and toasted walnuts, dusted with icing sugar.',
      ar: 'معمول السميد الفاخر المزين بالنقوش التراثية، المحشو بمعجون تمر الخلاص والجوز المحمص مع قرفة ونكهة زهر.'
    },
    price: 14.00,
    category: 'sweets',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewCount: 88,
    dietaryTags: ['halal', 'organic'],
    calories: 210,
    customizations: {
      sizes: [
        { id: 'half-kg', name: { en: 'Half Kilogram (~15 pcs)', ar: 'نصف كيلو (حوالي ١٥ قطعة)' }, priceExtra: 0 },
        { id: '1-kg', name: { en: '1 Kilogram (~30 pcs)', ar: 'كيلو كامل (حوالي ٣٠ قطعة)' }, priceExtra: 12.00 }
      ]
    }
  },
  {
    id: 'kanz-cardamom-latte',
    name: {
      en: 'Kanz Signature Green Cardamom & Honey Latte',
      ar: 'لاتيه الهيل العضوي وعسل الجبال'
    },
    description: {
      en: 'Freshly ground specialty espresso pulled over warm steamed milk infused with crushed green cardamom pods and raw wild honey.',
      ar: 'إسبريسو الحبوب المختارة مع حليب مبخر معطر بحبوب الهيل الأخضر المطحون وعسل الجبال الصافي.'
    },
    price: 5.50,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewCount: 142,
    dietaryTags: ['signature', 'halal', 'organic'],
    calories: 180,
    customizations: {
      sizes: [
        { id: 'regular', name: { en: 'Regular (12oz)', ar: 'وسط (١٢ أونصة)' }, priceExtra: 0 },
        { id: 'large', name: { en: 'Large (16oz)', ar: 'كبير (١٦ أونصة)' }, priceExtra: 1.00 }
      ],
      sweetnessLevels: [
        { id: 'oat-milk', name: { en: 'Whole Milk', ar: 'حليب كامل الدسم' } },
        { id: 'almond-milk', name: { en: 'Organic Oat Milk (+ $0.80)', ar: 'حليب الشوفان العضوي (+ $٠٫٨٠)' } }
      ]
    }
  },
  {
    id: 'saffron-milk-cake',
    name: {
      en: 'Spanish Saffron Tres Leches Milk Cake',
      ar: 'كيكة الحليب بالزعفران الإسباني الصافي'
    },
    description: {
      en: 'Ultra-light sponge soaked overnight in three sweet milks steeped with pure saffron threads, topped with whipped vanilla cream.',
      ar: 'كيكة إسفنجية خفيفة للغاية منقوعة بثلاثة أنواع حليب معطرة بأغصان الزعفران الأصلي مع الكريمة الفاخرة.'
    },
    price: 9.50,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewCount: 167,
    dietaryTags: ['signature', 'halal'],
    calories: 360
  },
  {
    id: 'karak-tea-pot',
    name: {
      en: 'Royal Golden Karak Tea Pot',
      ar: 'إبريق شاي الكرك الملكي بالهيل والزعفران'
    },
    description: {
      en: 'Strong black Ceylon tea simmered slowly with evaporated milk, freshly crushed cardamom, ginger, and saffron.',
      ar: 'شاي سيلاني مركز مطبوخ بهدوء مع الحليب المركز، الهيل الطازج، الزنجبيل ولمسة الزعفران.'
    },
    price: 6.00,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewCount: 203,
    dietaryTags: ['halal'],
    calories: 140
  },
  {
    id: 'sesame-simit-ring',
    name: {
      en: 'Toasted Sesame Molasses Simit Bread',
      ar: 'سميط السمسم المحمص بدبس العنب'
    },
    description: {
      en: 'Traditional circular ring bread dipped in natural grape molasses and coated abundantly in toasted golden sesame seeds.',
      ar: 'خبز السميط الدائري التقليدي المغموس بدبس العنب الطبيعي والمغطى بطبقة سخية من السمسم المحمص.'
    },
    price: 3.50,
    category: 'breads',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviewCount: 65,
    dietaryTags: ['vegan', 'halal', 'nut-free'],
    calories: 260
  },
  {
    id: 'basbousa-cream-tart',
    name: {
      en: 'Golden Basbousa Tart with Ashta Cream',
      ar: 'تارت البسبوسة الذهبية بالقشطة البلدية'
    },
    description: {
      en: 'Golden baked semolina cake tart soaked in orange blossom syrup, topped with fresh fresh clotted cream (Ashta) and pistachios.',
      ar: 'بسبوسة السميد الذهبية المشرّبة بالشيرة المعطرة، تتوسطها القشطة البلدية الطازجة والمزينة بالفستق الحلبي.'
    },
    price: 8.00,
    category: 'sweets',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewCount: 92,
    dietaryTags: ['halal'],
    calories: 390
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    itemId: 'kanz-sourdough-boule',
    userName: 'Amira Al-Maktoum',
    rating: 5,
    comment: 'The sourdough crust has that perfect blistered crunch, and the inside stays soft for days! Reminds me of Paris bakeries with a touch of local heart.',
    date: '2026-07-28',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    itemId: 'pistachio-kunafa-croissant',
    userName: 'Youssef Hassan',
    rating: 5,
    comment: 'The combination of kunafa crispiness and pistachio praline inside a buttery croissant is pure magic. Truly the jewel of Kanz Bakery!',
    date: '2026-07-25',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    itemId: 'classic-baklava-trio',
    userName: 'Sarah Jenkins',
    rating: 5,
    comment: 'Ordered the hospitality tray for a corporate tea event. Everyone was amazed at how fresh and non-greasy the baklava was!',
    date: '2026-07-20',
    verifiedPurchase: true
  }
];

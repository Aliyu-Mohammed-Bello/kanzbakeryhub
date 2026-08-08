import { CateringPackage } from '../types';

export const cateringPackages: CateringPackage[] = [
  {
    id: 'morning-artisan-box',
    title: {
      en: 'Morning Artisan Breakfast Box',
      ar: 'صندوق بوفيه الإفطار الصباحي الملكي'
    },
    description: {
      en: 'A grand morning spread of fresh butter croissants, mini za\'atar focaccia, sesame simit rings, fruit preserves, and whipped halloumi spread.',
      ar: 'تشكيلة صباحية فاخرة تضم الكرواسون بالزبدة، الميني فوكاشيا بالزعتر، السميط بالسمسم، المربيات الطبيعية ولابنة الحلوم.'
    },
    servings: '10 - 12 Guests',
    price: 140,
    badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=800',
    itemsList: {
      en: [
        '6 Mini Pistachio Kunafa Croissants',
        '6 Mini Butter & Almond Croissants',
        '8 Za\'atar & Kalamata Olive Focaccia bites',
        '6 Sesame Simit Rings with Artisanal Butter',
        'House-made Fig & Orange Blossom Jam Jar'
      ],
      ar: [
        '٦ ميني كرواسون فستق وكنافة',
        '٦ ميني كرواسون لوز وزبدة',
        '٨ قطع ميني فوكاشيا بالزعتر والزيتون',
        '٦ حلقات سميط مع زبدة الأعشاب',
        'مرطبان مربى التين وماء الزهر المصنوع يدوياً'
      ]
    }
  },
  {
    id: 'royal-sweets-platter',
    title: {
      en: 'Royal Heritage Sweets & Baklava Platter',
      ar: 'صينية الضيافة الملكية للحلويات الشرقية'
    },
    description: {
      en: 'An opulent brass platter filled with handcrafted pistachio baklava, cashew fingers, date ma\'amoul, and basbousa tart squares.',
      ar: 'صينية ضيافة نحاسية فخمة محشوة بالبقلاوة بالفستق، أصابع الكاجو، معمول التمر الفاخر ومربعات البسبوسة بالقشطة.'
    },
    servings: '15 - 20 Guests',
    price: 185,
    badge: { en: 'Celebration Choice', ar: 'خيار الاحتفالات' },
    image: '/src/assets/images/kanz_catering_sweets_1785417024405.jpg',
    itemsList: {
      en: [
        '18 Pieces Royal Pistachio Baklava',
        '15 Hand-carved Date & Walnut Ma\'amoul',
        '12 Basbousa Tart Bites with Ashta Cream',
        '15 Cashew Filo Crisps with Blossom Honey',
        'Decorative Brass Serving Platter (Keep as Gift)'
      ],
      ar: [
        '١٨ قطعة بقلاوة ملكية بالفستق',
        '١٥ قطعة معمول تمر وجوز منقوش يدوياً',
        '١٢ قطعة ميني بسبوسة بالقشطة البلدية',
        '١٥ اصبع بقلاوة كاجو بالعسل',
        'صينية ضيافة نحاسية فاخرة (هدية للمضيف)'
      ]
    }
  },
  {
    id: 'corporate-coffee-break',
    title: {
      en: 'Executive Coffee & Pastry Break Set',
      ar: 'باقة استراحة القهوة والاجتماعات للشركات'
    },
    description: {
      en: 'Designed for corporate meetings and VIP conferences: mini savory pastries, sweet pastries, and a thermal dispenser of Karak Tea or Cardamom Coffee.',
      ar: 'مصممة للاجتماعات والمؤتمرات الهامة: ميني معجنات مالحة وحلوة مع حافظة حرارية لشاي الكرك أو القهوة بالهيل.'
    },
    servings: '15 - 25 Guests',
    price: 220,
    badge: { en: 'Corporate VIP', ar: 'للشركات والمناسبات' },
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800',
    itemsList: {
      en: [
        '12 Mini Grilled Halloumi Croissants',
        '12 Mini Saffron Milk Cake Cups',
        '12 Mini Rosewater Pistachio Cake Slices',
        '1 Thermal Flask (3L) Kanz Cardamom Latte or Karak Tea',
        'Cups, Napkins, and Wooden Cutlery Set'
      ],
      ar: [
        '١٢ ميني كرواسون حلوم مشوي',
        '١٢ كاسات ميني كيكة الحليب بالزعفران',
        '١٢ شريحة ميني كيكة الورد والفستق',
        'حافظة حرارية (٣ لتر) لاتيه الهيل أو شاي الكرك',
        'مجموعة الأكواب والمناديل والأدوات الأنيقة'
      ]
    }
  }
];

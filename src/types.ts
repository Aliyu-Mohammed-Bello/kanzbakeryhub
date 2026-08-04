export type Language = 'en' | 'ar';

export type Category = 'all' | 'breads' | 'pastries' | 'sweets' | 'cakes' | 'savory' | 'drinks';

export type DietaryTag = 'vegan' | 'gluten-free' | 'nut-free' | 'halal' | 'organic' | 'signature';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface MenuItemCustomization {
  sizes?: { id: string; name: LocalizedString; priceExtra: number }[];
  sweetnessLevels?: { id: string; name: LocalizedString }[];
  warmOrSlice?: { id: string; name: LocalizedString }[];
  heatingOptions?: { id: string; name: LocalizedString }[];
}

export interface MenuItem {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  category: Category;
  image: string;
  rating: number;
  reviewCount: number;
  dietaryTags: DietaryTag[];
  calories?: number;
  prepTime?: string;
  customizations?: MenuItemCustomization;
  featured?: boolean;
}

export interface Review {
  id: string;
  itemId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedSize?: { id: string; name: LocalizedString; priceExtra: number };
  selectedOption?: string;
  specialNotes?: string;
}

export interface CateringPackage {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  servings: string;
  price: number;
  itemsList: { en: string[]; ar: string[] };
  badge?: LocalizedString;
  image: string;
}

export interface CateringRequest {
  id: string;
  eventType: string;
  guestCount: number;
  eventDate: string;
  eventTime: string;
  packageSelected?: string;
  dietaryPreferences: string[];
  deliveryType: 'delivery' | 'pickup';
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  deliveryAddress?: string;
  specialNotes: string;
  estimatedTotal: number;
  status: 'submitted' | 'confirmed' | 'pending';
  createdAt: string;
}

export interface AiMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  recommendedItemIds?: string[];
}

import React, { useState, useEffect } from 'react';
import { Language, MenuItem, CartItem, Review } from './types';
import { initialMenuItems, initialReviews } from './data/menuData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { ItemDetailModal } from './components/ItemDetailModal';
import { RateItemModal } from './components/RateItemModal';
import { CateringSection } from './components/CateringSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { FloatingChatButton } from './components/FloatingChatButton';

export default function App() {
  // Language state
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('kanz_lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  // Active Tab
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'about' | 'catering'>('home');

  // Bakery Data state (with local updates for ratings)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('kanz_menu_items');
    return saved ? JSON.parse(saved) : initialMenuItems;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('kanz_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('kanz_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal visibility states
  const [selectedDetailItem, setSelectedDetailItem] = useState<MenuItem | null>(null);
  const [rateModalItem, setRateModalItem] = useState<MenuItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  // Sync Language with HTML document dir & lang attribute
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('kanz_lang', lang);
  }, [lang]);

  // Save Cart to localStorage
  useEffect(() => {
    localStorage.setItem('kanz_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save Menu and Reviews to localStorage
  useEffect(() => {
    localStorage.setItem('kanz_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('kanz_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Language toggle
  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  // Add Item to Cart
  const handleAddToCart = (
    item: MenuItem,
    quantity: number = 1,
    size?: { id: string; name: { en: string; ar: string }; priceExtra: number },
    option?: string,
    specialNotes?: string
  ) => {
    const cartItemId = `${item.id}-${size?.id || 'std'}-${option || 'none'}`;

    setCartItems((prevCart) => {
      const existingIndex = prevCart.findIndex((c) => c.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            item,
            quantity,
            selectedSize: size,
            selectedOption: option,
            specialNotes,
          },
        ];
      }
    });

    setCartOpen(true);
  };

  // Quick Add To Cart from Card
  const handleQuickAddToCart = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    handleAddToCart(item, 1, item.customizations?.sizes?.[0]);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove Cart Item
  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Submit Review & Update Item's average rating dynamically
  const handleSubmitReview = (itemId: string, rating: number, comment: string, name: string) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      itemId,
      userName: name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true,
    };

    setReviews((prev) => [newReview, ...prev]);

    // Recalculate average rating for the menu item
    setMenuItems((prevMenu) =>
      prevMenu.map((mItem) => {
        if (mItem.id === itemId) {
          const itemAllReviews = [newReview, ...reviews.filter((r) => r.itemId === itemId)];
          const avgRating = itemAllReviews.reduce((acc, r) => acc + r.rating, 0) / itemAllReviews.length;
          return {
            ...mItem,
            rating: Number(avgRating.toFixed(1)),
            reviewCount: itemAllReviews.length,
          };
        }
        return mItem;
      })
    );
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 font-sans text-stone-800 transition-colors duration-300">
      
      {/* Sticky Header */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartTotalCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Main Views */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              lang={lang}
              onExploreMenu={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenCatering={() => {
                setActiveTab('catering');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAbout={() => {
                setActiveTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Featured Menu Teaser on Home */}
            <MenuSection
              lang={lang}
              items={menuItems}
              onSelectItem={(item) => setSelectedDetailItem(item)}
              onQuickAddToCart={handleQuickAddToCart}
              onOpenRateModal={(item, e) => {
                e.stopPropagation();
                setRateModalItem(item);
              }}
            />
          </>
        )}

        {activeTab === 'menu' && (
          <MenuSection
            lang={lang}
            items={menuItems}
            onSelectItem={(item) => setSelectedDetailItem(item)}
            onQuickAddToCart={handleQuickAddToCart}
            onOpenRateModal={(item, e) => {
              e.stopPropagation();
              setRateModalItem(item);
            }}
          />
        )}

        {activeTab === 'about' && <AboutSection lang={lang} />}

        {activeTab === 'catering' && <CateringSection lang={lang} />}
      </main>

      {/* Footer */}
      <Footer lang={lang} setActiveTab={setActiveTab} />

      {/* Sticky Mobile Bottom Navigation Bar */}
      <MobileBottomBar
        lang={lang}
        onToggleLang={toggleLanguage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartTotalCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Floating Chatbot Button */}
      <FloatingChatButton
        lang={lang}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Modals & Overlays */}
      {selectedDetailItem && (
        <ItemDetailModal
          lang={lang}
          item={selectedDetailItem}
          reviews={reviews}
          onClose={() => setSelectedDetailItem(null)}
          onAddToCart={handleAddToCart}
          onSubmitReview={handleSubmitReview}
        />
      )}

      {rateModalItem && (
        <RateItemModal
          lang={lang}
          item={rateModalItem}
          onClose={() => setRateModalItem(null)}
          onSubmitReview={handleSubmitReview}
        />
      )}

      <CartDrawer
        lang={lang}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOpenCheckout={() => setCheckoutOpen(true)}
      />

      <CheckoutModal
        lang={lang}
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={() => setCartItems([])}
      />

      <AiAssistantModal
        lang={lang}
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        menuItems={menuItems}
        onQuickAddToCart={handleQuickAddToCart}
      />
    </div>
  );
}

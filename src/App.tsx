import React, { useState, useEffect } from 'react';
import { PRODUCTS, PC_PRESETS } from './data/mockProducts';
import { Product, CartItem, PCPreset } from './types';
import { TopAnnouncementBar } from './components/TopAnnouncementBar';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FlashDeals } from './components/FlashDeals';
import { CategoriesGrid } from './components/CategoriesGrid';
import { ProductShowcase } from './components/ProductShowcase';
import { PCBuilderSection } from './components/PCBuilderSection';
import { TrustBenefits } from './components/TrustBenefits';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { CheckoutSuccessModal } from './components/CheckoutSuccessModal';
import { CepModal } from './components/CepModal';
import { CheckCircle, Zap } from 'lucide-react';

export default function App() {
  // Cart state - initialized with 1 popular item for immediate rich demo feel
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // RTX 4070 Ti Super
      quantity: 1,
    },
  ]);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    PRODUCTS[1].id, // Ryzen 7 7800X3D
    PRODUCTS[7].id, // Logitech Superlight 2
  ]);

  // Active filters and views
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [userCep, setUserCep] = useState<string>('01310-100');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCepModalOpen, setIsCepModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState<number>(0);

  // Quick toast feedback
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`"${product.name.slice(0, 32)}..." adicionado ao carrinho!`);
  };

  const handleAddPresetToCart = (preset: PCPreset) => {
    // Convert preset to custom item
    const presetProduct: Product = {
      id: preset.id,
      name: `${preset.title} (${preset.cpu} + ${preset.gpu} + ${preset.ram})`,
      category: 'gpu',
      brand: 'KaByte Custom Rigs',
      image: preset.image,
      rating: 5.0,
      reviewsCount: 48,
      originalPrice: preset.priceCard,
      pricePix: preset.pricePix,
      installmentCount: 10,
      installmentValue: preset.priceCard / 10,
      discountPercent: 12,
      freeShipping: true,
      inStock: true,
      badge: 'PC COMPLETO',
      specs: [
        { label: 'CPU', value: preset.cpu },
        { label: 'GPU', value: preset.gpu },
        { label: 'RAM', value: preset.ram },
        { label: 'SSD', value: preset.storage },
        { label: 'Fonte', value: preset.psu },
      ],
      description: `Computador Gamer montado e testado por especialistas da KaByte com ${preset.fpsTarget}.`,
      warranty: '1 Ano de Garantia Completa no Hardware',
    };

    handleAddToCart(presetProduct);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removido do carrinho.');
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const isFavorited = prev.includes(product.id);
      if (isFavorited) {
        showToast(`Item removido dos seus favoritos.`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`"${product.name.slice(0, 30)}..." salvo nos favoritos!`);
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
    showToast('Item removido dos favoritos.');
  };

  // Checkout flow
  const handleCheckout = (appliedDiscount: number, couponCode: string) => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.product.pricePix * item.quantity,
      0
    );
    const finalAmount = subtotal - appliedDiscount;
    setCheckoutTotal(finalAmount);
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
    setCartItems([]); // Cleared after order placement
  };

  // Navigation handlers
  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    // Smooth scroll to catalog section
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenPCBuilder = () => {
    const el = document.getElementById('monte-seu-pc');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Totals
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartValue = cartItems.reduce(
    (acc, item) => acc + item.product.pricePix * item.quantity,
    0
  );
  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col font-sans selection:bg-[#ff5500] selection:text-white">
      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161f30] border border-orange-500/80 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-7 h-7 rounded-lg bg-[#ff5500] flex items-center justify-center text-white shrink-0">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Top Banner with announcements and CEP info */}
      <TopAnnouncementBar
        onOpenCepModal={() => setIsCepModalOpen(true)}
        userCep={userCep}
      />

      {/* Main Navigation Header */}
      <Header
        cartCount={totalCartCount}
        cartTotal={totalCartValue}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectCategory={handleSelectCategory}
        activeCategory={activeCategory}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        allProducts={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onOpenPCBuilder={handleOpenPCBuilder}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Banner Carousel & Side Cards */}
        <HeroBanner
          onSelectCategory={handleSelectCategory}
          onOpenPCBuilder={handleOpenPCBuilder}
        />

        {/* Live Flash Deals (Ofertas Ninja) with Stock Meters & Ticking Timer */}
        <FlashDeals
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* Department Visual Icons Grid */}
        <CategoriesGrid
          onSelectCategory={handleSelectCategory}
          activeCategory={activeCategory}
        />

        {/* Interactive PC Builder / Gamer Presets Showcase */}
        <PCBuilderSection onAddPresetToCart={handleAddPresetToCart} />

        {/* Full Filterable Products Showcase */}
        <ProductShowcase
          products={PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchTerm={searchTerm}
          onClearSearch={() => setSearchTerm('')}
          onAddToCart={handleAddToCart}
          onSelectProduct={(p) => setSelectedProduct(p)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* 4 Pillars Trust & Benefits */}
        <TrustBenefits />

        {/* Newsletter & Discount Coupon Claim */}
        <NewsletterSection />
      </main>

      {/* Comprehensive E-commerce Footer */}
      <Footer />

      {/* Product Details & Specs Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        userCep={userCep}
        onUpdateCep={setUserCep}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={wishlistedProducts}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={handleRemoveFromWishlist}
      />

      {/* CEP Selector Modal */}
      <CepModal
        isOpen={isCepModalOpen}
        onClose={() => setIsCepModalOpen(false)}
        currentCep={userCep}
        onSaveCep={setUserCep}
      />

      {/* Order Confirmed / PIX QR Code Modal */}
      <CheckoutSuccessModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        orderTotal={checkoutTotal}
        itemsCount={totalCartCount}
      />
    </div>
  );
}

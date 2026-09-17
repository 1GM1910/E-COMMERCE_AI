export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'gpu' | 'cpu' | 'motherboard' | 'ram-ssd' | 'peripherals' | 'monitors' | 'cases-power' | 'electronics';
  brand: string;
  image: string;
  rating: number;
  reviewsCount: number;
  originalPrice: number;
  pricePix: number;
  installmentCount: number;
  installmentValue: number;
  discountPercent: number;
  freeShipping: boolean;
  inStock: boolean;
  stockSoldPercent?: number;
  remainingUnits?: number;
  isFlashDeal?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  badge?: string;
  specs: ProductSpec[];
  description: string;
  warranty: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  iconName: string;
  count: number;
  slug: string;
  description: string;
}

export interface PCPreset {
  id: string;
  title: string;
  subtitle: string;
  targetResolution: string;
  fpsTarget: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  psu: string;
  pricePix: number;
  priceCard: number;
  image: string;
  tags: string[];
}

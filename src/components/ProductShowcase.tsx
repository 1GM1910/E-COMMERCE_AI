import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Cpu, Search, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductShowcaseProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchTerm: string;
  onClearSearch: () => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  searchTerm,
  onClearSearch,
  onAddToCart,
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'discount'>('featured');

  const categoriesTabs = [
    { id: 'all', label: 'Todos os Produtos' },
    { id: 'gpu', label: 'Placas de Vídeo' },
    { id: 'cpu', label: 'Processadores' },
    { id: 'ram-ssd', label: 'Memória & SSD' },
    { id: 'motherboard', label: 'Placas-Mãe' },
    { id: 'peripherals', label: 'Periféricos Gamer' },
    { id: 'monitors', label: 'Monitores' },
    { id: 'cases-power', label: 'Gabinetes & Fontes' },
    { id: 'electronics', label: 'Consoles & Eletrônicos' },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.specs.some((s) => s.value.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.pricePix - b.pricePix);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.pricePix - a.pricePix);
    } else if (sortBy === 'discount') {
      list.sort((a, b) => b.discountPercent - a.discountPercent);
    } else {
      // featured
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return list;
  }, [products, activeCategory, searchTerm, sortBy]);

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catálogo Oficial KaByte</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-tech">
            Hardware, Componentes & Periféricos
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Todos os componentes com garantia oficial, nota fiscal e 15% de desconto no PIX
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#121826] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300">
            <ArrowUpDown className="w-4 h-4 text-orange-400 shrink-0" />
            <span className="font-semibold text-slate-400">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer pr-2"
            >
              <option value="featured" className="bg-[#121826]">Mais Relevantes</option>
              <option value="price-asc" className="bg-[#121826]">Menor Preço</option>
              <option value="price-desc" className="bg-[#121826]">Maior Preço</option>
              <option value="discount" className="bg-[#121826]">Maior Desconto %</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categoriesTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              activeCategory === tab.id
                ? 'bg-[#ff5500] text-white border-[#ff5500] shadow-md shadow-orange-500/20'
                : 'bg-[#101522] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search status banner if searching */}
      {searchTerm.trim() && (
        <div className="bg-[#161f30] border border-slate-700 p-3 rounded-xl mb-6 flex items-center justify-between">
          <div className="text-xs text-slate-200">
            Resultados para a busca: <strong className="text-orange-400">"{searchTerm}"</strong> ({filteredProducts.length} itens encontrados)
          </div>
          <button
            onClick={onClearSearch}
            className="text-xs text-slate-400 hover:text-white font-bold underline cursor-pointer"
          >
            Limpar Busca
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#101522] rounded-2xl border border-slate-800 p-8">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">
            Nenhum produto encontrado
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            Tente pesquisar por outros termos como "RTX", "Ryzen", "SSD", "Memória" ou selecione outro departamento.
          </p>
          <button
            onClick={() => {
              onClearSearch();
              onSelectCategory('all');
            }}
            className="px-4 py-2 bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Ver Todos os Produtos
          </button>
        </div>
      )}
    </section>
  );
};

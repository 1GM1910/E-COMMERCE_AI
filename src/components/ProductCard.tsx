import React from 'react';
import { ShoppingCart, Star, Heart, Zap, Check, Eye } from 'lucide-react';
import { Product } from '../types';
import { formatBRL } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist,
}) => {
  return (
    <div className="bg-[#101522] border border-slate-800/90 hover:border-orange-500/60 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-orange-950/20 group relative">
      {/* Top action row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.badge && (
            <span className="bg-gradient-to-r from-[#ff5500] to-[#ff7700] text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
              {product.badge}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-orange-950 text-orange-400 border border-orange-700/50 text-[10px] font-black px-1.5 py-0.5 rounded">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleWishlist(product)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isWishlisted
                ? 'text-red-500 bg-red-500/10'
                : 'text-slate-400 hover:text-red-400 hover:bg-slate-800'
            }`}
            title={isWishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
          </button>

          <button
            onClick={() => onSelectProduct(product)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Ver especificações e detalhes"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image container */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative h-44 sm:h-48 w-full bg-[#0b0e14] rounded-xl overflow-hidden mb-3.5 cursor-pointer flex items-center justify-center p-3 border border-slate-800/60 group-hover:border-slate-700"
      >
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transform group-hover:scale-108 transition-transform duration-300"
          loading="lazy"
        />

        {product.freeShipping && (
          <span className="absolute bottom-2 left-2 bg-emerald-600/90 text-white font-black text-[9px] uppercase px-2 py-0.5 rounded shadow">
            Frete Grátis
          </span>
        )}
      </div>

      {/* Product metadata: Brand, Title, Rating */}
      <div className="flex-1 flex flex-col justify-start">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
          <span className="font-bold text-orange-400/90 uppercase tracking-wider">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-500">({product.reviewsCount})</span>
          </div>
        </div>

        <h3
          onClick={() => onSelectProduct(product)}
          className="text-xs sm:text-sm font-bold text-slate-200 hover:text-[#ff6a00] line-clamp-2 leading-snug cursor-pointer transition-colors"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Feature Specs Badges */}
        {product.specs && product.specs.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2 mb-3">
            {product.specs.slice(0, 2).map((spec, i) => (
              <span
                key={i}
                className="text-[10px] bg-slate-900 text-slate-300 border border-slate-800 px-1.5 py-0.5 rounded font-mono"
              >
                {spec.value}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pricing block */}
      <div className="pt-2.5 border-t border-slate-800/80 mb-3 mt-auto">
        <span className="text-[11px] text-slate-500 line-through font-mono block">
          {formatBRL(product.originalPrice)}
        </span>

        <div className="flex items-baseline gap-1.5 my-0.5">
          <span className="text-xl sm:text-2xl font-black text-[#ff6a00] font-mono tracking-tight">
            {formatBRL(product.pricePix)}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
          <Zap className="w-3 h-3 fill-emerald-400" />
          <span>À vista no PIX com 15% OFF</span>
        </div>

        <span className="text-[11px] text-slate-400 block mt-1">
          ou {product.installmentCount}x de{' '}
          <strong className="text-slate-300 font-mono">
            {formatBRL(product.installmentValue)}
          </strong>{' '}
          sem juros
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onAddToCart(product)}
          className="flex-1 py-2.5 bg-[#ff5500] hover:bg-[#e04b00] active:scale-98 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-orange-950/40 transition-all cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Comprar</span>
        </button>
      </div>
    </div>
  );
};

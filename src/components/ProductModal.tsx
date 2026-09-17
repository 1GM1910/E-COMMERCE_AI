import React, { useState } from 'react';
import {
  X,
  Star,
  Zap,
  Truck,
  ShieldCheck,
  ShoppingCart,
  Heart,
  CheckCircle,
  Calculator,
  ChevronRight,
} from 'lucide-react';
import { Product } from '../types';
import { formatBRL } from '../utils/formatters';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  userCep: string;
  onUpdateCep: (cep: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  userCep,
  onUpdateCep,
}) => {
  const [cepInput, setCepInput] = useState(userCep || '');
  const [shippingResult, setShippingResult] = useState<{
    sedex: { price: number; days: number };
    jadlog: { price: number; days: number };
  } | null>(userCep ? { sedex: { price: 24.9, days: 2 }, jadlog: { price: 18.5, days: 4 } } : null);
  const [activeTab, setActiveTab] = useState<'specs' | 'installments'>('specs');

  if (!product) return null;

  const handleCalcShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (cepInput.trim().length >= 8) {
      onUpdateCep(cepInput);
      setShippingResult({
        sedex: { price: product.freeShipping ? 0 : 26.9, days: 2 },
        jadlog: { price: product.freeShipping ? 0 : 16.9, days: 4 },
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#101522] border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Image Column */}
            <div className="flex flex-col items-center justify-center bg-[#0a0d14] rounded-2xl p-6 border border-slate-800 relative">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-72 object-contain"
              />
              {product.freeShipping && (
                <span className="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Frete Grátis
                </span>
              )}
              {product.badge && (
                <span className="absolute top-3 right-3 bg-[#ff5500] text-white font-black text-xs px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Info Column */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                  {product.brand} • Cód. #{product.id.slice(0, 8)}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-white leading-snug mt-1 mb-2 font-tech">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4 text-xs">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-slate-300 font-bold">{product.rating}</span>
                  <span className="text-slate-500">
                    ({product.reviewsCount} avaliações de clientes verificados)
                  </span>
                </div>

                {/* Price block */}
                <div className="bg-[#141b2b] border border-slate-800 p-4 rounded-2xl mb-4">
                  <span className="text-xs text-slate-400 line-through font-mono">
                    De: {formatBRL(product.originalPrice)}
                  </span>
                  <div className="flex items-baseline gap-2 my-1">
                    <span className="text-3xl font-black text-[#ff6a00] font-mono tracking-tight">
                      {formatBRL(product.pricePix)}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                    Preço à vista com 15% de desconto no PIX
                  </span>
                  <span className="text-xs text-slate-400 block mt-1">
                    ou em até {product.installmentCount}x de{' '}
                    <strong className="text-slate-200">
                      {formatBRL(product.installmentValue)}
                    </strong>{' '}
                    sem juros no cartão
                  </span>
                </div>

                {/* Warranty */}
                <div className="flex items-center gap-2 text-xs text-slate-300 mb-6 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{product.warranty}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="flex-1 py-3 bg-[#ff5500] hover:bg-[#e04b00] active:scale-98 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-orange-950/60 transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Adicionar ao Carrinho</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-red-500/20 border-red-500/50 text-red-400'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                  title={isWishlisted ? 'Favoritado' : 'Favoritar'}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Shipping Calculator */}
          <div className="bg-[#141b2b] border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 mb-3">
              <Truck className="w-4 h-4 text-orange-400" />
              <span>Simulador de Frete e Prazo de Entrega</span>
            </h4>

            <form onSubmit={handleCalcShipping} className="flex gap-2 max-w-md">
              <input
                type="text"
                placeholder="Ex: 01310-100"
                maxLength={9}
                value={cepInput}
                onChange={(e) => setCepInput(e.target.value)}
                className="flex-1 bg-[#0d121c] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Calcular
              </button>
            </form>

            {shippingResult && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">Entrega Expressa Sedex</span>
                    <span className="text-slate-400 text-[11px]">Chega em até {shippingResult.sedex.days} dias úteis</span>
                  </div>
                  <span className="font-black text-emerald-400 font-mono">
                    {shippingResult.sedex.price === 0 ? 'GRÁTIS' : formatBRL(shippingResult.sedex.price)}
                  </span>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">Transportadora Jadlog</span>
                    <span className="text-slate-400 text-[11px]">Chega em até {shippingResult.jadlog.days} dias úteis</span>
                  </div>
                  <span className="font-black text-emerald-400 font-mono">
                    {shippingResult.jadlog.price === 0 ? 'GRÁTIS' : formatBRL(shippingResult.jadlog.price)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Tabs: Specifications and Description */}
          <div className="border-t border-slate-800 pt-6">
            <div className="flex gap-4 border-b border-slate-800 pb-2 mb-4">
              <button
                onClick={() => setActiveTab('specs')}
                className={`text-xs font-bold pb-2 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'specs'
                    ? 'border-[#ff5500] text-white'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Especificações Técnicas
              </button>
              <button
                onClick={() => setActiveTab('installments')}
                className={`text-xs font-bold pb-2 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'installments'
                    ? 'border-[#ff5500] text-white'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Tabela de Parcelamento
              </button>
            </div>

            {activeTab === 'specs' ? (
              <div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {product.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex justify-between p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-xs"
                    >
                      <span className="text-slate-400 font-semibold">{spec.label}</span>
                      <span className="text-white font-mono font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {[1, 2, 3, 4, 6, 8, 10, 12].map((inst) => (
                  <div
                    key={inst}
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between"
                  >
                    <span className="text-slate-400">{inst}x sem juros:</span>
                    <span className="text-white font-mono font-bold">
                      {formatBRL((product.pricePix / 0.85) / inst)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

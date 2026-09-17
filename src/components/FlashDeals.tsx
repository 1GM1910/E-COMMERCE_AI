import React, { useState, useEffect } from 'react';
import { Zap, Clock, Flame, ChevronRight, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { formatBRL } from '../utils/formatters';

interface FlashDealsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const FlashDeals: React.FC<FlashDealsProps> = ({
  products,
  onAddToCart,
  onSelectProduct,
}) => {
  // Live countdown to midnight or end of sale
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashItems = products.filter((p) => p.isFlashDeal);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Bar with Live Countdown */}
      <div className="bg-gradient-to-r from-[#ff4500] via-[#ff6a00] to-[#e63900] rounded-2xl p-4 sm:p-5 shadow-xl shadow-orange-950/40 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center backdrop-blur-sm border border-white/20">
            <Flame className="w-7 h-7 text-yellow-300 fill-yellow-300 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-tech">
                OFERTAS NINJA
              </span>
              <span className="bg-black/30 text-yellow-300 text-xs px-2 py-0.5 rounded font-black tracking-wider uppercase border border-yellow-300/30">
                RELÂMPAGO
              </span>
            </div>
            <p className="text-xs sm:text-sm text-orange-100 font-medium">
              Preços de custo nos estoques selecionados com envio imediato
            </p>
          </div>
        </div>

        {/* Countdown Box */}
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
          <div className="flex items-center gap-1.5 text-xs text-orange-200 font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4 text-yellow-400 animate-spin-slow" />
            <span className="hidden sm:inline">TERMINA EM:</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono font-black text-lg sm:text-xl text-white">
            <div className="bg-[#121620] px-2.5 py-1 rounded-lg border border-slate-700 min-w-[38px] text-center shadow-inner">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <span className="text-orange-300">:</span>
            <div className="bg-[#121620] px-2.5 py-1 rounded-lg border border-slate-700 min-w-[38px] text-center shadow-inner">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <span className="text-orange-300">:</span>
            <div className="bg-[#121620] px-2.5 py-1 rounded-lg border border-slate-700 min-w-[38px] text-center shadow-inner text-yellow-400">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Flash Deals Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {flashItems.map((product) => {
          const soldPercent = product.stockSoldPercent || 75;
          const unitsLeft = product.remainingUnits || 8;

          return (
            <div
              key={product.id}
              className="bg-[#101520] border border-slate-800 hover:border-orange-500/60 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-orange-950/20 group relative"
            >
              {/* Top Badges */}
              <div className="flex items-center justify-between mb-2">
                <span className="bg-[#ff5500] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider shadow">
                  <Zap className="w-3 h-3 fill-white" />
                  -{product.discountPercent}% OFF
                </span>

                <button
                  onClick={() => onSelectProduct(product)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Ver especificações completas"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Product Image */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative h-44 w-full bg-[#0b0e14] rounded-xl overflow-hidden mb-3 cursor-pointer group-hover:border-slate-700 transition-colors flex items-center justify-center p-2"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transform group-hover:scale-108 transition-transform duration-300"
                  loading="lazy"
                />
                {product.freeShipping && (
                  <span className="absolute bottom-2 left-2 bg-emerald-500/90 text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 rounded shadow">
                    Frete Grátis
                  </span>
                )}
              </div>

              {/* Stock Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span className="text-orange-400 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500" />
                    {soldPercent}% Vendido
                  </span>
                  <span className="text-slate-400 font-mono">
                    Restam {unitsLeft} un.
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                    style={{ width: `${soldPercent}%` }}
                  />
                </div>
              </div>

              {/* Title & Brand */}
              <div className="mb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {product.brand}
                </span>
                <h4
                  onClick={() => onSelectProduct(product)}
                  className="text-xs font-bold text-slate-200 hover:text-[#ff6a00] line-clamp-2 leading-snug cursor-pointer transition-colors mt-0.5"
                  title={product.name}
                >
                  {product.name}
                </h4>
              </div>

              {/* Pricing Section */}
              <div className="pt-2 border-t border-slate-800/80 mb-3">
                <span className="text-[11px] text-slate-500 line-through font-mono block">
                  {formatBRL(product.originalPrice)}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-[#ff6a00] font-mono tracking-tight">
                    {formatBRL(product.pricePix)}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold block">
                  À vista no PIX (com 15% de desconto)
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  ou {product.installmentCount}x de {formatBRL(product.installmentValue)} sem juros
                </span>
              </div>

              {/* Buy Button */}
              <button
                onClick={() => onAddToCart(product)}
                className="w-full py-2.5 bg-gradient-to-r from-[#ff5500] to-[#ff7700] hover:from-[#e04b00] hover:to-[#ff6600] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-950/40 active:scale-98 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Comprar Agora</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

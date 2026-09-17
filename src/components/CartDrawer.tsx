import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Zap,
  Tag,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { CartItem } from '../types';
import { formatBRL } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (appliedDiscount: number, couponCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
  } | null>({ code: 'KABYTE10', discountPercent: 10 }); // pre-applied welcome coupon
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Subtotal base calculation
  const subtotalPix = items.reduce(
    (acc, item) => acc + item.product.pricePix * item.quantity,
    0
  );

  const couponDiscountAmount = appliedCoupon
    ? (subtotalPix * appliedCoupon.discountPercent) / 100
    : 0;

  const finalTotal = subtotalPix - couponDiscountAmount;

  const freeShippingThreshold = 299;
  const freeShippingEligible = subtotalPix >= freeShippingThreshold;
  const amountToFreeShipping = freeShippingThreshold - subtotalPix;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'KABYTE10' || code === 'GAMER10') {
      setAppliedCoupon({ code, discountPercent: 10 });
      setCouponCode('');
    } else if (code === 'NINJA15') {
      setAppliedCoupon({ code, discountPercent: 15 });
      setCouponCode('');
    } else {
      setCouponError('Cupom inválido ou expirado. Tente KABYTE10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#10141f] border-l border-slate-800 w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#141a29]">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#ff6a00]" />
            <h3 className="font-tech text-lg font-black text-white uppercase tracking-tight">
              Meu Carrinho ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fechar carrinho"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#0b0e14] px-4 py-3 border-b border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className={freeShippingEligible ? 'text-emerald-400' : 'text-slate-300'}>
              {freeShippingEligible
                ? 'Parabéns! Você ganhou Frete Grátis Express!'
                : `Faltam ${formatBRL(amountToFreeShipping)} para FRETE GRÁTIS`}
            </span>
            <span className="text-orange-400 font-mono">
              {Math.min(100, Math.round((subtotalPix / freeShippingThreshold) * 100))}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                freeShippingEligible ? 'bg-emerald-500' : 'bg-[#ff6a00]'
              }`}
              style={{
                width: `${Math.min(100, (subtotalPix / freeShippingThreshold) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto mb-3 text-slate-500">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-slate-300">
                Seu carrinho está vazio
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Explore as ofertas de placas de vídeo, processadores e periféricos para turbinar seu setup.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="bg-[#141b29] border border-slate-800/80 rounded-2xl p-3 flex gap-3 items-center group"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-contain rounded-xl bg-slate-900 p-1 border border-slate-800 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-200 line-clamp-1 leading-snug">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-black text-[#ff6a00] font-mono">
                      {formatBRL(item.product.pricePix * item.quantity)}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ({formatBRL(item.product.pricePix)} un.)
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-white font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                      title="Remover item"
                      aria-label="Remover do carrinho"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Totals / Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#141a29] space-y-3">
            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Cupom: KABYTE10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-[#0d121c] border border-slate-700 text-xs text-white uppercase rounded-xl pl-8 pr-3 py-2 placeholder-slate-500 focus:outline-none focus:border-orange-500 font-mono"
                />
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl transition-colors cursor-pointer"
              >
                Aplicar
              </button>
            </form>

            {couponError && (
              <p className="text-[11px] text-red-400 font-medium">{couponError}</p>
            )}

            {appliedCoupon && (
              <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs text-emerald-400">
                <span className="flex items-center gap-1 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Cupom {appliedCoupon.code} aplicado
                </span>
                <span className="font-mono font-black">-{appliedCoupon.discountPercent}%</span>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs pt-1">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal no PIX:</span>
                <span className="font-mono text-slate-200">{formatBRL(subtotalPix)}</span>
              </div>

              {couponDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Desconto de Cupom:</span>
                  <span className="font-mono font-bold">-{formatBRL(couponDiscountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span>Frete:</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {freeShippingEligible ? 'GRÁTIS' : 'Calculado no checkout'}
                </span>
              </div>

              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                <span>Total à vista (PIX):</span>
                <span className="text-[#ff6a00] font-mono text-xl">
                  {formatBRL(finalTotal)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => onCheckout(couponDiscountAmount, appliedCoupon?.code || '')}
              className="w-full py-3 bg-gradient-to-r from-[#ff5500] to-[#ff7700] hover:from-[#e04b00] hover:to-[#ff6600] active:scale-98 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-orange-950/60 transition-all cursor-pointer"
            >
              <span>Finalizar Pedido</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ambiente Seguro com Criptografia SSL 256 bits</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

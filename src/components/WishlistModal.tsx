import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { formatBRL } from '../utils/formatters';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onRemoveFromWishlist: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
  onRemoveFromWishlist,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#101522] border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h3 className="font-tech text-lg font-black text-white">
              Meus Favoritos ({products.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-300">
                Você ainda não favoritou nenhum componente
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Clique no ícone de coração nos produtos para salvar e acompanhar o preço.
              </p>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-[#141b29] border border-slate-800 rounded-2xl p-3 flex items-center gap-4 justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-contain rounded-xl bg-slate-950 p-1 border border-slate-800 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-orange-400 uppercase">
                      {product.brand}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {product.name}
                    </h4>
                    <span className="text-xs font-black text-[#ff6a00] font-mono">
                      {formatBRL(product.pricePix)} no PIX
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-3 py-2 bg-[#ff5500] hover:bg-[#e04b00] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Comprar</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(product)}
                    className="p-2 text-slate-500 hover:text-red-400 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Remover dos favoritos"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

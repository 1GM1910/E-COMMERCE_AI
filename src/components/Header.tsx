import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Zap,
  Cpu,
  Monitor,
  Mouse,
  HardDrive,
  CircuitBoard,
  Box,
  Gamepad2,
  SlidersHorizontal,
} from 'lucide-react';
import { Product } from '../types';
import { formatBRL } from '../utils/formatters';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectCategory: (categoryId: string) => void;
  activeCategory: string;
  onSearch: (term: string) => void;
  searchTerm: string;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenPCBuilder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectCategory,
  activeCategory,
  onSearch,
  searchTerm,
  allProducts,
  onSelectProduct,
  onOpenPCBuilder,
}) => {
  const [isDeptMenuOpen, setIsDeptMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filtered preview for instant search dropdown
  const searchSuggestions = searchTerm.trim().length > 1
    ? allProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navCategories = [
    { id: 'all', name: 'Todos', icon: SlidersHorizontal },
    { id: 'gpu', name: 'Placas de Vídeo', icon: Cpu },
    { id: 'cpu', name: 'Processadores', icon: Cpu },
    { id: 'ram-ssd', name: 'Memória & SSD', icon: HardDrive },
    { id: 'motherboard', name: 'Placas-Mãe', icon: CircuitBoard },
    { id: 'peripherals', name: 'Periféricos', icon: Mouse },
    { id: 'monitors', name: 'Monitores', icon: Monitor },
    { id: 'cases-power', name: 'Gabinetes & Fontes', icon: Box },
    { id: 'electronics', name: 'Consoles & Smart', icon: Gamepad2 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0f141f] border-b border-slate-800 shadow-xl">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Mobile Hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
            aria-label="Abrir Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo KaByte */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
              onSearch('');
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff4500] via-[#ff6a00] to-[#ffaa00] flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-2xl font-black tracking-tight text-white font-tech">
                  KA<span className="text-[#ff6a00]">BYTE</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-orange-400 ml-1.5 px-1 py-0.2 bg-orange-950/60 border border-orange-500/30 rounded">
                  HARDWARE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide leading-none -mt-0.5">
                Componentes de PC & Eletrônicos
              </p>
            </div>
          </a>
        </div>

        {/* Departments Dropdown Trigger (Desktop) */}
        <div className="hidden lg:relative lg:block">
          <button
            onClick={() => setIsDeptMenuOpen(!isDeptMenuOpen)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white text-sm font-semibold border border-slate-700/60 transition-all cursor-pointer"
          >
            <Menu className="w-4 h-4 text-[#ff6a00]" />
            <span>Departamentos</span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                isDeptMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Department Dropdown Menu */}
          {isDeptMenuOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-[#141b29] border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="text-[11px] font-bold text-slate-400 uppercase px-3 py-1.5 tracking-wider border-b border-slate-800">
                Selecione a Categoria
              </div>
              <div className="py-1">
                {navCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setIsDeptMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-orange-600/10 hover:border-l-2 hover:border-[#ff6a00] rounded-r-md transition-all text-left cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-orange-400" />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
                <div className="border-t border-slate-800 my-1 pt-1">
                  <button
                    onClick={() => {
                      onOpenPCBuilder();
                      setIsDeptMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-yellow-400 hover:bg-yellow-500/10 font-bold rounded-lg cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-yellow-400" />
                    <span>Monte Seu PC do Zero</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar with Autocomplete */}
        <div ref={searchRef} className="flex-1 max-w-2xl relative mx-1">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Busque por RTX 4070, Ryzen 7, Memória DDR5, SSD NVMe, Monitores..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full bg-[#161f30] text-slate-100 placeholder-slate-400 text-sm rounded-xl pl-11 pr-24 py-2.5 border border-slate-700/80 focus:outline-none focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/20 transition-all"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <button
              onClick={() => onSearch(searchTerm)}
              className="absolute right-1.5 px-3.5 py-1.5 bg-[#ff6a00] hover:bg-[#e05a00] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Buscar
            </button>
          </div>

          {/* Quick Autocomplete Suggestions Dropdown */}
          {isSearchFocused && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#141b29] border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-2 border-b border-slate-800 text-xs text-slate-400 font-semibold flex justify-between items-center">
                <span>Produtos encontrados ({searchSuggestions.length})</span>
                <span className="text-[11px] text-orange-400">Pressione Enter</span>
              </div>
              <div className="divide-y divide-slate-800/60 max-h-80 overflow-y-auto">
                {searchSuggestions.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      setIsSearchFocused(false);
                    }}
                    className="p-2.5 flex items-center gap-3 hover:bg-slate-800/80 cursor-pointer transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md bg-slate-900 border border-slate-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-200 truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-orange-400 font-mono">
                          {formatBRL(product.pricePix)}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-1 rounded">
                          À VISTA NO PIX
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons: Account, Wishlist, Cart */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Account */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer text-slate-200 hover:text-white transition-colors">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <User className="w-4 h-4" />
            </div>
            <div className="text-left text-xs leading-tight">
              <p className="text-slate-400 text-[11px]">Olá, Gamer</p>
              <p className="font-bold text-white">Minha Conta</p>
            </div>
          </div>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            title="Lista de Favoritos"
            aria-label="Ver Favoritos"
          >
            <Heart className="w-5 h-5 text-slate-300 hover:text-red-400 transition-colors" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center border-2 border-[#0f141f]">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 bg-gradient-to-r from-[#ff5500] to-[#ff7700] hover:from-[#e54b00] hover:to-[#ff6600] text-white px-3.5 py-2 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all cursor-pointer active:scale-95"
            aria-label="Ver Carrinho de Compras"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-orange-600 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-left leading-none">
              <span className="text-[10px] text-orange-100 font-medium block">
                CARRINHO
              </span>
              <span className="text-xs font-black tracking-tight font-mono">
                {formatBRL(cartTotal)}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Sub Category Ribbons */}
      <div className="border-t border-slate-800/80 bg-[#0c1018] px-4 py-2 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1 text-xs">
          <div className="flex items-center gap-1">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#ff6a00] text-white font-bold shadow-sm shadow-orange-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenPCBuilder}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 font-bold border border-yellow-500/30 whitespace-nowrap transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-yellow-400" />
            <span>Monte Seu PC</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#141b29] border-b border-slate-800 p-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Navegue por Departamentos
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-left text-xs font-semibold flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-[#ff6a00] text-white'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white'
                }`}
              >
                <cat.icon className="w-3.5 h-3.5 text-orange-400" />
                <span className="truncate">{cat.name}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              onOpenPCBuilder();
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold text-xs flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 fill-black" />
            Configurar PC Gamer Personalizado
          </button>
        </div>
      )}
    </header>
  );
};

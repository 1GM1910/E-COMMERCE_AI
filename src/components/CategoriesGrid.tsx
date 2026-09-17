import React from 'react';
import {
  Cpu,
  HardDrive,
  CircuitBoard,
  Mouse,
  Monitor,
  Box,
  Gamepad2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES } from '../data/mockProducts';

interface CategoriesGridProps {
  onSelectCategory: (categoryId: string) => void;
  activeCategory: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu: Cpu,
  Microchip: Cpu,
  HardDrive: HardDrive,
  CircuitBoard: CircuitBoard,
  Mouse: Mouse,
  Monitor: Monitor,
  Box: Box,
  Gamepad2: Gamepad2,
};

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  onSelectCategory,
  activeCategory,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-tech flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#ff6a00]" />
            Navegue por Departamentos
          </h2>
          <p className="text-xs text-slate-400">
            Hardware selecionado, componentes com garantia nacional e alta performance
          </p>
        </div>

        <button
          onClick={() => onSelectCategory('all')}
          className="text-xs font-bold text-[#ff6a00] hover:text-orange-400 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>Ver Todas as Peças</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.iconName] || Cpu;
          const isActive = activeCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-3.5 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center cursor-pointer group relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-b from-[#ff5500]/20 to-[#1c2438] border-[#ff6a00] shadow-lg shadow-orange-950/30'
                  : 'bg-[#101522] border-slate-800/80 hover:border-slate-700 hover:bg-[#141b2a]'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${
                  isActive
                    ? 'bg-[#ff6a00] text-white shadow-md'
                    : 'bg-slate-800 text-orange-400 group-hover:bg-[#ff6a00] group-hover:text-white'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="text-xs font-bold text-slate-200 group-hover:text-white line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                {cat.count}+ itens
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

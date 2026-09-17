import React from 'react';
import { Truck, Zap, ShieldCheck, Headphones } from 'lucide-react';
import { TRUST_SEALS } from '../data/mockProducts';

const ICON_MAP: Record<string, React.ElementType> = {
  Truck: Truck,
  Zap: Zap,
  ShieldCheck: ShieldCheck,
  Headphones: Headphones,
};

export const TrustBenefits: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TRUST_SEALS.map((seal, index) => {
          const Icon = ICON_MAP[seal.icon] || ShieldCheck;
          return (
            <div
              key={index}
              className="bg-[#101522] border border-slate-800/80 hover:border-orange-500/40 rounded-2xl p-5 flex items-start gap-4 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 text-[#ff6a00]">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1 font-tech">
                  {seal.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {seal.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

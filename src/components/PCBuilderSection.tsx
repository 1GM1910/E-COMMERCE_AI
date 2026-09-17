import React, { useState } from 'react';
import { Zap, Check, Monitor, Cpu, HardDrive, ShieldCheck, ArrowRight, ShoppingCart } from 'lucide-react';
import { PC_PRESETS } from '../data/mockProducts';
import { PCPreset, Product } from '../types';
import { formatBRL } from '../utils/formatters';

interface PCBuilderSectionProps {
  onAddPresetToCart: (preset: PCPreset) => void;
}

export const PCBuilderSection: React.FC<PCBuilderSectionProps> = ({
  onAddPresetToCart,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState(PC_PRESETS[1].id);
  const activePreset = PC_PRESETS.find((p) => p.id === selectedPresetId) || PC_PRESETS[0];

  return (
    <section id="monte-seu-pc" className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-[#121624] via-[#0d1018] to-[#151c2e] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 mb-2">
              <Zap className="w-3.5 h-3.5 fill-yellow-400" />
              <span>Simulador de Compatibilidade & Montagem</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-tech">
              Monte Seu PC Gamer ou Escolha Nossos Presets
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Máquinas equilibradas sem gargalos (bottleneck). Todas as peças são testadas e validadas por nossos especialistas em hardware.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 px-3 py-2 rounded-xl text-xs text-emerald-300 font-bold shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Compatível e Testado</span>
          </div>
        </div>

        {/* Preset Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 relative z-10">
          {PC_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#182033] border-[#ff6a00] shadow-lg shadow-orange-950/50 scale-[1.02]'
                    : 'bg-[#0e121a]/80 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-black/40 text-orange-400 font-mono">
                    {preset.targetResolution}
                  </span>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff6a00] animate-ping" />
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-black text-white font-tech">
                  {preset.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                  {preset.subtitle}
                </p>
                <div className="mt-3 pt-2 border-t border-slate-800 flex items-baseline justify-between">
                  <span className="text-xs text-slate-400 font-semibold">À vista:</span>
                  <span className="text-base font-black text-[#ff6a00] font-mono">
                    {formatBRL(preset.pricePix)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Preset Details Card */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0a0d14]/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8 items-center">
          {/* Machine Image */}
          <div className="lg:col-span-4 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-sm rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/50 p-4 flex items-center justify-center">
              <img
                src={activePreset.image}
                alt={activePreset.title}
                className="max-h-full max-w-full object-contain rounded-xl"
              />
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-[11px] font-bold text-orange-400">
                {activePreset.fpsTarget}
              </div>
            </div>
          </div>

          {/* Machine Components Spec Sheet */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {activePreset.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-tech">
                {activePreset.title}
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                {activePreset.subtitle} — Configuração de hardware otimizada com foco em custo-benefício e longevidade.
              </p>

              {/* Hardware List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-[#111624] rounded-xl border border-slate-800 flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-orange-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Processador
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {activePreset.cpu}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#111624] rounded-xl border border-slate-800 flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Placa de Vídeo
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {activePreset.gpu}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#111624] rounded-xl border border-slate-800 flex items-center gap-3">
                  <HardDrive className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Memória RAM
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {activePreset.ram}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#111624] rounded-xl border border-slate-800 flex items-center gap-3">
                  <HardDrive className="w-5 h-5 text-purple-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Armazenamento
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {activePreset.storage}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions & Price */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block font-semibold">
                  Preço do kit completo no PIX:
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#ff6a00] font-mono">
                  {formatBRL(activePreset.pricePix)}
                </span>
                <span className="text-xs text-slate-400 block">
                  ou em até 10x de {formatBRL(activePreset.priceCard / 10)} sem juros
                </span>
              </div>

              <button
                onClick={() => onAddPresetToCart(activePreset)}
                className="px-6 py-3.5 bg-gradient-to-r from-[#ff5500] to-[#ff7700] hover:from-[#e04b00] hover:to-[#ff6600] active:scale-98 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-orange-950/50 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Adicionar PC Completo ao Carrinho</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

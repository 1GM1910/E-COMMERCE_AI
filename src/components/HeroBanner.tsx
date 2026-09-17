import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ShieldAlert, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroBannerProps {
  onSelectCategory: (categoryId: string) => void;
  onOpenPCBuilder: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  onOpenPCBuilder,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: 'LANÇAMENTO & DESTAQUE',
      badgeColor: 'bg-[#ff5500] text-white',
      title: 'SUPER SEMANA RTX SÉRIE 40',
      subtitle: 'O Poder Bruto da Arquitetura Ada Lovelace com DLSS 3.5 Frame Generation',
      discount: 'ATÉ 35% OFF NO PIX',
      ctaText: 'Ver Placas de Vídeo',
      categoryTarget: 'gpu',
      bgGradient: 'from-[#0b0e14] via-[#111929] to-[#1c2438]',
      accentColor: '#ff5500',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1200&auto=format&fit=crop',
      features: ['Ray Tracing em tempo real', '16GB VRAM GDDR6X', 'Pronta Entrega'],
    },
    {
      id: 2,
      badge: 'DOMÍNIO COMPETITIVO',
      badgeColor: 'bg-red-600 text-white',
      title: 'AMD RYZEN 7 7800X3D',
      subtitle: 'O Rei dos Processadores para Jogos com a Incomparável Tecnologia 3D V-Cache',
      discount: 'À VISTA POR R$ 2.699,10',
      ctaText: 'Ver Processadores',
      categoryTarget: 'cpu',
      bgGradient: 'from-[#120808] via-[#241010] to-[#141824]',
      accentColor: '#ef4444',
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1200&auto=format&fit=crop',
      features: ['Cache Gigante de 104MB', 'Plataforma AM5 DDR5', 'Baixo consumo elétrico'],
    },
    {
      id: 3,
      badge: 'PERFORMANCE ESPORTS',
      badgeColor: 'bg-cyan-500 text-black font-extrabold',
      title: 'PERIFÉRICOS PRO GAMER',
      subtitle: 'Mouses de 60g com sensores 32K DPI e Teclados Mecânicos Hot-Swap ABNT2',
      discount: 'FRETE GRÁTIS EM SELECIONADOS',
      ctaText: 'Ver Periféricos',
      categoryTarget: 'peripherals',
      bgGradient: 'from-[#05131a] via-[#092230] to-[#101726]',
      accentColor: '#06b6d4',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop',
      features: ['Zero Latência Sem Fio', 'Switches Mecânicos', 'Garantia Nacional'],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section className="max-w-7xl mx-auto px-4 pt-4 pb-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Hero Slider */}
        <div className="lg:col-span-8 xl:col-span-9 relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0d121c] shadow-2xl min-h-[380px] sm:min-h-[420px] flex items-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={active.image}
              alt={active.title}
              className="w-full h-full object-cover object-center brightness-40 transition-all duration-700 transform scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${active.bgGradient} opacity-90 mix-blend-multiply`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-transparent opacity-80" />
          </div>

          {/* Slide Content */}
          <div className="relative z-10 p-6 sm:p-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-3 shadow-md bg-black/40 backdrop-blur-md border border-white/10 text-orange-300">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>{active.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-3 font-tech">
              {active.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 mb-4 line-clamp-2 leading-relaxed">
              {active.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              {active.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-900/80 text-slate-200 border border-slate-700/80 px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00]" />
                  {feat}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                onClick={() => onSelectCategory(active.categoryTarget)}
                className="px-6 py-3 bg-[#ff5500] hover:bg-[#e04b00] text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-orange-600/30 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-98"
              >
                <span>{active.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="bg-black/60 backdrop-blur-md border border-orange-500/40 px-3.5 py-2 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-bold leading-tight">
                  CONDIÇÃO ESPECIAL
                </span>
                <span className="text-sm font-black text-orange-400 font-mono tracking-tight">
                  {active.discount}
                </span>
              </div>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="absolute right-4 bottom-4 z-20 flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Slide anterior"
              className="p-2 rounded-lg bg-black/60 hover:bg-black/90 text-white border border-slate-700/80 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Próximo slide"
              className="p-2 rounded-lg bg-black/60 hover:bg-black/90 text-white border border-slate-700/80 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-6 sm:left-10 z-20 flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-[#ff5500]' : 'w-2 bg-slate-600'
                }`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Side Banners (Estilo KaBuM! Quick Cards) */}
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-4">
          {/* Card 1: Monte Seu PC */}
          <div
            onClick={onOpenPCBuilder}
            className="flex-1 bg-gradient-to-br from-[#1b172b] to-[#121824] border border-purple-900/40 hover:border-purple-500/60 p-5 rounded-2xl relative overflow-hidden group cursor-pointer transition-all duration-300 shadow-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-black tracking-wider uppercase flex items-center gap-1">
                <Zap className="w-3 h-3 fill-purple-300" />
                SIMULADOR
              </span>
              <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded">
                100% Compatível
              </span>
            </div>

            <h3 className="text-lg font-black text-white tracking-tight leading-snug group-hover:text-purple-300 transition-colors font-tech">
              Monte seu PC Gamer
            </h3>
            <p className="text-xs text-slate-300 mt-1 mb-4 leading-relaxed">
              Escolha placa-mãe, processador, placa de vídeo e nós validamos a compatibilidade de fonte e memórias.
            </p>

            <div className="flex items-center justify-between text-xs font-bold text-purple-400 group-hover:text-purple-300">
              <span>Abrir Configurador</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Cupom de Hardware & Frete */}
          <div className="flex-1 bg-gradient-to-br from-[#1c1810] to-[#14161c] border border-orange-900/40 hover:border-orange-500/60 p-5 rounded-2xl relative overflow-hidden group transition-all duration-300 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-colors pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-[10px] font-black tracking-wider uppercase">
                CUPOM ATIVO
              </span>
              <span className="font-mono text-xs font-black text-yellow-400 bg-yellow-950/60 px-2 py-0.5 rounded border border-yellow-600/40">
                KABYTE10
              </span>
            </div>

            <h3 className="text-lg font-black text-white tracking-tight leading-snug group-hover:text-orange-300 transition-colors font-tech">
              10% OFF Adicional
            </h3>
            <p className="text-xs text-slate-300 mt-1 mb-4 leading-relaxed">
              Cupom válido em toda a linha de SSDs NVMe, memórias DDR5 e periféricos gamers.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Garantia oficial e envio com nota fiscal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

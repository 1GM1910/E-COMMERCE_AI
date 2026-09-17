import React from 'react';
import { Zap, Truck, ShieldCheck, Smartphone, MapPin } from 'lucide-react';

interface TopAnnouncementBarProps {
  onOpenCepModal: () => void;
  userCep?: string;
}

export const TopAnnouncementBar: React.FC<TopAnnouncementBarProps> = ({
  onOpenCepModal,
  userCep,
}) => {
  return (
    <div className="bg-[#ff5500] text-white text-xs font-semibold py-1.5 px-4 tracking-wide shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
          <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded text-[11px] uppercase font-bold tracking-wider">
            <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-pulse" />
            Ofertas Ninja
          </span>
          <span className="hidden sm:inline">|</span>
          <span>ATÉ 15% OFF NO PIX</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" />
            Frete Grátis acima de R$ 299*
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded font-mono text-[11px]">
            CUPOM: KABYTE10
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-orange-100">
          <button
            onClick={onOpenCepModal}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            title="Informar seu CEP para cálculo de frete"
          >
            <MapPin className="w-3.5 h-3.5 text-yellow-300" />
            <span>
              {userCep ? `Enviar para: ${userCep}` : 'Informe seu CEP'}
            </span>
          </button>

          <span className="hidden lg:flex items-center gap-1 hover:text-white cursor-pointer">
            <Smartphone className="w-3.5 h-3.5" />
            App KaByte
          </span>

          <span className="hidden md:flex items-center gap-1 hover:text-white cursor-pointer">
            <ShieldCheck className="w-3.5 h-3.5" />
            Garantia Nacional
          </span>
        </div>
      </div>
    </div>
  );
};

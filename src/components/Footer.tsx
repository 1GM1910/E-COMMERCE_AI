import React from 'react';
import {
  Zap,
  ShieldCheck,
  CreditCard,
  Headphones,
  Mail,
  Phone,
  Clock,
  Instagram,
  Youtube,
  Twitter,
  Twitch,
  Award,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0d14] text-slate-300 border-t border-slate-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff4500] to-[#ffaa00] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black text-white font-tech">
                KA<span className="text-[#ff6a00]">BYTE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
              A sua loja especializada no melhor do hardware de alta performance, componentes de computador, periféricos competitivos e eletrônicos. Atendimento especializado de gamers para gamers.
            </p>

            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-[#ff6a00] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-[#ff6a00] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-[#ff6a00] transition-colors">
                <Twitch className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-[#ff6a00] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Departamentos */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3 font-tech">
              Departamentos
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#catalogo" className="hover:text-orange-400 transition-colors">Placas de Vídeo (RTX & Radeon)</a></li>
              <li><a href="#catalogo" className="hover:text-orange-400 transition-colors">Processadores AMD & Intel</a></li>
              <li><a href="#catalogo" className="hover:text-orange-400 transition-colors">Memória RAM DDR5 / DDR4</a></li>
              <li><a href="#catalogo" className="hover:text-orange-400 transition-colors">Armazenamento SSD NVMe M.2</a></li>
              <li><a href="#catalogo" className="hover:text-orange-400 transition-colors">Fontes Modulares 80 Plus</a></li>
              <li><a href="#catalogo" className="hover:text-orange-400 transition-colors">Periféricos e Mouses 4KHz</a></li>
              <li><a href="#catalogo" className="hover:text-orange-400 transition-colors">Monitores Gamer 144Hz a 360Hz</a></li>
            </ul>
          </div>

          {/* Col 3: Ajuda & Suporte */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3 font-tech">
              Ajuda & Garantia
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Central de Atendimento (SAC)</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Rastreamento de Encomenda</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Política de Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Acionamento de Garantia RMA</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Termos e Condições de Compra</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Guia de Montagem de PC</a></li>
            </ul>
          </div>

          {/* Col 4: Atendimento & SAC */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3 font-tech">
              Canais de Atendimento
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>0800 720 9000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>atendimento@kabyte.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Seg à Sex: 08:00 às 20:00</span>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold px-2 py-1 rounded-md">
                  <Award className="w-3.5 h-3.5" />
                  Selo RA1000 no Reclame Aqui
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Security Seals */}
        <div className="border-t border-slate-800/80 pt-8 pb-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Payment Badges */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Formas de Pagamento Aceitas:
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold rounded-md flex items-center gap-1 font-mono">
                <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                PIX (-15% OFF)
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded-md">
                Visa
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded-md">
                Mastercard
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded-md">
                Elo
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded-md">
                Hipercard
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded-md">
                Boleto Bancário
              </span>
            </div>
          </div>

          {/* Security Seals */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Segurança & Certificações:
            </span>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SSL 256-bit Encriptado</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md text-slate-300">
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>Google Safe Browsing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="border-t border-slate-900 pt-6 text-center text-[11px] text-slate-400 space-y-1">
          <p>
            KaByte Informática e Eletrônicos S.A. | CNPJ: 45.892.124/0001-90 | Endereço: Av. Paulista, 1800 - Bela Vista, São Paulo - SP, 01310-200.
          </p>
          <p>
            Preços, condições de pagamento e promoções válidos exclusivamente para compras efetuadas neste site, podendo sofrer alterações sem prévio aviso.
          </p>
          <p className="text-slate-400 font-mono text-[10px]">
            © {new Date().getFullYear()} KaByte Hardware. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

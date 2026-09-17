import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  QrCode,
  Zap,
  Truck,
  ShieldCheck,
  X,
} from 'lucide-react';
import { formatBRL } from '../utils/formatters';

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  itemsCount: number;
}

export const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({
  isOpen,
  onClose,
  orderTotal,
  itemsCount,
}) => {
  const [copied, setCopied] = useState(false);
  const orderNumber = 'KB-84920';
  const pixCode =
    '00020126580014br.gov.bcb.pix0136kabyte-pagamentos-pix-br-hardware-9824520400005303986540' +
    Math.round(orderTotal) +
    '5802BR5918KABYTE INFORMATICA6009SAO PAULO62070503***6304E8A2';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#101522] border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3 text-emerald-400">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
            PEDIDO #{orderNumber} GERADO COM SUCESSO!
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1 font-tech">
            Aguardando Pagamento via PIX
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Pague agora para garantir seu desconto de 15% e o envio prioritário em até 24h úteis.
          </p>
        </div>

        {/* PIX QR Code & Box */}
        <div className="bg-[#0b0e14] border border-slate-800 rounded-2xl p-5 mb-5 flex flex-col items-center">
          <div className="w-44 h-44 bg-white p-3 rounded-xl mb-3 flex items-center justify-center shadow-md">
            {/* Visual SVG QR Code representation */}
            <div className="w-full h-full border-4 border-black p-1 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="w-9 h-9 bg-black border-2 border-white flex items-center justify-center">
                  <div className="w-4 h-4 bg-white" />
                </div>
                <div className="w-9 h-9 bg-black border-2 border-white flex items-center justify-center">
                  <div className="w-4 h-4 bg-white" />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Zap className="w-8 h-8 text-[#ff5500] fill-[#ff5500]" />
              </div>
              <div className="flex justify-between">
                <div className="w-9 h-9 bg-black border-2 border-white flex items-center justify-center">
                  <div className="w-4 h-4 bg-white" />
                </div>
                <div className="w-9 h-9 border-2 border-black flex items-center justify-center">
                  <div className="w-3 h-3 bg-black" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-3">
            <span className="text-xs text-slate-400 block font-semibold">Valor com desconto PIX:</span>
            <span className="text-2xl font-black text-[#ff6a00] font-mono">
              {formatBRL(orderTotal)}
            </span>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 active:scale-98 text-slate-100 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Código PIX Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-orange-400" />
                <span>Copiar Código Pix Copia e Cola</span>
              </>
            )}
          </button>
        </div>

        {/* Instructions */}
        <div className="space-y-2 text-xs text-slate-400 mb-6 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
          <p className="flex items-center gap-2 text-slate-300">
            <Truck className="w-4 h-4 text-orange-400 shrink-0" />
            <span>Envio Ninja com rastreamento via e-mail e WhatsApp</span>
          </p>
          <p className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Nota fiscal eletrônica emitida após a confirmação</span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#ff5500] hover:bg-[#e04b00] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
        >
          Continuar Comprando na KaByte
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, MapPin, Check, Truck } from 'lucide-react';

interface CepModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCep: string;
  onSaveCep: (cep: string) => void;
}

export const CepModal: React.FC<CepModalProps> = ({
  isOpen,
  onClose,
  currentCep,
  onSaveCep,
}) => {
  const [cep, setCep] = useState(currentCep || '');

  if (!isOpen) return null;

  const quickRegions = [
    { label: 'São Paulo - SP', cep: '01310-100' },
    { label: 'Rio de Janeiro - RJ', cep: '20040-002' },
    { label: 'Belo Horizonte - MG', cep: '30130-110' },
    { label: 'Curitiba - PR', cep: '80010-000' },
    { label: 'Porto Alegre - RS', cep: '90010-150' },
    { label: 'Brasília - DF', cep: '70040-010' },
    { label: 'Salvador - BA', cep: '40020-000' },
  ];

  const handleSave = (val: string) => {
    onSaveCep(val);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#121724] border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-[#ff6a00] flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-tech">
              Onde você quer receber seu pedido?
            </h3>
            <p className="text-xs text-slate-400">
              Calcule prazos de entrega e fretes personalizados
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (cep.trim()) handleSave(cep);
          }}
          className="space-y-3 mb-4"
        >
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Digite seu CEP:
            </label>
            <input
              type="text"
              placeholder="Ex: 01310-100"
              maxLength={9}
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              className="w-full bg-[#0b0e14] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Confirmar CEP
          </button>
        </form>

        <div className="pt-3 border-t border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Ou selecione uma capital:
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {quickRegions.map((reg) => (
              <button
                key={reg.cep}
                onClick={() => handleSave(reg.cep)}
                className="text-left px-2.5 py-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-800/80 transition-colors cursor-pointer"
              >
                <div className="font-semibold text-[11px] truncate">{reg.label}</div>
                <div className="text-[10px] text-slate-500 font-mono">{reg.cep}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

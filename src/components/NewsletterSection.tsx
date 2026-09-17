import React, { useState } from 'react';
import { Mail, Check, Gift, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-gradient-to-r from-[#1c1308] via-[#241708] to-[#121624] border border-orange-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/40 mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>Clube VIP de Hardware</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-tech">
            Ganhe R$ 50 OFF na Primeira Compra
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 mb-6">
            Receba em primeira mão notificações de reposição de estoque de GPUs, drops de novos processadores e cupons secretos de até 40% OFF.
          </p>

          {isSubscribed ? (
            <div className="bg-emerald-950/80 border border-emerald-500/40 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-300">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Inscrição confirmada!</p>
                <p className="text-emerald-300">
                  Use o cupom especial <strong className="font-mono text-yellow-300">KABYTE50</strong> no seu carrinho em compras acima de R$ 300.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="Digite seu melhor e-mail..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0e121a] border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#ff5500] hover:bg-[#e04b00] active:scale-98 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-orange-950/60 cursor-pointer shrink-0"
              >
                Quero Meu Cupom
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

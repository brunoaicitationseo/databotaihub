
import React, { useState } from 'react';

interface PricingPageProps {
  onBack: () => void;
  onSelectPlan: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onBack, onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-[100dvh] w-full bg-[#050505] text-white overflow-y-auto font-display relative pb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
          <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="material-icons-outlined text-white">arrow_back</span>
          </div>
          <span className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Voltar</span>
        </div>
        <div className="flex items-center gap-2">
             <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="material-icons-outlined text-primary text-sm">verified</span>
             </div>
             <span className="font-bold text-lg tracking-tight">Planos & Preços</span>
        </div>
      </header>

      <main className="relative z-10 px-4 mt-8 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Desbloqueie o poder máximo da <span className="bg-clip-text text-transparent bg-neon-gradient neon-text-glow">IA</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          Escolha o plano ideal para centralizar suas ferramentas e multiplicar sua produtividade.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>Mensal</span>
            <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-16 h-8 bg-white/10 rounded-full relative p-1 transition-colors hover:bg-white/20"
            >
                <div className={`w-6 h-6 bg-primary rounded-full shadow-lg transform transition-transform duration-300 ${isAnnual ? 'translate-x-8' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-gray-500'}`}>Anual <span className="text-secondary text-xs ml-1 font-bold">(-20%)</span></span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Free Plan */}
            <div className="bg-[#0F0518] border border-white/10 rounded-3xl p-8 flex flex-col items-start text-left hover:border-white/20 transition-colors relative group">
                <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit">
                    <span className="material-icons-outlined text-gray-400">person</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-bold">R$ 0</span>
                    <span className="text-gray-500 mb-1">/mês</span>
                </div>
                <p className="text-gray-400 text-sm mb-8">Para entusiastas explorando o mundo da IA.</p>
                
                <ul className="flex-col gap-4 flex mb-8 w-full">
                    {[
                        'Até 3 Widgets simultâneos',
                        'Catálogo básico de IAs',
                        'Acesso via iFrame',
                        'Suporte da comunidade'
                    ].map((feat, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                            <span className="material-icons-outlined text-green-400 text-sm">check</span>
                            {feat}
                        </li>
                    ))}
                </ul>

                <button 
                    onClick={onSelectPlan}
                    className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/5 font-medium transition-colors mt-auto"
                >
                    Começar Grátis
                </button>
            </div>

            {/* Pro Plan (Featured) */}
            <div className="bg-[#130822] border border-primary/50 rounded-3xl p-8 flex flex-col items-start text-left relative shadow-[0_0_40px_rgba(160,32,240,0.15)] scale-105 z-10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-black shadow-lg">
                    Mais Popular
                </div>
                <div className="mb-4 p-3 rounded-xl bg-primary/20 w-fit">
                    <span className="material-icons-outlined text-primary">bolt</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-bold">R$ {isAnnual ? '49' : '59'}</span>
                    <span className="text-gray-500 mb-1">/mês</span>
                </div>
                <p className="text-gray-300 text-sm mb-8">Para profissionais que precisam de produtividade máxima.</p>
                
                <ul className="flex-col gap-4 flex mb-8 w-full">
                    {[
                        'Widgets ilimitados',
                        'Uso da API Key Própria (Gemini/OpenAI)',
                        'Multi-chat simultâneo',
                        'Histórico de Contexto e Tarefas',
                        'Modo "Command Center" Drag & Drop'
                    ].map((feat, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-white font-medium">
                            <span className="material-icons-outlined text-secondary text-sm">check_circle</span>
                            {feat}
                        </li>
                    ))}
                </ul>

                <button 
                    onClick={onSelectPlan}
                    className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/25 transition-all mt-auto"
                >
                    Assinar Pro
                </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-[#0F0518] border border-white/10 rounded-3xl p-8 flex flex-col items-start text-left hover:border-white/20 transition-colors relative">
                <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit">
                    <span className="material-icons-outlined text-secondary">apartment</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Team</h3>
                <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-bold">Sob Consulta</span>
                </div>
                <p className="text-gray-400 text-sm mb-8">Para equipes que colaboram em projetos de IA.</p>
                
                <ul className="flex-col gap-4 flex mb-8 w-full">
                    {[
                        'Tudo do Pro',
                        'Gestão centralizada de API Keys',
                        'Compartilhamento de Workspaces',
                        'SSO e Segurança Avançada',
                        'Gerente de Sucesso Dedicado'
                    ].map((feat, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                            <span className="material-icons-outlined text-gray-500 text-sm">check</span>
                            {feat}
                        </li>
                    ))}
                </ul>

                <button 
                    onClick={() => window.open('mailto:sales@databotai.com')}
                    className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/5 font-medium transition-colors mt-auto"
                >
                    Falar com Vendas
                </button>
            </div>

        </div>
      </main>
    </div>
  );
};

export default PricingPage;

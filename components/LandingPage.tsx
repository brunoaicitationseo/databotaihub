
import React, { useState, useEffect } from 'react';
import { AppState } from '../types';

interface LandingPageProps {
  onEnterHub: () => void;
  onNavigate: (view: AppState['currentView']) => void;
  onOpenCatalog: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterHub, onNavigate, onOpenCatalog }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Images for the carousel
  // REPLACE THESE PLACEHOLDERS WITH YOUR REAL IMAGE URLS
  const desktopImages = [
      "https://placehold.co/1200x800/1a1a1a/FFF?text=Dashboard+View", // Slide 1
      "https://placehold.co/1200x800/2a1a3a/FFF?text=Multi-Chat+View", // Slide 2
      "https://placehold.co/1200x800/0a1a2a/FFF?text=Catalog+View",    // Slide 3
      "https://placehold.co/1200x800/1a1a1a/FFF?text=Project+View",    // Slide 4
      "https://placehold.co/1200x800/2a1a3a/FFF?text=Settings+View",   // Slide 5
      "https://placehold.co/1200x800/0a1a2a/FFF?text=Workspace+1",     // Slide 6
      "https://placehold.co/1200x800/1a1a1a/FFF?text=Workspace+2",     // Slide 7
      "https://placehold.co/1200x800/2a1a3a/FFF?text=Analytics",       // Slide 8
      "https://placehold.co/1200x800/0a1a2a/FFF?text=Team+View",       // Slide 9
      "https://placehold.co/1200x800/1a1a1a/FFF?text=Mobile+Preview",  // Slide 10
  ];

  const mobileImages = [
      "https://placehold.co/300x600/1a1a1a/FFF?text=Mob1",
      "https://placehold.co/300x600/2a1a3a/FFF?text=Mob2",
      "https://placehold.co/300x600/0a1a2a/FFF?text=Mob3",
      "https://placehold.co/300x600/1a1a1a/FFF?text=Mob4",
      "https://placehold.co/300x600/2a1a3a/FFF?text=Mob5",
      "https://placehold.co/300x600/0a1a2a/FFF?text=Mob6",
      "https://placehold.co/300x600/1a1a1a/FFF?text=Mob7",
      "https://placehold.co/300x600/2a1a3a/FFF?text=Mob8",
      "https://placehold.co/300x600/0a1a2a/FFF?text=Mob9",
      "https://placehold.co/300x600/1a1a1a/FFF?text=Mob10",
  ];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % desktopImages.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(timer);
  }, [desktopImages.length]);

  const trendingModels = [
      { name: 'DeepSeek R1', type: 'Reasoning', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
      { name: 'Llama 3.1', type: 'Open Source', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
      { name: 'Gemini 1.5 Pro', type: 'Context Window', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
      { name: 'Claude 3.5 Sonnet', type: 'Coding', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
      { name: 'Flux 1.0', type: 'Image Gen', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  ];

  return (
    // WRAPPER PRINCIPAL COM SCROLL INDEPENDENTE
    <div className="fixed inset-0 z-[50] bg-[#030005] overflow-y-auto overflow-x-hidden font-display selection:bg-primary/30 scroll-smooth">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[500px] bg-primary/10 blur-[120px] rounded-full opacity-60"></div>
         <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-secondary/5 blur-[100px] rounded-full opacity-40"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#030005]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={onEnterHub}>
                <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-primary to-purple-900 flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="material-icons-outlined text-white text-lg">smart_toy</span>
                </div>
                <span className="text-lg font-bold text-white tracking-tight">DataBotAI</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
                <button onClick={() => onNavigate('about')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Sobre</button>
                <button onClick={() => onNavigate('pricing')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Preços</button>
                <button onClick={onOpenCatalog} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Catálogo</button>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
                <button onClick={onEnterHub} className="text-sm font-semibold text-white hover:text-primary transition-colors">Login</button>
                <button 
                    onClick={onEnterHub}
                    className="group relative px-5 py-2 overflow-hidden rounded-full bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
                    <span className="relative text-sm font-bold">Entrar no Hub</span>
                </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white p-2 relative z-50">
                <span className="material-icons-outlined">menu</span>
            </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 pt-32 pb-20">
        
        {/* 3.1 HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 text-center mb-24 relative">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-secondary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <span>Novo: Suporte a DeepSeek R1 e Llama 3.1</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                Centralize sua <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-secondary neon-text-glow">Inteligência</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                O sistema operacional definitivo para IAs. Gerencie ChatGPT, Claude, Gemini e +200 ferramentas em um único workspace de alta performance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 mb-20">
                <button 
                    onClick={onEnterHub}
                    className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-lg shadow-[0_0_40px_rgba(160,32,240,0.4)] hover:shadow-[0_0_60px_rgba(160,32,240,0.6)] hover:scale-105 transition-all duration-300 relative z-20 flex items-center justify-center gap-2"
                >
                    <span>Começar Agora</span>
                    <span className="material-icons-outlined text-sm">arrow_forward</span>
                </button>
                <button 
                    onClick={onOpenCatalog}
                    className="w-full sm:w-auto px-8 py-4 bg-[#1A1025] hover:bg-[#251635] border border-white/10 hover:border-white/20 text-white rounded-full font-bold text-lg transition-all relative z-20 flex items-center justify-center gap-2"
                >
                    <span className="material-icons-outlined text-sm">grid_view</span>
                    <span>Explorar Catálogo</span>
                </button>
            </div>

            {/* 3.6 CARROSEL INTERATIVO (Trending Models) */}
            <div className="mb-16 overflow-hidden w-full relative group">
                 <div className="absolute left-0 top-0 bottom-0 w-10 md:w-32 bg-gradient-to-r from-[#030005] to-transparent z-10 pointer-events-none"></div>
                 <div className="absolute right-0 top-0 bottom-0 w-10 md:w-32 bg-gradient-to-l from-[#030005] to-transparent z-10 pointer-events-none"></div>
                 
                 <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Modelos Disponíveis</p>
                 
                 <div className="flex gap-4 overflow-x-auto pb-8 px-6 md:justify-center snap-x no-scrollbar">
                    {trendingModels.map((model, i) => (
                        <button 
                            key={i}
                            onClick={onOpenCatalog}
                            className={`shrink-0 snap-center flex items-center gap-3 pl-3 pr-5 py-2.5 rounded-full border bg-[#0A0014] hover:bg-[#150a25] transition-all cursor-pointer group/item ${model.border}`}
                        >
                            <div className={`h-8 w-8 rounded-full ${model.bg} flex items-center justify-center`}>
                                <span className={`material-icons-outlined text-sm ${model.color}`}>smart_toy</span>
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-white group-hover/item:text-primary transition-colors">{model.name}</p>
                                <p className="text-[10px] text-gray-500">{model.type}</p>
                            </div>
                            <span className="material-icons-outlined text-gray-600 text-xs opacity-0 group-hover/item:opacity-100 transition-opacity -ml-1">open_in_new</span>
                        </button>
                    ))}
                 </div>
            </div>

            {/* --- 3.1 MOCKUP COMPOSTO (COM IMAGENS REAIS) --- */}
            <div className="relative max-w-5xl mx-auto mt-10 px-4 mb-32">
                 {/* Glow Fundo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
                
                {/* Container de Composição */}
                <div className="relative flex items-end justify-center pr-12 md:pr-20">

                    {/* 1. LAPTOP FRAME */}
                    <div className="relative z-10 w-full md:w-[800px] aspect-[16/10] bg-[#111] rounded-2xl border-[1px] border-[#333] shadow-2xl shadow-black flex flex-col overflow-hidden ring-4 ring-black">
                        {/* Laptop Camera */}
                        <div className="h-6 bg-[#1a1a1a] border-b border-[#222] flex justify-center items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#333]"></div>
                        </div>
                        
                        {/* Screen Area with Image Carousel */}
                        <div className="flex-1 relative bg-[#05000A] overflow-hidden">
                            <div 
                                className="flex transition-transform duration-700 ease-in-out h-full"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {desktopImages.map((src, idx) => (
                                    <img 
                                        key={idx}
                                        src={src} 
                                        alt={`Dashboard View ${idx + 1}`}
                                        className="min-w-full h-full object-cover object-top"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 2. PHONE FRAME (Positioned Absolutely) */}
                    <div className="absolute -right-2 md:-right-12 -bottom-8 w-[100px] md:w-[140px] h-[200px] md:h-[280px] bg-[#05000A] rounded-[24px] border-[6px] border-[#1a1a1a] shadow-2xl z-20 overflow-hidden ring-1 ring-white/10">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-16 bg-[#1a1a1a] rounded-b-lg z-30"></div>
                        
                        {/* Mobile Screen Carousel */}
                        <div className="h-full w-full bg-[#0A0014] relative overflow-hidden">
                             <div 
                                className="flex h-full transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                             >
                                {mobileImages.map((src, idx) => (
                                    <img 
                                        key={idx}
                                        src={src} 
                                        alt={`Mobile View ${idx + 1}`}
                                        className="min-w-full h-full object-cover object-top"
                                    />
                                ))}
                             </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* 3.2 SOCIAL PROOF */}
        <section className="border-y border-white/5 bg-white/[0.02] py-10 mb-24">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-gray-500 text-sm mb-6">PLATAFORMAS INTEGRADAS NATIVAMENTE</p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="text-xl font-bold text-white flex items-center gap-2"><span className="material-icons-outlined">smart_toy</span> Gemini</span>
                    <span className="text-xl font-bold text-white flex items-center gap-2"><span className="material-icons-outlined">chat</span> OpenAI</span>
                    <span className="text-xl font-bold text-white flex items-center gap-2"><span className="material-icons-outlined">psychology</span> Anthropic</span>
                    <span className="text-xl font-bold text-white flex items-center gap-2"><span className="material-icons-outlined">code</span> GitHub</span>
                    <span className="text-xl font-bold text-white flex items-center gap-2"><span className="material-icons-outlined">image</span> Midjourney</span>
                </div>
            </div>
        </section>

        {/* 3.3 HOW IT WORKS (Steps) */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Seu fluxo de trabalho, <span className="text-secondary">amplificado</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto">O DataBotAI Hub remove a fricção de alternar entre abas e logins.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>

                {[
                    { step: '01', icon: 'grid_view', title: 'Escolha suas IAs', desc: 'Selecione entre 200+ ferramentas no catálogo ou conecte suas próprias API Keys.' },
                    { step: '02', icon: 'drag_indicator', title: 'Organize o Espaço', desc: 'Arraste e solte widgets para criar o layout perfeito para sua tarefa.' },
                    { step: '03', icon: 'auto_awesome', title: 'Execute em Paralelo', desc: 'Envie um prompt e receba respostas de múltiplos modelos simultaneamente.' }
                ].map((item, i) => (
                    <div key={i} className="relative z-10 bg-[#0A0014] border border-white/5 p-8 rounded-3xl text-center group hover:border-primary/30 transition-colors">
                        <div className="w-16 h-16 mx-auto bg-[#150a25] rounded-2xl flex items-center justify-center border border-white/5 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black">
                            <span className="material-icons-outlined text-3xl text-primary">{item.icon}</span>
                        </div>
                        <div className="absolute top-8 right-8 text-4xl font-bold text-white/5 select-none">{item.step}</div>
                        <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* 3.4 FEATURES (Bento Grid) */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Poder de <span className="text-primary">Enterprise</span> no seu navegador</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
                
                {/* Large Feature: Multi-Chat */}
                <div className="md:col-span-2 md:row-span-2 bg-[#0F0518] border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-primary/30 transition-all flex flex-col">
                    <div className="relative z-10">
                        <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                            <span className="material-icons-outlined text-primary text-2xl">chat</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Multi-Chat Simultâneo</h3>
                        <p className="text-gray-400 max-w-sm">Compare a criatividade do Claude com a lógica do Gemini em tempo real. Uma entrada, múltiplas saídas.</p>
                    </div>
                    {/* Abstract Vis */}
                    <div className="mt-auto pt-8 relative">
                         <div className="space-y-3 opacity-60 group-hover:opacity-100 transition-opacity">
                             <div className="bg-white/5 p-3 rounded-lg rounded-tl-none ml-4 border border-white/5 w-[80%]"><div className="h-2 bg-white/20 rounded w-3/4"></div></div>
                             <div className="bg-primary/10 p-3 rounded-lg rounded-tr-none mr-4 border border-primary/20 w-[80%] ml-auto"><div className="h-2 bg-primary/40 rounded w-1/2"></div></div>
                             <div className="bg-secondary/10 p-3 rounded-lg rounded-tr-none mr-4 border border-secondary/20 w-[80%] ml-auto"><div className="h-2 bg-secondary/40 rounded w-2/3"></div></div>
                         </div>
                    </div>
                </div>

                {/* Feature: Catalog */}
                <div className="md:col-span-2 bg-[#0F0518] border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-secondary/30 transition-all">
                     <div className="flex justify-between items-start relative z-10">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">200+ Apps</h3>
                            <p className="text-gray-400 text-sm max-w-xs">A maior biblioteca de ferramentas de IA curada para produtividade.</p>
                        </div>
                        <div className="h-10 w-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                            <span className="material-icons-outlined text-secondary">apps</span>
                        </div>
                     </div>
                     <div className="absolute bottom-0 right-0 left-0 h-16 bg-gradient-to-t from-secondary/5 to-transparent"></div>
                </div>

                {/* Feature: Privacy */}
                <div className="md:col-span-1 bg-[#0F0518] border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-green-500/30 transition-all">
                    <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                        <span className="material-icons-outlined text-green-500">lock</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Privado</h3>
                    <p className="text-gray-400 text-xs">Suas chaves de API ficam salvas apenas no seu dispositivo.</p>
                </div>

                 {/* Feature: Projects */}
                 <div className="md:col-span-1 bg-[#0F0518] border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/30 transition-all">
                    <div className="h-10 w-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                        <span className="material-icons-outlined text-purple-500">folder</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Projetos</h3>
                    <p className="text-gray-400 text-xs">Organize chats e contextos por cliente ou objetivo.</p>
                </div>

            </div>
        </section>

        {/* CTA FINAL */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-20">
            <div className="bg-gradient-to-b from-[#130822] to-[#0A0014] border border-white/10 rounded-3xl p-12 md:p-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Pronto para o futuro?</h2>
                <p className="text-gray-400 mb-10 text-lg">Junte-se a milhares de profissionais que já aumentaram sua produtividade em 10x.</p>
                
                <button 
                    onClick={onEnterHub}
                    className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                    Começar Gratuitamente
                </button>
            </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 bg-[#020103] pt-20 pb-10 relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
              <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center gap-2 mb-4">
                      <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                          <span className="material-icons-outlined text-white text-sm">smart_toy</span>
                      </div>
                      <span className="font-bold text-white">DataBotAI</span>
                  </div>
                  <p className="text-gray-500 text-sm">O hub definitivo para produtividade com Inteligência Artificial.</p>
              </div>
              
              <div>
                  <h4 className="font-bold text-white mb-4">Produto</h4>
                  <ul className="space-y-2 text-sm text-gray-500">
                      <li className="hover:text-primary cursor-pointer">Features</li>
                      <li onClick={() => onNavigate('pricing')} className="hover:text-primary cursor-pointer">Preços</li>
                      <li onClick={onOpenCatalog} className="hover:text-primary cursor-pointer">Catálogo</li>
                      <li className="hover:text-primary cursor-pointer">Updates</li>
                  </ul>
              </div>

              <div>
                  <h4 className="font-bold text-white mb-4">Recursos</h4>
                  <ul className="space-y-2 text-sm text-gray-500">
                      <li className="hover:text-primary cursor-pointer">Comunidade</li>
                      <li className="hover:text-primary cursor-pointer">Ajuda</li>
                      <li className="hover:text-primary cursor-pointer">API Docs</li>
                      <li className="hover:text-primary cursor-pointer">Status</li>
                  </ul>
              </div>

              <div>
                  <h4 className="font-bold text-white mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm text-gray-500">
                      <li className="hover:text-primary cursor-pointer">Privacidade</li>
                      <li className="hover:text-primary cursor-pointer">Termos</li>
                  </ul>
              </div>
          </div>
          <div className="text-center border-t border-white/5 pt-8 text-gray-600 text-xs">
              © 2025 DataBotAI Inc. Developed with ❤️ & AI.
          </div>
      </footer>

      {/* --- MOBILE SIDEBAR --- */}
      <div className={`fixed inset-0 z-[9999] md:hidden transition-all duration-300 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
            className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsMenuOpen(false)}
        ></div>
        <div className={`absolute top-0 right-0 h-full w-[80%] max-w-[300px] bg-[#0F0518] border-l border-white/10 shadow-2xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
            <div className="p-6 flex justify-between items-center border-b border-white/10">
                <span className="font-bold text-white">Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white">
                    <span className="material-icons-outlined">close</span>
                </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
                <button onClick={onEnterHub} className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20">Acessar Hub</button>
                <button onClick={() => onNavigate('pricing')} className="text-left text-gray-300 py-2 border-b border-white/5">Planos e Preços</button>
                <button onClick={() => onNavigate('about')} className="text-left text-gray-300 py-2 border-b border-white/5">Sobre Nós</button>
                <button onClick={onOpenCatalog} className="text-left text-gray-300 py-2 border-b border-white/5">Ver Catálogo</button>
            </div>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;

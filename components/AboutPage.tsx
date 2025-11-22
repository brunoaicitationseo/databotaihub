
import React from 'react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-[100dvh] w-full bg-[#050505] text-white overflow-y-auto font-display relative pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(160,32,240,0.1),transparent_70%)] pointer-events-none"></div>
      <div className="fixed top-1/3 right-0 w-[300px] h-[300px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
          <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <span className="material-icons-outlined text-white">arrow_back</span>
          </div>
          <span className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Voltar</span>
        </div>
        <h1 className="font-bold text-lg tracking-tight">Sobre Nós</h1>
      </header>

      <main className="relative z-10 px-6 mt-8 max-w-4xl mx-auto">
        
        {/* Manifesto Section */}
        <section className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-6">
            <span className="material-icons-outlined text-sm">lightbulb</span>
            <span>Nossa Visão</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            O Sistema Operacional para <br />
            <span className="bg-clip-text text-transparent bg-neon-gradient neon-text-glow">Inteligência Artificial</span>
          </h2>
          
          <div className="text-lg md:text-xl text-gray-400 space-y-6 leading-relaxed max-w-3xl mx-auto text-justify md:text-center">
            <p>
              Acreditamos que o futuro do trabalho não é sobre usar <strong>uma</strong> IA, mas sim orquestrar <strong>várias</strong>.
            </p>
            <p>
              Hoje, a experiência de usar IA é fragmentada. Você tem uma aba para texto, outra para código, outra para imagens. O contexto se perde. A produtividade trava.
            </p>
            <p>
              O <strong>DataBotAI Hub</strong> nasceu para quebrar esses silos. Criamos um workspace unificado onde suas ferramentas favoritas trabalham lado a lado, compartilhando contexto e acelerando sua mente.
            </p>
          </div>
        </section>

        {/* Tech Stack Grid */}
        <section className="mb-20">
            <h3 className="text-center text-gray-500 uppercase tracking-widest text-xs font-bold mb-10">Construído com Tecnologia de Ponta</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { name: 'React 19', icon: 'code', color: 'text-blue-400' },
                    { name: 'Tailwind CSS', icon: 'style', color: 'text-cyan-400' },
                    { name: 'Gemini API', icon: 'smart_toy', color: 'text-purple-400' },
                    { name: 'Google Cloud', icon: 'cloud', color: 'text-white' },
                ].map((tech, i) => (
                    <div key={i} className="bg-[#0F0518] border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-primary/30 transition-colors group">
                        <span className={`material-icons-outlined text-3xl ${tech.color} group-hover:scale-110 transition-transform`}>{tech.icon}</span>
                        <span className="font-medium text-gray-300">{tech.name}</span>
                    </div>
                ))}
            </div>
        </section>

        {/* Team Section */}
        <section className="bg-[#0F0518] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                     <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-primary to-secondary p-[3px]">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Founder" className="h-full w-full rounded-full bg-black" />
                     </div>
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">DataBot Team</h3>
                    <p className="text-primary font-medium mb-4">Fundadores & Engenheiros</p>
                    <p className="text-gray-400 leading-relaxed">
                        Somos um coletivo de desenvolvedores e designers apaixonados por interface homem-máquina. Nosso objetivo é tornar a IA acessível, controlável e, acima de tudo, útil para o dia a dia profissional.
                    </p>
                </div>
            </div>
        </section>

      </main>

      <footer className="mt-20 border-t border-white/5 py-8 text-center">
        <p className="text-gray-600 text-sm">© 2025 DataBotAI Inc. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default AboutPage;

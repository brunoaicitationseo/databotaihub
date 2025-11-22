
import React, { useState, useEffect } from 'react';

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const [apiKey, setApiKey] = useState('');
  const [name, setName] = useState('Usuário Demo');
  
  // Mock loading settings
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) setApiKey(savedKey);
    const savedName = localStorage.getItem('user_name');
    if (savedName) setName(savedName);
  }, []);

  const handleSave = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    localStorage.setItem('user_name', name);
    alert('Configurações salvas com sucesso! (Salvo localmente no navegador)');
    onBack();
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#050505] text-white overflow-y-auto font-display relative">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-[#050505]/80 backdrop-blur-md px-6 py-4 border-b border-white/5 flex items-center justify-between max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
            <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <span className="material-icons-outlined text-white text-sm">arrow_back</span>
            </div>
            <span className="font-bold text-lg">Configurações</span>
            </div>
            <button 
                onClick={handleSave}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 transition-all"
            >
                Salvar
            </button>
        </header>

        <main className="px-4 py-8 max-w-2xl mx-auto space-y-8">
            
            {/* Profile Section */}
            <section>
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Perfil</h3>
                <div className="bg-[#0F0518] border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="relative">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="h-20 w-20 rounded-full border-2 border-white/10" />
                            <button className="absolute bottom-0 right-0 h-8 w-8 bg-secondary text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                <span className="material-icons-outlined text-sm">edit</span>
                            </button>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm text-gray-400 mb-1">Nome de Exibição</label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* API Keys Section */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Chaves de API (Integração Nativa)</h3>
                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded uppercase">Pro</span>
                </div>
                
                <div className="bg-[#0F0518] border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-3">
                        <span className="material-icons-outlined text-blue-400">info</span>
                        <p className="text-sm text-blue-200">
                            Para usar o Chat Gemini nativamente (sem iFrame), você precisa fornecer sua própria chave de API do Google AI Studio. Sua chave é salva apenas no armazenamento local do seu navegador.
                        </p>
                    </div>

                    <div>
                        <label className="flex items-center justify-between text-sm text-gray-300 mb-2">
                            <span>Gemini API Key</span>
                            <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-xs text-primary hover:underline">Obter chave</a>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons-outlined text-gray-600">key</span>
                            <input 
                                type="password" 
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="sk-..."
                                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white font-mono text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-gray-700"
                            />
                        </div>
                    </div>

                    <div className="opacity-50 pointer-events-none">
                        <label className="flex items-center justify-between text-sm text-gray-300 mb-2">
                            <span>OpenAI API Key (Em breve)</span>
                        </label>
                        <div className="relative">
                             <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons-outlined text-gray-600">key</span>
                            <input type="password" disabled placeholder="sk-..." className="w-full bg-black/20 border border-white/5 rounded-lg pl-10 pr-4 py-3 text-gray-500 font-mono text-sm" />
                        </div>
                    </div>
                </div>
            </section>

             {/* Preferences */}
             <section>
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Preferências do Workspace</h3>
                <div className="bg-[#0F0518] border border-white/10 rounded-2xl overflow-hidden">
                    {[
                        { label: 'Modo Escuro', desc: 'Sempre ativo neste tema neon', toggle: true },
                        { label: 'Efeitos de Som', desc: 'Sons de clique e envio de mensagem', toggle: false },
                        { label: 'Notificações Desktop', desc: 'Quando uma IA terminar de responder', toggle: false }
                    ].map((pref, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                            <div>
                                <p className="text-sm font-medium text-white">{pref.label}</p>
                                <p className="text-xs text-gray-500">{pref.desc}</p>
                            </div>
                            <div className={`w-10 h-6 rounded-full relative transition-colors ${pref.toggle ? 'bg-primary' : 'bg-white/10'}`}>
                                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${pref.toggle ? 'translate-x-4' : ''}`}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
            <div className="text-center pt-8 pb-20">
                <p className="text-xs text-gray-600">DataBotAI Hub v1.0.2 (MVP)</p>
                <button className="text-xs text-red-400 mt-2 hover:underline">Sair da conta</button>
            </div>

        </main>
    </div>
  );
};

export default SettingsPage;

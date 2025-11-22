
import React from 'react';
import { AppState, Project } from '../types';

interface DashboardPageProps {
  projects: Project[];
  user: AppState['user'];
  onSelectProject: (projectId: string) => void;
  onNewProject: () => void;
  onOpenCatalog: () => void;
  onNavigate: (view: AppState['currentView']) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ 
    projects, 
    user, 
    onSelectProject, 
    onNewProject, 
    onOpenCatalog,
    onNavigate
}) => {
  return (
    <div className="min-h-[100dvh] w-full bg-[#050505] text-white overflow-y-auto font-display relative pb-20">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#130822] via-[#050505] to-[#050505] pointer-events-none"></div>
        
        {/* Navbar */}
        <nav className="relative z-10 border-b border-white/5 bg-[#050505]/50 backdrop-blur-md sticky top-0">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                        <span className="material-icons-outlined text-white text-sm">smart_toy</span>
                    </div>
                    <span className="font-bold tracking-tight">DataBotAI</span>
                    <span className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-500 border border-white/5">BETA</span>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={onOpenCatalog} className="text-sm text-gray-400 hover:text-white transition-colors">Catálogo Global</button>
                    <button onClick={() => onNavigate('landing')} className="text-sm text-gray-400 hover:text-white transition-colors">Sair</button>
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                        <img src={user.avatar} className="h-full w-full rounded-full" />
                    </div>
                </div>
            </div>
        </nav>

        <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
            
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Meus Projetos</h1>
                    <p className="text-gray-400">Gerencie seus workspaces e fluxos de inteligência.</p>
                </div>
                <div className="flex items-center gap-3">
                     <button 
                        onClick={onOpenCatalog}
                        className="px-5 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-white text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <span className="material-icons-outlined text-sm">grid_view</span>
                        Catálogo Completo
                    </button>
                    <button 
                        onClick={onNewProject}
                        className="px-5 py-2.5 rounded-lg bg-white text-black hover:bg-gray-200 text-sm font-bold transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        <span className="material-icons-outlined text-sm">add</span>
                        Novo Projeto
                    </button>
                </div>
            </div>

            {/* Recent Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* New Project Card (Empty State style) */}
                <button 
                    onClick={onNewProject}
                    className="group h-[200px] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                    <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <span className="material-icons-outlined text-gray-400 group-hover:text-white">add</span>
                    </div>
                    <span className="text-sm font-medium text-gray-400 group-hover:text-white">Criar novo workspace</span>
                </button>

                {/* Existing Projects */}
                {projects.map(project => (
                    <div 
                        key={project.id}
                        onClick={() => onSelectProject(project.id)}
                        className="group relative h-[200px] bg-[#0F0518] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 hover:translate-y-[-2px] transition-all cursor-pointer overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <div className="h-10 w-10 rounded bg-white/5 border border-white/5 flex items-center justify-center">
                                    <span className="font-bold text-lg text-white">{project.name.substring(0,2).toUpperCase()}</span>
                                </div>
                                <span className="material-icons-outlined text-gray-600 group-hover:text-white transition-colors">arrow_forward</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
                            <p className="text-xs text-gray-500">{project.workspaces.length} workspaces ativos</p>
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                             {/* Micro representation of tools inside */}
                             <div className="flex -space-x-2">
                                 <div className="h-6 w-6 rounded-full bg-gray-800 border border-black flex items-center justify-center text-[10px]">🤖</div>
                                 <div className="h-6 w-6 rounded-full bg-gray-800 border border-black flex items-center justify-center text-[10px]">💬</div>
                             </div>
                             <span className="text-xs text-gray-500 ml-2">Última edição há 2h</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Stats / Recents */}
            <div className="mt-16">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Atividade Recente</h3>
                <div className="bg-[#0F0518] border border-white/10 rounded-2xl overflow-hidden">
                    {[
                        { action: 'Novo chat iniciado', tool: 'Gemini 1.5', time: '10 min atrás' },
                        { action: 'Projeto criado', tool: 'Marketing Q3', time: '2 horas atrás' },
                        { action: 'Configuração alterada', tool: 'API Key', time: '1 dia atrás' }
                    ].map((activity, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5">
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-sm text-gray-300">{activity.action}</span>
                                <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-500 border border-white/5">{activity.tool}</span>
                            </div>
                            <span className="text-xs text-gray-600">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>

        </main>
    </div>
  );
};

export default DashboardPage;

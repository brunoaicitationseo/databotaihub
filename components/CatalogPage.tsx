
import React, { useState } from 'react';
import { AI_TOOLS } from '../constants';
import { AITool, ToolCategory, Project } from '../types';

interface CatalogPageProps {
  onBack: () => void;
  projects: Project[];
  onAddTool: (toolId: string, target: { projectId: string | 'NEW', workspaceId: string | 'NEW', newProjectName?: string, newWorkspaceName?: string }) => void;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ onBack, projects, onAddTool }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'Todas'>('Todas');
  const [selectedToolForDeploy, setSelectedToolForDeploy] = useState<AITool | null>(null);

  // Deploy Modal State
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  const categories = ['Todas', ...Object.values(ToolCategory)];

  const filteredTools = AI_TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todas' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenDeploy = (tool: AITool) => {
      setSelectedToolForDeploy(tool);
      // Default to first project if exists
      if (projects.length > 0) {
          setSelectedProjectId(projects[0].id);
          if (projects[0].workspaces.length > 0) {
              setSelectedWorkspaceId(projects[0].workspaces[0].id);
          } else {
              setSelectedWorkspaceId('NEW');
          }
      } else {
          setSelectedProjectId('NEW');
          setSelectedWorkspaceId('NEW');
      }
  };

  const handleConfirmDeploy = () => {
      if (!selectedToolForDeploy) return;
      onAddTool(selectedToolForDeploy.id, {
          projectId: selectedProjectId,
          workspaceId: selectedWorkspaceId,
          newProjectName: newProjectName,
          newWorkspaceName: newWorkspaceName
      });
      setSelectedToolForDeploy(null);
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] text-white overflow-y-auto font-display pb-20 scroll-smooth selection:bg-primary/30">
      
      {/* Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none z-0"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Header */}
      <header className="sticky top-0 z-20 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onBack}>
          <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <span className="material-icons-outlined text-white group-hover:-translate-x-1 transition-transform">arrow_back</span>
          </div>
          <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">Voltar ao Hub</span>
        </div>
        <div className="flex items-center gap-2">
             <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-icons-outlined text-white text-sm">grid_view</span>
             </div>
             <span className="font-bold text-lg tracking-tight hidden sm:inline">Catálogo de Inteligência</span>
             <span className="font-bold text-lg tracking-tight sm:hidden">Catálogo</span>
        </div>
      </header>

      <main className="relative z-10 px-6 mt-12 max-w-7xl mx-auto pb-32">
        
        {/* Search Hero */}
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Descubra novas <span className="bg-clip-text text-transparent bg-neon-gradient neon-text-glow">habilidades</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
              Navegue por mais de 200 ferramentas de IA integradas e adicione poder ao seu workspace.
            </p>

            <div className="max-w-2xl mx-auto relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <span className="material-icons-outlined text-gray-500 text-xl group-focus-within:text-primary transition-colors">search</span>
                </div>
                <input 
                    type="text" 
                    placeholder="Buscar ferramentas (ex: DeepSeek, Geração de Vídeo)..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#0F0518] border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-2xl"
                />
            </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sticky top-24 z-10 py-2">
            <div className="p-1 bg-[#0F0518]/80 backdrop-blur-md rounded-full border border-white/10 flex flex-wrap justify-center gap-1">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat as ToolCategory | 'Todas')}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                            activeCategory === cat 
                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                            : 'bg-transparent text-gray-400 border-transparent hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map(tool => (
                <div key={tool.id} className="group bg-[#0F0518] border border-white/10 rounded-3xl p-6 hover:border-primary/50 transition-all hover:translate-y-[-4px] flex flex-col h-full relative overflow-hidden shadow-lg hover:shadow-primary/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="h-14 w-14 rounded-2xl bg-[#1A1025] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                            <span className={`material-icons-outlined text-3xl ${tool.isNativeIntegration ? 'text-secondary' : 'text-white'}`}>{tool.icon}</span>
                        </div>
                        {tool.isNativeIntegration && (
                            <span className="px-2 py-1 rounded bg-secondary/10 border border-secondary/20 text-[10px] font-bold text-secondary uppercase tracking-wider shadow-[0_0_10px_rgba(0,255,255,0.2)]">Nativo</span>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 relative z-10 group-hover:text-primary transition-colors">{tool.name}</h3>
                    <p className="text-sm text-gray-400 mb-6 line-clamp-3 flex-1 relative z-10 leading-relaxed">{tool.description}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                         <span className="text-xs font-mono text-gray-500 px-2 py-1 rounded bg-white/5 border border-white/5">{tool.category}</span>
                         <button 
                            onClick={() => handleOpenDeploy(tool)}
                            className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-lg shadow-white/10 group-hover:scale-110"
                            title="Adicionar ao Workspace"
                         >
                             <span className="material-icons-outlined text-xl">add</span>
                         </button>
                    </div>
                </div>
            ))}
        </div>

      </main>

      {/* DEPLOY MODAL */}
      {selectedToolForDeploy && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="w-full max-w-3xl bg-[#0F0518] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
                  
                  {/* Modal Header */}
                  <div className="p-6 border-b border-white/10 bg-[#0A0014] flex items-center justify-between">
                      <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
                              <span className="material-icons-outlined text-white text-2xl">{selectedToolForDeploy.icon}</span>
                          </div>
                          <div>
                              <h3 className="text-xl font-bold text-white">Adicionar {selectedToolForDeploy.name}</h3>
                              <p className="text-sm text-gray-400">Escolha onde deseja implantar esta ferramenta.</p>
                          </div>
                      </div>
                      <button onClick={() => setSelectedToolForDeploy(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                          <span className="material-icons-outlined text-gray-500">close</span>
                      </button>
                  </div>

                  {/* Modal Body - Two Columns */}
                  <div className="flex-1 flex overflow-hidden">
                      
                      {/* Column 1: Select Project */}
                      <div className="w-1/2 border-r border-white/10 flex flex-col bg-[#130b1f]">
                          <div className="p-4 bg-[#0e061a] border-b border-white/5">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">1. Selecione o Projeto</span>
                          </div>
                          <div className="flex-1 overflow-y-auto p-2 space-y-1">
                              {projects.map(p => (
                                  <button 
                                      key={p.id}
                                      onClick={() => {
                                          setSelectedProjectId(p.id);
                                          if (p.workspaces.length > 0) setSelectedWorkspaceId(p.workspaces[0].id);
                                          else setSelectedWorkspaceId('NEW');
                                      }}
                                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${selectedProjectId === p.id ? 'bg-primary/20 border border-primary/50 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
                                  >
                                      <span className="material-icons-outlined text-lg">{selectedProjectId === p.id ? 'folder_open' : 'folder'}</span>
                                      <span className="text-sm font-medium truncate">{p.name}</span>
                                  </button>
                              ))}
                              
                              {/* New Project Option */}
                              <button 
                                  onClick={() => {
                                      setSelectedProjectId('NEW');
                                      setSelectedWorkspaceId('NEW');
                                  }}
                                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all mt-2 border border-dashed ${selectedProjectId === 'NEW' ? 'bg-secondary/10 border-secondary/50 text-secondary' : 'border-white/10 text-gray-500 hover:bg-white/5 hover:text-white'}`}
                              >
                                  <span className="material-icons-outlined text-lg">create_new_folder</span>
                                  <span className="text-sm font-medium">Novo Projeto...</span>
                              </button>
                          </div>
                          
                          {/* New Project Input (shown if selected) */}
                          {selectedProjectId === 'NEW' && (
                              <div className="p-4 border-t border-white/10 bg-[#0A0014] animate-in slide-in-from-bottom-4">
                                  <label className="block text-xs text-gray-500 mb-1">Nome do Projeto</label>
                                  <input 
                                      autoFocus
                                      type="text" 
                                      value={newProjectName}
                                      onChange={(e) => setNewProjectName(e.target.value)}
                                      placeholder="Ex: Marketing Q3"
                                      className="w-full bg-[#1A1025] border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:border-primary outline-none"
                                  />
                              </div>
                          )}
                      </div>

                      {/* Column 2: Select Workspace */}
                      <div className="w-1/2 flex flex-col bg-[#0F0518]">
                           <div className="p-4 bg-[#0e061a] border-b border-white/5">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">2. Selecione o Workspace</span>
                          </div>
                          <div className="flex-1 overflow-y-auto p-2 space-y-1">
                              {selectedProjectId !== 'NEW' && selectedProject ? (
                                  <>
                                    {selectedProject.workspaces.map(w => (
                                        <button 
                                            key={w.id}
                                            onClick={() => setSelectedWorkspaceId(w.id)}
                                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${selectedWorkspaceId === w.id ? 'bg-primary/20 border border-primary/50 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
                                        >
                                            <span className="material-icons-outlined text-lg">{selectedWorkspaceId === w.id ? 'view_quilt' : 'grid_view'}</span>
                                            <div className="overflow-hidden">
                                                <span className="block text-sm font-medium truncate">{w.name}</span>
                                                <span className="block text-[10px] text-gray-500 truncate">{w.widgets.length} IAs ativas</span>
                                            </div>
                                        </button>
                                    ))}
                                  </>
                              ) : (
                                  <div className="p-4 text-center text-gray-600 text-sm italic">
                                      Criando novo projeto gera um workspace padrão.
                                  </div>
                              )}

                              {/* New Workspace Option */}
                              <button 
                                  onClick={() => setSelectedWorkspaceId('NEW')}
                                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all mt-2 border border-dashed ${selectedWorkspaceId === 'NEW' ? 'bg-secondary/10 border-secondary/50 text-secondary' : 'border-white/10 text-gray-500 hover:bg-white/5 hover:text-white'}`}
                              >
                                  <span className="material-icons-outlined text-lg">add_to_queue</span>
                                  <span className="text-sm font-medium">Novo Workspace...</span>
                              </button>
                          </div>

                           {/* New Workspace Input (shown if selected) */}
                           {selectedWorkspaceId === 'NEW' && (
                              <div className="p-4 border-t border-white/10 bg-[#0A0014] animate-in slide-in-from-bottom-4">
                                  <label className="block text-xs text-gray-500 mb-1">Nome do Workspace</label>
                                  <input 
                                      type="text" 
                                      value={newWorkspaceName}
                                      onChange={(e) => setNewWorkspaceName(e.target.value)}
                                      placeholder="Ex: Rascunhos"
                                      className="w-full bg-[#1A1025] border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:border-secondary outline-none"
                                  />
                              </div>
                          )}
                      </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="p-4 border-t border-white/10 bg-[#0A0014] flex justify-end gap-3">
                      <button 
                        onClick={() => setSelectedToolForDeploy(null)}
                        className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
                      >
                          Cancelar
                      </button>
                      <button 
                        onClick={handleConfirmDeploy}
                        disabled={
                            (selectedProjectId === 'NEW' && !newProjectName) || 
                            (selectedWorkspaceId === 'NEW' && !newWorkspaceName && selectedProjectId !== 'NEW')
                        }
                        className="px-6 py-2 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                      >
                          <span className="material-icons-outlined text-sm">rocket_launch</span>
                          <span>Adicionar Ferramenta</span>
                      </button>
                  </div>

              </div>
          </div>
      )}
    </div>
  );
};

export default CatalogPage;


import React, { useState } from 'react';
import { AppState, SideDockState, ToolCategory, AITool } from '../types';
import { AI_TOOLS } from '../constants';

interface SideDockProps {
  appState: AppState;
  onUpdateDock: (newState: Partial<SideDockState>) => void;
  onSelectWorkspace: (projectId: string, workspaceId: string) => void;
  onNavigate: (view: AppState['currentView']) => void;
  onOpenFullCatalog: () => void; // Prop to open the big modal
}

const SideDock: React.FC<SideDockProps> = ({ appState, onUpdateDock, onSelectWorkspace, onNavigate, onOpenFullCatalog }) => {
  const { sideDock, projects, currentProjectId, currentWorkspaceId } = appState;
  const [expandedProjects, setExpandedProjects] = useState<string[]>(projects.map(p => p.id)); 
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogFilter, setCatalogFilter] = useState<ToolCategory | 'All'>('All');

  const toggleProject = (pId: string) => {
    setExpandedProjects(prev => 
      prev.includes(pId) ? prev.filter(id => id !== pId) : [...prev, pId]
    );
  };

  const handleDragStart = (e: React.DragEvent, tool: AITool) => {
    e.dataTransfer.setData('application/x-databot-tool', tool.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const filteredTools = AI_TOOLS.filter(t => 
    t.name.toLowerCase().includes(catalogSearch.toLowerCase()) &&
    (catalogFilter === 'All' || t.category === catalogFilter)
  );

  const dockClass = `
    fixed top-0 bottom-0 z-50 bg-[#0F0518] border-white/10 shadow-2xl flex flex-row transition-all duration-300
    ${sideDock.position === 'left' ? 'left-0 border-r' : 'right-0 border-l'}
    ${sideDock.isOpen ? 'w-[320px]' : 'w-[50px]'}
  `;

  return (
    <div className={dockClass}>
      
      {/* 1. Activity Bar */}
      <div className="w-[50px] flex flex-col items-center py-4 gap-4 bg-[#0A0014] border-r border-white/5 shrink-0 z-20">
        
        {/* Home Button (Go to Dashboard) */}
        <div className="mb-2">
            <button 
                onClick={() => onNavigate('dashboard')}
                className="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-primary/20"
                title="Voltar para Dashboard"
            >
                <span className="material-icons-outlined text-white text-sm">home</span>
            </button>
        </div>

        {/* Menu Toggle */}
        <button 
            onClick={() => onUpdateDock({ isOpen: !sideDock.isOpen })}
            className="h-8 w-8 rounded hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors mb-2"
        >
            <span className="material-icons-outlined text-lg">{sideDock.isOpen ? 'menu_open' : 'menu'}</span>
        </button>

        <div className="w-6 h-[1px] bg-white/10 my-1"></div>

        {/* Tabs */}
        <DockTab 
            icon="folder_open" 
            isActive={sideDock.activeTab === 'explorer'} 
            onClick={() => onUpdateDock({ activeTab: 'explorer', isOpen: true })} 
            tooltip="Explorador"
        />
        <DockTab 
            icon="grid_view" 
            isActive={sideDock.activeTab === 'catalog'} 
            onClick={() => onUpdateDock({ activeTab: 'catalog', isOpen: true })} 
            tooltip="Catálogo"
        />
        
        <div className="flex-1"></div>

        <DockTab 
            icon="settings" 
            isActive={sideDock.activeTab === 'settings'} 
            onClick={() => onNavigate('settings')} 
            tooltip="Configurações"
        />
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mb-2 cursor-pointer border border-transparent hover:border-white/20" onClick={() => onNavigate('settings')}>
            <img src={appState.user.avatar} className="h-6 w-6 rounded-full" />
        </div>
      </div>

      {/* 2. Panel Content */}
      <div className={`flex-1 flex flex-col overflow-hidden bg-[#130b1f] transition-opacity duration-200 ${sideDock.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* EXPLORER */}
        {sideDock.activeTab === 'explorer' && (
            <>
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0e061a]">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Projetos</h3>
                    <button 
                        onClick={() => onNavigate('dashboard')} 
                        className="text-gray-500 hover:text-white material-icons-outlined text-sm"
                        title="Gerenciar Projetos"
                    >
                        edit_square
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {projects.map(project => (
                        <div key={project.id} className="mb-2">
                            <div 
                                className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-white/5 ${currentProjectId === project.id ? 'text-white' : 'text-gray-400'}`}
                                onClick={() => toggleProject(project.id)}
                            >
                                <span className="material-icons-outlined text-xs transition-transform duration-200" style={{ transform: expandedProjects.includes(project.id) ? 'rotate(90deg)' : 'rotate(0deg)' }}>chevron_right</span>
                                <span className="font-bold text-sm truncate">{project.name}</span>
                            </div>
                            
                            {expandedProjects.includes(project.id) && (
                                <div className="ml-4 pl-2 border-l border-white/10 mt-1 space-y-0.5">
                                    {project.workspaces.map(ws => (
                                        <div 
                                            key={ws.id}
                                            onClick={() => onSelectWorkspace(project.id, ws.id)}
                                            className={`
                                                group flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer text-sm transition-colors
                                                ${currentWorkspaceId === ws.id && currentProjectId === project.id 
                                                    ? 'bg-primary/20 text-white font-medium' 
                                                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}
                                            `}
                                        >
                                            <span className="text-xs truncate flex-1">{ws.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </>
        )}

        {/* CATALOG */}
        {sideDock.activeTab === 'catalog' && (
             <>
                <div className="p-4 border-b border-white/5 bg-[#0e061a]">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ferramentas</h3>
                        <button 
                            onClick={onOpenFullCatalog}
                            className="text-[10px] text-primary hover:text-white flex items-center gap-1 bg-primary/10 px-2 py-1 rounded border border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                            <span className="material-icons-outlined text-[10px]">open_in_full</span>
                            Expandir
                        </button>
                    </div>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Buscar..." 
                            value={catalogSearch}
                            onChange={(e) => setCatalogSearch(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 pl-8 text-xs text-white focus:border-primary outline-none"
                        />
                        <span className="material-icons-outlined absolute left-2 top-1.5 text-gray-500 text-sm">search</span>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-2">
                    <div className="grid grid-cols-1 gap-2">
                        {filteredTools.map(tool => (
                            <div 
                                key={tool.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, tool)}
                                className="flex items-center gap-3 p-2 rounded-lg bg-[#1A1025] border border-white/5 hover:border-primary/50 cursor-grab active:cursor-grabbing group transition-all"
                            >
                                <div className="h-7 w-7 rounded bg-surface flex items-center justify-center text-gray-300 group-hover:text-white shrink-0">
                                    <span className="material-icons-outlined text-sm">{tool.icon}</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-gray-200 group-hover:text-white truncate">{tool.name}</p>
                                    <p className="text-[9px] text-gray-500 truncate">{tool.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             </>
        )}

        <div className="p-3 border-t border-white/5 bg-[#0A0014] flex items-center justify-between">
             <span className="text-[10px] text-gray-600 font-mono">v1.0.2</span>
             <div className="flex gap-1">
                <button onClick={() => onUpdateDock({ position: 'left' })} className={`p-1 rounded ${sideDock.position === 'left' ? 'text-white' : 'text-gray-600'}`}><span className="material-icons-outlined text-xs">dock_left</span></button>
                <button onClick={() => onUpdateDock({ position: 'right' })} className={`p-1 rounded ${sideDock.position === 'right' ? 'text-white' : 'text-gray-600'}`}><span className="material-icons-outlined text-xs">dock_right</span></button>
             </div>
        </div>

      </div>
    </div>
  );
};

const DockTab: React.FC<{ icon: string; isActive: boolean; onClick: () => void; tooltip: string }> = ({ icon, isActive, onClick, tooltip }) => (
    <button 
        onClick={onClick}
        title={tooltip}
        className={`
            relative w-full h-10 flex items-center justify-center transition-colors group
            ${isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-300'}
        `}
    >
        <span className="material-icons-outlined text-xl">{icon}</span>
        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full"></div>}
        
        {/* Tooltip */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black border border-white/10 text-xs text-white rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
            {tooltip}
        </div>
    </button>
);

export default SideDock;

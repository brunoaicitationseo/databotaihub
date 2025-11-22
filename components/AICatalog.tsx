
import React, { useState } from 'react';
import { AI_TOOLS } from '../constants';
import { AITool, ToolCategory } from '../types';

interface AICatalogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTool: (toolId: string, createNewWorkspace?: boolean) => void;
}

const AICatalog: React.FC<AICatalogProps> = ({ isOpen, onClose, onAddTool }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'Todas'>('Todas');
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null); // For confirmation modal

  const categories = ['Todas', ...Object.values(ToolCategory)];

  const filteredTools = AI_TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todas' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToolClick = (tool: AITool) => {
      setSelectedTool(tool);
  };

  const confirmAdd = (createNew: boolean) => {
      if (selectedTool) {
          onAddTool(selectedTool.id, createNew);
          setSelectedTool(null);
          onClose();
      }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-8">
        {/* Backdrop */}
        <div 
            className="absolute inset-0 bg-bg-dark/90 backdrop-blur-md transition-opacity"
            onClick={onClose}
        />

        {/* Main Catalog Modal */}
        <div className="relative w-full h-full sm:h-[85vh] sm:max-w-6xl bg-[#0F0518] sm:rounded-3xl border-0 sm:border border-white/10 shadow-[0_0_50px_rgba(160,32,240,0.2)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
            
            {/* Decorative Elements */}
            <div className="hidden sm:block absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>

            {/* Header */}
            <div className="p-6 sm:p-8 pb-0 shrink-0 z-10 bg-[#0F0518]">
                <div className="flex justify-between items-start mb-6 sm:mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            Catálogo de <span className="bg-clip-text text-transparent bg-neon-gradient neon-text-glow">IA</span>
                        </h2>
                        <p className="text-sm sm:text-base text-gray-400 hidden sm:block">Navegue e instale módulos de inteligência no seu desktop.</p>
                    </div>
                    <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/5">
                        <span className="material-icons-outlined text-sm">close</span>
                        <span className="hidden sm:inline">Fechar</span>
                    </button>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col gap-4 sm:gap-6">
                    <div className="relative w-full max-w-2xl mx-auto">
                        <div className="relative flex items-center bg-[#150a25] border border-white/10 rounded-xl overflow-hidden focus-within:border-primary/50 transition-colors">
                            <span className="material-icons-outlined text-gray-400 pl-4 text-xl">search</span>
                            <input 
                                type="text" 
                                placeholder="Ex: Geração de Código, Edição de Vídeo..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent border-none py-3 sm:py-4 pl-3 pr-4 text-white placeholder-gray-500 focus:ring-0 text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    <div className="flex justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat as ToolCategory | 'Todas')}
                                className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 border ${
                                    activeCategory === cat 
                                    ? 'bg-primary text-white border-primary' 
                                    : 'bg-black/40 text-gray-400 border-white/10 hover:border-white/30'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid Results */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 pt-0 z-10 pb-20 sm:pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                    {filteredTools.map(tool => (
                        <div key={tool.id} className="group relative bg-[#130b1f] rounded-2xl border border-white/5 p-4 sm:p-5 hover:border-primary/40 transition-all flex flex-col h-full active:scale-[0.98]">
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className="h-12 w-12 rounded-xl bg-surface flex items-center justify-center border border-white/10 shadow-inner">
                                    <span className={`material-icons-outlined text-2xl ${tool.isNativeIntegration ? 'text-secondary' : 'text-white'}`}>{tool.icon}</span>
                                </div>
                                <span className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/10 uppercase">{tool.category}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1 relative z-10">{tool.name}</h3>
                            <p className="text-sm text-gray-400 mb-6 line-clamp-2 flex-1 relative z-10">{tool.description}</p>
                            <button 
                                onClick={() => handleToolClick(tool)}
                                className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                            >
                                <span className="material-icons-outlined text-sm">add_to_queue</span>
                                Adicionar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* CONFIRMATION DIALOG (Step 2) */}
        {selectedTool && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="w-full max-w-md bg-[#1A1025] border border-white/10 rounded-2xl p-6 shadow-2xl transform scale-100">
                    <h3 className="text-xl font-bold text-white mb-2">Adicionar {selectedTool.name}</h3>
                    <p className="text-gray-400 mb-6">Como você deseja utilizar esta ferramenta?</p>
                    
                    <div className="space-y-3">
                        <button 
                            onClick={() => confirmAdd(false)}
                            className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/50 transition-all group text-left"
                        >
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary">
                                <span className="material-icons-outlined text-primary group-hover:text-white">dashboard</span>
                            </div>
                            <div>
                                <span className="block text-white font-medium">Workspace Atual</span>
                                <span className="text-xs text-gray-400">Adicionar ao lado dos widgets existentes.</span>
                            </div>
                        </button>

                        <button 
                            onClick={() => confirmAdd(true)}
                            className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-secondary/50 transition-all group text-left"
                        >
                            <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary">
                                <span className="material-icons-outlined text-secondary group-hover:text-black">add_to_photos</span>
                            </div>
                            <div>
                                <span className="block text-white font-medium">Novo Workspace</span>
                                <span className="text-xs text-gray-400">Limpar a tela e focar nesta ferramenta.</span>
                            </div>
                        </button>
                    </div>
                    
                    <button 
                        onClick={() => setSelectedTool(null)}
                        className="mt-6 w-full text-center text-gray-500 hover:text-white text-sm"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};

export default AICatalog;

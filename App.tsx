
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import WidgetCard from './components/WidgetCard';
import AICatalog from './components/AICatalog';
import CatalogPage from './components/CatalogPage'; // Import new page
import PricingPage from './components/PricingPage';
import SettingsPage from './components/SettingsPage';
import AboutPage from './components/AboutPage';
import SideDock from './components/SideDock';
import DashboardPage from './components/DashboardPage';
import OnboardingWizard from './components/OnboardingWizard';
import { AppState, WorkspaceWidget, ChatMessage, Project, Workspace, SideDockState } from './types';
import { AI_TOOLS, INITIAL_PROJECTS } from './constants';
import { generateGeminiResponse } from './services/geminiService';

const App: React.FC = () => {
  // --- INITIAL STATE ---
  const [state, setState] = useState<AppState>({
    currentView: 'landing', // Start at Landing Page
    isCatalogOpen: false,
    projects: INITIAL_PROJECTS,
    currentProjectId: INITIAL_PROJECTS[0].id,
    currentWorkspaceId: INITIAL_PROJECTS[0].workspaces[0].id,
    sideDock: {
        isOpen: true,
        position: 'left',
        activeTab: 'explorer',
        width: 280
    },
    user: {
        name: 'Usuário Demo',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    }
  });

  const [globalInput, setGlobalInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // --- DERIVED STATE HELPERS ---
  const currentProject = state.projects.find(p => p.id === state.currentProjectId);
  const currentWorkspace = currentProject?.workspaces.find(w => w.id === state.currentWorkspaceId);
  const activeWidgets = currentWorkspace?.widgets || [];

  // --- EFFECTS ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- STATE UPDATERS ---
  
  const updateCurrentWorkspace = (updater: (ws: Workspace) => Workspace) => {
      setState(prev => ({
          ...prev,
          projects: prev.projects.map(p => 
              p.id === prev.currentProjectId 
              ? {
                  ...p,
                  workspaces: p.workspaces.map(w => 
                      w.id === prev.currentWorkspaceId ? updater(w) : w
                  )
              }
              : p
          )
      }));
  };

  const createProject = (name: string, objective: string) => {
      const newWorkspaceId = `ws-${Date.now()}`;
      const newProjectId = `proj-${Date.now()}`;
      
      const newProject: Project = {
          id: newProjectId,
          name: name,
          workspaces: [{
              id: newWorkspaceId,
              name: 'Main Workspace',
              objective: objective,
              widgets: []
          }]
      };

      setState(s => ({
          ...s,
          projects: [newProject, ...s.projects], // Add to top
          currentProjectId: newProjectId,
          currentWorkspaceId: newWorkspaceId,
          currentView: 'workspace' // Go to hub
      }));
  };

  const addWidgetToWorkspace = (toolId: string, index?: number) => {
    const newWidget: WorkspaceWidget = {
      instanceId: `w-${Date.now()}`,
      toolId,
      messages: [],
      isProcessing: false,
      contextTask: 'Nova Tarefa'
    };

    updateCurrentWorkspace(ws => {
        const newWidgets = [...ws.widgets];
        if (index !== undefined) {
            newWidgets.splice(index, 0, newWidget);
        } else {
            newWidgets.push(newWidget);
        }
        return { ...ws, widgets: newWidgets };
    });
  };

  // --- NEW: SOPHISTICATED DEPLOY TOOL HANDLER ---
  const handleDeployTool = (
      toolId: string, 
      target: { 
          projectId: string | 'NEW', 
          workspaceId: string | 'NEW', 
          newProjectName?: string, 
          newWorkspaceName?: string 
      }
  ) => {
      const { projectId, workspaceId, newProjectName, newWorkspaceName } = target;
      
      // Scenario 1: Create Everything New
      if (projectId === 'NEW') {
          const pName = newProjectName || 'Novo Projeto';
          const wName = newWorkspaceName || 'Workspace Inicial';
          
          const newWorkspaceId = `ws-${Date.now()}`;
          const newProjectId = `proj-${Date.now()}`;

          const newWidget: WorkspaceWidget = {
            instanceId: `w-${Date.now()}`,
            toolId,
            messages: [],
            isProcessing: false,
            contextTask: 'Início'
          };

          const newProject: Project = {
            id: newProjectId,
            name: pName,
            workspaces: [{
                id: newWorkspaceId,
                name: wName,
                objective: 'Novo Workspace',
                widgets: [newWidget]
            }]
          };

          setState(s => ({
            ...s,
            projects: [newProject, ...s.projects],
            currentProjectId: newProjectId,
            currentWorkspaceId: newWorkspaceId,
            currentView: 'workspace'
          }));
          return;
      }

      // Scenario 2: Existing Project, New Workspace
      if (projectId !== 'NEW' && workspaceId === 'NEW') {
          const wName = newWorkspaceName || 'Novo Workspace';
          const newWorkspaceId = `ws-${Date.now()}`;

          const newWidget: WorkspaceWidget = {
            instanceId: `w-${Date.now()}`,
            toolId,
            messages: [],
            isProcessing: false,
            contextTask: 'Início'
          };

          const newWorkspace: Workspace = {
              id: newWorkspaceId,
              name: wName,
              objective: 'Novo Workspace',
              widgets: [newWidget]
          };

          setState(s => ({
              ...s,
              projects: s.projects.map(p => p.id === projectId ? { ...p, workspaces: [...p.workspaces, newWorkspace] } : p),
              currentProjectId: projectId,
              currentWorkspaceId: newWorkspaceId,
              currentView: 'workspace'
          }));
          return;
      }

      // Scenario 3: Existing Project, Existing Workspace
      if (projectId !== 'NEW' && workspaceId !== 'NEW') {
          const newWidget: WorkspaceWidget = {
            instanceId: `w-${Date.now()}`,
            toolId,
            messages: [],
            isProcessing: false,
            contextTask: 'Nova Ferramenta'
          };

          setState(s => ({
              ...s,
              projects: s.projects.map(p => 
                  p.id === projectId 
                  ? {
                      ...p,
                      workspaces: p.workspaces.map(w => 
                          w.id === workspaceId 
                          ? { ...w, widgets: [...w.widgets, newWidget] }
                          : w
                      )
                  }
                  : p
              ),
              currentProjectId: projectId,
              currentWorkspaceId: workspaceId,
              currentView: 'workspace'
          }));
      }
  };

  const removeWidget = (instanceId: string) => {
      updateCurrentWorkspace(ws => ({
          ...ws,
          widgets: ws.widgets.filter(w => w.instanceId !== instanceId)
      }));
  };

  const updateTask = (instanceId: string, task: string) => {
    updateCurrentWorkspace(ws => ({
        ...ws,
        widgets: ws.widgets.map(w => w.instanceId === instanceId ? { ...w, contextTask: task } : w)
    }));
  };

  const addMessageToWidget = (instanceId: string, message: ChatMessage) => {
    updateCurrentWorkspace(ws => ({
        ...ws,
        widgets: ws.widgets.map(w => w.instanceId === instanceId ? { ...w, messages: [...w.messages, message] } : w)
    }));
  };

  // --- HANDLERS ---

  const handleDragOverMain = (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy'; 
  };

  const handleDropMain = (e: React.DragEvent) => {
      e.preventDefault();
      const newToolId = e.dataTransfer.getData('application/x-databot-tool');
      if (newToolId) {
          addWidgetToWorkspace(newToolId);
          return;
      }
  };

  const handleInternalWidgetDrop = (dragIndex: number, dropIndex: number) => {
      if (dragIndex === dropIndex) return;
      updateCurrentWorkspace(ws => {
          const newWidgets = [...ws.widgets];
          const [moved] = newWidgets.splice(dragIndex, 1);
          newWidgets.splice(dropIndex, 0, moved);
          return { ...ws, widgets: newWidgets };
      });
  };

  const handleGlobalSend = async () => {
    if (!globalInput.trim() || isSending || activeWidgets.length === 0) return;
    setIsSending(true);
    const userText = globalInput;
    setGlobalInput('');
    const timestamp = Date.now();
    const userMsg: ChatMessage = { id: timestamp.toString(), role: 'user', text: userText, timestamp };

    // Add to UI
    updateCurrentWorkspace(ws => ({
        ...ws,
        widgets: ws.widgets.map(w => ({
            ...w,
            messages: [...w.messages, { ...userMsg, id: `${timestamp}-${w.instanceId}` }],
            isProcessing: true
        }))
    }));

    // Fetch Responses
    const widgetPromises = activeWidgets.map(async (widget) => {
        const tool = AI_TOOLS.find(t => t.id === widget.toolId);
        let responseText = "";
        
        if (tool?.isNativeIntegration && tool.name === 'Gemini') {
             const prompt = `Objetivo: ${currentWorkspace?.objective || 'Geral'}. Tarefa: ${widget.contextTask}. Msg: ${userText}`;
             responseText = await generateGeminiResponse(prompt);
        } else {
             await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));
             responseText = `[${tool?.name}] Resposta simulada...`;
        }

        const botMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'model',
            text: responseText,
            timestamp: Date.now()
        };
        
        setState(prev => {
             const projIndex = prev.projects.findIndex(p => p.id === prev.currentProjectId);
             if (projIndex === -1) return prev;
             const wsIndex = prev.projects[projIndex].workspaces.findIndex(w => w.id === prev.currentWorkspaceId);
             if (wsIndex === -1) return prev;
             
             const newProjects = [...prev.projects];
             const newWidgets = [...newProjects[projIndex].workspaces[wsIndex].widgets];
             const wIndex = newWidgets.findIndex(w => w.instanceId === widget.instanceId);
             
             if (wIndex >= 0) {
                 newWidgets[wIndex] = {
                     ...newWidgets[wIndex],
                     isProcessing: false,
                     messages: [...newWidgets[wIndex].messages, botMsg]
                 };
                 newProjects[projIndex].workspaces[wsIndex].widgets = newWidgets;
             }
             return { ...prev, projects: newProjects };
        });
    });

    await Promise.all(widgetPromises);
    setIsSending(false);
  };

  // --- RENDER HELPERS ---

  const renderView = () => {
      switch (state.currentView) {
        case 'landing':
            return <LandingPage 
                onEnterHub={() => setState(s => ({ ...s, currentView: 'dashboard' }))} 
                onNavigate={v => setState(s => ({ ...s, currentView: v }))}
                onOpenCatalog={() => setState(s => ({ ...s, currentView: 'catalog' }))} 
            />;
        
        case 'dashboard':
            return <DashboardPage 
                projects={state.projects}
                user={state.user}
                onSelectProject={(pid) => setState(s => ({ ...s, currentProjectId: pid, currentWorkspaceId: s.projects.find(p => p.id === pid)?.workspaces[0].id || '', currentView: 'workspace' }))}
                onNewProject={() => setState(s => ({ ...s, currentView: 'onboarding' }))}
                onOpenCatalog={() => setState(s => ({ ...s, currentView: 'catalog' }))} 
                onNavigate={(v) => setState(s => ({ ...s, currentView: v }))}
            />;

        case 'catalog': 
            return <CatalogPage 
                projects={state.projects} // Pass projects!
                onBack={() => setState(s => ({ ...s, currentView: 'dashboard' }))}
                onAddTool={(toolId, target) => handleDeployTool(toolId, target)}
            />;

        case 'onboarding':
            return <OnboardingWizard 
                onComplete={createProject}
                onCancel={() => setState(s => ({ ...s, currentView: 'dashboard' }))}
            />;

        case 'pricing':
            return <PricingPage onBack={() => setState(s => ({...s, currentView: 'landing'}))} onSelectPlan={() => {}} />;
        
        case 'settings':
            return <SettingsPage onBack={() => setState(s => ({...s, currentView: 'workspace'}))} />;
        
        case 'about':
            return <AboutPage onBack={() => setState(s => ({...s, currentView: 'landing'}))} />;
        
        case 'workspace':
        default:
            return null; 
      }
  };

  const currentRender = renderView();
  if (currentRender) {
      return (
        <>
            {currentRender}
            {/* Kept AICatalog as a modal for legacy/quick access */}
            <AICatalog 
                isOpen={state.isCatalogOpen} 
                onClose={() => setState(s => ({ ...s, isCatalogOpen: false }))}
                onAddTool={(toolId, createNew) => {
                     if (createNew) {
                         createProject("Novo Workspace", "Exploração");
                         setTimeout(() => addWidgetToWorkspace(toolId), 100);
                     } else {
                         addWidgetToWorkspace(toolId);
                     }
                     setState(s => ({ ...s, isCatalogOpen: false }));
                }}
            />
        </>
      );
  }

  // --- MAIN WORKSPACE LAYOUT ---

  const dockWidth = state.sideDock.isOpen ? state.sideDock.width : 50;
  const mainStyle = {
      marginLeft: state.sideDock.position === 'left' ? dockWidth : 0,
      marginRight: state.sideDock.position === 'right' ? dockWidth : 0,
      transition: 'margin 300ms ease-in-out'
  };

  return (
    <div className="h-[100dvh] w-full bg-[#050505] overflow-hidden text-white font-display relative">
      
      <AICatalog 
        isOpen={state.isCatalogOpen} 
        onClose={() => setState(s => ({ ...s, isCatalogOpen: false }))}
        onAddTool={(toolId, createNew) => {
             if (createNew) {
                 createProject("Novo Workspace", "Explorando ferramenta");
                 setTimeout(() => addWidgetToWorkspace(toolId), 100);
             } else {
                 addWidgetToWorkspace(toolId);
             }
             setState(s => ({ ...s, isCatalogOpen: false }));
        }}
      />

      {/* --- SIDE DOCK --- */}
      <SideDock 
        appState={state}
        onUpdateDock={(update) => setState(s => ({ ...s, sideDock: { ...s.sideDock, ...update } }))}
        onSelectWorkspace={(pId, wId) => setState(s => ({ ...s, currentProjectId: pId, currentWorkspaceId: wId }))}
        onNavigate={v => setState(s => ({ ...s, currentView: v }))}
        onOpenFullCatalog={() => setState(s => ({ ...s, currentView: 'catalog' }))} 
      />

      {/* --- MAIN AREA --- */}
      <div style={mainStyle} className="h-full flex flex-col relative z-10 bg-[#050505]">
        
        {/* Workspace Header */}
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#0A0014]">
            <div className="flex items-center gap-4">
                <div>
                    <h1 className="font-bold text-white">{currentProject?.name}</h1>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>Workspace</span>
                        <span className="material-icons-outlined text-[10px]">chevron_right</span>
                        <span className="text-secondary">{currentWorkspace?.name}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center bg-white/5 rounded-lg px-3 py-1.5 border border-white/5">
                    <span className="text-[10px] uppercase font-bold text-gray-500 mr-2">Objetivo</span>
                    <span className="text-sm text-gray-300 truncate max-w-[200px]">{currentWorkspace?.objective}</span>
                </div>
                <button 
                    onClick={() => setState(s => ({ ...s, currentView: 'catalog' }))} 
                    className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded text-sm font-medium flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                    <span className="material-icons-outlined text-sm">add</span>
                    <span className="hidden sm:inline">Adicionar IA</span>
                </button>
            </div>
        </header>

        {/* Drop Zone & Grid */}
        <main 
            className="flex-1 overflow-hidden relative p-4"
            onDragOver={handleDragOverMain}
            onDrop={handleDropMain}
        >
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="h-full overflow-y-auto no-scrollbar pb-20">
                {activeWidgets.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-600 border-2 border-dashed border-white/5 rounded-3xl m-4">
                        <span className="material-icons-outlined text-6xl mb-4 opacity-20">drag_indicator</span>
                        <p className="text-lg font-medium">Arraste ferramentas do menu lateral para começar</p>
                    </div>
                ) : (
                    <div className={`grid gap-4 h-full ${
                        activeWidgets.length === 1 ? 'grid-cols-1 max-w-6xl mx-auto' :
                        activeWidgets.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                        'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                    }`}>
                        {activeWidgets.map((widget, index) => (
                            <WidgetCard 
                                key={widget.instanceId}
                                index={index}
                                widget={widget}
                                isMobile={isMobile}
                                onClose={removeWidget}
                                onUpdateTask={updateTask}
                                onAddMessage={addMessageToWidget}
                                onDragStart={(e) => {
                                    if (!isMobile) e.dataTransfer.setData('text/plain', index.toString());
                                }}
                                onDragOver={(e) => { if(!isMobile) e.preventDefault(); }}
                                onDrop={(e) => {
                                    if (!isMobile) {
                                        e.preventDefault();
                                        const dragIdx = parseInt(e.dataTransfer.getData('text/plain'));
                                        if (!isNaN(dragIdx)) handleInternalWidgetDrop(dragIdx, index);
                                    }
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>

        {/* Chat Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl z-30">
            <div className="bg-[#0F0518]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center shadow-2xl shadow-black/50 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-2xl opacity-0 group-hover:opacity-30 transition duration-500 pointer-events-none blur"></div>
                <span className="material-icons-outlined text-secondary ml-3">auto_awesome</span>
                <input 
                    value={globalInput}
                    onChange={e => setGlobalInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleGlobalSend()}
                    placeholder={`Enviar comando para ${activeWidgets.length} IAs ativas...`}
                    className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 py-3 px-4"
                />
                <button 
                    onClick={handleGlobalSend}
                    disabled={isSending}
                    className="h-10 w-10 bg-white/10 hover:bg-primary text-white rounded-xl flex items-center justify-center transition-all"
                >
                    <span className={`material-icons-outlined ${isSending ? 'animate-spin' : ''}`}>
                        {isSending ? 'refresh' : 'arrow_upward'}
                    </span>
                </button>
            </div>
        </div>

      </div>

    </div>
  );
};

export default App;

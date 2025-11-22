
export enum ToolCategory {
  TEXT = 'Texto',
  VIDEO = 'Vídeo',
  AUDIO = 'Áudio',
  IMAGE = 'Imagens',
  DEV = 'Dev',
  PRODUCTIVITY = 'Produtividade',
  AGENT = 'Agente',
  AUTOMATION = 'Automação'
}

export interface AITool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  url: string;
  icon: string;
  isNativeIntegration?: boolean; // If true, uses Gemini API or similar. If false, iframe/link.
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: number;
}

export interface WorkspaceWidget {
  instanceId: string;
  toolId: string;
  messages: ChatMessage[];
  isProcessing: boolean;
  contextTask?: string; // "Rascunho do post de blog..."
}

export interface Workspace {
  id: string;
  name: string;
  widgets: WorkspaceWidget[];
  objective?: string;
}

export interface Project {
  id: string;
  name: string;
  workspaces: Workspace[];
}

export interface SideDockState {
  isOpen: boolean;
  position: 'left' | 'right';
  activeTab: 'explorer' | 'catalog' | 'settings';
  width: number;
}

export interface AppState {
  currentView: 'landing' | 'dashboard' | 'onboarding' | 'workspace' | 'pricing' | 'settings' | 'about' | 'catalog';
  isCatalogOpen: boolean; // Global modal state
  projects: Project[];
  currentProjectId: string;
  currentWorkspaceId: string;
  sideDock: SideDockState;
  user: {
    name: string;
    avatar: string;
  };
}
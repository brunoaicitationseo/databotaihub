
import { AITool, ToolCategory, Project } from './types';

export const AI_TOOLS: AITool[] = [
  {
    id: 'IA-0004',
    name: 'Gemini',
    category: ToolCategory.TEXT,
    description: 'Modelo multimodal avançado do Google. Integra texto, código, e raciocínio complexo com grande janela de contexto.',
    url: 'https://gemini.google.com/',
    icon: 'smart_toy',
    isNativeIntegration: true
  },
  {
    id: 'IA-0001',
    name: 'ChatGPT',
    category: ToolCategory.TEXT,
    description: 'O assistente clássico da OpenAI. Excelente para criatividade, redação e tarefas gerais de conversação.',
    url: 'https://chat.openai.com/',
    icon: 'chat',
    isNativeIntegration: false
  },
  {
    id: 'IA-0003',
    name: 'Claude',
    category: ToolCategory.TEXT,
    description: 'Conhecido por sua escrita natural e capacidades de codificação seguras e explicativas.',
    url: 'https://claude.ai/',
    icon: 'description',
    isNativeIntegration: false
  },
  {
    id: 'IA-0002',
    name: 'Grok',
    category: ToolCategory.TEXT,
    description: 'Chatbot com acesso em tempo real a dados do X (Twitter) e uma personalidade espirituosa.',
    url: 'https://grok.com/',
    icon: 'rocket_launch',
    isNativeIntegration: false
  },
  {
    id: 'IA-0020',
    name: 'Cursor',
    category: ToolCategory.DEV,
    description: 'O editor de código do futuro. Um fork do VS Code com IA nativa para autocompletar e refatorar.',
    url: 'https://cursor.sh/',
    icon: 'code',
    isNativeIntegration: false
  },
  {
    id: 'IA-0009',
    name: 'Midjourney',
    category: ToolCategory.IMAGE,
    description: 'A referência em geração de imagens artísticas de alta fidelidade via prompt de texto.',
    url: 'https://midjourney.com/',
    icon: 'palette',
    isNativeIntegration: false
  },
  {
    id: 'IA-0090',
    name: 'Sora',
    category: ToolCategory.VIDEO,
    description: 'Criação de vídeos realistas a partir de texto (Simulação/Acesso Limitado).',
    url: 'https://openai.com/sora',
    icon: 'movie',
    isNativeIntegration: false
  },
  {
    id: 'IA-0014',
    name: 'ElevenLabs',
    category: ToolCategory.AUDIO,
    description: 'Síntese de voz ultra-realista e clonagem de voz para criadores de conteúdo.',
    url: 'https://elevenlabs.io/',
    icon: 'graphic_eq',
    isNativeIntegration: false
  },
  {
    id: 'IA-0036',
    name: 'Mem',
    category: ToolCategory.PRODUCTIVITY,
    description: 'Um espaço de trabalho auto-organizável. O "cérebro digital" que conecta suas notas.',
    url: 'https://mem.ai/',
    icon: 'memory',
    isNativeIntegration: false
  },
  {
    id: 'IA-0022',
    name: 'Vercel v0',
    category: ToolCategory.DEV,
    description: 'Gere interfaces de usuário (UI) React/Tailwind instantaneamente a partir de descrições.',
    url: 'https://v0.dev/',
    icon: 'web',
    isNativeIntegration: false
  },
  {
    id: 'IA-0043',
    name: 'Canva Magic',
    category: ToolCategory.IMAGE,
    description: 'Suite completa de design com ferramentas mágicas de IA para edição e criação.',
    url: 'https://www.canva.com/',
    icon: 'brush',
    isNativeIntegration: false
  }
];

export const INITIAL_PROJECTS: Project[] = [
    {
        id: 'proj-1',
        name: 'Campanha Marketing Q3',
        workspaces: [
            {
                id: 'ws-1',
                name: 'Ideação & Copy',
                objective: 'Criar textos persuasivos para redes sociais',
                widgets: [
                    { instanceId: 'w-1', toolId: 'IA-0001', messages: [], isProcessing: false, contextTask: 'Copy Instagram' }, // ChatGPT
                    { instanceId: 'w-2', toolId: 'IA-0003', messages: [], isProcessing: false, contextTask: 'Revisão de Tom' }  // Claude
                ]
            },
            {
                id: 'ws-2',
                name: 'Design Assets',
                objective: 'Gerar imagens para campanha',
                widgets: [
                    { instanceId: 'w-3', toolId: 'IA-0009', messages: [], isProcessing: false, contextTask: 'Backgrounds' } // Midjourney
                ]
            }
        ]
    },
    {
        id: 'proj-2',
        name: 'Desenvolvimento App',
        workspaces: [
            {
                id: 'ws-3',
                name: 'Frontend Code',
                objective: 'Refatorar componentes React',
                widgets: [
                    { instanceId: 'w-4', toolId: 'IA-0020', messages: [], isProcessing: false, contextTask: 'Refatoração' }, // Cursor
                    { instanceId: 'w-5', toolId: 'IA-0004', messages: [], isProcessing: false, contextTask: 'Docs' }   // Gemini
                ]
            }
        ]
    }
];

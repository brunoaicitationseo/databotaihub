
import React, { useState, useEffect, useRef } from 'react';
import { WorkspaceWidget, ChatMessage } from '../types';
import { AI_TOOLS } from '../constants';
import { generateGeminiResponse } from '../services/geminiService';

interface WidgetCardProps {
  widget: WorkspaceWidget;
  index: number;
  isMobile: boolean;
  onClose: (instanceId: string) => void;
  onUpdateTask: (instanceId: string, task: string) => void;
  onAddMessage: (instanceId: string, message: ChatMessage) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ 
    widget, 
    index, 
    isMobile,
    onClose, 
    onUpdateTask, 
    onAddMessage,
    onDragStart,
    onDragOver,
    onDrop
}) => {
  const tool = AI_TOOLS.find(t => t.id === widget.toolId);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [widget.messages]);

  useEffect(() => {
      setIsLoadingPage(true);
      const timer = setTimeout(() => setIsLoadingPage(false), 800);
      return () => clearTimeout(timer);
  }, []);

  if (!tool) return null;

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    onAddMessage(widget.instanceId, userMsg);
    setInput('');

    if (tool.isNativeIntegration && tool.name === 'Gemini') {
      const responseText = await generateGeminiResponse(userMsg.text);
      const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: Date.now() };
      onAddMessage(widget.instanceId, botMsg);
    } else {
      setTimeout(() => {
        const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: `[Simulação] Resposta de ${tool.name}...`, timestamp: Date.now() };
        onAddMessage(widget.instanceId, botMsg);
      }, 1000);
    }
  };

  return (
    <div 
        draggable={!isMobile}
        onDragStart={(e) => {
            if (isMobile) return;
            setIsDragging(true);
            onDragStart(e, index);
        }}
        onDragEnd={() => setIsDragging(false)}
        onDragOver={(e) => {
            if (isMobile) return;
            onDragOver(e, index);
        }}
        onDrop={(e) => {
            if (isMobile) return;
            setIsDragging(false);
            onDrop(e, index);
        }}
        className={`
            bg-[#120822] border border-white/10 rounded-xl flex flex-col overflow-hidden shadow-2xl transition-all duration-200
            ${isDragging ? 'opacity-50 scale-95 border-primary border-dashed' : ''}
            ${isMobile ? 'h-[450px] shrink-0' : 'h-full min-h-[400px]'}
        `}
    >
      {/* Browser Toolbar */}
      <div className="bg-[#0e061a] border-b border-white/10 pt-2 px-2">
          {/* Tabs Row */}
          <div className="flex items-end gap-1 px-1">
              <div className="flex items-center gap-2 bg-[#1E1430] px-4 py-2 rounded-t-lg border-t border-x border-white/10 relative -mb-px z-10">
                  <span className={`material-icons-outlined text-xs ${tool.isNativeIntegration ? 'text-secondary' : 'text-primary'}`}>{tool.icon}</span>
                  <span className="text-xs font-medium text-gray-200 max-w-[100px] truncate">{tool.name}</span>
                  <button onClick={() => onClose(widget.instanceId)} className="hover:bg-white/10 rounded p-0.5 ml-2">
                      <span className="material-icons-outlined text-[10px] text-gray-500 hover:text-white block">close</span>
                  </button>
                  {/* Active Tab Indicator */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-primary rounded-t-lg"></div>
              </div>
              
              {/* Fake Inactive Tab */}
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-t-lg border-t border-x border-transparent hover:bg-white/10 cursor-pointer opacity-60">
                 <span className="material-icons-outlined text-[10px] text-gray-500">add</span>
              </div>
          </div>
          
          {/* Address Bar Row */}
          <div className="bg-[#1E1430] p-2 flex items-center gap-3">
               <div className="flex gap-1">
                   <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                   <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                   <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
               </div>
               <div className="flex-1 bg-[#0A0014] rounded flex items-center px-3 py-1 border border-white/5">
                   <span className="material-icons-outlined text-[10px] text-green-500 mr-2">lock</span>
                   <span className="text-[10px] text-gray-500 font-mono flex-1 truncate">{tool.url}</span>
                   <span className={`material-icons-outlined text-[12px] text-gray-500 cursor-pointer hover:text-white ${isLoadingPage ? 'animate-spin' : ''}`}>refresh</span>
               </div>
          </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative bg-[#160e25] overflow-hidden">
          {isLoadingPage ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#160e25] z-20">
                  <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-xs text-gray-500">Conectando...</p>
              </div>
          ) : (
            <div className="absolute inset-0 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                    {widget.messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center opacity-20 select-none">
                            <span className="material-icons-outlined text-5xl mb-2">{tool.icon}</span>
                            <span className="text-sm font-bold uppercase tracking-widest">{tool.name} Ready</span>
                        </div>
                    )}
                    {widget.messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                                msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-[#251B35] text-gray-200 border border-white/10 rounded-tl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef}></div>
                </div>
                
                <div className="p-3 bg-[#1E1430] border-t border-white/5">
                    <input 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        placeholder="Enviar mensagem..."
                        className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-primary/50 outline-none"
                    />
                </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default WidgetCard;

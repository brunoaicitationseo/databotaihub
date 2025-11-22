
import React, { useState } from 'react';

interface OnboardingWizardProps {
  onComplete: (projectName: string, objective: string) => void;
  onCancel: () => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [objective, setObjective] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
      if (step === 1 && !projectName) return;
      if (step === 2) {
          // Finish
          setIsAnimating(true);
          setTimeout(() => {
              onComplete(projectName, objective);
          }, 1000);
          return;
      }
      setStep(s => s + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#05000A] flex items-center justify-center font-display">
        {/* Background Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full transition-all duration-1000 ${isAnimating ? 'scale-[2] opacity-100' : 'scale-100 opacity-50'}`}></div>
        </div>

        <div className={`relative z-10 w-full max-w-xl p-8 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            
            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-8">
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-primary' : 'bg-white/10'}`}></div>
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-primary' : 'bg-white/10'}`}></div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">
                {step === 1 ? 'Vamos começar um novo projeto.' : 'Qual o foco deste workspace?'}
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
                {step === 1 ? 'Dê um nome para organizar seus chats e ferramentas.' : 'Isso ajuda a configurar o contexto inicial para as IAs.'}
            </p>

            <div className="space-y-6">
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                        <label className="block text-sm font-bold text-white mb-2">Nome do Projeto</label>
                        <input 
                            autoFocus
                            type="text" 
                            value={projectName}
                            onChange={e => setProjectName(e.target.value)}
                            placeholder="Ex: App de Delivery, Estudo de IA, Marketing..."
                            className="w-full bg-[#1A1025] border border-white/20 rounded-xl px-6 py-4 text-xl text-white focus:border-primary outline-none transition-all placeholder-gray-600"
                            onKeyDown={e => e.key === 'Enter' && handleNext()}
                        />
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                         <label className="block text-sm font-bold text-white mb-2">Objetivo Principal (Opcional)</label>
                         <textarea 
                            autoFocus
                            value={objective}
                            onChange={e => setObjective(e.target.value)}
                            placeholder="Ex: Criar a estrutura de frontend usando React e Tailwind..."
                            className="w-full bg-[#1A1025] border border-white/20 rounded-xl px-6 py-4 text-lg text-white focus:border-primary outline-none transition-all placeholder-gray-600 h-32 resize-none"
                            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleNext()}
                        />
                        <div className="flex flex-wrap gap-2 mt-4">
                            {['Desenvolvimento', 'Copywriting', 'Design', 'Análise de Dados'].map(tag => (
                                <button key={tag} onClick={() => setObjective(tag)} className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-xs text-gray-300 border border-white/5 transition-colors">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between pt-4">
                    <button onClick={onCancel} className="text-gray-500 hover:text-white transition-colors">Cancelar</button>
                    <button 
                        onClick={handleNext}
                        className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2 shadow-lg shadow-white/10"
                    >
                        <span>{step === 1 ? 'Continuar' : 'Criar Workspace'}</span>
                        <span className="material-icons-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>

        </div>
    </div>
  );
};

export default OnboardingWizard;

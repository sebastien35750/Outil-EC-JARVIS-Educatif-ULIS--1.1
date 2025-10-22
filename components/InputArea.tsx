
import React, { useState, useRef } from 'react';
import { Paperclip, Mic, Send, X, FileText, Image as ImageIcon } from 'lucide-react';
import { CraftBuilder } from './CraftBuilder';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { parseFile } from '../utils/fileParser';
import type { AttachedFile, CraftState, Language } from '../types';
import { UI_STRINGS } from '../constants';

interface InputAreaProps {
    isProcessing: boolean;
    onSendMessage: (userInput: string, attachedFile: AttachedFile | null) => void;
    mode: 'craft' | 'chat';
    onModeChange: (mode: 'craft' | 'chat') => void;
    craftState: CraftState;
    onCraftStateChange: (state: CraftState) => void;
    language: Language;
}

export const InputArea: React.FC<InputAreaProps> = ({ isProcessing, onSendMessage, mode, onModeChange, craftState, onCraftStateChange, language }) => {
    const [userInput, setUserInput] = useState('');
    const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { isListening, transcript, startListening, stopListening } = useSpeechRecognition({
        lang: language === 'fr' ? 'fr-FR' : 'en-US', // Simplified for example
        onResult: (result) => setUserInput(result)
    });

    const handleSend = () => {
        onSendMessage(userInput, attachedFile);
        setUserInput('');
        setAttachedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const parsedFile = await parseFile(file);
                setAttachedFile(parsedFile);
            } catch (error) {
                console.error("File parsing error:", error);
                alert(`Failed to parse file. It may be an unsupported format or corrupted. Error: ${error}`);
            }
        }
    };

    const handleMicClick = () => {
        if(isListening) {
            stopListening();
        } else {
            startListening();
        }
    }

    return (
        <footer className="p-4 bg-white border-t border-slate-200 flex-shrink-0">
            {attachedFile && (
                <div className="flex items-center justify-between mb-2 bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm">
                    <div className="flex items-center truncate">
                        {attachedFile.dataType === 'image' ? <ImageIcon className="h-5 w-5 mr-2 flex-shrink-0 text-slate-500"/> : <FileText className="h-5 w-5 mr-2 flex-shrink-0 text-slate-500"/>}
                        <span className="truncate text-slate-700">{attachedFile.name}</span>
                    </div>
                    <button onClick={() => setAttachedFile(null)} className="ml-2 text-slate-500 hover:text-red-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.png,.jpg,.jpeg,.docx" onChange={handleFileChange} />

            <div className="flex justify-center items-center mb-3">
                <span className="text-sm font-medium text-slate-600 mr-3">{UI_STRINGS[language].craftMode}</span>
                <label htmlFor="mode-toggle" className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="mode-toggle" className="sr-only peer" checked={mode === 'chat'} onChange={() => onModeChange(mode === 'craft' ? 'chat' : 'craft')} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                </label>
                <span className="text-sm font-medium text-slate-600 ml-3">{UI_STRINGS[language].chatMode}</span>
            </div>
            
            {mode === 'craft' && (
                <CraftBuilder craftState={craftState} onCraftStateChange={onCraftStateChange} language={language} />
            )}

            <div className="flex items-center bg-slate-100 rounded-xl p-2 border border-slate-300 focus-within:ring-2 focus-within:ring-cyan-500">
                <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-500 hover:text-cyan-600 transition-colors rounded-full" title="Joindre un fichier">
                    <Paperclip className="h-5 w-5" />
                </button>
                <textarea
                    value={userInput || transcript}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    rows={1}
                    className="flex-1 bg-transparent text-slate-800 placeholder-slate-500 focus:outline-none px-4 resize-none"
                    placeholder={mode === 'craft' ? UI_STRINGS[language].inputPlaceholderCraft : UI_STRINGS[language].inputPlaceholderChat}
                    disabled={isProcessing}
                />
                <button onClick={handleMicClick} className={`p-2 text-slate-500 hover:text-cyan-600 transition-colors rounded-full ${isListening ? 'text-red-500' : ''}`} title="Saisie vocale">
                    <Mic className="h-5 w-5" />
                </button>
                <button onClick={handleSend} disabled={isProcessing || (!userInput && !attachedFile)} className="p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors ml-2 disabled:bg-cyan-400" title="Envoyer">
                    <Send className="h-5 w-5" />
                </button>
            </div>
            <div className="text-center text-xs text-slate-400 mt-2">
                2025 - Réalisé par Sébastien DONVAL et JARVIS - BSP&reg;
            </div>
        </footer>
    );
};

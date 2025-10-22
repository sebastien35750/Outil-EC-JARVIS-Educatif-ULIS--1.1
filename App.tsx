
import React, { useState, useCallback, useEffect } from 'react';
import { PanelLeft } from 'lucide-react';
import { Header } from './components/Header';
import { NavSidebar } from './components/NavSidebar';
import { ChatHistory } from './components/ChatHistory';
import { InputArea } from './components/InputArea';
import { InteractiveCanvas } from './components/InteractiveCanvas';
import type { Message, AttachedFile, CraftState, Language } from './types';
import { getSystemInstructions } from './services/geminiService';
import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import { UI_STRINGS } from './constants';

const App: React.FC = () => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(true);
    const [isCanvasOpen, setIsCanvasOpen] = useState<boolean>(false);
    const [conversation, setConversation] = useState<Message[]>([]);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [mode, setMode] = useState<'craft' | 'chat'>('craft');
    const [language, setLanguage] = useState<Language>('fr');
    const [iframeContent, setIframeContent] = useState<string>('');
    
    const [craftState, setCraftState] = useState<CraftState>({
        contexte: '',
        role: 'Professeur de collège',
        forme: 'Un résumé de cours',
        ton: 'Pédagogique et clair',
    });

    const addJarvisMessage = useCallback((text: string, showDeepenButton: boolean = true) => {
        if (!text) return;
        const newMessage: Message = {
            id: Date.now(),
            role: 'model',
            content: text,
            showDeepenButton,
        };
        setConversation(prev => [...prev, newMessage]);
    }, []);

    useEffect(() => {
        setConversation([]);
        addJarvisMessage(UI_STRINGS[language].welcome, false);
    }, [language, addJarvisMessage]);
    
    const handleSendMessage = async (userInput: string, attachedFile: AttachedFile | null) => {
        if ((!userInput && !attachedFile) || isProcessing) return;
        
        // FIX: The API key check was removed to resolve a TypeScript error and align with guidelines. 
        // The API key is assumed to be available via process.env.API_KEY.

        setIsProcessing(true);
        
        let displayMessage: string;
        if (mode === 'craft') {
            displayMessage = `Mon Prompt C.R.A.F.T.:\n\nContexte: ${craftState.contexte || 'Aucun'}\nRôle: ${craftState.role}\nForme: ${craftState.forme}\nTon: ${craftState.ton}\n\nAction: ${userInput}`;
        } else {
            displayMessage = userInput;
        }

        const userMessage: Message = {
            id: Date.now(),
            role: 'user',
            content: displayMessage,
            attachment: attachedFile ?? undefined,
        };
        setConversation(prev => [...prev, userMessage]);
        
        const typingIndicator: Message = { id: Date.now() + 1, role: 'model', content: '', isTyping: true };
        setConversation(prev => [...prev, typingIndicator]);

        try {
            // FIX: Per coding guidelines, initialize the client with the API key from process.env.API_KEY.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const systemInstructionPart = getSystemInstructions(language, mode);
            const history = conversation.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.content }]
            }));
            
            let promptText: string;
            let imagePart: Part | null = null;
            
            if (mode === 'craft') {
                promptText = `Contexte: ${craftState.contexte || 'Aucun'}\n\nRôle: Agis en tant que ${craftState.role}.\n\nForme: Présente ta réponse sous la forme d'un(e) ${craftState.forme}.\n\nTon: Utilise un ton ${craftState.ton}.\n\nAction: ${userInput}`;
            } else {
                promptText = userInput;
            }

            if (mode === 'chat' && attachedFile?.dataType === 'text') {
                promptText = `Le document "${attachedFile.name}" contient le texte suivant :\n\n---\n${attachedFile.content}\n---\n\nEn te basant sur ce document, réponds à la question suivante : ${userInput}`;
            }
            
            if (attachedFile?.dataType === 'image') {
                imagePart = {
                    inlineData: {
                        mimeType: attachedFile.type,
                        data: attachedFile.content.split(',')[1]
                    }
                };
            }
            
            const promptParts: Part[] = [{ text: promptText }];
            if (imagePart) {
                promptParts.push(imagePart);
            }

            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [...history, { role: 'user', parts: promptParts }],
                config: {
                    systemInstruction: systemInstructionPart.text,
                },
            });

            const jarvisResponseText = response.text.replace(/\*/g, '');

            const codeBlockRegex = /```html\n([\s\S]*?)\n```/;
            const match = jarvisResponseText.match(codeBlockRegex);

            if (match) {
                const htmlContent = match[1];
                const textBeforeCode = jarvisResponseText.substring(0, match.index).trim();
                setIframeContent(htmlContent);
                setIsCanvasOpen(true);
                if (textBeforeCode) {
                    addJarvisMessage(textBeforeCode, true);
                }
            } else {
                addJarvisMessage(jarvisResponseText, true);
            }
        } catch (error) {
            console.error("Gemini API error:", error);
            const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred.';
            addJarvisMessage(`${UI_STRINGS[language].apiError}: ${errorMessage}`, false);
        } finally {
            setConversation(prev => prev.filter(msg => !msg.isTyping));
            setIsProcessing(false);
        }
    };
    
    const handleDeepen = useCallback((topic: string) => {
        const deepenPrompt = `${UI_STRINGS[language].deepenRequest}: "${topic}"`;
        handleSendMessage(deepenPrompt, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language, handleSendMessage]);

    const handleLanguageChange = (newLang: Language) => {
        setLanguage(newLang);
    };

    return (
        <div className="h-full flex overflow-hidden bg-slate-100">
            <NavSidebar
                isOpen={isNavOpen}
                onPresetClick={(contexte) => setCraftState(prev => ({ ...prev, contexte }))}
            />
            <div className="flex-1 flex flex-col h-full relative">
                <button
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    className="absolute top-4 left-4 z-20 p-2 text-slate-500 hover:text-cyan-600 rounded-full bg-white/50 backdrop-blur-sm"
                    title={isNavOpen ? "Fermer la navigation" : "Ouvrir la navigation"}
                >
                    <PanelLeft className="h-6 w-6" />
                </button>
                <Header
                    language={language}
                    onLanguageChange={handleLanguageChange}
                    onToggleCanvas={() => setIsCanvasOpen(!isCanvasOpen)}
                    conversation={conversation}
                />
                <main className="flex-1 flex flex-col h-full overflow-hidden">
                    <ChatHistory
                        conversation={conversation}
                        onDeepen={handleDeepen}
                        language={language}
                    />
                    <InputArea
                        isProcessing={isProcessing}
                        onSendMessage={handleSendMessage}
                        mode={mode}
                        onModeChange={setMode}
                        craftState={craftState}
                        onCraftStateChange={setCraftState}
                        language={language}
                    />
                </main>
            </div>
            <InteractiveCanvas
                isOpen={isCanvasOpen}
                onClose={() => setIsCanvasOpen(false)}
                htmlContent={iframeContent}
            />
        </div>
    );
};

export default App;

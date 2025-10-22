
import React from 'react';
import { FileText, Image as ImageIcon } from 'lucide-react';
import type { Message, Language } from '../types';
import { UI_STRINGS } from '../constants';

interface MessageBubbleProps {
    message: Message;
    onDeepen: (topic: string) => void;
    language: Language;
}

const JarvisAvatar: React.FC = () => (
    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 text-white shadow-md" style={{ backgroundColor: 'var(--primary-color)' }}>
        J
    </div>
);

const TypingIndicator: React.FC = () => (
    <div className="flex items-center gap-3">
        <JarvisAvatar />
        <div className="message-bubble jarvis-message flex items-center justify-center p-4">
            <div className="dot-flashing"></div>
        </div>
    </div>
);

const UserMessageContent: React.FC<{ message: Message }> = ({ message }) => (
    <div className="message-bubble user-message">
        {message.attachment && (
            <div className="flex items-center text-sm border-b border-gray-300 pb-2 mb-2">
                {message.attachment.dataType === 'image' ? (
                    <img src={message.attachment.content} className="h-12 w-12 mr-2 rounded-md object-cover" alt={message.attachment.name} />
                ) : (
                    <FileText className="h-8 w-8 mr-2 flex-shrink-0 text-slate-500" />
                )}
                <span className="truncate font-medium">{message.attachment.name}</span>
            </div>
        )}
        <span style={{ whiteSpace: 'pre-wrap' }}>{message.content}</span>
    </div>
);

const JarvisMessageContent: React.FC<{ message: Message; onDeepen: (topic: string) => void; language: Language }> = ({ message, onDeepen, language }) => (
    <div className="flex flex-col items-start max-w-[85%]">
        <div className="flex items-end gap-3">
            <JarvisAvatar />
            <div className="message-bubble jarvis-message">
                {message.content}
            </div>
        </div>
        {message.showDeepenButton && (
             <button
                onClick={() => onDeepen(message.content)}
                className="text-xs mt-2.5 ml-[52px] py-1 px-3.5 text-slate-600 bg-slate-100 border border-slate-200 rounded-full cursor-pointer transition-all hover:bg-slate-200 hover:scale-105"
            >
                {UI_STRINGS[language].deepenButton}
            </button>
        )}
    </div>
);


export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onDeepen, language }) => {
    const isUser = message.role === 'user';

    if (message.isTyping) {
        return <TypingIndicator />;
    }

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            {isUser ? (
                <UserMessageContent message={message} />
            ) : (
                <JarvisMessageContent message={message} onDeepen={onDeepen} language={language} />
            )}
        </div>
    );
};

// Add CSS for message bubbles to a style tag or global CSS file
const styles = `
.message-bubble {
    max-width: 85%;
    padding: 12px 18px;
    border-radius: 1.25rem;
    word-wrap: break-word;
    white-space: pre-wrap;
    box-shadow: 0 4px 10px -2px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.message-bubble:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px -5px rgba(0, 0, 0, 0.1);
}
.user-message {
    background-color: #ffffff;
    color: #1e293b;
    align-self: flex-end;
    border-radius: 1.25rem 1.25rem 0.25rem 1.25rem;
    border: 1px solid #e2e8f0;
}
.jarvis-message {
    background: linear-gradient(145deg, var(--primary-color-dark), var(--primary-color));
    color: #ffffff;
    align-self: flex-start;
    border-radius: 1.25rem 1.25rem 1.25rem 0.25rem;
}
`;

// Inject styles into the document head
if (typeof window !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

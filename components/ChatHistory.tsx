
import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import type { Message, Language } from '../types';

interface ChatHistoryProps {
    conversation: Message[];
    onDeepen: (topic: string) => void;
    onSuggestionClick: (suggestion: string) => void;
    language: Language;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ conversation, onDeepen, onSuggestionClick, language }) => {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);

    return (
        <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
                {conversation.map((msg, index) => (
                    <MessageBubble key={`${msg.id}-${index}`} message={msg} onDeepen={onDeepen} onSuggestionClick={onSuggestionClick} language={language} />
                ))}
                <div ref={endOfMessagesRef} />
            </div>
        </div>
    );
};

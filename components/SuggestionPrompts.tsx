import React from 'react';
import { Sparkles } from 'lucide-react';

interface SuggestionPromptsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export const SuggestionPrompts: React.FC<SuggestionPromptsProps> = ({ suggestions, onSuggestionClick }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 ml-[52px] flex flex-wrap gap-2">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion)}
          className="text-xs py-1.5 px-3.5 text-cyan-800 bg-cyan-100 border border-cyan-300 rounded-full cursor-pointer transition-all hover:bg-cyan-200 hover:scale-105 flex items-center"
        >
          <Sparkles className="h-3 w-3 mr-1.5" />
          {suggestion}
        </button>
      ))}
    </div>
  );
};
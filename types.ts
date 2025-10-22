
export type Role = 'user' | 'model';

export interface AttachedFile {
  name: string;
  type: string;
  dataType: 'image' | 'text';
  content: string; // base64 string for image, raw text for text docs
}

export interface Message {
  id: number;
  role: Role;
  content: string;
  isTyping?: boolean;
  attachment?: AttachedFile;
  showDeepenButton?: boolean;
}

export interface CraftState {
  contexte: string;
  role: string;
  forme: string;
  ton: string;
}

export type Language = 'fr' | 'en' | 'es' | 'de' | 'it';

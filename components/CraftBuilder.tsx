
import React from 'react';
import type { CraftState, Language } from '../types';
import { CRAFT_DATA, UI_STRINGS } from '../constants';
import { Mic } from 'lucide-react';

interface CraftBuilderProps {
    craftState: CraftState;
    onCraftStateChange: (state: CraftState) => void;
    language: Language;
}

export const CraftBuilder: React.FC<CraftBuilderProps> = ({ craftState, onCraftStateChange, language }) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onCraftStateChange({ ...craftState, [name]: value });
    };

    return (
        <details className="mb-2" open>
            <summary className="cursor-pointer text-sm font-medium text-slate-600 hover:text-cyan-600 flex justify-between items-center">
                <span>{UI_STRINGS[language].craftTitle}</span>
                <button className="p-2 text-slate-500 hover:text-cyan-600 transition-colors rounded-full" title="Remplir le constructeur C.R.A.F.T. à la voix" onClick={(e) => {e.preventDefault(); alert('Voice input for C.R.A.F.T. builder is not yet implemented in this version.');}}>
                    <Mic className="h-5 w-5" />
                </button>
            </summary>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div>
                    <label htmlFor="craft-contexte" className="block text-xs font-medium text-slate-500 mb-1">C - Contexte</label>
                    <textarea id="craft-contexte" name="contexte" value={craftState.contexte} onChange={handleChange} rows={2} className="w-full bg-white border border-slate-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all" placeholder="Quel est le décor de notre histoire ?"></textarea>
                </div>
                <div>
                    <label htmlFor="craft-role" className="block text-xs font-medium text-slate-500 mb-1">R - Rôle</label>
                    <select id="craft-role" name="role" value={craftState.role} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all">
                        {CRAFT_DATA.roles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="craft-forme" className="block text-xs font-medium text-slate-500 mb-1">F - Forme</label>
                    <select id="craft-forme" name="forme" value={craftState.forme} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all">
                        {CRAFT_DATA.formes.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="craft-ton" className="block text-xs font-medium text-slate-500 mb-1">T - Ton</label>
                    <select id="craft-ton" name="ton" value={craftState.ton} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all">
                        {CRAFT_DATA.tons.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
            </div>
        </details>
    );
};

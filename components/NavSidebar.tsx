import React from 'react';
import * as LucideIcons from 'lucide-react';
import { EXPLORER_DATA } from '../constants';

interface NavSidebarProps {
    isOpen: boolean;
    onPresetClick: (contexte: string) => void;
}

export const NavSidebar: React.FC<NavSidebarProps> = ({ isOpen, onPresetClick }) => {
    return (
        <aside className={`w-80 bg-slate-100 p-4 border-r border-slate-200 flex-shrink-0 flex flex-col transition-all duration-300 ${!isOpen ? 'w-0 p-0 overflow-hidden' : ''}`}>
            <h2 className="text-lg font-bold mb-4 text-slate-800 flex items-center flex-shrink-0">
                <LucideIcons.BrainCircuit className="h-6 w-6 mr-2 text-cyan-700" />
                Bac à Sable Créatif
            </h2>
            <div className="divide-y divide-slate-200 overflow-y-auto">
                {EXPLORER_DATA.map(section => (
                    <details key={section.title} className="group py-3" open>
                        <summary className="font-semibold text-slate-700 group-hover:text-cyan-700 cursor-pointer flex items-center">{section.title}</summary>
                        <div className="pl-4 mt-2 space-y-1">
                            {section.items.map(item => {
                                // FIX: Cast via `unknown` to safely handle dynamic icon component access. This is required because the `lucide-react` module has non-component exports, making a direct cast unsafe.
                                const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[item.icone] || LucideIcons.File;
                                return (
                                    <div
                                        key={item.id}
                                        className="p-2 rounded-md hover:bg-slate-200 cursor-pointer text-sm flex items-center"
                                        onClick={() => onPresetClick(item.contexte)}
                                    >
                                        <Icon className={`h-4 w-4 mr-3 ${section.colorClass}`} />
                                        <span>{item.titre}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </details>
                ))}
            </div>
        </aside>
    );
};
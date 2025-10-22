
import React from 'react';
import { Languages, FileDown, LayoutTemplate, Loader2 } from 'lucide-react';
import type { Language, Message } from '../types';
import jsPDF from 'jspdf';

interface HeaderProps {
    language: Language;
    onLanguageChange: (lang: Language) => void;
    onToggleCanvas: () => void;
    conversation: Message[];
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, onToggleCanvas, conversation }) => {
    const [isExporting, setIsExporting] = React.useState(false);
    
    const handleExport = () => {
        const lastJarvisMessage = [...conversation].reverse().find(m => m.role === 'model' && !m.isTyping);
        if (!lastJarvisMessage) {
            alert("Aucune création de JARVIS à exporter.");
            return;
        }

        setIsExporting(true);

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const margin = 15;
        const contentWidth = pdfWidth - (margin * 2);
        let y = margin + 25;

        pdf.setFontSize(18);
        pdf.setTextColor('#0e7490');
        pdf.text('Création J.A.R.V.I.S.', pdfWidth / 2, margin + 5, { align: 'center' });
        
        const todayForPdf = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        pdf.setFontSize(10);
        pdf.setTextColor('#334155');
        pdf.text(`Exporté le : ${todayForPdf}`, pdfWidth / 2, margin + 12, { align: 'center' });

        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor('#1e293b');
        pdf.setFontSize(11);

        const lines = pdf.splitTextToSize(lastJarvisMessage.content, contentWidth);
        
        lines.forEach((line: string) => {
            if (y + 5 > pdf.internal.pageSize.getHeight() - margin) {
                pdf.addPage();
                y = margin;
            }
            pdf.text(line, margin, y);
            y += 5;
        });

        const todayForFilename = todayForPdf.replace(/\//g, '-');
        pdf.save(`Creation_JARVIS_${todayForFilename}.pdf`);

        setIsExporting(false);
    };

    return (
        <header className="relative flex items-center justify-center p-4 bg-white border-b border-slate-200 shadow-sm flex-shrink-0">
            <div className="flex items-center">
                <img src="data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADQAQCdASo+AD4APm0skkWkIqGYBABABsCgC/o/AJsC8gD8AP3K/gB/Qf6T/j/5s/QD+w/0j90/03/K/br1APcA/lH+5/tB/af89/yv9l7gf8p/y/9x/2HqA/YA/tH/G/2E/sH///5r4AP5r/tf/h/cf///+8A/yvYA/8X2AP7p/qf/Z/13////+gB/ev9D/5P9N/3/+6/////9wD/xf5//+f9J/9f91////+AD/9wCf2f/Tf/D/fv+F/8/+g/83/XfAD/Lf5n/q/8b/gP+L/vP/Z7gH8q/0v+z/x3+S/0/+A/6v/F/5v/O/9n/h/YD/Lf9T/rf+F/zH/L/2H/g9gD+Zf6//q/8T/kP+P/wP+n/y//j/7n2AP5F/pv+n/xn+A/0v+C/5n/L/5P/b/7X/i/YD/tv/H8AD+wf4j/9/7r/yf/l/4f/l/YD/rP+9/9X+4/8D/kf+L/vP+7/4P8Z////+wD/kf9P/7P95/8v/B/9j/rf////+AD81f7X/5f7r/3P/p/5//k/8H////gA" alt="Logo JARVIS" className="h-10 w-10 mr-3" />
                <div>
                    <h1 className="text-xl font-extrabold text-slate-800">J.A.R.V.I.S. <span className="font-semibold" style={{ color: 'var(--primary-color)' }}>ÉDUCATIF</span></h1>
                    <p className="text-xs text-slate-500 -mt-1">Le Bon Sens Pratique au service de l'éducation</p>
                </div>
            </div>
            <div className="absolute right-4 flex items-center space-x-2">
                <div className="relative">
                    <Languages className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <select
                        id="language-selector"
                        value={language}
                        onChange={(e) => onLanguageChange(e.target.value as Language)}
                        className="pl-8 pr-2 py-1.5 text-sm bg-slate-100 border-slate-200 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                        title="Changer de langue"
                    >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="de">Deutsch</option>
                        <option value="it">Italiano</option>
                    </select>
                </div>
                <button onClick={handleExport} disabled={isExporting} className="p-2 text-slate-500 hover:text-cyan-600 transition-colors rounded-full" title="Exporter la dernière création en PDF">
                    {isExporting ? <Loader2 className="h-6 w-6 animate-spin" /> : <FileDown className="h-6 w-6" />}
                </button>
                <button onClick={onToggleCanvas} className="p-2 text-slate-500 hover:text-cyan-600 transition-colors rounded-full" title="Afficher le Canevas Interactif">
                    <LayoutTemplate className="h-6 w-6" />
                </button>
            </div>
        </header>
    );
};

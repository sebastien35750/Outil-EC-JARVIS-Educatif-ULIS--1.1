
import React from 'react';

interface InteractiveCanvasProps {
    isOpen: boolean;
    onClose: () => void;
    htmlContent: string;
}

export const InteractiveCanvas: React.FC<InteractiveCanvasProps> = ({ isOpen, onClose, htmlContent }) => {
    return (
        <div className={`fixed top-0 right-0 h-full w-2/5 bg-gray-800 text-gray-200 font-mono text-sm shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-between items-center p-3 bg-gray-900 border-b border-gray-700 flex-shrink-0">
                <h3 className="font-bold text-white">Canevas Interactif</h3>
                <button onClick={onClose} className="text-2xl font-bold leading-none text-gray-400 hover:text-white">&times;</button>
            </div>
            <div className="flex-grow bg-white overflow-auto">
                <iframe
                    srcDoc={htmlContent}
                    title="Interactive Preview"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                />
            </div>
        </div>
    );
};

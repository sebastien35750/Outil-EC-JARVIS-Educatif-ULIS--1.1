

import { useState, useEffect, useRef } from 'react';

// FIX: Add type definitions for the Web Speech API which are not included in standard TS DOM libs.
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    lang: string;
    interimResults: boolean;
    onresult: (event: any) => void;
    onerror: (event: any) => void;
    onend: () => void;
    start: () => void;
    stop: () => void;
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognition;
        webkitSpeechRecognition: new () => SpeechRecognition;
    }
}


interface SpeechRecognitionOptions {
    lang?: string;
    onResult?: (transcript: string) => void;
}

const getSpeechRecognition = (): (new () => SpeechRecognition) | null => {
    if (typeof window !== 'undefined') {
        return window.SpeechRecognition || window.webkitSpeechRecognition;
    }
    return null;
}

export const useSpeechRecognition = (options: SpeechRecognitionOptions = {}) => {
    const { lang = 'en-US', onResult } = options;
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        const SpeechRecognitionAPI = getSpeechRecognition();
        if (!SpeechRecognitionAPI) {
            console.warn('Speech Recognition API is not supported in this browser.');
            return;
        }

        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = false;
        recognition.lang = lang;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const lastResult = event.results[event.results.length - 1];
            const newTranscript = lastResult[0].transcript;
            setTranscript(newTranscript);
            if (onResult) {
                onResult(newTranscript);
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };
        
        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [lang, onResult]);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setTranscript('');
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    return { isListening, transcript, startListening, stopListening };
};

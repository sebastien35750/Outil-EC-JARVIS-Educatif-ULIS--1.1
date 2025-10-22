
import type { Language } from './types';

export const EXPLORER_DATA = [
    {
        title: 'Tester ses Connaissances (QCM)',
        colorClass: 'text-red-500',
        items: [
            { id: 'Q1', titre: "Quiz de Français", icone: "PencilRuler", contexte: "Génère un quiz interactif de 5 questions sur le programme de Français de 6ème (grammaire, conjugaison)." },
            { id: 'Q2', titre: "Quiz de Mathématiques", icone: "Calculator", contexte: "Génère un quiz interactif de 5 questions sur les fractions et la géométrie pour un élève de 6ème." },
            { id: 'Q3', titre: "Quiz d'Histoire", icone: "Scroll", contexte: "Génère un quiz interactif de 5 questions sur l'Antiquité (Rome et la Gaule) pour le niveau 6ème." },
            { id: 'Q4', titre: "Quiz de Sciences", icone: "Beaker", contexte: "Génère un quiz interactif de 5 questions sur le système solaire et les volcans pour un élève de 6ème." },
        ]
    },
    {
        title: 'Discussion & Aide aux Devoirs',
        colorClass: 'text-slate-500',
        items: [
             { id: 'H1', titre: "Question de Français", icone: "Pilcrow", contexte: "J'ai une question sur ma leçon de Français." },
             { id: 'H2', titre: "Question de Maths", icone: "Sigma", contexte: "J'ai un problème sur un exercice de mathématiques." },
             { id: 'H3', titre: "Question d'Histoire", icone: "Globe2", contexte: "J'ai une question sur mon cours d'Histoire-Géographie." },
             { id: 'H4', titre: "Question de Sciences", icone: "FlaskConical", contexte: "J'ai une question à propos d'une expérience en SVT." },
        ]
    },
    {
        title: 'Missions Pédagogiques',
        colorClass: 'text-amber-500',
        items: [
            { id: 'S1', titre: "Français", icone: "Pilcrow", contexte: "Le proviseur du collège a besoin d'un discours pour la fête de fin d'année. Rédige un texte court et inspirant sur l'amitié." },
            { id: 'S2', titre: "Mathématiques", icone: "Sigma", contexte: "Invente un problème de mathématiques amusant sur le partage d'un trésor de pirates pour expliquer les fractions." },
            { id: 'S3', titre: "Histoire-Géographie", icone: "Globe2", contexte: "Tu es un marchand qui voyage sur la Route de la Soie. Décris une ville que tu visites et les produits que tu y trouves." },
        ]
    },
    {
        title: 'Univers à Explorer',
        colorClass: 'text-sky-500',
        items: [
            { id: 'U1', titre: "Exploration Spatiale", icone: "Rocket", contexte: "Imagine que nous sommes dans un futur lointain, à bord d'un vaisseau explorant des galaxies inconnues." },
            { id: 'U2', titre: "Monde des Super-Héros", icone: "Shield", contexte: "Nous sommes dans une métropole où des héros aux pouvoirs incroyables protègent les citoyens de super-vilains." },
            { id: 'U3', titre: "Fantaisie et Magie", icone: "Wand2", contexte: "Le décor est un royaume enchanté peuplé de dragons, de magiciens et de créatures mystérieuses." },
        ]
    },
    {
        title: 'Outils Créatifs',
        colorClass: 'text-emerald-500',
        items: [
            { id: 'T1', titre: "Générateur d'idées", icone: "Lightbulb", contexte: "Je suis bloqué, j'ai besoin de trois idées complètement folles pour commencer une histoire." },
            { id: 'T2', titre: "Correcteur Magique", icone: "SpellCheck2", contexte: "Peux-tu corriger les fautes de mon texte et le rendre plus joli à lire ?" },
            { id: 'T3', titre: "Simulateur de scénario", icone: "GitFork", contexte: "Je veux que tu imagines la suite possible d'une situation que je vais te donner." },
        ]
    }
];

export const CRAFT_DATA = {
    roles: ["Professeur de collège","Scientifique","Historien","Mathématicien","Journaliste d'investigation","Guide de musée","Maître du jeu de rôle","Scénariste de film d'aventure","Inventeur farfelu","Capitaine de vaisseau spatial","Poète des étoiles","Détective du futur"],
    formes: ["Un résumé de cours","Une explication simple (pas à pas)","Une fiche de révision","Un article d'encyclopédie","Un exercice avec sa correction","Un tableau comparatif","Une histoire courte","Une liste à puces","Une fiche de personnage","Un poème rigolo","Un dialogue de théâtre"],
    tons: ["Pédagogique et clair","Objectif et factuel","Synthétique et direct","Formel et structuré","Héroïque et épique","Drôle et absurde","Mystérieux et sombre","Enthousiaste et joyeux"]
};

export const UI_STRINGS: Record<Language, any> = {
    fr: {
        welcome: "Bonjour ! Je suis prêt. Utilise le mode C.R.A.F.T. pour une création guidée ou le mode Chat Direct pour discuter.",
        craftMode: "Mode C.R.A.F.T.",
        chatMode: "Mode Chat Direct",
        craftTitle: "Utiliser le constructeur de prompt C.R.A.F.T.",
        inputPlaceholderCraft: "A - Action : Écris ta demande ici...",
        inputPlaceholderChat: "Pose ta question ici...",
        deepenButton: "Approfondir",
        languageChange: "La langue est maintenant le Français.",
        apiError: "Oups, une erreur cosmique est survenue",
        apiKeyError: "Clé API Gemini non configurée. Veuillez configurer la variable d'environnement API_KEY.",
        deepenRequest: "Peux-tu développer ou donner plus de détails sur le sujet suivant",
        modeChange: (mode: string) => `Mode ${mode} activé.`
    },
    en: {
        welcome: "Hello! I'm ready. Use C.R.A.F.T. mode for guided creation or Direct Chat mode to talk.",
        craftMode: "C.R.A.F.T. Mode",
        chatMode: "Direct Chat Mode",
        craftTitle: "Use the C.R.A.F.T. prompt builder",
        inputPlaceholderCraft: "A - Action: Write your request here...",
        inputPlaceholderChat: "Ask your question here...",
        deepenButton: "Deepen",
        languageChange: "Language is now set to English.",
        apiError: "Oops, a cosmic error occurred",
        apiKeyError: "Gemini API key not configured. Please set the API_KEY environment variable.",
        deepenRequest: "Can you elaborate or give more details on the following topic",
        modeChange: (mode: string) => `${mode} enabled.`
    },
    es: {
        welcome: "¡Hola! Estoy listo. Usa el modo C.R.A.F.T. para creación guiada o el modo Chat Directo para hablar.",
        craftMode: "Modo C.R.A.F.T.",
        chatMode: "Modo Chat Directo",
        craftTitle: "Usar el constructor de prompts C.R.A.F.T.",
        inputPlaceholderCraft: "A - Acción: Escribe tu solicitud aquí...",
        inputPlaceholderChat: "Haz tu pregunta aquí...",
        deepenButton: "Profundizar",
        languageChange: "El idioma ahora es Español.",
        apiError: "Vaya, ha ocurrido un error cósmico",
        apiKeyError: "Clave de API de Gemini no configurada. Por favor, establezca la variable de entorno API_KEY.",
        deepenRequest: "Puedes desarrollar o dar más detalles sobre el siguiente tema",
        modeChange: (mode: string) => `Modo ${mode} activado.`
    },
    de: {
        welcome: "Hallo! Ich bin bereit. Verwende den C.R.A.F.T.-Modus für geführte Erstellung oder den Direkt-Chat-Modus zum Sprechen.",
        craftMode: "C.R.A.F.T.-Modus",
        chatMode: "Direkter Chat-Modus",
        craftTitle: "C.R.A.F.T.-Prompt-Builder verwenden",
        inputPlaceholderCraft: "A - Aktion: Schreibe deine Anfrage hier...",
        inputPlaceholderChat: "Stelle deine Frage hier...",
        deepenButton: "Vertiefen",
        languageChange: "Sprache ist jetzt auf Deutsch eingestellt.",
        apiError: "Hoppla, ein kosmischer Fehler ist aufgetreten",
        apiKeyError: "Gemini-API-Schlüssel nicht konfiguriert. Bitte setzen Sie die Umgebungsvariable API_KEY.",
        deepenRequest: "Können Sie das folgende Thema näher erläutern oder weitere Details dazu geben?",
        modeChange: (mode: string) => `${mode}-Modus aktiviert.`
    },
    it: {
        welcome: "Ciao! Sono pronto. Usa la modalità C.R.A.F.T. per la creazione guidata o la modalità Chat Diretta per parlare.",
        craftMode: "Modalità C.R.A.F.T.",
        chatMode: "Modalità Chat Diretta",
        craftTitle: "Usa il costruttore di prompt C.R.A.F.T.",
        inputPlaceholderCraft: "A - Azione: Scrivi la tua richiesta qui...",
        inputPlaceholderChat: "Fai la tua domanda qui...",
        deepenButton: "Approfondire",
        languageChange: "La lingua è ora impostata sull'Italiano.",
        apiError: "Ops, si è verificato un errore cosmico",
        apiKeyError: "Chiave API Gemini non configurata. Impostare la variabile d'ambiente API_KEY.",
        deepenRequest: "Puoi elaborare o fornire maggiori dettagli sul seguente argomento",
        modeChange: (mode: string) => `Modalità ${mode} attivata.`
    }
};

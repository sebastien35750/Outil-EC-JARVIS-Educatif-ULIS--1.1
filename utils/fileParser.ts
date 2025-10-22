
import * as pdfjs from 'pdfjs-dist';
import type { AttachedFile } from '../types';

declare global {
    interface Window {
        mammoth: any;
    }
}

// @ts-ignore
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.5.136/build/pdf.worker.mjs`;

export const parseFile = async (file: File): Promise<AttachedFile> => {
    const fileType = file.type;
    const fileName = file.name;

    if (fileType.startsWith('image/')) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve({
                    name: fileName,
                    type: fileType,
                    dataType: 'image',
                    content: e.target?.result as string,
                });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    if (fileType === 'application/pdf') {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const pdfData = new Uint8Array(e.target?.result as ArrayBuffer);
                    const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
                    let fullText = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        fullText += textContent.items.map((item: any) => item.str).join(' ') + '\n';
                    }
                    resolve({
                        name: fileName,
                        type: fileType,
                        dataType: 'text',
                        content: fullText.trim(),
                    });
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }
    
    if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') { // .docx
         return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const arrayBuffer = e.target?.result as ArrayBuffer;
                    const result = await window.mammoth.extractRawText({ arrayBuffer });
                    resolve({
                        name: fileName,
                        type: fileType,
                        dataType: 'text',
                        content: result.value,
                    });
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    return Promise.reject(new Error(`Unsupported file type: ${fileType}`));
};

// src/hooks/useVoiceSearch.ts
import { useState, useEffect, useRef } from 'react';

type SpeechRecognition = any;
type SpeechRecognitionEvent = any;
const useVoiceSearch = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return;

    const rec: SpeechRecognition = new SpeechRecognitionClass();
    rec.lang = 'vi-VN';
    rec.interimResults = false;
    rec.continuous = false;

    rec.onresult = (e: SpeechRecognitionEvent) => {
      setTranscript(e.results[0][0].transcript);
      setIsListening(false);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);

    recognitionRef.current = rec;
  }, []);

  const start = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setTranscript('');
      setIsListening(true);
    }
  };

  return { isListening, transcript, start };
};

export default useVoiceSearch;

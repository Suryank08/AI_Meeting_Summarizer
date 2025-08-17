import { useState } from 'react';

export type GeminiResponse = {
  candidates?: {
    content?: {
      parts?: { text: string }[];
    };
  }[];
  error?: {
    message: string;
  };
};

export function useGeminiSummary() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>('');

  const fetchSummary = async (transcript: string, prompt: string) => {
    if (!transcript.trim()) {
      setError('Please paste some notes or a transcript to summarize.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSummary('');
    const fullPrompt = `Based on the following meeting transcript, apply the following instruction to generate a summary.\n\nInstruction: ${prompt}\n\nTranscript:\n"""\n${transcript}\n"""\n`;
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;
      const payload = {
        contents: [{ role: "user", parts: [{ text: fullPrompt }] }]
      };
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result: GeminiResponse = await response.json();
      if (result.error) throw new Error(result.error.message);
      const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        setSummary(generatedText);
      } else {
        throw new Error('No summary was generated. Please try again with a different prompt or transcript.');
      }
    } catch (err: unknown) {
      let errorMsg = 'Failed to generate summary. Please check your network connection and try again.';
      if (err && typeof err === 'object' && 'message' in err) {
        errorMsg += ` Error: ${(err as { message?: string }).message}`;
      }
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, summary, fetchSummary, setSummary, setError };
}

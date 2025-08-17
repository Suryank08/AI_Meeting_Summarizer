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

export async function fetchGeminiSummary(transcript: string, prompt: string): Promise<{ summary?: string; error?: string }> {
  if (!transcript.trim()) {
    return { error: 'Please paste some notes or a transcript to summarize.' };
  }
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
    if (result.error) return { error: result.error.message };
    const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (generatedText) {
      return { summary: generatedText };
    } else {
      return { error: 'No summary was generated. Please try again with a different prompt or transcript.' };
    }
  } catch (err: unknown) {
    let errorMsg = 'Failed to generate summary. Please check your network connection and try again.';
    if (err && typeof err === 'object' && 'message' in err) {
      errorMsg += ` Error: ${(err as { message?: string }).message}`;
    }
    return { error: errorMsg };
  }
}

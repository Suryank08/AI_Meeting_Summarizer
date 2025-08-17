

import React, { useState } from 'react';
import { fetchGeminiSummary } from './utils/geminiApi';
import TranscriptInput from './components/ui/TranscriptInput';
import LoadingScreen from './components/ui/LoadingScreen';
import SummaryView from './components/ui/SummaryView';
import ErrorAlert from './components/ui/ErrorAlert';
import AppHeader from './components/ui/AppHeader';

type AppState = 'input' | 'loading' | 'summary';

const App: React.FC = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('Summarize the key takeaways and action items in bullet points.');
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<AppState>('input');

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError(null);
    setSummary('');
    setActiveStep('loading');
    const result = await fetchGeminiSummary(transcript, prompt);
    if (result.error) {
      setError(result.error);
      setActiveStep('input');
    } else if (result.summary) {
      setSummary(result.summary);
      setActiveStep('summary');
    }
    setIsLoading(false);
  };

  const handleShareSummary = () => {
    const subject = encodeURIComponent('Meeting Summary');
    const body = encodeURIComponent(summary);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gray-90 text-gray-200 p-8 flex items-center justify-center font-sans antialiased">
      <div className="w-full max-w-3xl bg-gray-950 rounded-2xl shadow-2xl p-8 border border-gray-800 glass">
        <AppHeader />
        {error && <ErrorAlert message={error} />}
        {activeStep === 'input' && (
          <TranscriptInput
            transcript={transcript}
            setTranscript={setTranscript}
            prompt={prompt}
            setPrompt={setPrompt}
            isLoading={isLoading}
            handleGenerateSummary={handleGenerateSummary}
          />
        )}
        {activeStep === 'loading' && <LoadingScreen />}
        {activeStep === 'summary' && (
          <SummaryView
            summary={summary}
            setSummary={setSummary}
            handleShareSummary={handleShareSummary}
            setActiveStep={setActiveStep}
          />
        )}
      </div>
    </div>
  );
};

export default App;

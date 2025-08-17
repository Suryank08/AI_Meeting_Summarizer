import { Sparkles } from 'lucide-react';
import React from 'react';

const AppHeader: React.FC = () => (
  <>
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-white mb-4 tracking-tight leading-tight flex flex-wrap items-center justify-center gap-2">
      <Sparkles size={36} className="inline-block text-cyan-400" />
      <span>AI Meeting Summarizer</span>
    </h1>
    <p className="text-center text-gray-400 mb-8 max-w-lg mx-auto px-2 sm:px-0 text-base sm:text-lg">
      Paste your notes, set a custom prompt, and instantly generate a structured summary with the power of AI.
    </p>
  </>
);

export default AppHeader;

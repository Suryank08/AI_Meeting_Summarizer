import React from 'react';
import { FileText, CornerDownRight, Sparkles } from 'lucide-react';
import { TextArea } from './TextArea';
import { Label } from './Label';

interface TranscriptInputProps {
  transcript: string;
  setTranscript: (val: string) => void;
  prompt: string;
  setPrompt: (val: string) => void;
  isLoading: boolean;
  handleGenerateSummary: () => void;
}

const TranscriptInput: React.FC<TranscriptInputProps> = ({ transcript, setTranscript, prompt, setPrompt, isLoading, handleGenerateSummary }) => (
  <>
    <div className="flex flex-col gap-4">
      <Label htmlFor="transcript" className="font-semibold text-gray-300 flex items-center gap-2">
        <FileText size={18} />
        Paste your meeting notes or transcript here:
      </Label>
      <TextArea 
        id="transcript"
        className="w-full h-48"
        value={transcript}
        setValue={setTranscript}
        placeholder="E.g., 'Joe: Let's discuss the Q3 report. Jane: I have the data ready. Let's focus on the key metrics...'"
      />
    </div>
    <div className="flex flex-col gap-4 mt-6">
      <Label htmlFor="prompt" className="font-semibold text-gray-300 flex items-center gap-2">
        <CornerDownRight size={18} />
        Enter a custom prompt for the AI:
      </Label>
      <TextArea
        id="prompt"
        className="w-full h-24 p-4 text-sm bg-gray-800 border-2 border-gray-700 text-gray-100 rounded-lg focus:ring-cyan-400 focus:border-cyan-400 transition duration-200 resize-none shadow-inner"
        value={prompt}
        setValue={setPrompt}
        placeholder="E.g., 'Extract the key action items and assignees.'"
      />
    </div>
    <button
      onClick={handleGenerateSummary}
      disabled={isLoading}
      className="mt-8 w-full py-3 px-6 text-lg font-bold text-black bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg shadow-lg hover:from-teal-500 hover:to-cyan-600 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      <Sparkles size={20} className="inline-block mr-2" />
      Generate Summary
    </button>
  </>
);

export default TranscriptInput;

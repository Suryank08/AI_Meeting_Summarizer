import React from 'react';
import { Share2 } from 'lucide-react';

type Props = {
  summary: string;
  setSummary: (val: string) => void;
  handleShareSummary: () => void;
  setActiveStep: (val: 'input') => void;
};

const SummaryView: React.FC<Props> = ({ summary, setSummary, handleShareSummary, setActiveStep }) => (
  <>
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-200">Generated Summary</h2>
      <textarea
        className="w-full h-80 p-4 text-sm bg-gray-800 border-2 border-gray-700 text-gray-100 rounded-lg focus:ring-cyan-400 focus:border-cyan-400 transition duration-200 resize-none shadow-inner"
        value={summary}
        onChange={e => setSummary(e.target.value)}
      />
    </div>
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <button
        onClick={handleShareSummary}
        className="flex-1 py-3 px-6 text-lg font-medium text-black bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg shadow-lg hover:from-emerald-500 hover:to-green-600 transition duration-300 ease-in-out flex items-center justify-center gap-2"
      >
        <Share2 size={20} />
        Share via Email
      </button>
      <button
        onClick={() => setActiveStep('input')}
        className="flex-1 py-3 px-6 text-lg font-medium text-cyan-400 bg-gray-800 rounded-lg shadow-lg border-2 border-gray-700 hover:bg-gray-700 transition duration-300 ease-in-out"
      >
        Start Over
      </button>
    </div>
  </>
);

export default SummaryView;

import React from 'react';
import { Loader2 } from 'lucide-react';

const ProcessingLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">Processing Document</h3>
        <p className="text-sm text-gray-400">Extracting information from your document...</p>
      </div>
    </div>
  );
};

export default ProcessingLoader;

import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
        <h2 className="text-xl font-semibold text-gray-300">Generating Your Masterpiece...</h2>
        <p className="text-gray-500 max-w-xs">The AI is hard at work crafting your unique visual identity. This may take a moment.</p>
    </div>
  );
};

export default Loader;

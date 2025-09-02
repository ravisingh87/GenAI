import React, { useState } from 'react';
import { SparklesIcon } from './icons';

interface CardGeneratorFormProps {
  onSubmit: (name: string, industry: string, design: string) => void;
  isLoading: boolean;
}

const designOptions = [
    "Minimalist", 
    "Modern", 
    "Elegant", 
    "Corporate", 
    "Creative", 
    "Futuristic", 
    "Art Deco", 
    "Retro", 
    "Cyberpunk",
    "Vintage",
    "Brutalist",
    "Gothic",
    "Nature-inspired",
    "Watercolor",
    "Holographic"
];

const CardGeneratorForm: React.FC<CardGeneratorFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const [design, setDesign] = useState<string>(designOptions[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && industry.trim()) {
      onSubmit(name, industry, design);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Alex Doe"
            required
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
            Your Industry or Theme
          </label>
          <input
            type="text"
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="e.g., Quantum Computing"
            required
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          />
        </div>
        <div>
            <label htmlFor="design" className="block text-sm font-medium text-gray-300 mb-2">
                Design Style
            </label>
            <div className="relative">
                <select
                    id="design"
                    value={design}
                    onChange={(e) => setDesign(e.target.value)}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-4 pr-10 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 appearance-none"
                >
                    {designOptions.map((option) => (
                    <option key={option} value={option} className="bg-gray-800 text-white">{option}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
        </div>
      </div>
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={isLoading || !name || !industry}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              Generate Card
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CardGeneratorForm;
import React, { useState, useCallback } from 'react';
import type { CardData } from './types';
import { generateCardContent, generateCardImage } from './services/geminiService';
import CardGeneratorForm from './components/CardGeneratorForm';
import VisitingCard from './components/VisitingCard';
import Loader from './components/Loader';
import { SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCard = useCallback(async (name: string, industry: string, design: string) => {
    setIsLoading(true);
    setError(null);
    setCardData(null);

    try {
      const textContentString = await generateCardContent(name, industry, design);
      // Clean potential markdown code block fences
      const cleanedJsonString = textContentString.replace(/```json\n|```/g, '').trim();
      const textContent = JSON.parse(cleanedJsonString);

      const imagePrompt = `An abstract background image for a professional visiting card. Style: ${design}. Theme: ${industry}. The image must be purely abstract and decorative. CRITICAL RULE: Absolutely no text, no letters, no words, no numbers, no logos, no typography. The image must be a beautiful, text-free visual pattern or texture.`;
      const base64Image = await generateCardImage(imagePrompt);
      const imageUrl = `data:image/jpeg;base64,${base64Image}`;

      setCardData({
        name,
        title: textContent.title,
        tagline: textContent.tagline,
        email: textContent.email,
        phone: textContent.phone,
        website: textContent.website,
        imageUrl,
        design,
      });

    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred. Please check the console and ensure your API key is set up correctly.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <SparklesIcon className="w-8 h-8 text-indigo-400" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
              AI Visiting Card Generator
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Craft a unique identity with the power of AI.</p>
        </header>

        <main className="w-full">
          <div className="bg-gray-800/50 rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 backdrop-blur-sm mb-8">
            <CardGeneratorForm onSubmit={handleGenerateCard} isLoading={isLoading} />
          </div>

          <div className="w-full min-h-[30rem] flex items-center justify-center">
            {isLoading && <Loader />}
            {error && <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg"><p className="font-semibold">Generation Failed</p><p className="text-sm">{error}</p></div>}
            {cardData && !isLoading && (
               <div className="w-full flex flex-col items-center animate-fade-in">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-300">Your Generated Card:</h2>
                  <VisitingCard cardData={cardData} />
               </div>
            )}
            {!cardData && !isLoading && !error && (
              <div className="text-center text-gray-500">
                <p>Fill out the form above to generate your card.</p>
                <p>Your unique visiting card will appear here.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
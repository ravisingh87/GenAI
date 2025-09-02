import React from 'react';
import type { CardData } from '../types';
import { EmailIcon, PhoneIcon, WebsiteIcon } from './icons';

interface VisitingCardProps {
  cardData: CardData;
}

const VisitingCard: React.FC<VisitingCardProps> = ({ cardData }) => {
  const { name, title, tagline, email, phone, website, imageUrl, design } = cardData;

  const verticalSplitDesigns = ['Modern', 'Elegant', 'Corporate', 'Art Deco', 'Brutalist'];
  const classicCenteredDesigns = ['Vintage', 'Nature-inspired', 'Watercolor'];

  // 1. Vertical Split Layout (now with full background image)
  if (verticalSplitDesigns.includes(design)) {
    return (
      <div className="w-full max-w-2xl aspect-[16/9] rounded-2xl shadow-2xl overflow-hidden relative transform transition-transform duration-500 group">
        <img src={imageUrl} alt="AI generated background" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="relative w-3/5 h-full p-4 sm:p-6 flex flex-col justify-center bg-white/80 backdrop-blur-md text-gray-800 border-r border-white/20">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                {name}
            </h2>
            <h3 className="text-lg md:text-xl text-indigo-600 font-light">
                {title}
            </h3>
            <p className="text-sm italic text-gray-500 mt-2 mb-4">
              "{tagline}"
            </p>
            <hr className="border-gray-300" />
            <div className="mt-4 space-y-2 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <EmailIcon className="w-4 h-4 text-gray-500" />
                    <span>{email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <PhoneIcon className="w-4 h-4 text-gray-500" />
                    <span>{phone}</span>
                </div>
                <div className="flex items-center gap-2">
                    <WebsiteIcon className="w-4 h-4 text-gray-500" />
                    <span>{website}</span>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // 2. Classic Centered Layout
  if (classicCenteredDesigns.includes(design)) {
    return (
        <div className="w-full max-w-2xl aspect-[16/9] rounded-2xl shadow-2xl overflow-hidden bg-gray-800 relative text-white flex flex-col justify-center items-center p-6 text-center transform transition-transform duration-500 group">
            <img src={imageUrl} alt="AI generated background" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 w-full h-full bg-black/50"></div>
            
            <div className="relative z-10 p-6 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                    {name}
                </h2>
                <h3 className="text-lg md:text-xl text-white/90 font-light" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>
                    {title}
                </h3>
                <p className="text-sm italic text-white/80 mt-2 mb-4">
                    "{tagline}"
                </p>

                <hr className="my-3 border-white/20" />

                <div className="mt-4 space-y-2 text-xs sm:text-sm text-white/90">
                    <div className="flex items-center justify-center gap-2">
                        <EmailIcon className="w-4 h-4 text-white/60" />
                        <span>{email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <PhoneIcon className="w-4 h-4 text-white/60" />
                        <span>{phone}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <WebsiteIcon className="w-4 h-4 text-white/60" />
                        <span>{website}</span>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  // 3. Default "Overlay" Layout
  return (
    <div className="w-full max-w-2xl aspect-[16/9] rounded-2xl shadow-2xl overflow-hidden bg-gray-800 relative text-white flex flex-col justify-end p-6 transform transition-transform duration-500 group">
      <img src={imageUrl} alt="AI generated background" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      <div className="relative z-10">
         <p className="text-sm italic text-white/80 mb-2 text-right">
            "{tagline}"
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
          {name}
        </h2>
        <h3 className="text-lg md:text-xl text-white/90 font-light mb-4" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>
          {title}
        </h3>
        
        <hr className="my-3 border-white/20" />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full text-xs sm:text-sm text-white/90 space-y-2 sm:space-y-0">
            <div className="flex items-center gap-2">
                <EmailIcon className="w-4 h-4 text-white/60" />
                <span>{email}</span>
            </div>
            <div className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-white/60" />
                <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2">
                <WebsiteIcon className="w-4 h-4 text-white/60" />
                <span>{website}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VisitingCard;
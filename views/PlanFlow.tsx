
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TravelWho, TravelStyle } from '../types';
import { GeminiService } from '../services/geminiService';

export const PlanFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState({ start: '', end: '' });
  const [budget, setBudget] = useState<number | undefined>(undefined);
  const [who, setWho] = useState<TravelWho>(TravelWho.SOLO);
  const [styles, setStyles] = useState<TravelStyle[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const navigate = useNavigate();

  const handleStyleToggle = (style: TravelStyle) => {
    setStyles(prev => prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]);
  };

  const calculateDays = () => {
    if (!dates.start || !dates.end) return 0;
    const diffTime = Math.abs(new Date(dates.end).getTime() - new Date(dates.start).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await GeminiService.generateTripItinerary(
        destination,
        dates.start,
        dates.end,
        who,
        styles,
        budget
      );
      // In a real app, save result to state/db. Here we'll just simulate navigate
      console.log("AI Generated Itinerary:", result);
      setTimeout(() => navigate('/trip/new/overview'), 2000);
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center p-10 text-center space-y-8 bg-white">
        <div className="w-24 h-24 relative">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-blue-600">
            <i className="fa-solid fa-paper-plane text-2xl"></i>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black">Crafting your perfect trip...</h2>
          <p className="text-slate-500 max-w-sm mx-auto">Gemini is checking weather patterns, local favorites, and finding the best hidden gems in {destination}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-slate-100 flex">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`flex-1 transition-colors duration-500 ${step >= i ? 'bg-blue-600' : ''}`} />
        ))}
      </div>

      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full p-8 md:p-12 overflow-y-auto">
        <header className="mb-12">
          <button onClick={() => step > 1 ? setStep(s => s - 1) : navigate('/')} className="mb-8 text-slate-400 hover:text-slate-900 transition-colors">
            <i className="fa-solid fa-arrow-left text-xl"></i>
          </button>
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Step {step} of 5</span>
          <h1 className="text-4xl font-black">
            {step === 1 && "Where are we going?"}
            {step === 2 && "When are we exploring?"}
            {step === 3 && "How's the wallet looking?"}
            {step === 4 && "Who's coming along?"}
            {step === 5 && "What's your travel style?"}
          </h1>
        </header>

        <div className="flex-1">
          {step === 1 && (
            <div className="space-y-8">
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="text"
                  placeholder="Enter destination (e.g. Bali, Goa)"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-6 pl-16 pr-6 text-xl font-bold focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                {['Goa', 'Bali', 'Lakshadweep', 'Japan', 'Iceland'].map(chip => (
                  <button 
                    key={chip}
                    onClick={() => setDestination(chip)}
                    className="px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 font-bold hover:bg-slate-100 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2 uppercase">Start Date</label>
                  <input 
                    type="date"
                    value={dates.start}
                    onChange={e => setDates(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-6 px-8 text-lg font-bold focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2 uppercase">End Date</label>
                  <input 
                    type="date"
                    value={dates.end}
                    onChange={e => setDates(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-6 px-8 text-lg font-bold focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
              {dates.start && dates.end && (
                <div className="bg-blue-50 p-6 rounded-[32px] flex items-center gap-4 text-blue-900 border border-blue-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-cloud-sun text-xl"></i>
                  </div>
                  <div>
                    <p className="font-bold">{calculateDays()} days adventure</p>
                    <p className="text-sm opacity-70">We'll check season & weather for these dates 🌦️</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10">
              <div className="flex gap-4">
                <button 
                  onClick={() => setBudget(1000)} 
                  className={`flex-1 py-8 rounded-[32px] border-2 transition-all flex flex-col items-center gap-3 ${budget ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200' : 'bg-slate-50 border-slate-100'}`}
                >
                  <i className="fa-solid fa-money-bill-wave text-2xl"></i>
                  <span className="font-bold">I have a budget</span>
                </button>
                <button 
                  onClick={() => setBudget(undefined)} 
                  className={`flex-1 py-8 rounded-[32px] border-2 transition-all flex flex-col items-center gap-3 ${!budget ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200' : 'bg-slate-50 border-slate-100'}`}
                >
                  <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
                  <span className="font-bold">Show me options</span>
                </button>
              </div>
              {budget !== undefined && (
                <div className="space-y-6">
                  <input 
                    type="range" 
                    min="100" 
                    max="10000" 
                    step="500"
                    value={budget}
                    onChange={e => setBudget(Number(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between items-center bg-slate-900 text-white p-6 rounded-[32px]">
                    <span className="text-lg font-bold">$ {budget}</span>
                    <span className="text-xs uppercase font-black opacity-50">Mid-range trip ✨</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="grid grid-cols-2 gap-4">
              {Object.values(TravelWho).map(w => (
                <button 
                  key={w}
                  onClick={() => setWho(w)}
                  className={`py-8 rounded-[32px] border-2 flex flex-col items-center gap-3 transition-all ${who === w ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200' : 'bg-slate-50 border-slate-100 hover:border-slate-300'}`}
                >
                  <i className={`fa-solid ${
                    w === TravelWho.SOLO ? 'fa-user' : 
                    w === TravelWho.COUPLE ? 'fa-heart' : 
                    w === TravelWho.FRIENDS ? 'fa-user-group' : 'fa-users'
                  } text-2xl`}></i>
                  <span className="font-bold">{w}</span>
                </button>
              ))}
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-wrap gap-3">
              {Object.values(TravelStyle).map(style => (
                <button 
                  key={style}
                  onClick={() => handleStyleToggle(style)}
                  className={`px-8 py-4 rounded-[24px] border-2 font-bold transition-all ${styles.includes(style) ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200' : 'bg-slate-50 border-slate-100 hover:border-slate-300'}`}
                >
                  {style}
                </button>
              ))}
            </div>
          )}
        </div>

        <footer className="mt-12 py-8 sticky bottom-0 bg-white">
          {step < 5 ? (
            <button 
              onClick={() => setStep(s => s + 1)}
              disabled={step === 1 && !destination}
              className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              Next Step <i className="fa-solid fa-arrow-right"></i>
            </button>
          ) : (
            <button 
              onClick={handleGenerate}
              className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-300"
            >
              Generate My Trip 🚀
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

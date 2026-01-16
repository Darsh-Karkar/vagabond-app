
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GeminiService } from '../services/geminiService';

export const MapView: React.FC = () => {
  const { id } = useParams();
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Mocked places for the map view
  const places = [
    { id: '1', name: 'Agatti Island', type: 'major', lat: 10.85, lng: 72.18, unlocked: true },
    { id: '2', name: 'Kadmat Island', type: 'planned', lat: 11.21, lng: 72.78, unlocked: false },
    { id: '3', name: 'Bangaram Lagoon', type: 'highlight', lat: 10.92, lng: 72.28, unlocked: false }
  ];

  const handleAskAi = async () => {
    if (!selectedPlace) return;
    setIsLoadingAi(true);
    try {
      const resp = await GeminiService.askAboutPlace(selectedPlace.name, "Lakshadweep", "Tell me the best thing to do here and an estimate of cost.");
      setAiMessage(resp || "No information found.");
    } catch (e) {
      setAiMessage("Sorry, I couldn't get that info right now.");
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="h-full relative overflow-hidden bg-slate-200">
      {/* Top Bar Navigation */}
      <div className="absolute top-6 left-6 right-6 z-40 flex items-center justify-between gap-4">
        <div className="bg-white/90 backdrop-blur-md border border-white/40 px-6 py-4 rounded-[32px] shadow-2xl flex items-center gap-4">
          <button className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-all">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div>
            <h2 className="font-black text-slate-900 leading-tight">Lakshadweep Explorer</h2>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 tracking-wider">
              <span>Day 1 of 5</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>12:45 PM</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="bg-white p-4 rounded-2xl shadow-xl hover:bg-slate-50 transition-all">
             <i className="fa-solid fa-layer-group"></i>
          </button>
          <button className="bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-xl shadow-blue-200 font-bold flex items-center gap-2">
            <i className="fa-solid fa-calendar"></i> Itinerary
          </button>
        </div>
      </div>

      {/* Mock Map Interface (In reality, use Mapbox/Leaflet) */}
      <div className="absolute inset-0 bg-[#E5E9EC]">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Pins */}
        {places.map(place => (
          <button
            key={place.id}
            onClick={() => setSelectedPlace(place)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group transition-transform hover:scale-125"
            style={{ left: `${30 + place.lng - 72}%`, top: `${50 - (place.lat - 10) * 10}%` }}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-2xl transition-all ${
              place.unlocked ? 'bg-orange-500 text-white animate-pulse' : 'bg-slate-400 text-white grayscale'
            }`}>
              <i className={`fa-solid ${place.type === 'major' ? 'fa-star' : 'fa-location-dot'} text-lg`}></i>
            </div>
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md whitespace-nowrap">
              {place.name}
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Drawer (Context Panel) */}
      <div className={`absolute bottom-0 left-0 right-0 z-40 transition-transform duration-500 ${selectedPlace ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-xl mx-auto bg-white rounded-t-[48px] p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border border-slate-100">
          <div className="w-16 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
          
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-3xl">
                <i className="fa-solid fa-umbrella-beach"></i>
              </div>
              <div>
                <h3 className="text-2xl font-black">{selectedPlace?.name}</h3>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Major Destination • Islands</p>
              </div>
            </div>
            <button onClick={() => setSelectedPlace(null)} className="text-slate-300 hover:text-slate-900">
              <i className="fa-solid fa-circle-xmark text-3xl"></i>
            </button>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8">
            Agatti Island is the gateway to Lakshadweep. It's famous for its crystal clear lagoon, white sandy beaches, and vibrant marine life.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-[24px]">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Best Time</p>
              <p className="font-bold">4:00 PM - 6:30 PM</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-[24px]">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Estimated Cost</p>
              <p className="font-bold">$20 - $45</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-slate-900 text-white py-5 rounded-[24px] font-black shadow-xl shadow-slate-200 flex items-center justify-center gap-2">
              <i className="fa-solid fa-plus"></i> Add to Day 1
            </button>
            <button 
              onClick={() => { setIsChatOpen(true); handleAskAi(); }}
              className="w-20 bg-blue-100 text-blue-600 py-5 rounded-[24px] flex items-center justify-center text-2xl hover:bg-blue-200 transition-all"
            >
              <i className="fa-solid fa-robot"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Floating AI Assistant (Mini Chat) */}
      {isChatOpen && (
        <div className="absolute bottom-6 right-6 left-6 md:left-auto md:w-[400px] z-50 bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl border border-white/10 ring-8 ring-slate-900/5 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
                <i className="fa-solid fa-sparkles text-lg"></i>
              </div>
              <h4 className="font-black">Travel AI</h4>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="text-white/40 hover:text-white">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <div className="space-y-4 mb-6 max-h-[200px] overflow-y-auto pr-2">
            <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none">
              {isLoadingAi ? (
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed">{aiMessage || "I'm ready to help with your trip to Agatti Island!"}</p>
              )}
            </div>
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-blue-500 transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all">
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </div>
      )}

      {/* Manual Unlock Floating Action Button */}
      <button 
        className="fixed bottom-24 right-6 md:bottom-10 md:right-10 w-20 h-20 bg-orange-500 text-white rounded-[28px] shadow-2xl shadow-orange-200 z-50 flex flex-col items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        onClick={() => alert("Simulating GPS location... Arrived at Agatti Island!")}
      >
        <i className="fa-solid fa-unlock-keyhole text-2xl mb-1"></i>
        <span className="text-[10px] font-black uppercase tracking-widest">Unlock</span>
      </button>
    </div>
  );
};

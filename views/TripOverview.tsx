
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_TRIPS } from '../constants';

export const TripOverview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const trip = MOCK_TRIPS.find(t => t.id === id) || MOCK_TRIPS[0];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 bg-slate-50/80 backdrop-blur-md z-30 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black">{trip.destination}</h1>
          <p className="text-slate-500 font-bold flex items-center gap-3 mt-1">
            <span><i className="fa-regular fa-calendar mr-1"></i> Aug 10 - 15</span>
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
            <span>5 Days</span>
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-white border border-slate-200 px-6 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-colors">Edit</button>
          <button 
            onClick={() => navigate(`/trip/${trip.id}/map`)}
            className="flex-1 md:flex-none bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
          >
            Start Exploring 🗺️
          </button>
        </div>
      </header>

      {/* Reality Check Card */}
      <section className="bg-orange-50 border border-orange-100 rounded-[40px] p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <i className="fa-solid fa-triangle-exclamation text-[120px] -rotate-12"></i>
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-widest text-xs mb-4">
            <i className="fa-solid fa-circle-info"></i>
            Reality Check
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-6">Visiting Lakshadweep in August?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm shrink-0">
                <i className="fa-solid fa-cloud-rain text-xl"></i>
              </div>
              <div>
                <p className="font-bold">Monsoon Peak 🌧️</p>
                <p className="text-sm text-slate-600">Heavy rain expected. Scuba diving is limited, and island transfers might be delayed.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-green-500 shadow-sm shrink-0">
                <i className="fa-solid fa-tag text-xl"></i>
              </div>
              <div>
                <p className="font-bold">Lower Crowds 💸</p>
                <p className="text-sm text-slate-600">Great for budget travelers. Resorts are 40% cheaper than peak December dates.</p>
              </div>
            </div>
          </div>
          <button className="mt-8 text-orange-600 font-bold hover:underline flex items-center gap-2">
            Adjust dates or destination <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </section>

      {/* Itinerary Preview */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Trip Itinerary</h3>
          <button onClick={() => navigate(`/trip/${trip.id}/itinerary`)} className="text-blue-600 font-bold">View Full Details</button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(day => (
            <div key={day} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-blue-200 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-400 font-black">
                  <span className="text-[10px] uppercase">Day</span>
                  <span className="text-xl">{day}</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">
                    {day === 1 && "Arrival & Beach Sunset"}
                    {day === 2 && "Island Hopping Adventure"}
                    {day === 3 && "Cultural Experience & Local Food"}
                  </h4>
                  <p className="text-slate-400 text-sm">3 Places to explore</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

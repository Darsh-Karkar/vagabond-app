
import React from 'react';
import { MOCK_TRIPS } from '../constants';

export const Journey: React.FC = () => {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-black mb-2">My Journey</h1>
        <p className="text-slate-500 font-bold">Reliving 14 experiences across 3 countries.</p>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Trips', value: '12', icon: 'fa-route', color: 'blue' },
          { label: 'Places', value: '48', icon: 'fa-location-dot', color: 'orange' },
          { label: 'Distance', value: '4,210 km', icon: 'fa-plane', color: 'emerald' },
          { label: 'Memories', value: '124', icon: 'fa-camera', color: 'rose' }
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 text-lg bg-${stat.color}-50 text-${stat.color}-600`}>
              <i className={`fa-solid ${stat.icon}`}></i>
            </div>
            <p className="text-2xl font-black">{stat.value}</p>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative pl-12 md:pl-20 space-y-16">
        {/* Timeline Path Line */}
        <div className="absolute left-6 md:left-10 top-0 bottom-0 w-1 bg-slate-200 rounded-full"></div>
        
        {MOCK_TRIPS.map((trip, idx) => (
          <div key={trip.id} className="relative group">
            {/* Timeline Marker */}
            <div className={`absolute -left-12 md:-left-16 top-0 w-12 h-12 md:w-16 md:h-16 rounded-[24px] md:rounded-[28px] border-8 border-slate-50 flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110 z-10 ${
              idx === 0 ? 'bg-orange-500' : 'bg-slate-400'
            }`}>
              <i className={`fa-solid ${idx === 0 ? 'fa-bolt' : 'fa-check'}`}></i>
            </div>
            
            <div className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img src={trip.image} className="w-full h-full object-cover" />
                </div>
                <div className="md:w-2/3 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-black">{trip.destination}</h3>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">August 2024 • 5 Days</p>
                      </div>
                      <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-black uppercase">
                        {trip.status === 'IN_PROGRESS' ? 'Active' : 'Completed'}
                      </span>
                    </div>
                    <div className="flex gap-3 mb-6">
                      <div className="bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold">🏝️ 4 Unlocked</div>
                      <div className="bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold">🌊 12 km Traveled</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 md:flex-none bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold">View Story</button>
                    <button className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center hover:bg-slate-200 transition-colors">
                      <i className="fa-solid fa-share-nodes"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

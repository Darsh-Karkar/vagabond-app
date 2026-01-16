
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TripStatus, Trip } from '../types';
import { MOCK_TRIPS, MOCK_BADGES } from '../constants';

const TripCard = ({ trip, onClick }: { trip: Trip; onClick: () => void }) => {
  const progress = (trip.unlockedCount / trip.totalPlaces) * 100;
  
  return (
    <div 
      onClick={onClick}
      className="min-w-[280px] md:min-w-[340px] bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="h-40 relative">
        <img src={trip.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
            trip.status === TripStatus.IN_PROGRESS ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'
          }`}>
            {trip.status === TripStatus.IN_PROGRESS ? '🔓 In Progress' : '🧭 Planning'}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-1">{trip.destination}</h3>
        <p className="text-slate-500 text-sm mb-4">
          <i className="fa-regular fa-calendar-days mr-2"></i>
          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
            <span>Places Unlocked</span>
            <span>{trip.unlockedCount}/{trip.totalPlaces}</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hey Darsh 👋</h2>
          <p className="text-slate-500 font-medium">Ready to explore? Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-cloud-sun text-lg"></i>
          </div>
          <div>
            <p className="text-sm font-bold">28°C, Partly Cloudy</p>
            <p className="text-xs text-slate-500">San Francisco, CA</p>
          </div>
        </div>
      </header>

      {/* Primary CTA */}
      <section 
        onClick={() => navigate('/plan/new')}
        className="relative h-48 md:h-64 rounded-[40px] overflow-hidden group cursor-pointer shadow-xl shadow-blue-100"
      >
        <img src="https://picsum.photos/seed/travel/1200/600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/40 to-transparent flex items-center p-8 md:p-12">
          <div className="max-w-md text-white">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Start your next adventure.</h2>
            <button className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-lg shadow-white/10">
              Plan a New Trip <i className="fa-solid fa-compass"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Active Trips */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Active Trips</h3>
          <button className="text-blue-600 font-bold hover:underline">View All</button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x">
          {MOCK_TRIPS.map(trip => (
            <TripCard key={trip.id} trip={trip} onClick={() => navigate(`/trip/${trip.id}/overview`)} />
          ))}
        </div>
      </section>

      {/* Gamified Section */}
      <section className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-yellow-400">
              <i className="fa-solid fa-trophy text-2xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">You unlocked 3 new places!</h3>
              <p className="text-white/60 text-sm">Last trip rewards • Lakshadweep Explorer</p>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
            {MOCK_BADGES.filter(b => b.unlocked).map(badge => (
              <div key={badge.id} className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 flex items-center gap-3 min-w-[180px]">
                <i className={`fa-solid ${badge.icon} text-yellow-400`}></i>
                <span className="text-sm font-bold">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

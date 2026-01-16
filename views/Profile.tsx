
import React from 'react';
import { MOCK_BADGES } from '../constants';

export const Profile: React.FC = () => {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-12">
      {/* Header Profile Info */}
      <header className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-[48px] overflow-hidden ring-8 ring-blue-50 ring-offset-4 ring-offset-white relative">
          <img src="https://picsum.photos/seed/darsh/300" className="w-full h-full object-cover" />
          <div className="absolute bottom-3 right-3 w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white border-4 border-white">
            <i className="fa-solid fa-pen-to-square text-xs"></i>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-black mb-1">Darsh K.</h1>
          <p className="text-slate-500 font-bold text-lg mb-6 flex items-center justify-center md:justify-start gap-2">
            <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm uppercase font-black tracking-widest">Explorer Lv. 3</span>
            <span>•</span>
            <span className="text-slate-400">Adventure Seeker</span>
          </p>
          <div className="flex gap-3">
             <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2">
               Share Profile <i className="fa-solid fa-arrow-up-right-from-square"></i>
             </button>
             <button className="bg-white border border-slate-200 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
               <i className="fa-solid fa-gear text-slate-400"></i>
             </button>
          </div>
        </div>
      </header>

      {/* World Map Section */}
      <section className="bg-slate-900 rounded-[48px] p-8 md:p-12 text-white overflow-hidden relative min-h-[400px]">
         <div className="relative z-10">
           <h3 className="text-2xl font-black mb-2">Footprint</h3>
           <p className="text-white/60 font-bold uppercase tracking-widest text-xs mb-10">You have explored 4% of the world</p>
           
           {/* Mock Interactive Map - In real apps use D3 or WorldMap component */}
           <div className="w-full aspect-video bg-white/5 rounded-[40px] border border-white/10 flex items-center justify-center relative group">
              <i className="fa-solid fa-earth-americas text-[160px] text-white/5 group-hover:scale-110 transition-transform duration-1000"></i>
              <div className="absolute inset-0 flex items-center justify-center">
                 <p className="font-black text-xl text-white/40">Interactive World Map</p>
              </div>
              {/* Mock Highlighted Spots */}
              <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6] animate-ping"></div>
              <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_20px_#f97316] animate-pulse"></div>
           </div>
         </div>
      </section>

      {/* Stats and Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-6">
          <h3 className="text-2xl font-bold">Explorer Stats</h3>
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 space-y-8 shadow-sm">
             <div className="space-y-2">
               <div className="flex justify-between font-black uppercase tracking-widest text-xs text-slate-400">
                 <span>Progress to Level 4</span>
                 <span>720 / 1000 XP</span>
               </div>
               <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full w-[72%]"></div>
               </div>
             </div>
             
             <div className="grid grid-cols-2 gap-6">
               <div className="space-y-1">
                 <p className="text-3xl font-black">14</p>
                 <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Trips Completed</p>
               </div>
               <div className="space-y-1">
                 <p className="text-3xl font-black">28</p>
                 <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Unique Cities</p>
               </div>
               <div className="space-y-1">
                 <p className="text-3xl font-black">1.2k</p>
                 <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Memories Created</p>
               </div>
               <div className="space-y-1">
                 <p className="text-3xl font-black">84%</p>
                 <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Unlock Streak</p>
               </div>
             </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Badges Earned</h3>
            <button className="text-blue-600 font-bold hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {MOCK_BADGES.map(badge => (
               <div key={badge.id} className={`p-6 rounded-[32px] border flex flex-col items-center text-center gap-3 transition-all ${
                 badge.unlocked ? 'bg-white border-slate-100' : 'bg-slate-50 border-slate-100 opacity-50 grayscale'
               }`}>
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-2 ${
                   badge.unlocked ? 'bg-yellow-50 text-yellow-500 shadow-lg shadow-yellow-100' : 'bg-slate-200 text-slate-400'
                 }`}>
                   <i className={`fa-solid ${badge.icon}`}></i>
                 </div>
                 <h4 className="font-bold">{badge.name}</h4>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{badge.description}</p>
               </div>
             ))}
          </div>
        </section>
      </div>
    </div>
  );
};


import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavItem = ({ to, icon, label }: { to: string; icon: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col md:flex-row items-center gap-1 md:gap-4 p-3 md:px-6 rounded-xl transition-all ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
          : 'text-slate-500 hover:bg-slate-100'
      }`
    }
  >
    <i className={`fa-solid ${icon} text-lg md:text-xl`}></i>
    <span className="text-[10px] md:text-sm font-semibold">{label}</span>
  </NavLink>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isMapOrItinerary = location.pathname.includes('/map') || location.pathname.includes('/itinerary') || location.pathname.includes('/new');

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-6 z-50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <i className="fa-solid fa-compass text-xl"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Vagabond</h1>
        </div>
        
        <nav className="flex flex-col gap-2">
          <NavItem to="/" icon="fa-house" label="Home" />
          <NavItem to="/plan/new" icon="fa-route" label="Plan" />
          <NavItem to="/journey" icon="fa-trophy" label="Journey" />
          <NavItem to="/profile" icon="fa-user" label="Profile" />
        </nav>

        <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
              <img src="https://picsum.photos/100" alt="Avatar" />
            </div>
            <div>
              <p className="text-sm font-bold">Darsh 👋</p>
              <p className="text-xs text-slate-500">Explorer Lv. 3</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-slate-50 pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2 flex justify-between items-center z-50">
        <NavItem to="/" icon="fa-house" label="Home" />
        <NavItem to="/plan/new" icon="fa-route" label="Plan" />
        <NavItem to="/journey" icon="fa-trophy" label="Journey" />
        <NavItem to="/profile" icon="fa-user" label="Profile" />
      </nav>
    </div>
  );
};

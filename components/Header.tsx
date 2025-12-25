
import React from 'react';
import { Search, Bell, User, ChevronRight } from 'lucide-react';

interface HeaderProps {
  activeView: string;
  eventName: string;
}

const Header: React.FC<HeaderProps> = ({ activeView, eventName }) => {
  return (
    <header className="h-20 glass border-b border-slate-200 px-8 flex items-center justify-between z-40">
      <div className="flex items-center gap-4">
        <div className="flex items-center text-sm text-slate-400 gap-2">
          <span>Events</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium truncate max-w-[150px] md:max-w-none">{eventName}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            {activeView === 'dashboard' ? 'View' : 'Edit'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search events, sponsors..." 
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all w-64"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-8 w-px bg-slate-200"></div>

          <button className="flex items-center gap-3 pl-2 py-1 pr-1 hover:bg-slate-50 rounded-full transition-all group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900 leading-none">Sarah Smith</p>
              <p className="text-xs text-slate-400 mt-1">Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white shadow-sm ring-2 ring-transparent group-hover:ring-indigo-100 transition-all overflow-hidden">
              <img src="https://picsum.photos/seed/sarah/100/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

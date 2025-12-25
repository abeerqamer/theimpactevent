
import React from 'react';
import { LayoutDashboard, Calendar, Settings, HelpCircle, LogOut, ChevronRight, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeView: 'dashboard' | 'events';
  setActiveView: (view: 'dashboard' | 'events') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'events', icon: Calendar, label: 'Events' },
  ];

  return (
    <aside className="w-64 glass border-r border-slate-200 hidden md:flex flex-col z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#5E7B98] rounded-xl flex items-center justify-center shadow-lg shadow-[#5E7B98]/20">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-xl text-slate-800 tracking-tight">Impact Event</span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as any)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
              activeView === item.id 
                ? 'bg-[#5E7B98] text-white shadow-xl shadow-[#5E7B98]/20' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className={`w-5 h-5 ${activeView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span className="font-bold text-sm">{item.label}</span>
            </div>
            {activeView === item.id && <ChevronRight className="w-4 h-4" />}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors font-bold text-sm group">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;


import React from 'react';
import { Plus, Calendar, MapPin, MoreVertical, Edit3, ArrowRight } from 'lucide-react';
import { EventData } from '../types';

interface EventListProps {
  events: EventData[];
  onCreateNew: () => void;
  onEdit: (event: EventData) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onCreateNew, onEdit }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">All Events</h1>
          <p className="text-slate-500 mt-1">Manage and curate your event experiences.</p>
        </div>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-6 py-3 bg-[#5E7B98] text-white rounded-2xl font-semibold shadow-lg shadow-[#5E7B98]/20 hover:bg-[#4A627B] transition-all transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Create New Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => onEdit(event)}
            className="group bg-white border border-slate-200 rounded-3xl p-6 hover:border-[#5E7B98] hover:shadow-2xl hover:shadow-[#5E7B98]/5 transition-all cursor-pointer relative"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${event.status ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                {event.logo ? (
                  <img src={event.logo} className="w-full h-full object-cover rounded-2xl" alt="" />
                ) : (
                  <Calendar className="w-6 h-6" />
                )}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${event.status ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                {event.status ? 'Live' : 'Draft'}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#5E7B98] transition-colors">{event.name}</h3>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>{event.date ? new Date(event.date).toLocaleDateString() : 'No date set'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>{event.location || 'No location set'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}${event.id}/32/32`} alt="" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#5E7B98] flex items-center justify-center text-[10px] text-white font-bold">
                  +12
                </div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-[#5E7B98]/10 group-hover:text-[#5E7B98] transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}

        <div
          onClick={onCreateNew}
          className="group border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-[#5E7B98] hover:bg-[#5E7B98]/5 hover:text-[#5E7B98] transition-all cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-bold">Add Another Event</span>
        </div>
      </div>
    </div>
  );
};

export default EventList;

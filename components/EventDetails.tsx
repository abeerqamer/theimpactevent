import React from 'react';
import {
    ArrowLeft, Edit3, Calendar, MapPin, Link as LinkIcon,
    Facebook, Instagram, Twitter, Linkedin, Users2,
    ListTodo, PieChart, QrCode as QrIcon, Clock, User
} from 'lucide-react';
import { EventData, SocialLinks } from '../types';

interface EventDetailsProps {
    event: EventData;
    onBack: () => void;
    onEdit: () => void;
}

const SocialIcon = ({ platform }: { platform: keyof SocialLinks }) => {
    switch (platform) {
        case 'facebook': return <Facebook className="w-5 h-5" />;
        case 'instagram': return <Instagram className="w-5 h-5" />;
        case 'twitter': return <Twitter className="w-5 h-5" />;
        case 'linkedin': return <Linkedin className="w-5 h-5" />;
        default: return <LinkIcon className="w-5 h-5" />;
    }
};

const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack, onEdit }) => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-400 hover:text-[#5E7B98] transition-colors mb-4 font-semibold text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Events
                    </button>
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">{event.name}</h1>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${event.status ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                            }`}>
                            {event.status ? 'Live' : 'Draft'}
                        </span>
                    </div>
                </div>
                <button
                    onClick={onEdit}
                    className="flex items-center gap-2 px-6 py-3 bg-[#5E7B98] text-white rounded-2xl font-bold shadow-lg shadow-[#5E7B98]/20 hover:bg-[#4A627B] transition-all"
                >
                    <Edit3 className="w-5 h-5" /> Edit Event
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column - Basics & Socials */}
                <div className="space-y-8 lg:col-span-2">

                    {/* Basics Card */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-8 bg-[#5E7B98] rounded-full"></span>
                            Event Basics
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-[#5E7B98]">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date & Time</p>
                                    <p className="font-semibold text-slate-700">
                                        {event.date ? new Date(event.date).toLocaleString(undefined, {
                                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                        }) : 'TBD'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-[#5E7B98]">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                                    <p className="font-semibold text-slate-700">{event.location || 'TBD'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-2xl">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Description</p>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{event.description || 'No description provided.'}</p>
                        </div>

                        {Object.keys(event.socialLinks).length > 0 && (
                            <div className="flex flex-wrap gap-3 pt-2">
                                {Object.entries(event.socialLinks).map(([platform, url]) => (
                                    url && (
                                        <a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-[#5E7B98] hover:text-white transition-all font-semibold text-sm"
                                        >
                                            <SocialIcon platform={platform as keyof SocialLinks} />
                                            <span className="capitalize">{platform}</span>
                                        </a>
                                    )
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Itinerary */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-8 bg-[#5E7B98] rounded-full"></span>
                            Itinerary
                        </h2>

                        {event.itinerary.length > 0 ? (
                            <div className="space-y-4">
                                {event.itinerary.map((session, idx) => (
                                    <div key={session.id || idx} className="flex gap-4 p-4 border border-slate-100 rounded-2xl hover:border-[#5E7B98]/30 transition-colors">
                                        <div className="flex flex-col items-center justify-center w-20 bg-slate-50 rounded-xl p-2 text-center">
                                            <Clock className="w-4 h-4 text-[#5E7B98] mb-1" />
                                            <span className="text-xs font-bold text-slate-700">{session.startTime}</span>
                                            <span className="text-[10px] text-slate-400 gap-0.5 flex flex-col items-center">
                                                <div className="w-0.5 h-2 bg-slate-200 my-0.5"></div>
                                                {session.endTime}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-800 mb-1">{session.title}</h3>
                                            {session.speaker && (
                                                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                                                    <User className="w-3 h-3" />
                                                    <span>{session.speaker}</span>
                                                </div>
                                            )}
                                            <p className="text-sm text-slate-500">{session.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-400 italic">No sessions scheduled.</p>
                        )}
                    </div>

                    {/* Sponsors */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-8 bg-[#5E7B98] rounded-full"></span>
                            Sponsors
                        </h2>

                        {event.sponsors.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {event.sponsors.map((sponsor, idx) => (
                                    <div key={sponsor.id || idx} className="p-6 border border-slate-100 rounded-2xl flex flex-col gap-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300">
                                                {sponsor.logo ? <img src={sponsor.logo} className="w-full h-full object-cover rounded-xl" alt="" /> : <Users2 className="w-6 h-6" />}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800">{sponsor.name}</h4>
                                                {sponsor.website && (
                                                    <a href={sponsor.website} target="_blank" rel="noreferrer" className="text-xs text-[#5E7B98] hover:underline flex items-center gap-1">
                                                        <LinkIcon className="w-3 h-3" /> Website
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500">{sponsor.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-400 italic">No sponsors added.</p>
                        )}
                    </div>

                </div>

                {/* Right Column - Interaction & QR */}
                <div className="space-y-8">

                    {/* QR Code */}
                    <div className="bg-[#5E7B98] p-8 rounded-[2.5rem] text-white shadow-xl shadow-[#5E7B98]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-10 -mt-10"></div>

                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <QrIcon className="w-6 h-6" /> Event Access
                        </h2>

                        <div className="bg-white p-4 rounded-3xl mb-6 w-full aspect-square flex items-center justify-center">
                            <QrIcon className="w-full h-full text-slate-800" />
                        </div>

                        <button className="w-full py-3 bg-white text-[#5E7B98] rounded-xl font-bold hover:bg-slate-50 transition-colors">
                            Download QR Code
                        </button>
                    </div>

                    {/* Survey & Polls Summary */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-8 bg-[#5E7B98] rounded-full"></span>
                            Engagement
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg text-[#5E7B98]">
                                        <ListTodo className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-slate-700">Surveys</span>
                                        <span className="text-xs text-slate-400">{event.survey.length} Questions</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg text-[#5E7B98]">
                                        <PieChart className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-slate-700">Polls</span>
                                        <span className="text-xs text-slate-400">{event.polls.length} Active Polls</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {event.survey.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Survey Preview</p>
                                <div className="space-y-2">
                                    {event.survey.slice(0, 3).map((q, i) => (
                                        <p key={i} className="text-sm text-slate-600 truncate">• {q.question}</p>
                                    ))}
                                    {event.survey.length > 3 && <p className="text-xs text-slate-400 italic">+ {event.survey.length - 3} more</p>}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EventDetails;

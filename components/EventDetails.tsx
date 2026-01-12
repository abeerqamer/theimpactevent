import React from 'react';
import {
    ArrowLeft, Edit3, Calendar, MapPin, Link as LinkIcon,
    Facebook, Instagram, Twitter, Linkedin, Users2,
    ListTodo, PieChart, QrCode as QrIcon, Clock, User,
    Share2, ChevronRight, Download
} from 'lucide-react';
import { EventData, SocialLinks } from '../types';

interface EventDetailsProps {
    event: EventData;
    onBack: () => void;
    onEdit: () => void;
}

const SocialIcon = ({ platform }: { platform: keyof SocialLinks }) => {
    switch (platform) {
        case 'facebook': return <Facebook className="w-4 h-4" />;
        case 'instagram': return <Instagram className="w-4 h-4" />;
        case 'twitter': return <Twitter className="w-4 h-4" />;
        case 'linkedin': return <Linkedin className="w-4 h-4" />;
        default: return <LinkIcon className="w-4 h-4" />;
    }
};

const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack, onEdit }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Navigation & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <button
                    onClick={onBack}
                    className="group flex items-center gap-2 text-slate-400 hover:text-slate-800 transition-colors px-2"
                >
                    <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:border-[#5E7B98]/30 transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm">Back to Dashboard</span>
                </button>

                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-white text-slate-600 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2 text-sm shadow-sm">
                        <Share2 className="w-4 h-4" /> Share
                    </button>
                    <button
                        onClick={onEdit}
                        className="px-5 py-2.5 bg-[#5E7B98] text-white rounded-xl font-bold shadow-lg shadow-[#5E7B98]/20 hover:bg-[#4A627B] transition-all flex items-center gap-2 text-sm"
                    >
                        <Edit3 className="w-4 h-4" /> Edit Event
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Column: Event Hero & Key Info (8 cols) */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Hero Card */}
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#5E7B98]/5 rounded-bl-[100%] -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700"></div>

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-6">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${event.status ? 'bg-emerald-100/50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'
                                    }`}>
                                    {event.status ? '● Live Event' : '○ Draft Mode'}
                                </span>
                                {event.logo && <img src={event.logo} alt="Logo" className="w-12 h-12 rounded-xl object-cover shadow-sm" />}
                            </div>

                            <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-4 leading-tight">{event.name}</h1>

                            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500 mb-8">
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                    <Calendar className="w-4 h-4 text-[#5E7B98]" />
                                    <span>{event.date ? new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Date TBD'}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                    <MapPin className="w-4 h-4 text-[#5E7B98]" />
                                    <span>{event.location || 'Location TBD'}</span>
                                </div>
                            </div>

                            <div className="prose prose-slate prose-sm max-w-none">
                                <p className="text-slate-600 leading-relaxed opacity-90">{event.description || 'No description provided for this event yet.'}</p>
                            </div>

                            {Object.keys(event.socialLinks).some(k => event.socialLinks[k as keyof SocialLinks]) && (
                                <div className="flex gap-3 mt-8 pt-8 border-t border-slate-100">
                                    {Object.entries(event.socialLinks).map(([platform, url]) => (
                                        url && (
                                            <a
                                                key={platform}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-[#5E7B98] hover:text-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#5E7B98]/20"
                                                title={platform}
                                            >
                                                <SocialIcon platform={platform as keyof SocialLinks} />
                                            </a>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Itinerary Timeline */}
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-[#5E7B98]" /> Itinerary
                        </h2>
                        <div className="relative pl-4 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                            {event.itinerary.map((session, idx) => (
                                <div key={session.id || idx} className="relative pl-8 group">
                                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-white bg-[#5E7B98] shadow-sm z-10 group-hover:scale-125 transition-transform"></div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
                                        <h3 className="font-bold text-slate-800 text-lg">{session.title}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-3">
                                        <span>{session.startTime} - {session.endTime}</span>
                                        {session.location && (
                                            <>
                                                <span>•</span>
                                                <span>{session.location}</span>
                                            </>
                                        )}
                                    </div>

                                    {session.speaker && (
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                            <User className="w-3 h-3" /> <span className="font-medium">{session.speaker}</span>
                                        </div>
                                    )}
                                    {session.description && (
                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            {session.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                            {event.itinerary.length === 0 && (
                                <p className="pl-8 text-slate-400 text-sm italic">No sessions added yet.</p>
                            )}
                        </div>
                    </div>

                </div>

                {/* Right Column: Key Metrics & QR (4 cols) */}
                <div className="lg:col-span-4 space-y-6">

                    {/* QR Code - Smaller & Compact */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                        <div className="bg-white p-2 border-2 border-dashed border-slate-200 rounded-2xl mb-4 shadow-inner">
                            <QrIcon className="w-24 h-24 text-slate-800" />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Event Access Code</p>
                        <div className="flex gap-2 w-full">
                            <button className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                <Download className="w-3 h-3" /> Save
                            </button>
                            <button className="px-3 py-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 border border-slate-200">
                                <LinkIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Engagement Section */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white shadow-lg shadow-indigo-200">
                                <PieChart className="w-4 h-4" />
                            </div>
                            <h3 className="font-bold text-slate-800">Live Engagement</h3>
                        </div>

                        {/* Polls */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Poll</span>
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full animate-pulse">● Live</span>
                            </div>
                            {event.polls.length > 0 ? (
                                <div className="space-y-3">
                                    <h4 className="font-bold text-slate-800 text-sm leading-tight">{event.polls[0].question}</h4>
                                    <div className="space-y-2">
                                        {event.polls[0].options.map((option, idx) => {
                                            const votes = event.polls[0].votes?.[idx] || 0;
                                            const totalVotes = event.polls[0].votes?.reduce((a, b) => a + b, 0) || 1;
                                            const percentage = Math.round((votes / totalVotes) * 100);

                                            return (
                                                <div key={idx} className="relative group">
                                                    <div className="flex justify-between text-xs font-medium text-slate-600 mb-1 z-10 relative">
                                                        <span>{option}</span>
                                                        <span className="font-bold">{percentage}%</span>
                                                    </div>
                                                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-[#5E7B98] rounded-full transition-all duration-1000 ease-out"
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-slate-400 font-medium">{event.polls[0].votes?.reduce((a, b) => a + b, 0) || 0} votes total</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-xs text-slate-400 italic">No active polls.</p>
                            )}
                        </div>

                        <div className="h-px bg-slate-100 w-full"></div>

                        {/* Surveys */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Feedback</span>
                            </div>
                            {event.survey.length > 0 ? (
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-sm mb-1">{event.survey[0].question}</h4>
                                            <div className="flex items-center gap-2">
                                                <ListTodo className="w-3 h-3 text-slate-400" />
                                                <span className="text-xs text-slate-500">{event.survey[0].responseCount || 0} responses</span>
                                            </div>
                                        </div>
                                        <button className="text-xs font-bold text-white bg-[#5E7B98] px-3 py-1.5 rounded-lg hover:bg-[#4A627B] transition-colors shadow-sm">
                                            View
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-xs text-slate-400 italic">No surveys active.</p>
                            )}
                        </div>
                    </div>

                    {/* Sponsors List */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-800 text-sm">Sponsors ({event.sponsors.length})</h3>
                            <button className="text-[10px] font-bold text-[#5E7B98] hover:underline">Manage</button>
                        </div>
                        <div className="space-y-3">
                            {event.sponsors.map((sponsor, idx) => (
                                <div key={sponsor.id || idx} className="flex flex-col p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#5E7B98]/30 transition-all group hover:bg-white hover:shadow-md">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-slate-300 shadow-sm shrink-0 overflow-hidden">
                                            {sponsor.logo ? <img src={sponsor.logo} className="w-full h-full object-cover" alt="" /> : <Users2 className="w-5 h-5" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-slate-800 text-base truncate">{sponsor.name}</h4>
                                            <p className="text-xs text-slate-500 line-clamp-2 mt-1 mb-2">{sponsor.description}</p>

                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200/50">
                                                <a href={sponsor.website} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#5E7B98] hover:underline truncate max-w-[120px]">
                                                    {sponsor.website.replace(/^https?:\/\//, '')}
                                                </a>

                                                {sponsor.socialLinks && (
                                                    <div className="flex items-center gap-2">
                                                        {Object.entries(sponsor.socialLinks).map(([platform, url]) => (
                                                            url && (
                                                                <a
                                                                    key={platform}
                                                                    href={url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-slate-400 hover:bg-[#5E7B98] hover:text-white transition-all shadow-sm"
                                                                    title={platform}
                                                                >
                                                                    <SocialIcon platform={platform as keyof SocialLinks} />
                                                                </a>
                                                            )
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {event.sponsors.length === 0 && <p className="text-xs text-slate-400 text-center py-4">No sponsors yet.</p>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EventDetails;

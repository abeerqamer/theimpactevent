
import React from 'react';
import { 
  QrCode, ClipboardList, Target, TrendingUp, Users, 
  BarChart3, Activity, PieChart, MousePointer2, 
  ChevronRight, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, PieChart as RePieChart, Pie
} from 'recharts';
import { EventData } from '../types';

const engagementData = [
  { name: '08:00', scans: 45, surveys: 12 },
  { name: '09:00', scans: 180, surveys: 45 },
  { name: '10:00', scans: 320, surveys: 110 },
  { name: '11:00', scans: 290, surveys: 85 },
  { name: '12:00', scans: 450, surveys: 190 },
  { name: '13:00', scans: 380, surveys: 150 },
  { name: '14:00', scans: 510, surveys: 210 },
];

const pollResults = [
  { name: 'Excellent', value: 65, color: '#5E7B98' },
  { name: 'Good', value: 25, color: '#8BA4BC' },
  { name: 'Average', value: 7, color: '#BDC9D6' },
  { name: 'Poor', value: 3, color: '#E2E8F0' },
];

const sponsorData = [
  { name: 'Axel Tech', clicks: 420, rate: '+12%' },
  { name: 'Luminary', clicks: 280, rate: '+5%' },
  { name: 'Horizon', clicks: 195, rate: '-2%' },
];

const StatCard = ({ icon: Icon, label, value, trend, isPositive }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#5E7B98]/20 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#5E7B98]/5 group-hover:bg-[#5E7B98] transition-colors">
        <Icon className="w-6 h-6 text-[#5E7B98] group-hover:text-white transition-colors" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      )}
    </div>
    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{label}</p>
    <h3 className="text-3xl font-black text-slate-800 mt-1">{value}</h3>
  </div>
);

const Dashboard: React.FC<{ eventData: EventData }> = ({ eventData }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Impact Analytics</h1>
          <p className="text-slate-500 font-medium">Real-time performance for <span className="text-[#5E7B98] font-bold">{eventData.name}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Live Updates</span>
          </div>
          <button className="p-2.5 bg-[#5E7B98] text-white rounded-xl shadow-lg shadow-[#5E7B98]/20 hover:scale-105 transition-transform">
            <Activity className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Attendees" value="1,248" trend="14%" isPositive={true} />
        <StatCard icon={QrCode} label="Scan Volume" value="4,821" trend="28%" isPositive={true} />
        <StatCard icon={ClipboardList} label="Survey Completion" value="86%" trend="2.4%" isPositive={true} />
        <StatCard icon={PieChart} label="Poll Responses" value="912" trend="5%" isPositive={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Velocity Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-lg text-slate-800">Engagement Velocity</h3>
              <p className="text-sm text-slate-400">Hourly activity breakdown</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#5E7B98] rounded-full"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Scans</span>
              </div>
              <div className="flex items-center gap-2 ml-2">
                <div className="w-3 h-3 bg-[#8BA4BC] rounded-full"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Surveys</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5E7B98" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#5E7B98" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip 
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '12px'}}
                  cursor={{stroke: '#5E7B98', strokeWidth: 1, strokeDasharray: '4 4'}}
                />
                <Area type="monotone" dataKey="scans" stroke="#5E7B98" strokeWidth={3} fill="url(#colorScans)" fillOpacity={1} />
                <Area type="monotone" dataKey="surveys" stroke="#8BA4BC" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Polling Insights Bento Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="font-bold text-lg text-slate-800 mb-2">Polling Sentiment</h3>
          <p className="text-sm text-slate-400 mb-8">"Overall Event Satisfaction"</p>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={pollResults}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pollResults.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
            {pollResults.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sponsor Performance */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-800">Sponsor Impact</h3>
            <button className="text-[#5E7B98] text-xs font-bold hover:underline">Full Report</button>
          </div>
          <div className="space-y-4">
            {sponsorData.map((sponsor) => (
              <div key={sponsor.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-white hover:ring-2 hover:ring-[#5E7B98]/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#5E7B98] font-bold text-xs uppercase">
                    {sponsor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{sponsor.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{sponsor.clicks} Interactions</p>
                  </div>
                </div>
                <div className={`text-xs font-black ${sponsor.rate.startsWith('+') ? 'text-emerald-500' : 'text-rose-400'}`}>
                  {sponsor.rate}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Feed/Recent Activity */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="font-bold text-lg text-slate-800 mb-6">Live Stream Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 relative">
                {i < 3 && <div className="absolute left-5 top-10 bottom-0 w-px bg-slate-100"></div>}
                <div className="w-10 h-10 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center z-10">
                  {i === 1 ? <MousePointer2 className="w-4 h-4 text-[#5E7B98]" /> : i === 2 ? <ClipboardList className="w-4 h-4 text-[#5E7B98]" /> : <Target className="w-4 h-4 text-[#5E7B98]" />}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-slate-800">
                      {i === 1 ? 'New Sponsor Click' : i === 2 ? 'Survey Submitted' : 'Target Scan Achievement'}
                    </p>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{i * 2}m ago</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {i === 1 ? 'An attendee just engaged with Axel Tech brand assets via QR scan.' : i === 2 ? 'Attendee "Sarah W." completed the Post-Keynote feedback survey.' : 'Event reached 1,000 unique attendee scans in the last hour.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

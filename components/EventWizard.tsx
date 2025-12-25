
import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronRight, ChevronLeft, Trash2, BarChart3, Save, Plus, Info,
  CalendarDays, Users2, ListTodo, PieChart, QrCode as QrIcon,
  SendHorizontal, Upload, Link as LinkIcon, CheckCircle2,
  Facebook, Instagram, Twitter, Linkedin, Eye, X, Image as ImageIcon
} from 'lucide-react';
import { Step, EventData, SocialLinks } from '../types';

interface EventWizardProps {
  eventData: EventData;
  onSave: (data: EventData) => void;
  onCancel: () => void;
}

const steps = [
  { id: Step.Basics, label: 'Basics', icon: Info },
  { id: Step.Itinerary, label: 'Itinerary', icon: CalendarDays },
  { id: Step.Sponsors, label: 'Sponsors', icon: Users2 },
  { id: Step.Survey, label: 'Survey', icon: ListTodo },
  { id: Step.Polls, label: 'Polls', icon: PieChart },
  { id: Step.QRMedia, label: 'QR & Media', icon: QrIcon },
  { id: Step.Publish, label: 'Publish', icon: SendHorizontal },
];

const InputField = ({ label, required, icon: Icon, ...props }: any) => (
  <div className="group space-y-2">
    {label && (
      <label className="block text-sm font-semibold text-slate-600 transition-colors group-focus-within:text-[#5E7B98]">
        {label}{required && <span className="text-rose-500 ml-1">*</span>}
      </label>
    )}
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#5E7B98] transition-colors" />}
      <input 
        {...props}
        className={`w-full ${Icon ? 'pl-11' : 'px-5'} py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-[#5E7B98]/10 focus:border-[#5E7B98] outline-none transition-all placeholder:text-slate-300 text-slate-700`}
      />
    </div>
  </div>
);

const TextAreaField = ({ label, required, ...props }: any) => (
  <div className="group space-y-2">
    {label && (
      <label className="block text-sm font-semibold text-slate-600 transition-colors group-focus-within:text-[#5E7B98]">
        {label}{required && <span className="text-rose-500 ml-1">*</span>}
      </label>
    )}
    <textarea 
      {...props}
      className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-[#5E7B98]/10 focus:border-[#5E7B98] outline-none transition-all placeholder:text-slate-300 text-slate-700 resize-none"
    />
  </div>
);

const EventWizard: React.FC<EventWizardProps> = ({ eventData, onSave, onCancel }) => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.Basics);
  const [localData, setLocalData] = useState<EventData>(eventData);
  const [activePollMedia, setActivePollMedia] = useState<string | null>(null);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const pollMediaRef = useRef<HTMLInputElement>(null);

  // Initialize empty steps with at least one item to show fields immediately
  useEffect(() => {
    const updated = { ...localData };
    let changed = false;

    if (updated.itinerary.length === 0) {
      updated.itinerary = [{ id: 'init-it', title: '', startTime: '', endTime: '', speaker: '', description: '' }];
      changed = true;
    }
    if (updated.sponsors.length === 0) {
      updated.sponsors = [{ id: 'init-sp', name: '', website: '', description: '' }];
      changed = true;
    }
    if (updated.survey.length === 0) {
      updated.survey = [{ id: 'init-sv', question: '', type: 'Text', required: false }];
      changed = true;
    }
    if (updated.polls.length === 0) {
      updated.polls = [{ id: 'init-pl', question: '', options: [] }];
      changed = true;
    }

    if (changed) {
      setLocalData(updated);
    }
  }, []);

  const nextStep = () => currentStep < Step.Publish && setCurrentStep(prev => prev + 1);
  const prevStep = () => currentStep > Step.Basics && setCurrentStep(prev => prev - 1);

  const handleUpdate = (field: keyof EventData, value: any) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialUpdate = (platform: keyof SocialLinks, value: string) => {
    setLocalData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value }
    }));
  };

  const addItem = (field: 'itinerary' | 'sponsors' | 'survey' | 'polls', defaultObj: any) => {
    setLocalData(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[]), { ...defaultObj, id: Date.now().toString() }]
    }));
  };

  const removeItem = (field: 'itinerary' | 'sponsors' | 'survey' | 'polls', id: string) => {
    setLocalData(prev => {
      const filtered = (prev[field] as any[]).filter(item => item.id !== id);
      // If we remove the last item, add a blank one back to keep fields visible
      if (filtered.length === 0) {
        const blank: any = { id: Date.now().toString() };
        if (field === 'itinerary') Object.assign(blank, { title: '', startTime: '', endTime: '', speaker: '', description: '' });
        if (field === 'sponsors') Object.assign(blank, { name: '', website: '', description: '' });
        if (field === 'survey') Object.assign(blank, { question: '', type: 'Text', required: false });
        if (field === 'polls') Object.assign(blank, { question: '', options: [] });
        return { ...prev, [field]: [blank] };
      }
      return { ...prev, [field]: filtered };
    });
  };

  const updateItemField = (field: 'itinerary' | 'sponsors' | 'survey' | 'polls', id: string, key: string, value: any) => {
    setLocalData(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).map(item => item.id === id ? { ...item, [key]: value } : item)
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case Step.Basics:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in duration-500">
            <div className="space-y-6">
              <InputField label="Event Name" required placeholder="e.g. Barclays Business Breakfast" value={localData.name} onChange={(e: any) => handleUpdate('name', e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Date" required type="datetime-local" value={localData.date} onChange={(e: any) => handleUpdate('date', e.target.value)} />
                <InputField label="Location" required placeholder="Racquet Club" value={localData.location} onChange={(e: any) => handleUpdate('location', e.target.value)} />
              </div>
              <TextAreaField label="Description" rows={4} value={localData.description} onChange={(e: any) => handleUpdate('description', e.target.value)} placeholder="A morning of networking..." />
            </div>
            <div className="space-y-8">
              <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-[#5E7B98]" /> Social Media Connect
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <InputField icon={Facebook} placeholder="Facebook URL" value={localData.socialLinks.facebook} onChange={(e: any) => handleSocialUpdate('facebook', e.target.value)} />
                  <InputField icon={Instagram} placeholder="Instagram Username" value={localData.socialLinks.instagram} onChange={(e: any) => handleSocialUpdate('instagram', e.target.value)} />
                  <InputField icon={Linkedin} placeholder="LinkedIn Page" value={localData.socialLinks.linkedin} onChange={(e: any) => handleSocialUpdate('linkedin', e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        );

      case Step.Itinerary:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Event Sessions</h2>
              <button 
                onClick={() => addItem('itinerary', { title: '', startTime: '', endTime: '', speaker: '', description: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-[#5E7B98]/10 text-[#5E7B98] rounded-xl font-bold text-sm hover:bg-[#5E7B98] hover:text-white transition-all"
              >
                <Plus className="w-4 h-4" /> Add Session
              </button>
            </div>
            {localData.itinerary.map((session) => (
              <div key={session.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative group hover:border-[#5E7B98]/30 transition-all">
                <button onClick={() => removeItem('itinerary', session.id)} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <InputField 
                    label="Title" required 
                    value={session.title} 
                    onChange={(e: any) => updateItemField('itinerary', session.id, 'title', e.target.value)} 
                    placeholder="Introduction" 
                  />
                  <InputField 
                    label="Start time" required 
                    type="time" 
                    value={session.startTime} 
                    onChange={(e: any) => updateItemField('itinerary', session.id, 'startTime', e.target.value)} 
                  />
                  <InputField 
                    label="End time" required 
                    type="time" 
                    value={session.endTime} 
                    onChange={(e: any) => updateItemField('itinerary', session.id, 'endTime', e.target.value)} 
                  />
                  <InputField 
                    label="Speaker" 
                    value={session.speaker} 
                    onChange={(e: any) => updateItemField('itinerary', session.id, 'speaker', e.target.value)} 
                    placeholder="Omer Motiwala" 
                  />
                  <div className="md:col-span-2">
                    <TextAreaField 
                      label="Description" 
                      rows={3} 
                      value={session.description} 
                      onChange={(e: any) => updateItemField('itinerary', session.id, 'description', e.target.value)} 
                      placeholder="We will have an introduction" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case Step.Sponsors:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Sponsors</h2>
              <button 
                onClick={() => addItem('sponsors', { name: '', website: '', description: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-[#5E7B98]/10 text-[#5E7B98] rounded-xl font-bold text-sm hover:bg-[#5E7B98] hover:text-white transition-all"
              >
                <Plus className="w-4 h-4" /> Add Sponsor
              </button>
            </div>
            {localData.sponsors.map((sponsor) => (
              <div key={sponsor.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative hover:shadow-xl hover:border-[#5E7B98]/30 transition-all">
                <button onClick={() => removeItem('sponsors', sponsor.id)} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <InputField 
                      label="Sponsor Name" required 
                      value={sponsor.name} 
                      onChange={(e: any) => updateItemField('sponsors', sponsor.id, 'name', e.target.value)} 
                      placeholder="Axel" 
                    />
                    <InputField 
                      label="Website URL" 
                      icon={LinkIcon} 
                      value={sponsor.website} 
                      onChange={(e: any) => updateItemField('sponsors', sponsor.id, 'website', e.target.value)} 
                      placeholder="https://axel.com" 
                    />
                  </div>
                  <TextAreaField 
                    label="Description" 
                    rows={4} 
                    value={sponsor.description} 
                    onChange={(e: any) => updateItemField('sponsors', sponsor.id, 'description', e.target.value)} 
                    placeholder="Sponsorship details..." 
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case Step.Survey:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Surveys</h2>
              <button 
                onClick={() => addItem('survey', { question: '', type: 'Text', required: false })}
                className="flex items-center gap-2 px-4 py-2 bg-[#5E7B98]/10 text-[#5E7B98] rounded-xl font-bold text-sm hover:bg-[#5E7B98] hover:text-white transition-all"
              >
                <Plus className="w-4 h-4" /> Add Question
              </button>
            </div>
            {localData.survey.map((q) => (
              <div key={q.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative hover:border-[#5E7B98]/30 transition-all space-y-6">
                <button onClick={() => removeItem('survey', q.id)} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
                <InputField 
                  label="Question" required 
                  value={q.question} 
                  onChange={(e: any) => updateItemField('survey', q.id, 'question', e.target.value)} 
                  placeholder="copy / paste" 
                />
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-600">Type<span className="text-rose-500 ml-1">*</span></label>
                  <select 
                    value={q.type}
                    onChange={(e: any) => updateItemField('survey', q.id, 'type', e.target.value)} 
                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-[#5E7B98]/10 focus:border-[#5E7B98] outline-none transition-all text-slate-700"
                  >
                    <option value="Text">Text</option>
                    <option value="Multiple Choice">Multiple Choice</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={q.required} 
                      onChange={(e) => updateItemField('survey', q.id, 'required', e.target.checked)} 
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5E7B98]"></div>
                  </label>
                  <span className="text-sm font-bold text-slate-500">Required</span>
                </div>
              </div>
            ))}
          </div>
        );

      case Step.Polls:
        return (
          <div className="space-y-10 animate-in slide-in-from-right duration-500">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Polls</h2>
              <button 
                onClick={() => addItem('polls', { question: '', options: [] })}
                className="flex items-center gap-2 px-4 py-2 bg-[#5E7B98]/10 text-[#5E7B98] rounded-xl font-bold text-sm hover:bg-[#5E7B98] hover:text-white transition-all"
              >
                <Plus className="w-4 h-4" /> Add Poll
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-4 space-y-4">
                  <label className="block text-sm font-bold text-slate-800">Live Poll QR Preview</label>
                  <div className="aspect-square bg-slate-50 border border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-8 group relative overflow-hidden transition-all hover:border-[#5E7B98]">
                    {activePollMedia ? (
                      <div className="flex flex-col items-center animate-in zoom-in duration-500">
                        <QrIcon className="w-24 h-24 text-[#5E7B98] mb-4" />
                        <span className="text-[10px] font-black text-[#5E7B98] uppercase tracking-widest bg-[#5E7B98]/5 px-3 py-1 rounded-full">Scan To Test</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center text-slate-200">
                          <QrIcon className="w-6 h-6" />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed max-w-[140px]">
                          preview will be shown when pic is uploaded
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-8 space-y-6">
                  <label className="block text-sm font-bold text-slate-800">Poll Graphic</label>
                  <div 
                    onClick={() => pollMediaRef.current?.click()}
                    className="h-full min-h-[200px] border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-[#5E7B98] transition-all cursor-pointer group"
                  >
                    <input 
                      type="file" 
                      ref={pollMediaRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => setActivePollMedia(ev.target?.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    {activePollMedia ? (
                      <div className="w-full h-full relative p-4">
                        <img src={activePollMedia} className="w-full h-48 object-cover rounded-2xl shadow-lg" alt="" />
                        <button onClick={(e) => { e.stopPropagation(); setActivePollMedia(null); }} className="absolute top-6 right-6 p-2 bg-rose-500 text-white rounded-xl shadow-lg"><X className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <ImageIcon className="text-[#5E7B98]" />
                        </div>
                        <p className="font-bold text-slate-600">Click or drag image to upload</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {localData.polls.map(poll => (
                <div key={poll.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative group hover:border-[#5E7B98]/20 transition-all">
                  <div className="absolute top-6 right-6 flex gap-2">
                    <button className="p-2 text-slate-300 hover:text-[#5E7B98]"><Eye className="w-5 h-5" /></button>
                    <button onClick={() => removeItem('polls', poll.id)} className="p-2 text-slate-300 hover:text-rose-500"><Trash2 className="w-5 h-5" /></button>
                  </div>
                  <div className="max-w-2xl space-y-6">
                    <InputField 
                      label="Question" required 
                      value={poll.question} 
                      onChange={(e: any) => updateItemField('polls', poll.id, 'question', e.target.value)} 
                      placeholder="How are you doing today?" 
                    />
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-600">Options<span className="text-rose-500 ml-1">*</span></label>
                      <div className="flex flex-wrap gap-2 p-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        {poll.options.map((opt, i) => (
                          <div key={i} className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs font-bold text-amber-700 flex items-center gap-2">
                            {opt}
                            <button onClick={() => {
                              const newOpts = [...poll.options];
                              newOpts.splice(i, 1);
                              updateItemField('polls', poll.id, 'options', newOpts);
                            }} className="hover:text-rose-500">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <input 
                          type="text" 
                          placeholder="Add option" 
                          className="flex-1 min-w-[120px] outline-none text-sm placeholder:text-slate-300"
                          onKeyDown={(e: any) => {
                            if (e.key === 'Enter' && e.target.value) {
                              updateItemField('polls', poll.id, 'options', [...poll.options, e.target.value]);
                              e.target.value = '';
                            }
                          }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">Add at least two options. Press enter to add.</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case Step.QRMedia:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in slide-in-from-right duration-500">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl flex flex-col items-center">
               <div className="flex items-center justify-between w-full mb-10">
                 <h3 className="font-black text-xl text-slate-800 tracking-tight">Public QR Profile</h3>
                 <span className="px-3 py-1 bg-[#5E7B98]/10 text-[#5E7B98] rounded-full text-[10px] font-black uppercase tracking-widest">Active</span>
               </div>
               <div className="w-64 h-64 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col items-center justify-center p-12 group relative shadow-inner overflow-hidden hover:border-[#5E7B98] transition-all">
                  <QrIcon className="w-full h-full text-slate-200 group-hover:text-[#5E7B98] group-hover:scale-110 transition-all duration-700" />
               </div>
               <div className="mt-10 flex gap-4 w-full">
                 <button className="flex-1 px-6 py-4 bg-[#5E7B98] text-white rounded-2xl font-bold shadow-lg shadow-[#5E7B98]/20 hover:bg-[#4A627B] transition-all flex items-center justify-center gap-3">
                   <Save className="w-5 h-5" /> Download
                 </button>
                 <button className="px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-700 hover:bg-slate-50 transition-all">
                   <LinkIcon className="w-5 h-5" />
                 </button>
               </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
                 <h3 className="font-black text-xl text-slate-800 mb-8">Asset Library</h3>
                 <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200 group cursor-pointer hover:bg-[#5E7B98]/5 hover:border-[#5E7B98] transition-all">
                      <Plus className="w-8 h-8 text-slate-300 group-hover:text-[#5E7B98] transition-all" />
                    </div>
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="aspect-square bg-slate-100 rounded-2xl overflow-hidden relative group">
                        <img src={`https://picsum.photos/seed/ev-${i}/400/400`} className="w-full h-full object-cover transition-all group-hover:scale-110" alt="" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button className="p-2 bg-rose-500 text-white rounded-xl shadow-xl hover:scale-110 transition-transform">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        );

      case Step.Publish:
        return (
          <div className="max-w-3xl mx-auto py-12 text-center animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-50 rotate-3 transition-transform hover:rotate-0">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Finalizing {localData.name}</h2>
            <p className="text-slate-400 text-lg mb-12">All systems are green. Toggle live to begin the experience.</p>
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl flex flex-col items-center">
              <div className="flex items-center gap-10 mb-10">
                 <span className={`font-black uppercase tracking-widest transition-colors ${!localData.status ? 'text-slate-800' : 'text-slate-300'}`}>Draft</span>
                 <label className="relative inline-flex items-center cursor-pointer scale-150">
                    <input type="checkbox" checked={localData.status} onChange={() => handleUpdate('status', !localData.status)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5E7B98]"></div>
                 </label>
                 <span className={`font-black uppercase tracking-widest transition-colors ${localData.status ? 'text-[#5E7B98]' : 'text-slate-300'}`}>Live</span>
              </div>
              <button 
                onClick={() => onSave(localData)}
                className="w-full py-5 bg-[#5E7B98] text-white rounded-3xl font-black text-lg shadow-xl shadow-[#5E7B98]/30 hover:bg-[#4A627B] transform hover:scale-[1.02] transition-all"
              >
                COMMIT & FINISH
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-12 pb-32">
      <div className="flex items-center justify-between">
        <div>
           <button onClick={onCancel} className="text-sm font-bold text-slate-400 hover:text-[#5E7B98] mb-4 flex items-center gap-2 transition-colors">
             <ChevronLeft className="w-4 h-4" /> Back to List
           </button>
           <h1 className="text-4xl font-black text-slate-800 tracking-tight">{localData.name} <span className="text-[#5E7B98] opacity-30">Editor</span></h1>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white text-rose-500 font-bold rounded-2xl hover:bg-rose-50 transition-all">Delete</button>
          <button onClick={() => onSave(localData)} className="px-6 py-3 bg-[#5E7B98] text-white font-bold rounded-2xl hover:bg-[#4A627B] transition-all shadow-lg shadow-[#5E7B98]/10">Save Draft</button>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-sm p-4 rounded-[2.5rem] border border-white overflow-x-auto custom-scrollbar">
        <div className="flex items-center justify-between min-w-[900px] px-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <React.Fragment key={step.id}>
                <button onClick={() => setCurrentStep(step.id)} className="flex flex-col items-center gap-3 group relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'bg-[#5E7B98] text-white shadow-xl shadow-[#5E7B98]/20 ring-4 ring-[#5E7B98]/5' : 
                    isCompleted ? 'bg-emerald-500 text-white' : 
                    'bg-white text-slate-400 border border-slate-100 group-hover:border-[#5E7B98]/30'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-[#5E7B98]' : 'text-slate-400'}`}>{step.label}</span>
                </button>
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-slate-100 mx-4 max-w-[80px]">
                    <div className={`h-full transition-all duration-500 ${isCompleted ? 'w-full bg-emerald-500' : 'w-0'}`}></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="min-h-[500px]">
        {renderStepContent()}
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 z-50">
        <div className="bg-slate-900 p-3 rounded-[2.5rem] shadow-2xl flex items-center justify-between border border-slate-800">
          <button onClick={prevStep} disabled={currentStep === Step.Basics} className="px-8 py-5 text-white font-black hover:bg-white/5 rounded-2xl disabled:opacity-20 flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" /> BACK
          </button>
          <button onClick={nextStep} disabled={currentStep === Step.Publish} className="px-12 py-5 bg-[#5E7B98] text-white font-black rounded-2xl shadow-xl shadow-[#5E7B98]/20 hover:scale-[1.05] active:scale-[0.95] flex items-center gap-2">
            {currentStep === Step.Publish ? 'READY' : 'CONTINUE'} <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventWizard;

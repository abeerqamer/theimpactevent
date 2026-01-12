
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import EventWizard from './components/EventWizard';
import { EventData } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'events'>('events');
  const [viewMode, setViewMode] = useState<'list' | 'details' | 'edit'>('list');
  const [events, setEvents] = useState<EventData[]>([
    {
      id: '1',
      name: 'Innovation In Business Awards 2025',
      date: '2025-10-23T18:00',
      location: 'Grand Hotel Atrium',
      description: 'Celebrating excellence in sustainable business practices and future innovations.',
      socialLinks: { facebook: 'https://fb.com/innovation', instagram: '@innovation_awards', twitter: '@innovation_biz', linkedin: 'company/innovation-awards' },
      itinerary: [
        { id: '1', title: 'Reception', startTime: '18:00', endTime: '18:30', speaker: '', description: 'Welcome drinks and registration.', location: 'Atrium' },
        { id: '2', title: 'Keynote: Future of Green', startTime: '18:00', endTime: '18:30', speaker: 'Dr. Emily Green', description: 'Insights into sustainable future tech.', location: 'Atrium' },
        { id: '3', title: 'Awards Ceremony', startTime: '18:00', endTime: '18:30', speaker: '', description: 'Honoring the best in business.', location: 'Atrium' },
        { id: '4', title: 'Networking', startTime: '18:00', endTime: '18:30', speaker: '', description: 'Connect with industry leaders.', location: 'Atrium' },
        { id: '5', title: 'Dinner', startTime: '18:00', endTime: '18:30', speaker: '', description: 'Gala dinner and closing remarks.', location: 'Atrium' }
      ],
      sponsors: [
        {
          id: '1',
          name: 'TechFlow Solutions',
          website: 'https://techflow.example.com',
          description: 'Leading provider of enterprise AI solutions.',
          socialLinks: { linkedin: 'https://linkedin.com/company/techflow', twitter: 'https://twitter.com/techflow' }
        },
        {
          id: '2',
          name: 'GreenEarth Energy',
          website: 'https://greenearth.example.com',
          description: 'Sustainable energy primarily for large scale grids.',
          socialLinks: { linkedin: 'https://linkedin.com/company/greenearth', facebook: 'https://fb.com/greenearth' }
        },
        {
          id: '3',
          name: 'Urban Build',
          website: 'https://urbanbuild.example.com',
          description: 'Next-gen construction materials.',
          socialLinks: { instagram: 'https://instagram.com/urbanbuild' }
        }
      ],
      survey: [{ id: '1', question: 'How was the keynote?', type: 'Text', required: true, responseCount: 124 }],
      polls: [{ id: '1', question: 'Best innovation of the night?', options: ['AI', 'Green Energy', 'Biotech'], votes: [45, 30, 25] }],
      status: true
    },
    {
      id: '2',
      name: 'Tech Innovators Summit',
      date: '2025-11-12T10:00',
      location: 'Silicon Valley Hub',
      description: 'Discussing the future of AI and robotics.',
      socialLinks: {},
      itinerary: [],
      sponsors: [],
      survey: [],
      polls: [],
      status: false
    },
    {
      id: '3',
      name: 'Design Week Finale',
      date: '2025-12-05T18:00',
      location: 'The Art House',
      description: 'Celebrating local designers.',
      socialLinks: {},
      itinerary: [],
      sponsors: [],
      survey: [],
      polls: [],
      status: true
    }
  ]);

  const [currentEvent, setCurrentEvent] = useState<EventData | null>(null);

  const handleCreateNew = () => {
    const newEvent: EventData = {
      id: Date.now().toString(),
      name: 'New Event',
      date: '',
      location: '',
      description: '',
      socialLinks: {},
      itinerary: [],
      sponsors: [],
      survey: [],
      polls: [],
      status: false
    };
    setCurrentEvent(newEvent);
    setViewMode('edit');
  };

  const handleView = (event: EventData) => {
    setCurrentEvent(event);
    setViewMode('details');
  };

  const handleEdit = (event: EventData) => {
    setCurrentEvent(event);
    setViewMode('edit');
  };

  const handleSave = (updatedEvent: EventData) => {
    setEvents(prev => {
      if (prev.find(e => e.id === updatedEvent.id)) {
        return prev.map(e => e.id === updatedEvent.id ? updatedEvent : e);
      } else {
        return [...prev, updatedEvent];
      }
    });
    setViewMode('details');
  };

  const handleCancelEdit = () => {
    if (currentEvent && !events.find(e => e.id === currentEvent.id)) {
      setViewMode('list');
      setCurrentEvent(null);
    } else {
      setViewMode('details');
    }
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      <Sidebar activeView={activeView} setActiveView={(v) => { setActiveView(v); setViewMode('list'); }} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header activeView={activeView} eventName={currentEvent?.name || "Impact Event"} />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeView === 'dashboard' ? (
              <Dashboard eventData={events[0]} />
            ) : viewMode === 'edit' && currentEvent ? (
              <EventWizard
                eventData={currentEvent}
                onSave={handleSave}
                onCancel={handleCancelEdit}
              />
            ) : viewMode === 'details' && currentEvent ? (
              <EventDetails
                event={currentEvent}
                onBack={() => { setViewMode('list'); setCurrentEvent(null); }}
                onEdit={() => setViewMode('edit')}
              />
            ) : (
              <EventList
                events={events}
                onCreateNew={handleCreateNew}
                onView={handleView}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

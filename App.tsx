
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
      name: 'Barclays Business Breakfast',
      date: '2025-10-23T08:50',
      location: 'Racquet Club',
      description: 'A morning of networking and business insights.',
      socialLinks: { facebook: 'https://fb.com/barclays', instagram: '@barclays_biz' },
      itinerary: [{ id: '1', title: 'Introduction', startTime: '08:00', endTime: '09:00', speaker: 'Omer Motiwala', description: 'Opening remarks.' }],
      sponsors: [{ id: '1', name: 'Axel', website: 'https://axel.com', description: 'Tech partner.' }],
      survey: [{ id: '1', question: 'Rate the coffee', type: 'Text', required: true }],
      polls: [{ id: '1', question: 'Enjoying the talk?', options: ['Yes', 'No'] }],
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

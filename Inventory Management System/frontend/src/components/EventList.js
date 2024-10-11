import React, { useEffect, useState } from 'react';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../services/eventService';

const EventManager = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ name: '', date: '', attendees: [] });

    useEffect(() => {
        const fetchEvents = async () => {
            const fetchedEvents = await getEvents();
            setEvents(fetchedEvents);
        };
        fetchEvents();
    }, []);

    const handleCreateEvent = async () => {
        await createEvent(newEvent);

        // Refresh the events list after creating a new event
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
    };

    return (
        <div>
            <form onSubmit={handleCreateEvent}>
                <input
                    type="text"
                    placeholder="Event Name"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                />
                <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
                <button type="submit">Create Event</button>
            </form>

            <ul>
                {events.map((event) => (
                    <li key={event._id}>{event.name} - {event.date}</li> // make sure that it shows the women who attended the event along with their information
                    
                ))}
            </ul>
        </div>
    );
};

export default EventManager;

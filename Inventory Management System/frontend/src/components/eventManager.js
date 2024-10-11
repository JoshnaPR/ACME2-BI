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
        // Create the event directly, as newEvent.date is already in string format
        await createEvent(newEvent);
    
        // Refresh the events list after creating a new event
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
    };

    return (
        <div>
            {/* Form for creating a new event */}
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
            <button onClick={handleCreateEvent}>Create Event</button>

            {/* List of events */}
            <ul>
                {events.map((event) => (
                    <li key={event._id}>
                        {event.name} - {event.date}
                        <ul>
                            {event.attendees.map((attendee, index) => (
                                <li key={index}>
                                    {attendee.name} - {attendee.sizeBefore} to {attendee.sizeAfter}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventManager;

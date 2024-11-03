import React, { useEffect, useState } from 'react';
import { createEvent, getEvents } from '../services/eventService';

const EventManager = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ name: '', date: '', attendees: [] });
    const [newAttendee, setNewAttendee] = useState({ name: '', sizeBefore: '', sizeAfter: '', braSize1: '', braSize2: '', fitterName: '', email: '', phone: '' });

    useEffect(() => {
        const fetchEvents = async () => {
            const fetchedEvents = await getEvents();
            setEvents(fetchedEvents);
        };
        fetchEvents();
    }, []);

    // Function to handle adding attendees to the newEvent object
    const handleAddAttendee = () => {
        if (newAttendee.name && newAttendee.sizeBefore && newAttendee.sizeAfter) {
            setNewEvent({ ...newEvent, attendees: [...newEvent.attendees, newAttendee] });
            // Clear the attendee input fields
            setNewAttendee({ name: '', sizeBefore: '', sizeAfter: '', braSize1: '', braSize2: '', fitterName: '', email: '', phone: '' });
        } else {
            alert("Please fill in all the fields for the attendee.");
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        await createEvent(newEvent);

        // Refresh the events list after creating a new event
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);

        // Reset new event fields
        setNewEvent({ name: '', date: '', attendees: [] });
    };

    return (
        <div>
            <h2>Create Event</h2>
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
                <h3>Add Attendees</h3>
                <input
                    type="text"
                    placeholder="Attendee Name"
                    value={newAttendee.name}
                    onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Size Before"
                    value={newAttendee.sizeBefore}
                    onChange={(e) => setNewAttendee({ ...newAttendee, sizeBefore: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Size After"
                    value={newAttendee.sizeAfter}
                    onChange={(e) => setNewAttendee({ ...newAttendee, sizeAfter: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Bra Size 1"
                    value={newAttendee.braSize1}
                    onChange={(e) => setNewAttendee({ ...newAttendee, braSize1: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Bra Size 2"
                    value={newAttendee.braSize2}
                    onChange={(e) => setNewAttendee({ ...newAttendee, braSize2: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Fitter Name"
                    value={newAttendee.fitterName}
                    onChange={(e) => setNewAttendee({ ...newAttendee, fitterName: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newAttendee.email}
                    onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
                />
                <input
                    type="tel"
                    placeholder="Phone"
                    value={newAttendee.phone}
                    onChange={(e) => setNewAttendee({ ...newAttendee, phone: e.target.value })}
                />
                <button type="button" onClick={handleAddAttendee}>Add Attendee</button>
                <button type="submit">Create Event</button>
            </form>

            <h2>Event List</h2>
            <ul>
                {events.map((event) => (
                    <li key={event._id}>
                        {event.name} - {event.date}
                        <ul>
                            {event.attendees.length > 0 ? (
                                event.attendees.map((attendee, index) => (
                                    <li key={index}>
                                        {attendee.name} - Size Before: {attendee.sizeBefore}, Size After: {attendee.sizeAfter}, Fitter: {attendee.fitterName}
                                    </li>
                                ))
                            ) : (
                                <li>No attendees</li>
                            )}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventManager;

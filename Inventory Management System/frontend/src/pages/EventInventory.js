import React, { useState, useEffect } from 'react';
import { getEvents, updateEvent, deleteEvent, createEvent } from '../services/eventService';

const EventInventory = () => {
    const [events, setEvents] = useState([]);
    const [editEventId, setEditEventId] = useState(null);
    const [editAttendeeId, setEditAttendeeId] = useState({ eventIndex: null, attendeeIndex: null });
    const [eventFormData, setEventFormData] = useState({ name: '', date: '' });
    const [attendeeFormData, setAttendeeFormData] = useState({ 
        name: '', 
        sizeBefore: '', 
        sizeAfter: '', 
        fitterName: '', 
        phoneNumber: '', 
        email: '' 
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchByEvent, setSearchByEvent] = useState(true);
    const [searchByAttendee, setSearchByAttendee] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            const eventData = await getEvents();
            setEvents(eventData || []);
        };

        fetchEvents();
    }, []);

    const handleEventInputChange = (e) => {
        const { name, value } = e.target;
        setEventFormData({ ...eventFormData, [name]: value });
    };

    const handleAttendeeInputChange = (e) => {
        const { name, value } = e.target;
        setAttendeeFormData({ ...attendeeFormData, [name]: value });
    };

    const handleEditEvent = (eventId, event) => {
        setEditEventId(eventId);
        setEventFormData({ name: event?.name || '', date: event?.date || '' });
    };

    const handleEditAttendee = (eventIndex, attendeeIndex, attendee) => {
        setEditAttendeeId({ eventIndex, attendeeIndex });
        setAttendeeFormData({ 
            name: attendee?.name || '', 
            sizeBefore: attendee?.sizeBefore || '', 
            sizeAfter: attendee?.sizeAfter || '',
            fitterName: attendee?.fitterName || '',
            phoneNumber: attendee?.phoneNumber || '',
            email: attendee?.email || ''
        });
    };

    const handleUpdateEvent = async () => {
        await updateEvent(editEventId, eventFormData);
        setEditEventId(null);
        setEventFormData({ name: '', date: '' });
        const updatedEvents = await getEvents();
        setEvents(updatedEvents);
        setSuccessMessage('Event updated successfully');
    };

    const handleUpdateAttendee = async () => {
        const { eventIndex, attendeeIndex } = editAttendeeId;
        const updatedEvents = [...events];
        updatedEvents[eventIndex].attendees[attendeeIndex] = attendeeFormData;
        await updateEvent(updatedEvents[eventIndex]._id, updatedEvents[eventIndex]);
        setEditAttendeeId({ eventIndex: null, attendeeIndex: null });
        setAttendeeFormData({ 
            name: '', 
            sizeBefore: '', 
            sizeAfter: '', 
            fitterName: '', 
            phoneNumber: '', 
            email: '' 
        });
        setEvents(updatedEvents);
        setSuccessMessage('Attendee updated successfully');
    };

    const handleAddAttendee = async (eventIndex) => {
        const updatedEvents = [...events];
        updatedEvents[eventIndex].attendees.push(attendeeFormData);
        await updateEvent(updatedEvents[eventIndex]._id, updatedEvents[eventIndex]);
        setAttendeeFormData({ 
            name: '', 
            sizeBefore: '', 
            sizeAfter: '', 
            fitterName: '', 
            phoneNumber: '', 
            email: '' 
        });
        setEvents(updatedEvents);
        setSuccessMessage('Attendee added successfully');
    };

    const handleDeleteAttendee = async (eventIndex, attendeeIndex) => {
        const updatedEvents = [...events];
        updatedEvents[eventIndex].attendees.splice(attendeeIndex, 1);
        await updateEvent(updatedEvents[eventIndex]._id, updatedEvents[eventIndex]);
        setEvents(updatedEvents);
        setSuccessMessage('Attendee deleted successfully');
    };

    const handleCreateEvent = async () => {
        await createEvent(eventFormData);
        setEventFormData({ name: '', date: '' });
        const updatedEvents = await getEvents();
        setEvents(updatedEvents);
        setSuccessMessage('Event created successfully');
    };

    // Search events and attendees
    const filteredEvents = events.map(event => {
        const eventMatches = searchByEvent && event.name.toLowerCase().includes(searchTerm.toLowerCase());
        const filteredAttendees = searchByAttendee 
            ? event.attendees.filter(attendee =>
                attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) 
            : [];

        return {
            ...event,
            attendees: (searchTerm && (eventMatches || filteredAttendees.length > 0)) ? filteredAttendees : event.attendees,
            isVisible: eventMatches || filteredAttendees.length > 0
        };
    }).filter(event => event.isVisible);

    return (
        <div>
            <h1>Event Inventory</h1>

            {/* Search Input and Checkboxes */}
            <input
                type="text"
                placeholder="Search events or attendees"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={searchByEvent}
                        onChange={() => setSearchByEvent(!searchByEvent)}
                    />
                    Search by Event
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={searchByAttendee}
                        onChange={() => setSearchByAttendee(!searchByAttendee)}
                    />
                    Search by Attendee
                </label>
            </div>

            {/* New Event Creation Form */}
            <h2>Create New Event</h2>
            {successMessage && <h3>{successMessage}</h3>}
            <input
                type="text"
                name="name"
                value={eventFormData.name}
                onChange={handleEventInputChange}
                placeholder="Event Name"
            />
            <input
                type="date"
                name="date"
                value={eventFormData.date}
                onChange={handleEventInputChange}
                placeholder="Event Date"
            />
            <button onClick={handleCreateEvent}>Add Event</button>

            <ul>
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, eventIndex) => (
                        <li key={event?._id}>
                            {editEventId === event?._id ? (
                                <>
                                    <input
                                        type="text"
                                        name="name"
                                        value={eventFormData.name}
                                        onChange={handleEventInputChange}
                                        placeholder="Event Name"
                                    />
                                    <input
                                        type="date"
                                        name="date"
                                        value={eventFormData.date}
                                        onChange={handleEventInputChange}
                                        placeholder="Event Date"
                                    />
                                    <button onClick={handleUpdateEvent}>Update Event</button>
                                </>
                            ) : (
                                <>
                                    <span>{event?.name || 'No event name'}</span> - <span>{event?.date || 'No event date'}</span>
                                    <button onClick={() => handleEditEvent(event?._id, event)}>Edit Event</button>
                                </>
                            )}

                            <ul>
                                {event?.attendees.length > 0 ? (
                                    event.attendees.map((attendee, attendeeIndex) => (
                                        <li key={attendeeIndex}>
                                            {editAttendeeId.eventIndex === eventIndex && editAttendeeId.attendeeIndex === attendeeIndex ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={attendeeFormData.name}
                                                        onChange={handleAttendeeInputChange}
                                                        placeholder="Attendee Name"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="sizeBefore"
                                                        value={attendeeFormData.sizeBefore}
                                                        onChange={handleAttendeeInputChange}
                                                        placeholder="Size Before"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="sizeAfter"
                                                        value={attendeeFormData.sizeAfter}
                                                        onChange={handleAttendeeInputChange}
                                                        placeholder="Size After"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="fitterName"
                                                        value={attendeeFormData.fitterName}
                                                        onChange={handleAttendeeInputChange}
                                                        placeholder="Fitter Name"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="phoneNumber"
                                                        value={attendeeFormData.phoneNumber}
                                                        onChange={handleAttendeeInputChange}
                                                        placeholder="Phone Number"
                                                    />
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={attendeeFormData.email}
                                                        onChange={handleAttendeeInputChange}
                                                        placeholder="Email"
                                                    />
                                                    <button onClick={handleUpdateAttendee}>Update Attendee</button>
                                                </>
                                            ) : (
                                                <>
                                                    Name: <span>{attendee?.name || 'No attendee name'}</span> - 
                                                    Size Before: <span>{attendee?.sizeBefore || 'No size before'}</span> to 
                                                    Size After: <span>{attendee?.sizeAfter || 'No size after'}</span> -
                                                    Fitter: <span>{attendee?.fitterName || 'No fitter name'}</span> -
                                                    Phone #:<span>{attendee?.phoneNumber || 'No phone number'}</span> -
                                                    Email: <span>{attendee?.email || 'No email'}</span>
                                                    <button onClick={() => handleEditAttendee(eventIndex, attendeeIndex, attendee)}>Edit</button>
                                                    <button onClick={() => handleDeleteAttendee(eventIndex, attendeeIndex)}>Delete</button>
                                                </>
                                            )}
                                        </li>
                                    ))
                                ) : (
                                    <li>No attendees</li>
                                )}
                                <button onClick={() => handleAddAttendee(eventIndex)}>Add Attendee</button>
                            </ul>
                        </li>
                    ))
                ) : (
                    <li>No events</li>
                )}
            </ul>
        </div>
    );
};

export default EventInventory;
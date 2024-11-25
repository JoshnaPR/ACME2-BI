import React, { useState, useEffect } from 'react';
import { getEvents, updateEvent, deleteEvent, createEvent } from '../services/eventService';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [editEventId, setEditEventId] = useState(null);
    const [editAttendeeId, setEditAttendeeId] = useState({ eventIndex: null, attendeeIndex: null });
    const [eventFormData, setEventFormData] = useState({ name: '', date: '' });
    const [attendeeFormData, setAttendeeFormData] = useState({ 
        name: '', 
        sizeBefore: '', 
        sizeAfter: '',
        braSize1: '',
        braSize2: '', 
        fitterName: '', 
        phoneNumber: '', 
        email: '' 
    });

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
            braSize1: attendee?.braSize1 || '',
            braSize2: attendee?.braSize2 || '',
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
            braSize1: '',
            braSize2: '',
            fitterName: '', 
            phoneNumber: '', 
            email: '' 
        });
        setEvents(updatedEvents);
    };

    const handleAddAttendee = async (eventIndex) => {
        const updatedEvents = [...events];
        updatedEvents[eventIndex].attendees.push(attendeeFormData);
        await updateEvent(updatedEvents[eventIndex]._id, updatedEvents[eventIndex]);
        setAttendeeFormData({ 
            name: '', 
            sizeBefore: '', 
            sizeAfter: '', 
            braSize1: '',
            braSize2: '',
            fitterName: '', 
            phoneNumber: '', 
            email: '' 
        });
        setEvents(updatedEvents);
    };

    const handleDeleteAttendee = async (eventIndex, attendeeIndex) => {
        const updatedEvents = [...events];
        updatedEvents[eventIndex].attendees.splice(attendeeIndex, 1);
        await updateEvent(updatedEvents[eventIndex]._id, updatedEvents[eventIndex]);
        setEvents(updatedEvents);
    };

    const handleCreateEvent = async () => {
        await createEvent(eventFormData);
        setEventFormData({ name: '', date: '' });
        const updatedEvents = await getEvents();
        setEvents(updatedEvents);
    };

    return (
        <div>
            <h1>Event List</h1>

            {/* New Event Creation Form */}
            <h2>Create New Event</h2>
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
                {events.length > 0 ? (
                    events.map((event, eventIndex) => (
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
                                {event?.attendees && event.attendees.length > 0 ? (
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
                                                        name="braSize1"
                                                        value={attendeeFormData.braSize1}
                                                        onChange={handleAttendeeInputChange}
                                                        placeholder="Bra Size 1"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="braSize2"
                                                        value={attendeeFormData.braSize2}
                                                        onChange={handleAttendeeInputChange}
                                                        placeholder="Bra Size 2"
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
                                                    <span>{attendee?.name || 'No attendee name'}</span> - 
                                                    <span>{attendee?.sizeBefore || 'No size before'} to {attendee?.sizeAfter || 'No size after'}</span> - 
                                                    <span>{attendee?.braSize1 || 'No bra size 1'} to {attendee?.braSize2 || 'No bra size 2'}</span> -
                                                    <span>{attendee?.fitterName || 'No fitter name'}</span> - 
                                                    <span>{attendee?.phoneNumber || 'No phone number'}</span> - 
                                                    <span>{attendee?.email || 'No email'}</span>
                                                    <button onClick={() => handleEditAttendee(eventIndex, attendeeIndex, attendee)}>Edit Attendee</button>
                                                    <button onClick={() => handleDeleteAttendee(eventIndex, attendeeIndex)}>Delete Attendee</button>
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
                    <li>No events available</li>
                )}
            </ul>
        </div>
    );
};

export default EventList;

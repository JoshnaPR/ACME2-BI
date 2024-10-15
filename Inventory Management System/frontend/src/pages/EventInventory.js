import React, { useState, useEffect } from 'react';
import { getEvents, updateEvent, deleteEvent, createEvent } from '../services/eventService';
import { Link } from 'react-router-dom';
import '../styles/global.css'; // Custom styles for the homepage
import logo from '../assets/InnerVentory Button.png'; // Placeholder for your logo

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
    const [searchByEvent, setSearchByEvent] = useState(false);
    const [searchByAttendee, setSearchByAttendee] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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

    const handleDeleteEvent = async (eventId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this event?");
        if (isConfirmed) {
            await deleteEvent(eventId);
            const updatedEvents = await getEvents();
            setEvents(updatedEvents);
            setSuccessMessage('Event deleted successfully');
        }
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
        const isConfirmed = window.confirm("Are you sure you want to delete this attendee?");
        if (isConfirmed) {
            const updatedEvents = [...events];
            updatedEvents[eventIndex].attendees.splice(attendeeIndex, 1);
            await updateEvent(updatedEvents[eventIndex]._id, updatedEvents[eventIndex]);
            setEvents(updatedEvents);
            setSuccessMessage('Attendee deleted successfully');
        }
    };    

    const handleCreateEvent = async () => {
        // Check if both name and date fields are provided
        if (!eventFormData.name || !eventFormData.date) {
            setErrorMessage('Event name and date are required.');
            return;
        }
    
        // If validation passes, create the event
        await createEvent(eventFormData);
        setEventFormData({ name: '', date: '' });
        const updatedEvents = await getEvents();
        setEvents(updatedEvents);
        setSuccessMessage('Event created successfully');
        setErrorMessage('');  // Clear any error messages
    };
    
    // Search events and attendees
    const filteredEvents = events.map(event => {
        const eventMatches = searchByEvent && event.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Filter attendees based on the search term
        const filteredAttendees = searchByAttendee
            ? event.attendees.filter(attendee =>
                attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : event.attendees; // Keep all attendees if not filtering by attendee

        // Determine if the event should be visible
        const isVisible = eventMatches || (searchByAttendee && filteredAttendees.length > 0);

        return {
            ...event,
            attendees: isVisible ? filteredAttendees : event.attendees, // Show filtered attendees if the event is visible
            isVisible
        };
    }).filter(event => event.isVisible || (!searchTerm && !searchByEvent && !searchByAttendee)); // Show all events if no filters are applied



    return (
        <div>
            <header className="homepage-header">
                <img src={logo} alt="Breast Intentions Logo" className="logo" />
                <nav className="navbar">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/bra-inventory" className="nav-link">Bra Inventory</Link>
                <Link to="/event-inventory" className="nav-link">Event Inventory</Link>
                </nav>
            </header>
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
                            onChange={() => {
                                setSearchByEvent(true);
                                setSearchByAttendee(false); // Uncheck attendee search
                            }}
                        />
                        Search by Event
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={searchByAttendee}
                            onChange={() => {
                                setSearchByAttendee(true);
                                setSearchByEvent(false); // Uncheck event search
                            }}
                        />
                        Search by Attendee
                    </label>
                </div>

            {/* New Event Creation Form */}
            {successMessage && <h3 style={{ textAlign: 'center'}}>{successMessage}</h3>}
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
            {errorMessage && <h3>{errorMessage}</h3>}

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
                                    <span>{event?.name || 'No event name'}</span> - 
                                    <span>{new Date(event?.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</span>
                                    <button onClick={() => handleEditEvent(event?._id, event)}>Edit Event</button>
                                    <button onClick={() => handleDeleteEvent(event?._id)}>Delete Event</button>
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
            <footer className="homepage-footer">
                <p>&copy; 2024 Breast Intentions of Washington. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default EventInventory;
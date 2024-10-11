import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/events')
            .then((response) => setEvents(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {events.map((event) =>(
                    <li key = {event._id}>
                        <h3>{event.eventName}</h3>
                        <p>Attendees: {event.numberOfAttendees}</p>
                        <u1>
                            {event.attendies.map(att => (
                                <li key={att.email}>
                                    {att.name} - {att.sizeBefore} to {att.sizeAfter} (Fitted by: {att.fitterName})
                                </li>
                            ))}
                        </u1>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
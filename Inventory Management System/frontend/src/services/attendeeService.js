import axios from 'axios';

const API_URL = 'http://breastintentionsdb.com/api/events';

// Create a new attendee for a specific event
export const createAttendee = async (eventId, attendeeData) => {
    try {
        const response = await axios.post(`${API_URL}/${eventId}/attendees`, attendeeData);
        return response.data;
    } catch (error) {
        console.error('Error creating attendee:', error);
        throw error;
    }
};

// Update an existing attendee
export const updateAttendee = async (eventId, attendeeId, attendeeData) => {
    try {
        const response = await axios.put(`${API_URL}/${eventId}/attendees/${attendeeId}`, attendeeData);
        return response.data;
    } catch (error) {
        console.error('Error updating attendee:', error);
        throw error;
    }
};

// Delete an attendee
export const deleteAttendee = async (eventId, attendeeId) => {
    try {
        const response = await axios.delete(`${API_URL}/${eventId}/attendees/${attendeeId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting attendee:', error);
        throw error;
    }
};

// Fetch attendees for a specific event (if needed)
export const getAttendees = async (eventId) => {
    try {
        const response = await axios.get(`${API_URL}/${eventId}/attendees`);
        return response.data;
    } catch (error) {
        console.error('Error fetching attendees:', error);
        throw error;
    }
};

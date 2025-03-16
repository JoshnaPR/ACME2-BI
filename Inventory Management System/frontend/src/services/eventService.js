import axios from 'axios';

const API_URL = 'http://breastintentionsdb.com/api/events';

// Function to create an event
export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(API_URL, eventData);
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

// Function to get all events
export const getEvents = async () => {
    try {
        const response = await axios.get(API_URL);
        if (!response.data || response.data.length === 0) {
            throw new Error("No events found");
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        return []; // Return an empty array on failure
    }
};

// Function to update an event by its ID
export const updateEvent = async (id, eventData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, eventData);
        return response.data;
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
};

// Function to delete an event by its ID
export const deleteEvent = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
};

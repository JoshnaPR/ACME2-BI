import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

export const createEvent = async (eventData) => {
    try {
        // Ensure the date is a string in your eventData
        const response = await axios.post(API_URL, eventData);
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error; 
    }
};

export const getEvents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error; 
    }
};

export const updateEvent = async (id, eventData) => {
    try {
        // Ensure the date is a string in your eventData
        const response = await axios.put(`${API_URL}/${id}`, eventData);
        return response.data;
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
};

export const deleteEvent = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error; 
    }
};

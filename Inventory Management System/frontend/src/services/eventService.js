import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';
const INVENTORY_URL = 'http://localhost:5000/api/inventory';

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

// Inventory functions
// Function to get inventory items
export const getInventoryItems = async (eventId) => {
    try {
        const response = await axios.get(`${INVENTORY_URL}?eventId=${eventId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory items:', error);
        return [];
    }
};

// Function to create an inventory item
export const createInventoryItem = async (itemData) => {
    try {
        const response = await axios.post(INVENTORY_URL, itemData);
        return response.data;
    } catch (error) {
        console.error('Error creating inventory item:', error);
        throw error;
    }
};

// Function to update an inventory item by its ID
export const updateInventoryItem = async (id, itemData) => {
    try {
        const response = await axios.put(`${INVENTORY_URL}/${id}`, itemData);
        return response.data;
    } catch (error) {
        console.error('Error updating inventory item:', error);
        throw error;
    }
};

// Function to delete an inventory item by its ID
export const deleteInventoryItem = async (id) => {
    try {
        await axios.delete(`${INVENTORY_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        throw error;
    }
};

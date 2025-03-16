import axios from 'axios';

const API_URL = 'http://breastintentionsdb.com/api/bras'; // Adjust based on your backend route

export const createBra = async (braData) => {
    try {
        const response = await axios.post(API_URL, braData);
        return response.data;
    } catch (error) {
        console.error('Error creating bra:', error);
        throw error; 
    }
};

export const getBras = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching bras:', error);
        throw error; 
    }
};

export const updateBra = async (id, braData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, braData);
        return response.data;
    } catch (error) {
        console.error('Error updating bra:', error);
        throw error; 
    }
};

export const deleteBra = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting bra:', error);
        throw error;
    }
};

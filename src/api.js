import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/data';

export const fetchData = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log('API Response:', response.data); // Debugging
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

import axios from 'axios';
import CFG from '@/constants/env';

const API_KEY = CFG.PEXELS_API_KEY;
const BASE_URL = CFG.PEXELS_BASE_URL;

export const getImages = async (query: any) => {
    try {
        const response = await axios.get(`${BASE_URL}search`, {
            headers: {
                Authorization: API_KEY,
            },
            params: {
                query,
                per_page: 4,
            },
        });
        return response.data.photos;
    } catch (error) {
        console.error('Error fetching images from Pexels:', error);
        return [];
    }
};
import axios from 'axios';

// Use Vite env `VITE_API_URL` or `VITE_API_BASE_URL` if present, otherwise default to localhost
const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// If API_URL is just the base (e.g., http://localhost:8000), append /api
const getNormalizedApiUrl = () => {
  return API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`;
};

export const getCareerRecommendations = async (profile) => {
  try {
    const url = getNormalizedApiUrl();
    const response = await axios.post(`${url}/recommend`, profile);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const generateRoadmap = async (data) => {
  try {
    const url = getNormalizedApiUrl();
    const response = await axios.post(`${url}/roadmap`, data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
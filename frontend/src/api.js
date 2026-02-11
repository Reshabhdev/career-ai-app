import axios from 'axios';

// Use Vite env `VITE_API_URL` if present, otherwise default to production backend
// Vite exposes env vars as `import.meta.env.VITE_*`
const API_URL = import.meta?.env?.VITE_API_URL || 'https://careersystem-backend.onrender.com/api';

export const getCareerRecommendations = async (profile) => {
  try {
    const response = await axios.post(`${API_URL}/recommend`, profile);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
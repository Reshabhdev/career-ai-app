import axios from 'axios';

// The URL of your running FastAPI server
const API_URL = 'http://127.0.0.1:8000/api';

export const getCareerRecommendations = async (profile) => {
  try {
    const response = await axios.post(`${API_URL}/recommend`, profile);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
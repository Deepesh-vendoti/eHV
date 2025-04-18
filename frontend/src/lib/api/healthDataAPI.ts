import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

export interface HealthDataPayload {
  patientId: number;
  bloodPressure?: string;
  sugarLevel?: string;
  weight?: string;
  notes?: string;
}

export const addSelfReportedData = async (data: HealthDataPayload, token: string) => {
  try {
    const response = await axios.post(`${API_BASE}/healthdata/self`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding self-reported data:', error);
    throw error;
  }
};

export const getPatientHealthData = async (patientId: number, token: string) => {
  try {
    const response = await axios.get(`${API_BASE}/healthdata/self/patient/${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching patient health data:', error);
    throw error;
  }
}; 
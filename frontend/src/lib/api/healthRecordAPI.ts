import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

export interface HealthRecordUploadParams {
  file: File;
  patientId: number;
  recordType: string;
  description?: string;
  tags?: string;
}

export const uploadHealthRecord = async (params: HealthRecordUploadParams, token: string) => {
  try {
    const formData = new FormData();
    formData.append('file', params.file);
    formData.append('patientId', params.patientId.toString());
    formData.append('recordType', params.recordType);
    if (params.description) formData.append('description', params.description);
    if (params.tags) formData.append('tags', params.tags);

    const response = await axios.post(`${API_BASE}/health-records/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading health record:', error);
    throw error;
  }
};

export const getPatientRecords = async (patientId: number, token: string) => {
  try {
    const response = await axios.get(`${API_BASE}/health-records/patient/${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching patient records:', error);
    throw error;
  }
};

export const downloadRecord = async (recordId: number, token: string) => {
  try {
    const response = await axios.get(`${API_BASE}/health-records/download/${recordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading record:', error);
    throw error;
  }
}; 
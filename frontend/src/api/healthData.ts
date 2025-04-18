import { getAuthToken } from '../utils/auth';

export interface HealthDataPayload {
  patientId: number;
  metric: string;
  value: string;
  unit: string;
  notes?: string;
}

export interface HealthDataResponse {
  id: number;
  patientId: number;
  metric: string;
  value: string;
  unit: string;
  notes?: string;
  recordedDate: string;
}

export async function submitHealthData(payload: HealthDataPayload): Promise<HealthDataResponse> {
  const token = getAuthToken();
  const res = await fetch("http://localhost:8080/api/healthdata/self", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to submit health data");
  }

  return res.json();
}

export async function getPatientHealthData(patientId: number): Promise<HealthDataResponse[]> {
  const token = getAuthToken();
  const res = await fetch(`http://localhost:8080/api/healthdata/self/patient/${patientId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch health data");
  }

  return res.json();
} 
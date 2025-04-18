import { getAuthToken } from '../utils/auth';

export interface HealthRecordResponse {
  id: number;
  patientId: number;
  recordType: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  description?: string;
  uploadedDate: string;
  status: string;
}

export async function uploadHealthRecord(formData: FormData): Promise<HealthRecordResponse> {
  const token = getAuthToken();
  const res = await fetch("http://localhost:8080/api/health-records/upload", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload health record");
  }

  return res.json();
}

export async function getPatientHealthRecords(patientId: number): Promise<HealthRecordResponse[]> {
  const token = getAuthToken();
  const res = await fetch(`http://localhost:8080/api/health-records/patient/${patientId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch health records");
  }

  return res.json();
} 
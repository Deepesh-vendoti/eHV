export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface Patient {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    phoneNumber: string;
    address: string;
}

export interface HealthRecord {
    id: number;
    patientId: number;
    recordType: string;
    fileName: string;
    description?: string;
    uploadDate: string;
    uploadedBy: string;
    tags?: string;
    fileType: string;
    fileSize: number;
    status: string;
}

export interface AuthResponse {
    token: string;
    user: User;
} 
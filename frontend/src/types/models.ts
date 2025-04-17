export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface Patient {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    medicalHistory?: string;
    dateOfBirth: string;
    registrationDate: string;
    active: boolean;
    gender?: string;
}

// Separate type for registration form data (includes password)
export interface PatientRegistrationData extends Omit<Patient, 'id' | 'registrationDate' | 'active'> {
    password: string;
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
    user?: User;
    patient?: Patient;
} 
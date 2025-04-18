import { Activity } from './types';

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'UPLOAD',
    recordType: 'Blood Pressure',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    description: 'Uploaded blood pressure reading: 120/80',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
  },
  {
    id: '2',
    type: 'SHARE',
    recordType: 'Medical Report',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    description: 'Shared annual checkup report',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anita',
    sharedWith: 'Dr. Smith'
  },
  {
    id: '3',
    type: 'ACCESS',
    recordType: 'Blood Sugar',
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    description: 'Viewed blood sugar readings',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
  },
  {
    id: '4',
    type: 'DELETE',
    recordType: 'Weight',
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    description: 'Deleted incorrect weight entry',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
  }
];

export const categories = ['Cardiac Health', 'Pregnancy Health', 'Lung Health', 'Metabolic Health'];

export const mockRecords = [
  {
    id: '1',
    category: 'Cardiac Health',
    type: 'Blood Pressure',
    date: '2023-11-01',
    source: 'Self-entered',
  },
  {
    id: '2',
    category: 'Pregnancy Health',
    type: 'Ultrasound',
    date: '2023-08-15',
    source: 'Upload',
  },
  {
    id: '3',
    category: 'Lung Health',
    type: 'CT Scan',
    date: '2023-10-01',
    source: 'Hospital',
  },
  {
    id: '4',
    category: 'Metabolic Health',
    type: 'A1C Test',
    date: '2023-09-10',
    source: 'Self-entered',
  },
]; 
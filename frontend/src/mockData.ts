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
export interface Activity {
  id: string;
  type: 'UPLOAD' | 'SHARE' | 'ACCESS' | 'DELETE';
  recordType: 'blood_pressure' | 'blood_sugar' | 'weight' | 'report';
  timestamp: string;
  description: string;
  sharedWith?: string;
  userAvatar?: string;
} 
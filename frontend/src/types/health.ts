export type MetricType = 'blood_pressure' | 'blood_sugar' | 'weight';

export interface HealthDataPoint {
  id: string;
  timestamp: string;
  value: number | { systolic: number; diastolic: number };
  notes?: string;
}

export interface HealthMetric {
  type: MetricType;
  label: string;
  unit: string;
  normalRange: {
    min: number;
    max: number;
  };
}

export interface HealthDataResponse {
  data: HealthDataPoint[];
  metric: HealthMetric;
  summary?: {
    average: number | { systolic: number; diastolic: number };
    trend?: 'increasing' | 'decreasing' | 'stable';
    trendPeriod?: string;
  };
} 
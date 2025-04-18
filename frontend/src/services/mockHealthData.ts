import { HealthDataResponse, MetricType } from '../types/health';
import { format, subDays } from 'date-fns';

const generateMockData = (metric: MetricType, days: number = 30): HealthDataResponse => {
  const data = [];
  const today = new Date();

  for (let i = days; i >= 0; i--) {
    const date = subDays(today, i);
    const id = `${metric}-${format(date, 'yyyy-MM-dd')}`;
    const timestamp = format(date, "yyyy-MM-dd'T'HH:mm:ss");

    switch (metric) {
      case 'blood_pressure':
        data.push({
          id,
          timestamp,
          value: {
            systolic: Math.floor(110 + Math.random() * 40), // 110-150
            diastolic: Math.floor(60 + Math.random() * 30), // 60-90
          },
        });
        break;

      case 'blood_sugar':
        data.push({
          id,
          timestamp,
          value: Math.floor(80 + Math.random() * 100), // 80-180 mg/dL
        });
        break;

      case 'weight':
        // Generate weight with small variations
        const baseWeight = 70; // 70kg base
        data.push({
          id,
          timestamp,
          value: +(baseWeight + (Math.random() * 4 - 2)).toFixed(1), // ±2kg variation
        });
        break;
    }
  }

  const metrics = {
    blood_pressure: {
      type: 'blood_pressure',
      label: 'Blood Pressure',
      unit: 'mmHg',
      normalRange: { min: 90, max: 120 }, // Systolic normal range
    },
    blood_sugar: {
      type: 'blood_sugar',
      label: 'Blood Sugar',
      unit: 'mg/dL',
      normalRange: { min: 70, max: 140 },
    },
    weight: {
      type: 'weight',
      label: 'Weight',
      unit: 'kg',
      normalRange: { min: 65, max: 75 },
    },
  };

  // Calculate summary
  let summary;
  if (metric === 'blood_pressure') {
    const systolicValues = data.map((d) => (d.value as { systolic: number }).systolic);
    const diastolicValues = data.map((d) => (d.value as { diastolic: number }).diastolic);
    
    summary = {
      average: {
        systolic: +(systolicValues.reduce((a, b) => a + b) / data.length).toFixed(1),
        diastolic: +(diastolicValues.reduce((a, b) => a + b) / data.length).toFixed(1),
      },
      trend: 'stable' as const,
      trendPeriod: 'last 30 days',
    };
  } else {
    const values = data.map((d) => d.value as number);
    summary = {
      average: +(values.reduce((a, b) => a + b) / data.length).toFixed(1),
      trend: 'stable' as const,
      trendPeriod: 'last 30 days',
    };
  }

  return {
    data,
    metric: metrics[metric],
    summary,
  };
};

export const mockHealthDataService = {
  async fetchHealthData(
    metric: MetricType,
    from: string,
    to: string
  ): Promise<HealthDataResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return generateMockData(metric);
  },
}; 
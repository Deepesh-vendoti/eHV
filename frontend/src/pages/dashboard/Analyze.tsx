import React, { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { mockHealthDataService } from '../../services/mockHealthData';
import { MetricType, HealthDataResponse } from '../../types/health';
import jsPDF from 'jspdf';

export default function Analyze() {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('blood_pressure');
  const [dateRange, setDateRange] = useState({
    from: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    to: format(new Date(), 'yyyy-MM-dd'),
  });
  const [healthData, setHealthData] = useState<HealthDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await mockHealthDataService.fetchHealthData(
          selectedMetric,
          dateRange.from,
          dateRange.to
        );
        setHealthData(data);
      } catch (err) {
        setError('Failed to fetch health data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedMetric, dateRange.from, dateRange.to]);

  const handleMetricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMetric(e.target.value as MetricType);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const downloadPDF = () => {
    if (!healthData) return;

    const doc = new jsPDF();
    const title = `${healthData.metric.label} Report`;
    const date = format(new Date(), 'MMMM dd, yyyy');

    // Add title
    doc.setFontSize(20);
    doc.text(title, 20, 20);

    // Add date
    doc.setFontSize(12);
    doc.text(`Generated on: ${date}`, 20, 30);

    // Add summary
    doc.setFontSize(14);
    doc.text('Summary', 20, 45);
    doc.setFontSize(12);
    
    if (selectedMetric === 'blood_pressure' && healthData.summary?.average) {
      const avg = healthData.summary.average as { systolic: number; diastolic: number };
      doc.text(`Average: ${avg.systolic}/${avg.diastolic} mmHg`, 20, 55);
    } else if (healthData.summary?.average) {
      doc.text(
        `Average: ${healthData.summary.average} ${healthData.metric.unit}`,
        20,
        55
      );
    }

    doc.save(`${healthData.metric.label.toLowerCase()}-report.pdf`);
  };

  const getChartData = () => {
    if (!healthData) return [];

    return healthData.data.map(point => ({
      date: format(new Date(point.timestamp), 'MMM dd'),
      ...(typeof point.value === 'number'
        ? { value: point.value }
        : { systolic: point.value.systolic, diastolic: point.value.diastolic }),
    }));
  };

  const renderSummary = () => {
    if (!healthData?.summary) return null;

    const { average, trend, trendPeriod } = healthData.summary;
    const { unit } = healthData.metric;

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Summary</h3>
        <div className="space-y-2">
          {typeof average === 'number' ? (
            <p>Average: {average} {unit}</p>
          ) : (
            <p>Average: {average.systolic}/{average.diastolic} {unit}</p>
          )}
          {trend && (
            <p className="text-gray-600">
              Trend: <span className="font-medium">{trend}</span> over {trendPeriod}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Analyze Health Data</h1>
        <button
          onClick={downloadPDF}
          disabled={!healthData || isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          Download PDF
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Metric</label>
          <select
            value={selectedMetric}
            onChange={handleMetricChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="blood_pressure">Blood Pressure</option>
            <option value="blood_sugar">Blood Sugar</option>
            <option value="weight">Weight</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">From</label>
          <input
            type="date"
            name="from"
            value={dateRange.from}
            onChange={handleDateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">To</label>
          <input
            type="date"
            name="to"
            value={dateRange.to}
            onChange={handleDateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : healthData ? (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              {healthData.metric.label} Over Time
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {selectedMetric === 'blood_pressure' ? (
                    <>
                      <Line
                        type="monotone"
                        dataKey="systolic"
                        stroke="#8884d8"
                        name="Systolic"
                      />
                      <Line
                        type="monotone"
                        dataKey="diastolic"
                        stroke="#82ca9d"
                        name="Diastolic"
                      />
                    </>
                  ) : (
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      name={healthData.metric.label}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {renderSummary()}
        </div>
      ) : null}
    </div>
  );
}
import React from 'react';
import UserDetailsSection from './UserDetailsSection';
import { ReportPurpose } from './ReportPurposeSelector';

interface MedicalReport {
  id: string;
  title: string;
  date: string;
  category: string;
  fileUrl: string;
  fileType: string;
}

interface HealthData {
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  weight: number;
  height: number;
  bmi: number;
}

interface UserDetails {
  name: string;
  dateOfBirth: string;
  email: string;
  age: number;
}

interface ShareableHealthReportProps {
  userDetails: UserDetails;
  healthData: HealthData;
  reportPurpose: ReportPurpose;
  medicalReports: MedicalReport[];
}

const getRelevantReports = (reports: MedicalReport[], purpose: ReportPurpose) => {
  // Filter logic based on report purpose
  switch (purpose) {
    case 'pregnancy_clinic':
      return reports.filter(report => 
        ['Pregnancy', 'Gynecology', 'General'].includes(report.category));
    case 'cardiology':
      return reports.filter(report => 
        ['Cardiac', 'General', 'Lab Results'].includes(report.category));
    // Add more cases as needed
    default:
      return reports;
  }
};

export default function ShareableHealthReport({
  userDetails,
  healthData,
  reportPurpose,
  medicalReports
}: ShareableHealthReportProps) {
  const relevantReports = getRelevantReports(medicalReports, reportPurpose);

  const handleShare = (method: 'email' | 'download' | 'print') => {
    switch (method) {
      case 'email':
        // Email sharing logic
        console.log('Share via email');
        break;
      case 'download':
        // Download logic
        console.log('Download report');
        break;
      case 'print':
        window.print();
        break;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 p-8 print:p-4 print:bg-white">
      <div className="space-y-6 print:space-y-4">
        {/* Header */}
        <div className="text-center mb-8 print:mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Health Report</h1>
          <p className="text-gray-600 mt-2">Purpose: {reportPurpose.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
          <p className="text-gray-600 mt-1">Generated on: {new Date().toLocaleDateString()}</p>
        </div>

        {/* User Details Section */}
        <UserDetailsSection userDetails={userDetails} />

        {/* Health Data Summary Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4">Health Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Blood Pressure</p>
              <p className="font-medium">{healthData.bloodPressure}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Heart Rate</p>
              <p className="font-medium">{healthData.heartRate} bpm</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Temperature</p>
              <p className="font-medium">{healthData.temperature}°C</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Weight</p>
              <p className="font-medium">{healthData.weight} kg</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Height</p>
              <p className="font-medium">{healthData.height} cm</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">BMI</p>
              <p className="font-medium">{healthData.bmi.toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* Medical Reports Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4">Relevant Medical Reports</h2>
          {relevantReports.length > 0 ? (
            <div className="space-y-4">
              {relevantReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{report.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(report.date).toLocaleDateString()} • {report.category}
                    </p>
                  </div>
                  <a
                    href={report.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View {report.fileType.toUpperCase()}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No relevant medical reports available for this purpose.</p>
          )}
        </div>

        {/* Share Options - Only visible in screen mode */}
        <div className="print:hidden bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Share Options</h2>
          <div className="flex gap-4">
            <button
              onClick={() => handleShare('email')}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Share via Email
            </button>
            <button
              onClick={() => handleShare('download')}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Download PDF
            </button>
            <button
              onClick={() => handleShare('print')}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
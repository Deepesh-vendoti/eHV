import React, { useState } from 'react';
import ShareableHealthReport from './ShareableHealthReport';
import { ReportPurpose } from './ReportPurposeSelector';

const MOCK_USER_DETAILS = {
  name: "Jane Doe",
  dateOfBirth: "1990-05-15",
  email: "jane.doe@example.com",
  age: 33
};

const MOCK_HEALTH_DATA = {
  bloodPressure: "120/80",
  heartRate: 72,
  temperature: 36.6,
  weight: 65,
  height: 170,
  bmi: 22.5
};

const MOCK_MEDICAL_REPORTS = [
  {
    id: "1",
    title: "Annual Physical Examination",
    date: "2024-02-15",
    category: "General",
    fileUrl: "/reports/physical.pdf",
    fileType: "pdf"
  },
  {
    id: "2",
    title: "Cardiac Stress Test",
    date: "2024-01-20",
    category: "Cardiac",
    fileUrl: "/reports/cardiac.pdf",
    fileType: "pdf"
  },
  {
    id: "3",
    title: "Pregnancy Ultrasound",
    date: "2024-03-01",
    category: "Pregnancy",
    fileUrl: "/reports/ultrasound.pdf",
    fileType: "pdf"
  }
];

export default function ShareableReportContainer() {
  const [selectedPurpose, setSelectedPurpose] = useState<ReportPurpose>('general');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Purpose Selection and Preview Toggle */}
      <div className="max-w-4xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create Shareable Health Report</h1>
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {isPreviewMode ? 'Edit Report' : 'Preview Report'}
          </button>
        </div>

        {!isPreviewMode && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Report Purpose
              </label>
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value as ReportPurpose)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="general">General Health Report</option>
                <option value="pregnancy_clinic">Pregnancy Clinic</option>
                <option value="cardiology">Cardiology Consultation</option>
                <option value="insurance">Insurance Assessment</option>
              </select>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Report Preview Instructions</h3>
              <p className="text-sm text-blue-600">
                Click "Preview Report" above to see how your report will look. You can then use the sharing options
                to download, print, or email the report.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Report Preview */}
      {isPreviewMode && (
        <ShareableHealthReport
          userDetails={MOCK_USER_DETAILS}
          healthData={MOCK_HEALTH_DATA}
          reportPurpose={selectedPurpose}
          medicalReports={MOCK_MEDICAL_REPORTS}
        />
      )}
    </div>
  );
} 
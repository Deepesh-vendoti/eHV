import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import AddHealthDataModal from "../../components/AddHealthDataModal";
import UploadReportModal from "../../components/UploadReportModal";

const Store: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <AddHealthDataModal />
        <UploadReportModal />
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
        <p className="text-sm text-gray-500">No recent activity to display.</p>
      </div>
    </div>
  );
};

export default Store;
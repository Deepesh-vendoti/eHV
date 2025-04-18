import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import UploadReportModal from "./UploadReportModal";
import StoreDashboard from "./StoreDashboard";

export function Store() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Track Health Metrics Card */}
      <Card className="col-span-3 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Track Health Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Record your daily health measurements including blood pressure, blood sugar, and
            weight to monitor your health progress.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Add Health Data Button */}
            <div className="flex items-center justify-center p-4 border rounded-lg">
              <button className="text-lg">
                ➕ Add New Health Data
              </button>
            </div>
            {/* Upload Report Button */}
            <div className="flex items-center justify-center p-4 border rounded-lg">
              <UploadReportModal />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <StoreDashboard />
    </div>
  );
} 
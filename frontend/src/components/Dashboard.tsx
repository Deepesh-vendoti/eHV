import React, { useState } from "react";
import AddHealthDataModal from "./AddHealthDataModal";
import UploadReportModal from "./UploadReportModal";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type DashboardSection = "store" | "organize" | "analyze" | "share";

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>("store");

  const sections: DashboardSection[] = ["store", "organize", "analyze", "share"];

  const getSectionIcon = (section: DashboardSection): string => {
    switch (section) {
      case "store":
        return "📦";
      case "organize":
        return "🗂";
      case "analyze":
        return "📊";
      case "share":
        return "🤝";
      default:
        return "";
    }
  };

  const getSectionTitle = (section: DashboardSection): string => {
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Health Dashboard</h1>
        </div>

        {/* Section Switcher */}
        <div className="flex gap-4 mt-4">
          {sections.map((section) => (
            <Button
              key={section}
              variant={activeSection === section ? "default" : "outline"}
              onClick={() => setActiveSection(section)}
              className="flex items-center gap-2"
            >
              <span>{getSectionIcon(section)}</span>
              {getSectionTitle(section)}
            </Button>
          ))}
        </div>

        {/* Store Section */}
        {activeSection === "store" && (
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">📦 Store Your Health Info</h3>
              <p className="text-sm text-muted-foreground">
                Enter vitals or upload reports to keep track of your health data
              </p>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4 mt-2">
              <AddHealthDataModal />
              <UploadReportModal />
            </CardContent>
          </Card>
        )}

        {/* Health Data Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Latest Weight</h3>
            <p className="text-3xl font-bold">-- kg</p>
            <p className="text-sm text-gray-500">Last updated: --</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Blood Pressure</h3>
            <p className="text-3xl font-bold">--/--</p>
            <p className="text-sm text-gray-500">Last updated: --</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Blood Sugar</h3>
            <p className="text-3xl font-bold">-- mg/dL</p>
            <p className="text-sm text-gray-500">Last updated: --</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Recent Reports</h3>
            <p className="text-3xl font-bold">--</p>
            <p className="text-sm text-gray-500">Last uploaded: --</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Activity items will be populated here */}
            <p className="text-gray-500 text-center">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import AddHealthDataModal from "../../components/AddHealthDataModal";
import UploadReportModal from "../../components/UploadReportModal";
import { useAuth } from "../../context/AuthContext";
import { getPatientHealthData, type HealthDataResponse } from "../../api/healthData";
import { getPatientHealthRecords, type HealthRecordResponse } from "../../api/healthRecords";

interface RecentActivity {
  type: 'health' | 'record';
  data: HealthDataResponse | HealthRecordResponse;
  timestamp: string;
}

const Store: React.FC = () => {
  const { user } = useAuth();
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecentActivity() {
      try {
        const patientId = user?.id || 1;
        const [healthData, records] = await Promise.all([
          getPatientHealthData(patientId),
          getPatientHealthRecords(patientId),
        ]);

        const combinedActivity: RecentActivity[] = [
          ...healthData.map(data => ({
            type: 'health' as const,
            data,
            timestamp: data.recordedDate,
          })),
          ...records.map(record => ({
            type: 'record' as const,
            data: record,
            timestamp: record.uploadedDate,
          })),
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
         .slice(0, 10); // Show only last 10 activities

        setRecentActivity(combinedActivity);
      } catch (err) {
        setError("Failed to load recent activity");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecentActivity();
  }, [user]);

  function formatActivityItem(item: RecentActivity): string {
    if (item.type === 'health') {
      const healthData = item.data as HealthDataResponse;
      return `${healthData.metric}: ${healthData.value} ${healthData.unit}`;
    } else {
      const record = item.data as HealthRecordResponse;
      return `Uploaded ${record.recordType.toLowerCase()}: ${record.fileName} (${formatFileSize(record.fileSize)})`;
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Health Metrics Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Track Health Metrics</CardTitle>
            <CardDescription>
              Record your daily health measurements including blood pressure,
              blood sugar, and weight to monitor your health progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddHealthDataModal />
          </CardContent>
        </Card>

        {/* Medical Reports Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Upload Medical Reports</CardTitle>
            <CardDescription>
              Store your medical documents, lab reports, prescriptions, and
              other health-related files securely for easy access.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UploadReportModal />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Card */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest health records and measurements
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading recent activity...</p>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : recentActivity.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent activity to display.</p>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {activity.type === 'health' ? '🩺' : '📄'}
                    </span>
                    <span className="text-sm font-medium">
                      {formatActivityItem(activity)}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(activity.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Store;
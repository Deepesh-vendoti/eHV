import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

interface HealthDataItem {
  metric: string;
  value: string;
  unit: string;
  createdAt: string;
}

interface RecordItem {
  id: string;
  recordType: string;
  fileName: string;
  description?: string;
  createdAt: string;
}

const StoreDashboard = () => {
  const { user } = useAuth();
  const [healthData, setHealthData] = useState<HealthDataItem[]>([]);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const patientId = user?.id || 1;

  const fetchRecentActivity = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [vitalsRes, recordsRes] = await Promise.all([
        fetch(`http://localhost:8080/api/healthdata/self/patient/${patientId}`),
        fetch(`http://localhost:8080/api/health-records/patient/${patientId}`)
      ]);

      if (!vitalsRes.ok || !recordsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const [vitalsData, recordsData] = await Promise.all([
        vitalsRes.json(),
        recordsRes.json()
      ]);

      setHealthData(vitalsData.slice(-3).reverse());
      setRecords(recordsData.slice(-3).reverse());
    } catch (err) {
      console.error("Failed to load recent activity", err);
      setError("Failed to load recent activity. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentActivity();
  }, [patientId]);

  // Listen for refresh events from UploadReportModal
  useEffect(() => {
    const handleRefresh = () => {
      fetchRecentActivity();
    };

    window.addEventListener('refreshActivity', handleRefresh);
    return () => window.removeEventListener('refreshActivity', handleRefresh);
  }, []);

  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (err) {
      return "Date unavailable";
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric.toLowerCase()) {
      case 'blood_pressure':
        return '🫀';
      case 'blood_sugar':
        return '🩸';
      case 'weight':
        return '⚖️';
      default:
        return '📊';
    }
  };

  const getRecordTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lab_report':
        return '🔬';
      case 'prescription':
        return '💊';
      case 'scan':
        return '🔎';
      case 'vaccination':
        return '💉';
      default:
        return '📄';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[450px] pr-4">
          {healthData.length === 0 && records.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No recent activity to display
            </div>
          ) : (
            <div className="space-y-4">
              {healthData.map((item, index) => (
                <div
                  key={`vital-${index}`}
                  className="flex items-start space-x-4 rounded-lg border p-4 transition-all hover:bg-accent/50"
                >
                  <span className="text-2xl" role="img" aria-label={item.metric}>
                    {getMetricIcon(item.metric)}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">
                      {item.metric?.replace(/_/g, ' ')}:{' '}
                      <span className="font-normal">
                        {item.value} {item.unit}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>
              ))}

              {records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-start space-x-4 rounded-lg border p-4 transition-all hover:bg-accent/50"
                >
                  <span className="text-2xl" role="img" aria-label={record.recordType}>
                    {getRecordTypeIcon(record.recordType)}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">
                      {record.recordType?.replace(/_/g, ' ')}:{' '}
                      <span className="font-normal">
                        {record.fileName || 'Untitled Document'}
                      </span>
                    </p>
                    {record.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {record.description}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {formatDate(record.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StoreDashboard; 
import { mockRecords } from '../../mockData';

interface OrganizeTimelineViewProps {
  dateRange: {
    from: string;
    to: string;
  };
}

export function OrganizeTimelineView({ dateRange }: OrganizeTimelineViewProps) {
  const filteredRecords = mockRecords.filter((record) => {
    const recordDate = new Date(record.date);
    return recordDate >= new Date(dateRange.from) && recordDate <= new Date(dateRange.to);
  });

  const grouped = filteredRecords.reduce((acc, rec) => {
    const month = new Date(rec.date).toLocaleString('default', { month: 'long', year: 'numeric' });
    acc[month] = acc[month] || [];
    acc[month].push(rec);
    return acc;
  }, {} as Record<string, typeof filteredRecords>);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).length > 0 ? (
        Object.entries(grouped).map(([month, items]) => (
          <div key={month}>
            <div className="text-lg font-medium mb-2">{month}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {items.map((item) => (
                <div key={item.id} className="border p-3 rounded shadow-sm">
                  <div className="font-semibold">{item.type}</div>
                  <div className="text-sm text-gray-600">{item.category}</div>
                  <div className="text-xs text-gray-400">{item.date}</div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-8">
          No records found for the selected date range
        </div>
      )}
    </div>
  );
} 
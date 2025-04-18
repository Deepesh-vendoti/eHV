import { mockRecords } from '../../mockData';

interface OrganizeCategoryViewProps {
  selectedCategory: string;
}

export function OrganizeCategoryView({ selectedCategory }: OrganizeCategoryViewProps) {
  const filtered = selectedCategory === 'All'
    ? mockRecords
    : mockRecords.filter((r) => r.category === selectedCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filtered.map((record) => (
        <div key={record.id} className="border rounded p-4 shadow-sm">
          <div className="font-semibold">{record.category}</div>
          <div className="text-sm text-gray-600">{record.type}</div>
          <div className="text-xs text-gray-400">{record.date}</div>
        </div>
      ))}
    </div>
  );
} 
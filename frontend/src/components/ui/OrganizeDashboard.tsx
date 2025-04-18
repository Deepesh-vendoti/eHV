import React, { useState } from 'react';
import { OrganizeCategoryView } from './OrganizeCategoryView';
import { OrganizeTimelineView } from './OrganizeTimelineView';

export default function OrganizeDashboard() {
  const [activeTab, setActiveTab] = useState<'category' | 'timeline'>('category');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [dateRange, setDateRange] = useState({ from: '2023-01-01', to: '2023-12-31' });

  const tabClasses = (tab: 'category' | 'timeline') =>
    `px-4 py-2 text-sm font-medium border-b-2 transition-all ${
      activeTab === tab ? 'text-blue-600 border-blue-600' : 'text-gray-400 border-transparent'
    }`;

  return (
    <div className="p-4 space-y-4">
      <div className="text-xl font-semibold">Organize</div>

      {/* Horizontal Tabs */}
      <div className="flex space-x-6 border-b pb-1">
        <button className={tabClasses('category')} onClick={() => setActiveTab('category')}>By Category</button>
        <button className={tabClasses('timeline')} onClick={() => setActiveTab('timeline')}>Timeline View</button>
      </div>

      {/* Unified Filter Controls */}
      <div className="flex items-center flex-wrap gap-4">
        {activeTab === 'category' && (
          <select
            className="border rounded px-2 py-1"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Cardiac Health">Cardiac Health</option>
            <option value="Pregnancy Health">Pregnancy Health</option>
            <option value="Metabolic Health">Metabolic Health</option>
            <option value="Lung Health">Lung Health</option>
          </select>
        )}

        {activeTab === 'timeline' && (
          <div className="flex gap-2">
            <div>
              <label className="text-sm text-gray-600">From</label>
              <input
                type="date"
                className="border rounded px-2 py-1"
                value={dateRange.from}
                onChange={(e) => setDateRange((prev) => ({ ...prev, from: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">To</label>
              <input
                type="date"
                className="border rounded px-2 py-1"
                value={dateRange.to}
                onChange={(e) => setDateRange((prev) => ({ ...prev, to: e.target.value }))}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main View */}
      <div className="mt-4">
        {activeTab === 'category' ? (
          <OrganizeCategoryView selectedCategory={selectedCategory} />
        ) : (
          <OrganizeTimelineView dateRange={dateRange} />
        )}
      </div>
    </div>
  );
} 
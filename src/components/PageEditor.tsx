import React from 'react';
import { useVideoStore } from '../store/videoStore';

export const PageEditor: React.FC = () => {
  const { project, updatePage } = useVideoStore();
  const currentPage = project.pages[project.currentPageIndex];

  const handleUpdate = (field: string, value: string | number) => {
    updatePage(currentPage.id, { [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={currentPage.title}
          onChange={(e) => handleUpdate('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text Content
        </label>
        <textarea
          value={currentPage.text}
          onChange={(e) => handleUpdate('text', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Duration (seconds)
        </label>
        <input
          type="number"
          value={currentPage.duration}
          onChange={(e) => handleUpdate('duration', Number(e.target.value))}
          min={1}
          max={30}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Background Color
        </label>
        <input
          type="color"
          value={currentPage.backgroundColor}
          onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
          className="w-full h-10"
        />
      </div>
    </div>
  );
};
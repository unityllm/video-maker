import React from 'react';
import { useVideoStore } from '../store/videoStore';
import { Trash2, Plus } from 'lucide-react';

export const PageList: React.FC = () => {
  const { project, addPage, removePage, setCurrentPage } = useVideoStore();
  const { pages, currentPageIndex } = project;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Pages</h3>
        <button
          onClick={addPage}
          className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Page
        </button>
      </div>
      <div className="space-y-2">
        {pages.map((page, index) => (
          <div
            key={page.id}
            className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${
              index === currentPageIndex
                ? 'bg-indigo-100 border-indigo-300'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => setCurrentPage(index)}
          >
            <span className="font-medium">Page {index + 1}</span>
            {pages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removePage(page.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
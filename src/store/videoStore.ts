import { create } from 'zustand';
import { VideoPage, VideoProject } from '../types/video';
import { generateId } from '../utils/helpers';

interface VideoStore {
  project: VideoProject;
  addPage: () => void;
  removePage: (id: string) => void;
  updatePage: (id: string, updates: Partial<VideoPage>) => void;
  setCurrentPage: (index: number) => void;
}

const createDefaultPage = (): VideoPage => ({
  id: generateId(),
  title: 'Welcome',
  text: 'Create your video presentation',
  backgroundColor: '#4F46E5',
  duration: 5,
});

const initialProject: VideoProject = {
  pages: [createDefaultPage()],
  currentPageIndex: 0,
};

export const useVideoStore = create<VideoStore>((set) => ({
  project: initialProject,
  addPage: () => set((state) => ({
    project: {
      ...state.project,
      pages: [...state.project.pages, createDefaultPage()],
    },
  })),
  removePage: (id) => set((state) => ({
    project: {
      ...state.project,
      pages: state.project.pages.filter((page) => page.id !== id),
      currentPageIndex: Math.max(
        0,
        Math.min(
          state.project.currentPageIndex,
          state.project.pages.length - 2
        )
      ),
    },
  })),
  updatePage: (id, updates) => set((state) => ({
    project: {
      ...state.project,
      pages: state.project.pages.map((page) =>
        page.id === id ? { ...page, ...updates } : page
      ),
    },
  })),
  setCurrentPage: (index) => set((state) => ({
    project: {
      ...state.project,
      currentPageIndex: index,
    },
  })),
}));
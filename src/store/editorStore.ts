import { create } from 'zustand';
import type { FileNode, Tab, EditorSettings } from '../types/editor';

interface EditorStore {
  files: FileNode[];
  tabs: Tab[];
  activeTab: string | null;
  settings: EditorSettings;
  rightSidebarOpen: boolean;
  setFiles: (files: FileNode[]) => void;
  addTab: (tab: Tab) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTabContent: (id: string, content: string) => void;
  setTabDirty: (id: string, isDirty: boolean) => void;
  updateSettings: (settings: Partial<EditorSettings>) => void;
  toggleRightSidebar: () => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  files: [],
  tabs: [],
  activeTab: null,
  rightSidebarOpen: true,
  settings: {
    theme: 'vs-dark',
    fontSize: 14,
    tabSize: 2,
    wordWrap: 'on',
    minimap: true,
    autoSave: true,
  },
  setFiles: (files) => set({ files }),
  addTab: (tab) => set((state) => ({
    tabs: [...state.tabs.filter((t) => t.id !== tab.id), tab],
    activeTab: tab.id,
  })),
  closeTab: (id) => set((state) => ({
    tabs: state.tabs.filter((t) => t.id !== id),
    activeTab: state.activeTab === id
      ? state.tabs[state.tabs.length - 2]?.id ?? null
      : state.activeTab,
  })),
  setActiveTab: (id) => set({ activeTab: id }),
  updateTabContent: (id, content) => set((state) => ({
    tabs: state.tabs.map((tab) =>
      tab.id === id ? { ...tab, content } : tab
    ),
  })),
  setTabDirty: (id, isDirty) => set((state) => ({
    tabs: state.tabs.map((tab) =>
      tab.id === id ? { ...tab, isDirty } : tab
    ),
  })),
  updateSettings: (settings) => set((state) => ({
    settings: { ...state.settings, ...settings },
  })),
  toggleRightSidebar: () => set((state) => ({
    rightSidebarOpen: !state.rightSidebarOpen,
  })),
}));
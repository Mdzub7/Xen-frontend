export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  content?: string;
  language?: string;
}

export interface Tab {
  id: string;
  path: string;
  name: string;
  content: string;
  language: string;
  isDirty: boolean;
}

export interface EditorSettings {
  theme: 'vs-dark' | 'light';
  fontSize: number;
  tabSize: number;
  wordWrap: 'on' | 'off';
  minimap: boolean;
  autoSave: boolean;
}
import React from 'react';
import Split from 'react-split';
import { ActivityBar } from './components/ActivityBar';
import { FileExplorer } from './components/FileExplorer';
import { EditorTabs } from './components/EditorTabs';
import { Editor } from './components/Editor';
import { StatusBar } from './components/StatusBar';
import { Toolbar } from './components/Toolbar';
import { RightSidebar } from './components/RightSidebar';
import { useEditorStore } from './store/editorStore';

// Mock data for development
const mockFiles = [
  {
    id: '1',
    name: 'src',
    type: 'folder' as const,
    path: '/src',
    children: [
      {
        id: '2',
        name: 'App.tsx',
        type: 'file' as const,
        path: '/src/App.tsx',
        language: 'typescript',
        content: '// Your App.tsx content'
      },
      {
        id: '3',
        name: 'components',
        type: 'folder' as const,
        path: '/src/components',
        children: [
          {
            id: '4',
            name: 'Editor.tsx',
            type: 'file' as const,
            path: '/src/components/Editor.tsx',
            language: 'typescript',
            content: '// Your Editor.tsx content'
          }
        ]
      }
    ]
  }
];

function App() {
  const setFiles = useEditorStore((state) => state.setFiles);

  React.useEffect(() => {
    setFiles(mockFiles);
  }, [setFiles]);

  return (
    <div className="h-screen flex flex-col bg-primary text-text">
      <Toolbar />
      <div className="flex-1 flex overflow-hidden">
        <ActivityBar />
        <Split
          className="flex-1 flex overflow-hidden"
          sizes={[20, 60, 20]}
          minSize={[200, 400, 250]}
          gutterSize={4}
          snapOffset={30}
        >
          <div className="h-full overflow-hidden">
            <FileExplorer />
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <EditorTabs />
            <Editor />
          </div>
          <RightSidebar />
        </Split>
      </div>
      <StatusBar />
    </div>
  );
}

export default App;
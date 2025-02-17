import React from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { useEditorStore } from '../store/editorStore';

export const Editor: React.FC = () => {
  const { tabs, activeTab, settings, updateTabContent, setTabDirty } = useEditorStore();
  const currentTab = tabs.find((tab) => tab.id === activeTab);

  const handleChange = (value: string | undefined) => {
    if (!currentTab || !value) return;
    updateTabContent(currentTab.id, value);
    setTabDirty(currentTab.id, true);
  };

  if (!currentTab) {
    return (
      <div className="flex-1 bg-[#1e1e1e] flex items-center justify-center text-gray-500">
        No file open
      </div>
    );
  }

  return (
    <MonacoEditor
      height="100%"
      language={currentTab.language}
      value={currentTab.content}
      theme={settings.theme}
      onChange={handleChange}
      options={{
        fontSize: settings.fontSize,
        tabSize: settings.tabSize,
        wordWrap: settings.wordWrap,
        minimap: {
          enabled: settings.minimap
        },
        automaticLayout: true,
      }}
    />
  );
};
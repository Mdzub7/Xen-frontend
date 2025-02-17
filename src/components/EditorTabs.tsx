import React from 'react';
import { X, Circle, ChevronDown } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import clsx from 'clsx';

export const EditorTabs: React.FC = () => {
  const { tabs, activeTab, closeTab, setActiveTab } = useEditorStore();

  return (
    <div className="flex flex-col">
      <div className="breadcrumb bg-secondary border-b border-accent/10">
        {tabs.length > 0 && tabs.find(t => t.id === activeTab)?.path.split('/').filter(Boolean).map((part, index, array) => (
          <React.Fragment key={index}>
            <span className="breadcrumb-item">{part}</span>
            {index < array.length - 1 && <span className="text-text/50">/</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="flex bg-secondary border-b border-accent/10 overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={clsx(
              'group flex items-center px-3 py-1.5 border-r border-accent/10',
              'min-w-[120px] max-w-[200px] transition-all duration-200',
              'cursor-pointer hover:bg-accent/5',
              activeTab === tab.id && 'bg-primary border-t-2 border-t-accent'
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="font-mono text-sm truncate flex-1">{tab.name}</span>
            {tab.isDirty && (
              <Circle size={6} className="mx-1 fill-warning text-warning" />
            )}
            <button
              className="opacity-0 group-hover:opacity-100 hover:bg-accent/10 p-1 rounded transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            >
              <X size={14} className="text-text/70 hover:text-text" />
            </button>
          </div>
        ))}
        <button className="p-1.5 hover:bg-accent/10 transition-colors">
          <ChevronDown size={16} className="text-text/70" />
        </button>
      </div>
    </div>
  );
};
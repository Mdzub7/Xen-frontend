import React from 'react';
import { useEditorStore } from '../store/editorStore';
import { Github as Git, AlertCircle, AlertTriangle, Wifi, Cpu, HardDrive } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { tabs, activeTab } = useEditorStore();
  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="h-6 bg-secondary text-text/80 flex items-center text-sm border-t border-accent/10">
      <div className="flex-1 flex items-center">
        <div className="status-item">
          <Git size={14} className="text-success" />
          <span>main</span>
        </div>
        <div className="status-item">
          <AlertCircle size={14} className="text-error" />
          <span>0</span>
          <AlertTriangle size={14} className="text-warning ml-2" />
          <span>0</span>
        </div>
        {currentTab && (
          <>
            <div className="status-item">{currentTab.language}</div>
            <div className="status-item">UTF-8</div>
            <div className="status-item">Ln 1, Col 1</div>
          </>
        )}
      </div>
      <div className="flex items-center">
        <div className="status-item">
          <Cpu size={14} />
          <span>23%</span>
        </div>
        <div className="status-item">
          <HardDrive size={14} />
          <span>1.2GB</span>
        </div>
        <div className="status-item">
          <Wifi size={14} className="text-success" />
        </div>
      </div>
    </div>
  );
};
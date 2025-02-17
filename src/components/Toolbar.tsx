import React from 'react';
import { 
  Save,
  Settings,
  Sparkles,
  Bug,
  Code2,
  FileSearch
} from 'lucide-react';

export const Toolbar: React.FC = () => {
  return (
    <div className="h-10 bg-[#252526] border-b border-[#454545] flex items-center px-4 space-x-2">
      <button className="p-1.5 hover:bg-[#454545] rounded">
        <Save size={18} />
      </button>
      <div className="h-5 w-px bg-[#454545] mx-2" />
      <button className="p-1.5 hover:bg-[#454545] rounded" title="Get AI Suggestions">
        <Sparkles size={18} />
      </button>
      <button className="p-1.5 hover:bg-[#454545] rounded" title="Explain Code">
        <Code2 size={18} />
      </button>
      <button className="p-1.5 hover:bg-[#454545] rounded" title="Review Code">
        <FileSearch size={18} />
      </button>
      <button className="p-1.5 hover:bg-[#454545] rounded" title="Detect Bugs">
        <Bug size={18} />
      </button>
      <div className="flex-1" />
      <button className="p-1.5 hover:bg-[#454545] rounded">
        <Settings size={18} />
      </button>
    </div>
  );
};
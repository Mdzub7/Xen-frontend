import React from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  File, 
  Folder,
  FolderPlus,
  FilePlus,
  Search
} from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import type { FileNode } from '../types/editor';

const FileTreeItem: React.FC<{ node: FileNode; level: number }> = ({ node, level }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const addTab = useEditorStore((state) => state.addTab);

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsOpen(!isOpen);
    } else {
      addTab({
        id: node.path,
        path: node.path,
        name: node.name,
        content: node.content || '',
        language: node.language || 'plaintext',
        isDirty: false,
      });
    }
  };

  return (
    <div>
      <div
        className="flex items-center px-2 py-1 hover:bg-gray-700 cursor-pointer"
        style={{ paddingLeft: `${level * 12}px` }}
        onClick={handleClick}
      >
        <span className="mr-1">
          {node.type === 'folder' ? (
            isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          ) : null}
        </span>
        {node.type === 'folder' ? (
          <Folder size={16} className="mr-1" />
        ) : (
          <File size={16} className="mr-1" />
        )}
        <span className="text-sm">{node.name}</span>
      </div>
      {isOpen && node.children?.map((child) => (
        <FileTreeItem key={child.path} node={child} level={level + 1} />
      ))}
    </div>
  );
};

export const FileExplorer: React.FC = () => {
  const files = useEditorStore((state) => state.files);

  return (
    <div className="h-full bg-[#252526] border-r border-[#454545]">
      <div className="p-2 border-b border-[#454545]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">EXPLORER</span>
          <div className="flex space-x-2">
            <button className="p-1 hover:bg-gray-700 rounded">
              <FilePlus size={16} />
            </button>
            <button className="p-1 hover:bg-gray-700 rounded">
              <FolderPlus size={16} />
            </button>
          </div>
        </div>
        <div className="flex items-center px-2 py-1 bg-[#3c3c3c] rounded">
          <Search size={14} className="mr-2" />
          <input
            type="text"
            placeholder="Search files"
            className="w-full bg-transparent text-sm focus:outline-none"
          />
        </div>
      </div>
      <div className="overflow-y-auto">
        {files.map((node) => (
          <FileTreeItem key={node.path} node={node} level={0} />
        ))}
      </div>
    </div>
  );
};
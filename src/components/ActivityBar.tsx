import React from 'react';
import { motion } from 'framer-motion';
import {
  Files,
  Search,
  GitBranch,
  Star,
  Clock,
  Package,
  Settings,
} from 'lucide-react';
import clsx from 'clsx';

interface ActivityBarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const ActivityBarItem: React.FC<ActivityBarItemProps> = ({
  icon,
  label,
  isActive,
  onClick,
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={clsx(
      'relative w-12 h-12 flex items-center justify-center group',
      isActive && 'after:absolute after:left-0 after:top-0 after:w-0.5 after:h-full after:bg-accent'
    )}
    onClick={onClick}
  >
    <div
      className={clsx(
        'p-2 rounded transition-colors group-hover:bg-accent/10',
        isActive ? 'text-accent' : 'text-text/70'
      )}
    >
      {icon}
    </div>
    <div className="absolute left-14 px-2 py-1 bg-secondary rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {label}
    </div>
  </motion.button>
);

export const ActivityBar: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState('explorer');

  return (
    <div className="w-12 bg-secondary border-r border-accent/10 flex flex-col items-center py-2">
      <div className="flex-1 space-y-2">
        <ActivityBarItem
          icon={<Files size={24} />}
          label="Explorer"
          isActive={activeItem === 'explorer'}
          onClick={() => setActiveItem('explorer')}
        />
        <ActivityBarItem
          icon={<Search size={24} />}
          label="Search"
          isActive={activeItem === 'search'}
          onClick={() => setActiveItem('search')}
        />
        <ActivityBarItem
          icon={<GitBranch size={24} />}
          label="Source Control"
          isActive={activeItem === 'git'}
          onClick={() => setActiveItem('git')}
        />
        <ActivityBarItem
          icon={<Star size={24} />}
          label="Favorites"
          isActive={activeItem === 'favorites'}
          onClick={() => setActiveItem('favorites')}
        />
        <ActivityBarItem
          icon={<Clock size={24} />}
          label="Recent"
          isActive={activeItem === 'recent'}
          onClick={() => setActiveItem('recent')}
        />
        <ActivityBarItem
          icon={<Package size={24} />}
          label="Extensions"
          isActive={activeItem === 'extensions'}
          onClick={() => setActiveItem('extensions')}
        />
      </div>
      <ActivityBarItem
        icon={<Settings size={24} />}
        label="Settings"
        isActive={activeItem === 'settings'}
        onClick={() => setActiveItem('settings')}
      />
    </div>
  );
};
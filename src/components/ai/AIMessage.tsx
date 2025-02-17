import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CodeBlock } from './CodeBlock';
import { MessageSquare, User, Check, Clock } from 'lucide-react';
import clsx from 'clsx';

interface AIMessageProps {
  content: string;
  timestamp: Date;
  isUser?: boolean;
  status?: 'sent' | 'delivered' | 'seen';
  codeBlocks?: Array<{ code: string; language: string }>;
  suggestions?: string[];
}

export const AIMessage: React.FC<AIMessageProps> = ({
  content,
  timestamp,
  isUser,
  status = 'seen',
  codeBlocks = [],
  suggestions = [],
}) => {
  const statusIcon = {
    sent: <Clock size={12} className="text-text/50" />,
    delivered: <Check size={12} className="text-text/50" />,
    seen: <Check size={12} className="text-accent" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        'flex space-x-3 mb-6',
        isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
      )}
    >
      <div
        className={clsx(
          'w-8 h-8 rounded-full flex items-center justify-center',
          isUser ? 'bg-accent' : 'bg-secondary'
        )}
      >
        {isUser ? (
          <User size={16} className="text-white" />
        ) : (
          <MessageSquare size={16} className="text-accent" />
        )}
      </div>
      <div className={clsx('flex-1 space-y-2', isUser && 'items-end')}>
        <div
          className={clsx(
            'relative p-4 rounded-lg',
            isUser
              ? 'bg-accent text-white'
              : 'glass'
          )}
        >
          <p className="text-sm whitespace-pre-wrap">{content}</p>
          {codeBlocks.map((block, index) => (
            <CodeBlock
              key={index}
              code={block.code}
              language={block.language}
            />
          ))}
          <div className="mt-2 flex items-center text-xs space-x-2 opacity-70">
            <span>{format(timestamp, 'HH:mm')}</span>
            {isUser && statusIcon[status]}
          </div>
        </div>
        {!isUser && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="px-3 py-1.5 rounded-full text-xs bg-accent/10 hover:bg-accent/20 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
import React from 'react';
import { useEditorStore } from '../store/editorStore';
import {
  ChevronRight,
  MessageSquare,
  Clock,
  Zap,
  Send,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIMessage } from './ai/AIMessage';
import clsx from 'clsx';

const mockMessages = [
  {
    content: "Hello! I'm your AI assistant. How can I help you with your code today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    suggestions: [
      "Review my code",
      "Explain this function",
      "Suggest improvements"
    ]
  },
  {
    content: "Can you help me optimize this function?",
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
    isUser: true,
    status: 'seen' as const
  },
  {
    content: "I've analyzed your function. Here's an optimized version with improved performance:",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    codeBlocks: [{
      language: 'typescript',
      code: `function optimizedFunction(items: string[]): string[] {
  return items
    .filter(item => item.length > 0)
    .map(item => item.trim())
    .sort();
}`
    }],
    suggestions: [
      "Explain the changes",
      "Show performance comparison",
      "Add error handling"
    ]
  }
];

const TypingIndicator: React.FC = () => (
  <div className="flex space-x-2 p-2">
    <motion.div
      className="w-2 h-2 rounded-full bg-accent/50"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
    <motion.div
      className="w-2 h-2 rounded-full bg-accent/50"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
    />
    <motion.div
      className="w-2 h-2 rounded-full bg-accent/50"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
    />
  </div>
);

export const RightSidebar: React.FC = () => {
  const { rightSidebarOpen, toggleRightSidebar } = useEditorStore();
  const [isTyping, setIsTyping] = React.useState(false);
  const [input, setInput] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [mockMessages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setInput('');
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  return (
    <div
      className={clsx(
        'border-l border-accent/10 transition-all duration-300',
        rightSidebarOpen ? 'w-[300px]' : 'w-0'
      )}
    >
      <div className="h-full bg-secondary relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -left-4 top-4 bg-secondary p-1 rounded-l border-l border-t border-b border-accent/10 transition-colors hover:bg-accent/10"
          onClick={toggleRightSidebar}
        >
          <ChevronRight
            size={16}
            className={clsx(
              'transition-transform duration-300',
              rightSidebarOpen && 'rotate-180'
            )}
          />
        </motion.button>
        <AnimatePresence>
          {rightSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col"
            >
              <div className="p-4 border-b border-accent/10">
                <h3 className="text-sm font-semibold mb-2 flex items-center">
                  <MessageSquare size={16} className="mr-2" />
                  AI Assistant
                </h3>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn bg-accent/10 hover:bg-accent/20 text-xs"
                  >
                    <Zap size={12} className="mr-1" />
                    New Chat
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn bg-accent/10 hover:bg-accent/20 text-xs"
                  >
                    <Clock size={12} className="mr-1" />
                    History
                  </motion.button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {mockMessages.map((message, index) => (
                  <AIMessage key={index} {...message} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-4 border-t border-accent/10">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask a question..."
                    className="flex-1 bg-primary/50 border border-accent/10 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-accent/30"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    className="btn bg-accent text-white p-1.5"
                  >
                    <Send size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
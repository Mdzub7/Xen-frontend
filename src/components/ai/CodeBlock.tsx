import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CodeBlockProps {
  code: string;
  language: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ height: 'auto' }}
      animate={{ height: isExpanded ? 'auto' : '200px' }}
      className="relative rounded-lg overflow-hidden mb-4 group"
    >
      <div className="absolute right-2 top-2 flex space-x-2 z-10">
        <button
          onClick={handleCopy}
          className="p-1.5 rounded bg-accent/10 hover:bg-accent/20 transition-colors"
        >
          {isCopied ? (
            <Check size={14} className="text-success" />
          ) : (
            <Copy size={14} className="text-text/70" />
          )}
        </button>
      </div>
      <div
        className={clsx(
          'relative',
          !isExpanded && 'max-h-[200px] overflow-hidden'
        )}
      >
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
            background: 'var(--primary-bg)',
          }}
        >
          {code}
        </SyntaxHighlighter>
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary to-transparent" />
        )}
      </div>
      {code.split('\n').length > 10 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs bg-accent/10 hover:bg-accent/20 transition-colors"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </motion.div>
  );
};
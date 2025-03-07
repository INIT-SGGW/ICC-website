"use client"

import React, { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Components } from "react-markdown"


// Reusable function to process text for Easter Egg syntax
const processEasterEggs = (text: string): ReactNode[] => {
  // Match pattern like [!egg]{text="Easter Egg" tooltip="Jajko niespodzianka"}
  const regex = /\[!egg\]\{text="([^"]+)" tooltip="([^"]+)"\}/g;
  
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match;
  
  // Find all matches and build an array of text and easter egg components
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    
    parts.push(
      <span 
        key={match.index}
        className="text-yellow-300 rounded cursor-help" 
        title={match[2]}
        style={{ 
          display: "inline-block", 
          transformOrigin: "center" 
        }}
      >
        {match[1]}
      </span>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add any remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  // If we found at least one match, return the processed parts
  // Even if parts.length is 1, we should return it if we found matches
  return lastIndex > 0 ? parts : [text];
};

// Function to recursively process React nodes for Easter Egg syntax
const processNodes = (nodes: ReactNode): ReactNode => {
  if (typeof nodes !== 'string') {
    // If it's an array of nodes, process each one
    if (Array.isArray(nodes)) {
      return React.Children.map(nodes, child => processNodes(child));
    }
    // If it's a React element, process its children
    if (React.isValidElement(nodes)) {
      const children = React.Children.toArray(nodes.props.children);
      if (children.length > 0) {
        return React.cloneElement(
          nodes,
          {},
          ...React.Children.map(children, child => processNodes(child))
        );
      }
    }
    // If it's not a string or doesn't have children, return it as is
    return nodes;
  }
  
  // Process text content
  return processEasterEggs(nodes);
};

// Create a component for each Markdown element we want to process
const createComponent = (type: keyof JSX.IntrinsicElements) => {
  return ({ node, children, ...props }: { node?: any; children?: React.ReactNode; [key: string]: any }) => {
    const Tag = type as React.ElementType;
    return <Tag {...props}>{processNodes(children)}</Tag>;
  };
};

// Custom components
const components: Components = {
  p: createComponent('p'),
  h1: createComponent('h1'),
  h2: createComponent('h2'),
  h3: createComponent('h3'),
  h4: createComponent('h4'),
  h5: createComponent('h5'),
  h6: createComponent('h6'),
  li: createComponent('li'),
  strong: createComponent('strong'),
  em: createComponent('em'),
  blockquote: createComponent('blockquote'),
  
  // Custom styling for inline code
  code: ({ node, className, children, ...props }: { node?: any; className?: string; children?: React.ReactNode; [key: string]: any }) => {
    // Check if this code is inside a pre tag (code block) or standalone (inline code)
    const match = /language-(\w+)/.exec(className || '');
    const isCodeBlock = !!match;
    

    if (isCodeBlock) {
      // This is inside a pre tag, just pass it through
      const processedChildren = processNodes(children);
      return <code className={`${className}`} {...props}>{processedChildren}</code>;
    }

    // This is an inline code element
    const processedChildren = typeof children === 'string' ? processEasterEggs(children) : processNodes(children);
    return (
      <span 
        className="not-italic text-sm bg-gray-900 p-1 rounded-md border border-gray-700 font-mono"
        {...props}
      >
        {processedChildren}
      </span>
    );
  },
  
  // Custom component for code blocks
  pre: ({ node, children, ...props }: { node?: any; children?: React.ReactNode; [key: string]: any }) => {
    return (
      <pre 
        className="border border-gray-700 bg-gray-900 rounded-md p-4 overflow-x-auto"
        {...props}
      >
        {children}
      </pre>
    );
  },
  
  a: ({ node, children, ...props }: { node?: any; children?: React.ReactNode; [key: string]: any }) => (
    <a {...props}>{processNodes(children)}</a>
  )
};

type MarkdownRendererProps = {
  markdown: string;
  className?: string;
};

export function MarkdownRenderer({ markdown, className = "" }: MarkdownRendererProps): React.JSX.Element {
  return (
    <div className={`${className} prose prose-invert max-w-none`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
} 
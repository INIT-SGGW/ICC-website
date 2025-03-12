"use client"

import type { ReactNode } from "react";
import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Components } from "react-markdown"
import './MarkdownRenderer.css'


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
        className="markdown-easter-egg"
        key={match.index}
        title={match[2]}
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
  return function ({ node, children, ...props }: { node?: any; children?: React.ReactNode;[key: string]: any }) {
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
  code: createComponent('code'),
  pre: function ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) {
    const preRef = React.useRef<HTMLPreElement>(null);
    const clickCountRef = React.useRef(0);
    const clickTimerRef = React.useRef<number | null>(null);
    
    const handleClick = (e: React.MouseEvent) => {
      // Increment click count
      clickCountRef.current += 1;
      
      // Clear existing timer
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
      
      // If it's a quadruple click, select all text in the pre tag
      if (clickCountRef.current === 4) {
        e.preventDefault();
        
        if (preRef.current) {
          const range = document.createRange();
          range.selectNodeContents(preRef.current);
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
        
        // Reset click count
        clickCountRef.current = 0;
      } else {
        // Set timer to reset click count after 300ms (common double-click threshold)
        clickTimerRef.current = setTimeout(() => {
          clickCountRef.current = 0;
        }, 300);
      }
    };
    
    return (
      <pre ref={preRef} onClick={handleClick} title="Quadruple-click to select all code" {...props}>
        {processNodes(children)}
      </pre>
    );
  },
  a: createComponent('a'),
};

type MarkdownRendererProps = {
  markdown: string;
  className?: string;
}

export function MarkdownRenderer({ markdown, className = "" }: MarkdownRendererProps): React.JSX.Element {
  return (
    <div className={`${className} markdown-container prose prose-invert max-w-none`}>
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
} 

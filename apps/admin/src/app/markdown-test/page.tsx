"use client";

import React, { useState, useEffect } from "react";
import { MarkdownRenderer } from "@repo/ui";

export default function Page(): JSX.Element {
    // Store the initial example markdown as a constant so we can reset to it
    const initialMarkdown = `# Example Markdown
    
## Try it out!

This is a **bold text** and this is *italic*.

### Lists
- Item 1
- Item 2
  - Nested item

### Code
\`\`\`typescript
const hello = "world";
console.log(hello);
\`\`\`

### Easter Eggs
Try this: [!egg]{text="hover over me" tooltip="This is an Easter Egg tooltip!"}
`;

    const [markdown, setMarkdown] = useState<string>(initialMarkdown);
    
    // Load from localStorage on component mount
    useEffect(() => {
        const savedMarkdown = localStorage.getItem("markdown-test");
        if (savedMarkdown) {
            setMarkdown(savedMarkdown);
        }
    }, []);
    
    // Save to localStorage whenever markdown changes
    useEffect(() => {
        localStorage.setItem("markdown-test", markdown);
    }, [markdown]);
    
    // Handle reset to initial example
    const handleReset = () => {
        setMarkdown(initialMarkdown);
    };

    return (
        <div className="flex flex-col p-4 space-y-4 bg-black min-h-screen">
            <h1 className="text-2xl font-bold text-white">Markdown Renderer Test</h1>
            <p className="text-gray-400">
                Use this page to test the markdown renderer component. Enter markdown in the left panel and see the rendered output on the right.
            </p>
            
            <div className="flex flex-row gap-4">
                {/* Input section */}
                <div className="flex-1 border border-gray-700 rounded-md overflow-hidden">
                    <div className="bg-gray-800 p-2 border-b border-gray-700 flex justify-between items-center">
                        <h2 className="font-medium text-white">Markdown Input</h2>
                        <button 
                            onClick={handleReset}
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded"
                        >
                            Reset Example
                        </button>
                    </div>
                    <textarea
                        className="w-full h-full p-4 focus:outline-none resize-none bg-black text-white"
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        spellCheck={false}
                    />
                </div>
                
                {/* Output section */}
                <div className="flex-1 border border-gray-700 rounded-md overflow-hidden">
                    <div className="bg-gray-800 p-2 border-b border-gray-700">
                        <h2 className="font-medium text-white">Rendered Output</h2>
                    </div>
                    <div className="bg-black p-4 h-full text-white">
                        <MarkdownRenderer markdown={markdown} />
                    </div>
                </div>
            </div>
        </div>
    );
}

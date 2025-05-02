"use client";

import React from "react";
import PatternLink from "@/components/common/PatternLink";

export default function CustomHooksPattern() {
  // Custom hook examples
  const customHooks = [
    {
      id: "use-local-storage",
      name: "useLocalStorage",
      description: "Persist data in localStorage across page refreshes",
      path: "/patterns/custom-hooks/use-local-storage"
    },
    {
      id: "use-fetch",
      name: "useFetch",
      description: "Fetch data with loading and error states",
      path: "/patterns/custom-hooks/use-fetch"
    }
  ];

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <PatternLink href="/" title="Back to patterns" backLink={true} />
        </nav>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-4">Custom Hooks Pattern</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Custom hooks are JavaScript functions that start with &quot;use&quot; and may call other hooks. 
              They allow you to extract component logic into reusable functions, helping you organize 
              code, share stateful logic between components, and avoid duplicating code. Custom hooks 
              are one of React&apos;s most powerful features for code reuse.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Examples</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Click on any of these examples to see detailed demonstrations of different custom hooks:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {customHooks.map(hook => (
                <PatternLink
                  key={hook.id}
                  href={hook.path}
                  title={hook.name}
                  description={hook.description}
                  isCard={true}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Why Use Custom Hooks?</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Custom hooks provide a clean way to reuse stateful logic across components without complex patterns like 
              higher-order components or render props. They can encapsulate side effects, manage state, 
              and handle complex logic while keeping your components clean and focused on UI rendering.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Key Benefits of Custom Hooks</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Reuse stateful logic across multiple components</li>
              <li>Abstract complex logic into simplified interfaces</li>
              <li>Compose multiple hooks to create more powerful custom hooks</li>
              <li>Keep component code clean by extracting implementation details</li>
              <li>Make testing easier by isolating logic from components</li>
              <li>Share logic within a project or across projects via npm packages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
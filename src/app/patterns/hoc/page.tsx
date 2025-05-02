"use client";

import React from "react";
import Link from "next/link";
import { withLogging } from "@/components/hoc/withLogging";

const SimpleComponent = ({ name }: { name: string }) => {
  return <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">Hello, {name}!</div>;
};

// Apply the HOC to the component
const EnhancedComponent = withLogging(SimpleComponent);

export default function HOCPattern() {
  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <Link href="/" className="text-blue-500 hover:text-blue-700 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to patterns
          </Link>
        </nav>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-4">Higher Order Component (HOC) Pattern</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Higher Order Components (HOCs) are a pattern in React for reusing component logic.
              HOCs are functions that take a component as an input and return a new enhanced component
              with additional props or behavior. This pattern was popular before hooks were introduced
              and is still useful for cross-cutting concerns like logging, authentication, and more.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Below is a simple component wrapped with a logging HOC. Check your browser console to see the
                log messages when the component mounts, receives props, and updates.
              </p>
              <EnhancedComponent name="React Developer" />
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
                <code>{`// withLogging.tsx
import React, { ComponentType, useEffect } from "react";

// Higher Order Component that adds logging
export function withLogging<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  // Return a new component with the same props
  const WithLogging = (props: P) => {
    useEffect(() => {
      // Log when component mounts
      console.log(\`[Logging HOC] \${WrappedComponent.displayName || WrappedComponent.name || 'Component'} mounted\`);
      
      // Log when component will unmount
      return () => {
        console.log(\`[Logging HOC] \${WrappedComponent.displayName || WrappedComponent.name || 'Component'} will unmount\`);
      };
    }, []);

    // Log props on each render
    console.log(\`[Logging HOC] \${WrappedComponent.displayName || WrappedComponent.name || 'Component'} rendered with props:\`, props);
    
    // Render the wrapped component with its props
    return <WrappedComponent {...props} />;
  };

  // Set a display name for better debugging
  WithLogging.displayName = \`WithLogging(\${WrappedComponent.displayName || WrappedComponent.name || 'Component'})\`;
  
  return WithLogging;
}

// Usage:
// const EnhancedComponent = withLogging(MyComponent);`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Key Benefits</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Reuse component logic across many components</li>
              <li>Keep cross-cutting concerns separate from component implementation</li>
              <li>Add functionality to components without modifying their code (open-closed principle)</li>
              <li>Composition-based approach to enhancing components</li>
              <li>Useful for instrumentation, tracking, authentication, and other cross-cutting concerns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
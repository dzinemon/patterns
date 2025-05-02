"use client";

import React from "react";
import Link from "next/link";
import HooksExample from "@/components/hooks/HooksExample";

export default function HooksPattern() {
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
          <h1 className="text-3xl font-bold mb-4">Hooks Pattern</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Hooks are a feature introduced in React 16.8 that allow you to use state and other
              React features without writing a class. They enable you to reuse stateful logic between
              components, making your code more concise and easier to understand. Common built-in hooks
              include useState, useEffect, useContext, useRef, and more.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium mb-4">Basic Hooks Usage</h3>
              <HooksExample />
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
                <code>{`// HooksExample.tsx
import React, { useState, useEffect, useRef } from "react";

export const HooksExample: React.FC = () => {
  // useState - Managing state in a functional component
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  // useRef - Persisting values across renders without causing re-renders
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // useEffect - Side effects like API calls, DOM manipulation, subscriptions
  useEffect(() => {
    // This runs after every render
    document.title = \`Count: \${count}\`;
    
    // This cleanup function runs before the component unmounts
    // or before the effect runs again
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run when count changes
  
  useEffect(() => {
    // Focus the button when the component mounts
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
    
    // Clean up any intervals on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array means this runs once on mount
  
  // Toggle the counter
  const toggleCounter = () => {
    setIsActive(!isActive);
    
    if (!isActive) {
      // Start the interval
      intervalRef.current = setInterval(() => {
        setCount(c => c + 1);
      }, 1000);
    } else {
      // Stop the interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };
  
  // Reset the counter
  const resetCounter = () => {
    setCount(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsActive(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-4xl font-bold">{count}</div>
      
      <div className="space-x-2">
        <button
          ref={buttonRef}
          onClick={toggleCounter}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        
        <button
          onClick={resetCounter}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
      
      <div className="text-sm text-gray-500">
        {isActive ? 'Counter is running' : 'Counter is paused'}
      </div>
    </div>
  );
};`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Key Benefits</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Allows using state and other React features in functional components</li>
              <li>Improves code reusability through custom hooks</li>
              <li>Reduces component complexity and nesting</li>
              <li>Better organization of related logic in a single place</li>
              <li>Easier to understand and maintain than class components with lifecycle methods</li>
              <li>Enables better static analysis and tree-shaking by the bundler</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
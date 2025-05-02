"use client";

import React, { useState, useEffect, useRef } from 'react';

const HooksExample: React.FC = () => {
  // useState example
  const [count, setCount] = useState(0);
  
  // useRef example
  const countRef = useRef(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // useEffect examples
  useEffect(() => {
    // Runs on every render
    console.log('Component rendered');
    
    // Cleanup function
    return () => {
      console.log('Component will unmount or re-render');
    };
  });
  
  useEffect(() => {
    // Runs only on mount (empty dependency array)
    console.log('Component mounted');
    
    return () => {
      console.log('Component will unmount');
    };
  }, []);
  
  useEffect(() => {
    // Runs when count changes
    console.log('Count changed to:', count);
    // Update ref value
    countRef.current = count;
    
    // Focus the button when count is divisible by 5
    if (count % 5 === 0 && count > 0) {
      buttonRef.current?.focus();
    }
  }, [count]);
  
  return (
    <div className="space-y-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">React Hooks Example</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        This example demonstrates basic React hooks: useState, useEffect, and useRef.
      </p>
      
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="text-center mb-4">
          <p className="text-lg">Count: {count}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ref Value: {countRef.current}
          </p>
        </div>
        
        <div className="flex space-x-2 justify-center">
          <button
            ref={buttonRef}
            onClick={() => setCount(count - 1)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Decrease
          </button>
          
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Increase
          </button>
          
          <button
            onClick={() => setCount(0)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md text-sm">
        <p>Check the browser console to see the effects of different hooks.</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
          <li>useState manages the counter state</li>
          <li>useRef keeps track of values between renders</li>
          <li>useEffect runs side effects on different dependencies</li>
          <li>The button gets focus when count is divisible by 5</li>
        </ul>
      </div>
    </div>
  );
};

export default HooksExample;

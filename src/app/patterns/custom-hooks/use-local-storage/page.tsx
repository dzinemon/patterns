"use client";

import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@/components/customHooks/useLocalStorage";
import PatternLink from "@/components/common/PatternLink";

export default function UseLocalStorageExample() {
  // Regular useState for comparison
  const [regularState, setRegularState] = useState<string>("");
  
  // Our custom hook that persists to localStorage
  const [persistentState, setPersistentState] = useLocalStorage<string>(
    "use-local-storage-example", 
    ""
  );

  // Another example with a different data type
  const [darkMode, setDarkMode] = useLocalStorage<boolean>(
    "dark-mode-preference", 
    false
  );

  // Reset the values on unmount
  useEffect(() => {
    return () => {
      localStorage.removeItem("use-local-storage-example");
      localStorage.removeItem("dark-mode-preference");
    };
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <PatternLink 
            href="/patterns/custom-hooks" 
            title="Back to Custom Hooks" 
            backLink={true}
          />
        </nav>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-4">useLocalStorage Custom Hook</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The <code>useLocalStorage</code> hook is a custom hook that extends React&apos;s <code>useState</code> to 
              persist state in the browser&apos;s localStorage. This allows data to persist between page refreshes
              and browser sessions, providing a seamless user experience.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example 1: Text Input Persistence</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Regular useState (not persisted)</h3>
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 dark:bg-gray-600 dark:border-gray-500"
                    value={regularState}
                    onChange={(e) => setRegularState(e.target.value)}
                    placeholder="Type something..."
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    This input uses regular useState. Its value will be lost on page refresh.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">useLocalStorage Hook (persisted)</h3>
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 dark:bg-gray-600 dark:border-gray-500"
                    value={persistentState}
                    onChange={(e) => setPersistentState(e.target.value)}
                    placeholder="Type something..."
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    This input uses our custom useLocalStorage hook. Try refreshing the page - the value will persist!
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example 2: Theme Preference</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="space-y-4">
                <h3 className="font-medium">Dark Mode Toggle (persisted)</h3>
                <div className={`p-6 rounded-lg shadow ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span>Current theme: {darkMode ? 'Dark' : 'Light'}</span>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`px-4 py-2 rounded ${
                        darkMode 
                          ? 'bg-gray-600 hover:bg-gray-700' 
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      Toggle Theme
                    </button>
                  </div>
                  <p className="mt-4 text-sm">
                    This example uses the same useLocalStorage hook but with a boolean value.
                    Refresh the page and your theme preference will be remembered.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Implementation</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <pre className="overflow-x-auto text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded">
                <code>{`// useLocalStorage.tsx
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Get value from localStorage or use initial value
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  };
  
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(readValue);
  
  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(\`Error setting localStorage key "\${key}":\`, error);
    }
  };
  
  return [storedValue, setValue];
}`}</code>
              </pre>
              
              <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md">
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Key Points</h3>
                <ul className="list-disc pl-5 text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>Uses TypeScript generics to handle various data types</li>
                  <li>Handles edge cases like server-side rendering</li>
                  <li>Maintains the same API as React&apos;s useState</li>
                  <li>Handles errors with try/catch blocks</li>
                  <li>Supports value initialization from function</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Usage Pattern</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <pre className="overflow-x-auto text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded">
                <code>{`// Using the hook in a component
const MyComponent = () => {
  // String example
  const [name, setName] = useLocalStorage<string>('user-name', '');
  
  // Object example
  const [user, setUser] = useLocalStorage<{ id: number, name: string }>(
    'user-data', 
    { id: 0, name: '' }
  );
  
  // Boolean example
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage<boolean>('logged-in', false);

  return (
    <div>
      {/* Component content */}
    </div>
  );
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState, useEffect } from 'react';

// Custom hook that persists state to localStorage
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
      console.warn(`Error reading localStorage key "${key}":`, error);
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
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };
  
  // Listen for changes to the key in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue));
      }
    };
    
    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);
  
  return [storedValue, setValue];
}

// Another useful custom hook for form inputs
export function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  
  return {
    value,
    onChange: handleChange,
    reset: () => setValue(initialValue),
  };
}

// Example component using custom hooks
const CustomHooksExample: React.FC = () => {
  // Use our custom localStorage hook
  const [name, setName] = useLocalStorage<string>('name', '');
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  
  // Use our form input hook
  const emailInput = useFormInput('');
  
  // Clear all saved data
  const clearStorage = () => {
    setName('');
    setTheme('light');
    emailInput.reset();
  };
  
  return (
    <div className="space-y-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Custom Hooks Example</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        This example demonstrates custom React hooks that persist data to localStorage and simplify form handling.
      </p>
      
      <div className={`p-6 rounded-lg shadow ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name (stored in localStorage)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email (using useFormInput hook)
            </label>
            <input
              type="email"
              id="email"
              {...emailInput}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Theme Preference</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setTheme('light')}
                className={`px-4 py-2 rounded ${
                  theme === 'light'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-4 py-2 rounded ${
                  theme === 'dark'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                }`}
              >
                Dark
              </button>
            </div>
          </div>
          
          <button
            onClick={clearStorage}
            className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Saved Data
          </button>
        </div>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md text-sm">
        <p>Try the following:</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
          <li>Enter your name and refresh the page - it should persist</li>
          <li>Change the theme and refresh - it should remain set</li>
          <li>The email field uses a simpler form input hook (non-persistent)</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomHooksExample;

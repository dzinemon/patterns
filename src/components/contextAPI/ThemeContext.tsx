"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define theme type
type Theme = 'light' | 'dark';

// Define context type
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Create context with a meaningful default value
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {
    console.warn('ThemeProvider not found');
  },
});

// Context provider component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};

// Themed button component that consumes the context
export const ThemedButton: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded-md ${
        theme === 'light'
          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          : 'bg-gray-700 text-white hover:bg-gray-600'
      }`}
    >
      {children}
    </button>
  );
};

// Themed panel component that consumes the context
export const ThemedPanel: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div
      className={`p-4 rounded-md ${
        theme === 'light'
          ? 'bg-white text-gray-800 border border-gray-200'
          : 'bg-gray-800 text-white border border-gray-700'
      }`}
    >
      {children}
    </div>
  );
};

// Example usage component
const ContextExample: React.FC = () => {
  return (
    <div className="space-y-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Context API Example</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        This example demonstrates using React Context API to manage theme state across components.
      </p>
      
      <ThemeProvider>
        <ThemedPanel>
          <div className="space-y-4">
            <p>This panel&apos;s styling is controlled by theme context.</p>
            <ThemedButton>Toggle Theme</ThemedButton>
          </div>
        </ThemedPanel>
      </ThemeProvider>
    </div>
  );
};

export default ContextExample;

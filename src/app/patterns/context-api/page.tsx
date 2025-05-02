"use client";

import React from "react";
import Link from "next/link";
import { ThemeProvider, useTheme } from "@/components/contextAPI/ThemeContext";

// Components using the context
const ThemedHeader = () => {
  const { theme } = useTheme();
  return (
    <header className={`p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} rounded-lg mb-4`}>
      <h2 className="text-xl font-bold">Themed Header</h2>
      <p>Current theme: {theme}</p>
    </header>
  );
};

const ThemedButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button 
      onClick={toggleTheme}
      className={`py-2 px-4 rounded ${
        theme === 'dark' 
          ? 'bg-blue-400 text-white hover:bg-blue-500' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      Toggle Theme
    </button>
  );
};

const ThemedFooter = () => {
  const { theme } = useTheme();
  return (
    <footer className={`p-4 mt-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} rounded-lg`}>
      <p className="text-center">
        Footer with {theme} theme
      </p>
    </footer>
  );
};

export default function ContextAPIPattern() {
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
          <h1 className="text-3xl font-bold mb-4">Context API Pattern</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The Context API in React provides a way to share values like themes, user data,
              or other global state between components without having to explicitly pass props
              through every level of the component tree. It&apos;s designed to solve the &quot;prop drilling&quot;
              problem, where data needs to be passed through many nested components.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="mb-4">
                This example demonstrates a theme context that lets components access and update 
                the current theme without prop drilling. Click the button to toggle between light and dark themes.
              </p>
              
              <ThemeProvider>
                <div className="flex flex-col space-y-4">
                  <ThemedHeader />
                  <div className="flex justify-center">
                    <ThemedButton />
                  </div>
                  <ThemedFooter />
                </div>
              </ThemeProvider>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
                <code>{`// ThemeContext.tsx
import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the context
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

// Create the context with default values
export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

// Create a provider component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  // The context value that will be passed to consuming components
  const contextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Usage in components:
// const { theme, toggleTheme } = useContext(ThemeContext);`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Key Benefits</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Avoid prop drilling through multiple component layers</li>
              <li>Create global or semi-global state accessible to many components</li>
              <li>Maintain component encapsulation while sharing state</li>
              <li>Simplify component composition and reduce coupling</li>
              <li>Better organization of shared state and state management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
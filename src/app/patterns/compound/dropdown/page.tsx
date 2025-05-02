"use client";

import React from "react";
import Link from "next/link";
import Dropdown from "@/components/compound/Dropdown";

export default function DropdownPatternPage() {
  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <Link href="/patterns/compound" className="text-blue-500 hover:text-blue-700 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Compound Components
          </Link>
        </nav>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-4">Dropdown Compound Component</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The Dropdown compound component creates a toggle menu with clickable options. It uses 
              React Context to manage state between the trigger, menu, and menu items. This pattern
              allows for flexible composition and styling.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-center mb-20">
                <Dropdown>
                  <Dropdown.Trigger>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center">
                      Options
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </Dropdown.Trigger>
                  <Dropdown.Menu>
                    <Dropdown.Item>Edit Profile</Dropdown.Item>
                    <Dropdown.Item>Account Settings</Dropdown.Item>
                    <Dropdown.Item>Help Center</Dropdown.Item>
                    <Dropdown.Item className="text-red-500">Sign Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              
              <div className="flex justify-around mt-8">
                <Dropdown>
                  <Dropdown.Trigger>
                    <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm">
                      Sort by
                    </button>
                  </Dropdown.Trigger>
                  <Dropdown.Menu>
                    <Dropdown.Item>Newest First</Dropdown.Item>
                    <Dropdown.Item>Oldest First</Dropdown.Item>
                    <Dropdown.Item>Most Popular</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
                <code>{`// Dropdown.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create context for the dropdown
type DropdownContextType = {
  isOpen: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
};

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

// Hook to use dropdown context
const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a Dropdown');
  }
  return context;
};

// Main Dropdown component
const Dropdown = ({ children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !prev);
  const closeDropdown = () => setIsOpen(false);

  return (
    <DropdownContext.Provider value={{ isOpen, toggleDropdown, closeDropdown }}>
      <div className={\`relative inline-block text-left \${className}\`}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// Dropdown Trigger
const Trigger = ({ children, className = '' }) => {
  const { toggleDropdown } = useDropdown();
  
  return (
    <div 
      onClick={toggleDropdown}
      className={\`cursor-pointer \${className}\`}
    >
      {children}
    </div>
  );
};

// Dropdown Menu
const Menu = ({ children, className = '' }) => {
  const { isOpen, closeDropdown } = useDropdown();
  
  if (!isOpen) return null;
  
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={closeDropdown} />
      <div className={\`absolute z-20 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 \${className}\`}>
        <div className="py-1" role="menu" aria-orientation="vertical">
          {children}
        </div>
      </div>
    </>
  );
};

// Dropdown Item
const Item = ({ children, onClick, className = '' }) => {
  const { closeDropdown } = useDropdown();
  
  const handleClick = () => {
    if (onClick) onClick();
    closeDropdown();
  };
  
  return (
    <div
      className={\`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 \${className}\`}
      onClick={handleClick}
      role="menuitem"
    >
      {children}
    </div>
  );
};

// Attach sub-components to Dropdown
Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

export default Dropdown;`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Toggle functionality with click-outside behavior to close the menu</li>
              <li>Flexible trigger component that can wrap any UI element</li>
              <li>Customizable menu items with optional onClick handlers</li>
              <li>Proper keyboard accessibility with appropriate ARIA roles</li>
              <li>Clean API that makes dropdown composition intuitive</li>
              <li>Shared state using React Context to coordinate between components</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
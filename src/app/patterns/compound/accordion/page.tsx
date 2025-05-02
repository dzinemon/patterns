"use client";

import React from "react";
import Link from "next/link";
import Accordion from "@/components/compound/Accordion";

export default function AccordionPatternPage() {
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
          <h1 className="text-3xl font-bold mb-4">Accordion Compound Component</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The Accordion is a classic UI element that uses the compound component pattern to create 
              collapsible sections. It consists of multiple items, each with a header that controls 
              visibility of its content.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Accordion>
                <Accordion.Item id="item1">
                  <Accordion.Header>What is React?</Accordion.Header>
                  <Accordion.Content>
                    <p>React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.</p>
                  </Accordion.Content>
                </Accordion.Item>
                
                <Accordion.Item id="item2">
                  <Accordion.Header>What are Compound Components?</Accordion.Header>
                  <Accordion.Content>
                    <p>Compound components are a pattern where components are used together such that they share an implicit state that lets them communicate with each other in the background.</p>
                  </Accordion.Content>
                </Accordion.Item>
                
                <Accordion.Item id="item3">
                  <Accordion.Header>How do Compound Components work?</Accordion.Header>
                  <Accordion.Content>
                    <p>Compound components work by using React Context to share state between a parent component and its children. This allows the components to communicate without explicit prop drilling.</p>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
                <code>{`// Accordion.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create context for the accordion
type AccordionContextType = {
  expandedItems: Record<string, boolean>;
  toggleItem: (id: string) => void;
  isItemExpanded: (id: string) => boolean;
  allowMultiple: boolean;
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

// Hook to use accordion context
const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
};

// Main Accordion component
const Accordion = ({ children, allowMultiple = false, className = '' }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (id) => {
    setExpandedItems(prev => {
      if (!allowMultiple) {
        // If only one item can be expanded at a time, close others
        return { [id]: !prev[id] };
      }
      return { ...prev, [id]: !prev[id] };
    });
  };

  const isItemExpanded = (id) => !!expandedItems[id];

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem, isItemExpanded, allowMultiple }}>
      <div className={\`divide-y divide-gray-200 border border-gray-200 rounded-md \${className}\`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// Item component and sub-components...
// Attach sub-components to Accordion
Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Content = Content;

export default Accordion;`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Shared state using Context API to track which panels are expanded</li>
              <li>Option to allow multiple panels to be open simultaneously</li>
              <li>Customizable styling for each part of the accordion</li>
              <li>Clear component composition with semantic item, header, and content components</li>
              <li>Each accordion item maintains its own state within the parent context</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
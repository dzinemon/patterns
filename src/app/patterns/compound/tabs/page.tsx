"use client";

import React from "react";
import Link from "next/link";
import Tabs from "@/components/compound/Tabs";

export default function TabsPatternPage() {
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
          <h1 className="text-3xl font-bold mb-4">Tabs Compound Component</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The Tabs compound component creates a tabbed interface for organizing content into separate views
              that share the same space. It uses React Context to manage the active tab state and coordinate
              between tab triggers and their corresponding content panels.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Tabs defaultTab="tab1">
                <Tabs.TabList>
                  <Tabs.Tab tabId="tab1">Account Information</Tabs.Tab>
                  <Tabs.Tab tabId="tab2">Password</Tabs.Tab>
                  <Tabs.Tab tabId="tab3">Notifications</Tabs.Tab>
                </Tabs.TabList>
                
                <Tabs.TabPanel tabId="tab1">
                  <div className="p-4 bg-white dark:bg-gray-600 rounded mt-4">
                    <h3 className="font-medium mb-2">Account Information</h3>
                    <p>This panel contains user account information settings like name, email, and profile picture.</p>
                  </div>
                </Tabs.TabPanel>
                
                <Tabs.TabPanel tabId="tab2">
                  <div className="p-4 bg-white dark:bg-gray-600 rounded mt-4">
                    <h3 className="font-medium mb-2">Password Settings</h3>
                    <p>In this panel, users can update their password and configure two-factor authentication.</p>
                  </div>
                </Tabs.TabPanel>
                
                <Tabs.TabPanel tabId="tab3">
                  <div className="p-4 bg-white dark:bg-gray-600 rounded mt-4">
                    <h3 className="font-medium mb-2">Notification Preferences</h3>
                    <p>Configure which notifications you want to receive and how you want to receive them.</p>
                  </div>
                </Tabs.TabPanel>
              </Tabs>
            </div>
          </div>

          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Styled Example</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Tabs defaultTab="react" className="mb-8">
                <Tabs.TabList className="bg-gray-100 dark:bg-gray-600 p-1 rounded-lg flex space-x-1">
                  <Tabs.Tab 
                    tabId="react" 
                    className="flex-1 text-center py-2 px-3 text-sm font-medium"
                  >
                    React
                  </Tabs.Tab>
                  <Tabs.Tab 
                    tabId="vue" 
                    className="flex-1 text-center py-2 px-3 text-sm font-medium"
                  >
                    Vue
                  </Tabs.Tab>
                  <Tabs.Tab 
                    tabId="angular" 
                    className="flex-1 text-center py-2 px-3 text-sm font-medium"
                  >
                    Angular
                  </Tabs.Tab>
                  <Tabs.Tab
                    tabId="svelte" 
                    className="flex-1 text-center py-2 px-3 text-sm font-medium"
                  >
                    Svelte
                  </Tabs.Tab>
                </Tabs.TabList>
                
                <Tabs.TabPanel tabId="react">
                  <div className="p-4 bg-white dark:bg-gray-600 rounded mt-4">
                    <h3 className="font-medium">React</h3>
                    <p className="mt-2">React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.</p>
                  </div>
                </Tabs.TabPanel>
                
                <Tabs.TabPanel tabId="vue">
                  <div className="p-4 bg-white dark:bg-gray-600 rounded mt-4">
                    <h3 className="font-medium">Vue</h3>
                    <p className="mt-2">Vue.js is a progressive JavaScript framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable.</p>
                  </div>
                </Tabs.TabPanel>
                
                <Tabs.TabPanel tabId="angular">
                  <div className="p-4 bg-white dark:bg-gray-600 rounded mt-4">
                    <h3 className="font-medium">Angular</h3>
                    <p className="mt-2">Angular is a platform for building mobile and desktop web applications. It&apos;s a complete rewrite from the same team that built AngularJS.</p>
                  </div>
                </Tabs.TabPanel>
                <Tabs.TabPanel tabId="svelte">
                  <div className="p-4 bg-white dark:bg-gray-600 rounded mt-4">
                    <h3 className="font-medium">Svelte</h3>
                    <p className="mt-2">Svelte is a modern JavaScript framework that shifts the work from the browser to the build step, producing highly optimized vanilla JavaScript at the end.</p>
                  </div>
                </Tabs.TabPanel>
              </Tabs>
            </div>
          </div>

                    
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
                <code>{`// Tabs.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create context for the tabs
type TabsContextType = {
  activeTab: string;
  setActiveTab: (id: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Hook to use tabs context
const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};

// Main Tabs component
const Tabs = ({ children, defaultTab = '', className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={\`\${className}\`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabList component
const TabList = ({ children, className = '' }) => {
  return (
    <div 
      className={\`flex border-b border-gray-200 \${className}\`}
      role="tablist"
    >
      {children}
    </div>
  );
};

// Tab component
const Tab = ({ children, tabId, className = '' }) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === tabId;

  return (
    <div
      className={\`px-4 py-2 cursor-pointer \${isActive 
        ? 'border-b-2 border-blue-500 text-blue-600' 
        : 'text-gray-500 hover:text-gray-700'} \${className}\`}
      onClick={() => setActiveTab(tabId)}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </div>
  );
};

// TabPanel component
const TabPanel = ({ children, tabId, className = '' }) => {
  const { activeTab } = useTabs();
  
  if (activeTab !== tabId) return null;

  return (
    <div 
      className={\`p-4 \${className}\`}
      role="tabpanel"
    >
      {children}
    </div>
  );
};

// Attach sub-components to Tabs
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export default Tabs;`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Shared state using Context API to track the active tab</li>
              <li>Automatic showing/hiding of content based on the active tab</li>
              <li>Support for a default active tab</li>
              <li>Customizable styling for tabs, tab list, and tab panels</li>
              <li>Proper ARIA roles for accessibility</li>
              <li>Clean and declarative API that makes composition intuitive</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
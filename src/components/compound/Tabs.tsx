"use client";

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
type TabsProps = {
  children: ReactNode;
  defaultTab?: string;
  className?: string;
};

const Tabs: React.FC<TabsProps> & {
  TabList: React.FC<TabListProps>;
  Tab: React.FC<TabProps>;
  TabPanel: React.FC<TabPanelProps>;
} = ({ children, defaultTab = '', className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabList component
type TabListProps = {
  children: ReactNode;
  className?: string;
};

const TabList: React.FC<TabListProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`flex border-b border-gray-200 ${className}`}
      role="tablist"
    >
      {children}
    </div>
  );
};

// Tab component
type TabProps = {
  children: ReactNode;
  tabId: string;
  className?: string;
};

const Tab: React.FC<TabProps> = ({ children, tabId, className = '' }) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === tabId;

  return (
    <div
      className={`px-4 py-2 cursor-pointer ${isActive 
        ? 'border-b-2 border-blue-500 text-blue-600' 
        : 'text-gray-500 hover:text-gray-700'} ${className}`}
      onClick={() => setActiveTab(tabId)}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </div>
  );
};

// TabPanel component
type TabPanelProps = {
  children: ReactNode;
  tabId: string;
  className?: string;
};

const TabPanel: React.FC<TabPanelProps> = ({ children, tabId, className = '' }) => {
  const { activeTab } = useTabs();
  
  if (activeTab !== tabId) return null;

  return (
    <div 
      className={`p-4 ${className}`}
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

export default Tabs;
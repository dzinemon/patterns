"use client";

import React from "react";
import Link from "next/link";
import Menu from "@/components/compound/Menu";

export default function MenuPatternPage() {
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
          <h1 className="text-3xl font-bold mb-4">Menu Compound Component</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The Menu compound component provides a flexible navigation system with support for 
              nested menus, grouping, and active item highlighting. It uses React Context to share
              state between the menu hierarchy.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-64 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
                <Menu defaultActiveItem="dashboard">
                  <Menu.Item id="dashboard">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </span>
                  </Menu.Item>
                  
                  <Menu.Group title="Content">
                    <Menu.Item id="posts">Posts</Menu.Item>
                    <Menu.Item id="pages">Pages</Menu.Item>
                    <Menu.Item id="comments">Comments</Menu.Item>
                  </Menu.Group>
                  
                  <Menu.SubMenu 
                    id="settings" 
                    title={
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </span>
                    }
                  >
                    <Menu.Item id="general">General</Menu.Item>
                    <Menu.Item id="security">Security</Menu.Item>
                    <Menu.Item id="notifications">Notifications</Menu.Item>
                  </Menu.SubMenu>
                </Menu>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
                <code>{`// Menu.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create context for the menu
type MenuContextType = {
  activeItem: string | null;
  expandedSubMenus: Record<string, boolean>;
  setActiveItem: (id: string | null) => void;
  toggleSubMenu: (id: string) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Hook to use menu context
const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu components must be used within a Menu');
  }
  return context;
};

// Main Menu component
const Menu = ({ children, defaultActiveItem = null, className = '' }) => {
  const [activeItem, setActiveItem] = useState(defaultActiveItem);
  const [expandedSubMenus, setExpandedSubMenus] = useState({});

  const toggleSubMenu = (id) => {
    setExpandedSubMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <MenuContext.Provider value={{ activeItem, expandedSubMenus, setActiveItem, toggleSubMenu }}>
      <nav className={\`\${className}\`}>
        <ul className="space-y-1">
          {children}
        </ul>
      </nav>
    </MenuContext.Provider>
  );
};

// Group component for organizing menu items
const Group = ({ children, title, className = '' }) => {
  return (
    <li className={className}>
      {title && (
        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </div>
      )}
      <ul className="space-y-1">
        {children}
      </ul>
    </li>
  );
};

// Item component
const Item = ({ children, id, icon, onClick, className = '' }) => {
  const { activeItem, setActiveItem } = useMenu();
  const isActive = activeItem === id;

  const handleClick = () => {
    setActiveItem(id);
    if (onClick) onClick();
  };

  return (
    <li>
      <div
        className={\`flex items-center px-3 py-2 text-sm rounded-md cursor-pointer \${
          isActive 
            ? 'bg-gray-100 text-gray-900' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        } \${className}\`}
        onClick={handleClick}
      >
        {icon && <span className="mr-3">{icon}</span>}
        <span>{children}</span>
      </div>
    </li>
  );
};

// SubMenu component
const SubMenu = ({ children, id, title, icon, className = '' }) => {
  const { expandedSubMenus, toggleSubMenu } = useMenu();
  const isExpanded = !!expandedSubMenus[id];

  return (
    <li className={className}>
      <div
        className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer"
        onClick={() => toggleSubMenu(id)}
      >
        <div className="flex items-center">
          {icon && <span className="mr-3">{icon}</span>}
          <span>{title}</span>
        </div>
        <span className="ml-2">
          {isExpanded ? '▼' : '►'}
        </span>
      </div>

      {isExpanded && (
        <ul className="pl-6 mt-1 space-y-1">
          {children}
        </ul>
      )}
    </li>
  );
};

// Attach sub-components to Menu
Menu.Group = Group;
Menu.Item = Item;
Menu.SubMenu = SubMenu;

export default Menu;`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Active item tracking with visual feedback</li>
              <li>Expandable/collapsible submenus</li>
              <li>Logical grouping of related menu items</li>
              <li>Support for icons and custom content in menu items</li>
              <li>Accessible navigation structure with proper semantics</li>
              <li>Shared state through React Context for coordinated menu behavior</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

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
type MenuProps = {
  children: ReactNode;
  defaultActiveItem?: string | null;
  className?: string;
};

const Menu: React.FC<MenuProps> & {
  Group: React.FC<GroupProps>;
  Item: React.FC<ItemProps>;
  SubMenu: React.FC<SubMenuProps>;
} = ({ children, defaultActiveItem = null, className = '' }) => {
  const [activeItem, setActiveItem] = useState<string | null>(defaultActiveItem);
  const [expandedSubMenus, setExpandedSubMenus] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (id: string) => {
    setExpandedSubMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <MenuContext.Provider value={{ activeItem, expandedSubMenus, setActiveItem, toggleSubMenu }}>
      <nav className={`${className}`}>
        <ul className="space-y-1">
          {children}
        </ul>
      </nav>
    </MenuContext.Provider>
  );
};

// Group component for organizing menu items
type GroupProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

const Group: React.FC<GroupProps> = ({ children, title, className = '' }) => {
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
type ItemProps = {
  children: ReactNode;
  id: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
};

const Item: React.FC<ItemProps> = ({ children, id, icon, onClick, className = '' }) => {
  const { activeItem, setActiveItem } = useMenu();
  const isActive = activeItem === id;

  const handleClick = () => {
    setActiveItem(id);
    if (onClick) onClick();
  };

  return (
    <li>
      <div
        className={`flex items-center px-3 py-2 text-sm rounded-md cursor-pointer ${
          isActive 
            ? 'bg-gray-100 text-gray-900' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        } ${className}`}
        onClick={handleClick}
      >
        {icon && <span className="mr-3">{icon}</span>}
        <span>{children}</span>
      </div>
    </li>
  );
};

// SubMenu component
type SubMenuProps = {
  children: ReactNode;
  id: string;
  title: ReactNode;
  icon?: ReactNode;
  className?: string;
  contentClassName?: string;
};

const SubMenu: React.FC<SubMenuProps> = ({ 
  children, 
  id, 
  title, 
  icon, 
  className = '', 
  contentClassName = '' 
}) => {
  const { expandedSubMenus, toggleSubMenu } = useMenu();
  const isExpanded = !!expandedSubMenus[id];

  return (
    <li className={className}>
      <div
        className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
        <ul className={`pl-6 mt-1 space-y-1 ${contentClassName}`}>
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

export default Menu;
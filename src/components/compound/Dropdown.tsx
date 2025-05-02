"use client";

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
type DropdownProps = {
  children: ReactNode;
  className?: string;
};

const Dropdown: React.FC<DropdownProps> & {
  Trigger: React.FC<TriggerProps>;
  Menu: React.FC<MenuProps>;
  Item: React.FC<ItemProps>;
} = ({ children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !prev);
  const closeDropdown = () => setIsOpen(false);

  return (
    <DropdownContext.Provider value={{ isOpen, toggleDropdown, closeDropdown }}>
      <div className={`relative inline-block text-left ${className}`}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// Dropdown Trigger
type TriggerProps = {
  children: ReactNode;
  className?: string;
};

const Trigger: React.FC<TriggerProps> = ({ children, className = '' }) => {
  const { toggleDropdown } = useDropdown();
  
  return (
    <div 
      onClick={toggleDropdown}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};

// Dropdown Menu
type MenuProps = {
  children: ReactNode;
  className?: string;
};

const Menu: React.FC<MenuProps> = ({ children, className = '' }) => {
  const { isOpen, closeDropdown } = useDropdown();
  
  if (!isOpen) return null;
  
  return (
    <>
      <div 
        className="fixed inset-0 z-10" 
        onClick={closeDropdown}
      />
      <div 
        className={`absolute z-20 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 ${className}`}
      >
        <div 
          className="py-1" 
          role="menu" 
          aria-orientation="vertical"
        >
          {children}
        </div>
      </div>
    </>
  );
};

// Dropdown Item
type ItemProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

const Item: React.FC<ItemProps> = ({ children, onClick, className = '' }) => {
  const { closeDropdown } = useDropdown();
  
  const handleClick = () => {
    if (onClick) onClick();
    closeDropdown();
  };
  
  return (
    <div
      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}
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

export default Dropdown;

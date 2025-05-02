"use client";

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
type AccordionProps = {
  children: ReactNode;
  allowMultiple?: boolean;
  className?: string;
};

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<ItemProps>;
  Header: React.FC<HeaderProps>;
  Content: React.FC<ContentProps>;
} = ({ children, allowMultiple = false, className = '' }) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setExpandedItems(prev => {
      if (!allowMultiple) {
        // If only one item can be expanded at a time, close others
        return { [id]: !prev[id] };
      }
      return { ...prev, [id]: !prev[id] };
    });
  };

  const isItemExpanded = (id: string) => !!expandedItems[id];

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem, isItemExpanded, allowMultiple }}>
      <div className={`divide-y divide-gray-200 border border-gray-200 rounded-md ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// Item component to provide context for each accordion item
type ItemProps = {
  children: ReactNode;
  id: string;
  className?: string;
};

type ItemContextType = {
  id: string;
  isExpanded: boolean;
};

const ItemContext = createContext<ItemContextType | undefined>(undefined);

const useAccordionItem = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('Accordion.Header and Accordion.Content must be used within an Accordion.Item');
  }
  return context;
};

const Item: React.FC<ItemProps> = ({ children, id, className = '' }) => {
  const { isItemExpanded } = useAccordion();
  const isExpanded = isItemExpanded(id);

  return (
    <ItemContext.Provider value={{ id, isExpanded }}>
      <div className={`${className}`}>
        {children}
      </div>
    </ItemContext.Provider>
  );
};

// Header component
type HeaderProps = {
  children: ReactNode;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ children, className = '' }) => {
  const { id, isExpanded } = useAccordionItem();
  const { toggleItem } = useAccordion();

  return (
    <div
      className={`flex justify-between items-center p-4 cursor-pointer ${className}`}
      onClick={() => toggleItem(id)}
    >
      <div className="flex-1">{children}</div>
      <span className="ml-2 transition-transform duration-200">
        {isExpanded ? '▲' : '▼'}
      </span>
    </div>
  );
};

// Content component
type ContentProps = {
  children: ReactNode;
  className?: string;
};

const Content: React.FC<ContentProps> = ({ children, className = '' }) => {
  const { isExpanded } = useAccordionItem();

  if (!isExpanded) return null;

  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

// Attach sub-components to Accordion
Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Content = Content;

export default Accordion;
import React, { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react';

// Define the context type
type SelectContextType = {
  isOpen: boolean;
  selectedValue: string | null;
  selectedLabel: string | null;
  toggle: () => void;
  handleSelect: (value: string, label?: string) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
};

// Create the context
const SelectContext = createContext<SelectContextType | null>(null);

// Custom hook to use the Select context
const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select compound components must be used within a Select component');
  }
  return context;
};

// Main Select component
type SelectProps = {
  children: ReactNode;
  defaultValue?: string | null;
  onChange?: (value: string) => void;
  className?: string;
};

const Select = ({ children, defaultValue = null, onChange, className = '' }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(defaultValue);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  const toggle = () => setIsOpen(prev => !prev);
  
  const handleSelect = (value: string, label?: string) => {
    setSelectedValue(value);
    setSelectedLabel(label || value);
    setIsOpen(false);
    if (onChange) {
      onChange(value);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const contextValue: SelectContextType = {
    isOpen,
    selectedValue,
    selectedLabel,
    toggle,
    handleSelect,
    triggerRef
  };

  return (
    <SelectContext.Provider value={contextValue}>
      <div ref={triggerRef} className={`relative ${className}`}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

// Label component
type LabelProps = {
  children: ReactNode;
  className?: string;
};

const Label = ({ children, className = '' }: LabelProps) => (
  <label className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
    {children}
  </label>
);

// Trigger component
type TriggerProps = {
  placeholder?: string;
  className?: string;
};

const Trigger = ({ placeholder = 'Select an option', className = '' }: TriggerProps) => {
  const { toggle, selectedLabel, selectedValue } = useSelectContext();
  
  return (
    <div
      className={`flex justify-between items-center w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:border-gray-400 ${className}`}
      onClick={toggle}
    >
      <div className="flex-1 truncate">
        {selectedLabel || selectedValue || placeholder}
      </div>
      <div className="ml-1">
        <svg 
          className="w-5 h-5 text-gray-400" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
    </div>
  );
};

// Options container component
type OptionsProps = {
  children: ReactNode;
  className?: string;
};

const Options = ({ children, className = '' }: OptionsProps) => {
  const { isOpen } = useSelectContext();
  
  if (!isOpen) return null;
  
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={() => {}} />
      <div className={`absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ${className}`}>
        <div className="py-1">{children}</div>
      </div>
    </>
  );
};

// Individual option component
type OptionProps = {
  children: ReactNode;
  value: string;
  label?: string;
  className?: string;
};

const Option = ({ children, value, label, className = '' }: OptionProps) => {
  const { handleSelect, selectedValue } = useSelectContext();
  const isSelected = selectedValue === value;
  const displayLabel = typeof label === 'string' ? label : (typeof children === 'string' ? children : value);
  
  return (
    <div
      className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
        isSelected ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-900'
      } ${className}`}
      onClick={() => handleSelect(value, displayLabel)}
    >
      {children}
    </div>
  );
};

// Attach subcomponents to Select
Select.Label = Label;
Select.Trigger = Trigger;
Select.Options = Options;
Select.Option = Option;

// Type definition for the compound component
type SelectComponent = typeof Select & {
  Label: typeof Label;
  Trigger: typeof Trigger;
  Options: typeof Options;
  Option: typeof Option;
};

export default Select as SelectComponent;
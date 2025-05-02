"use client";

import React, { ComponentType, FC } from 'react';

// Simple Higher Order Component that adds logging functionality
export function withLogging<P extends object>(WrappedComponent: ComponentType<P>) {
  // Create and return a new component
  const WithLogging: FC<P> = (props) => {
    // Log when component renders
    console.log(`Component is rendering with props:`, props);
    
    // Simply render the wrapped component with its props
    return <WrappedComponent {...props} />;
  };

  WithLogging.displayName = `withLogging(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithLogging;
}

// Simple component to be wrapped
interface GreetingProps {
  name: string;
}

export const Greeting: FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

// Enhanced component with logging
export const LoggedGreeting = withLogging(Greeting);

// Example usage component
const HocExample: FC = () => {
  return (
    <div className="space-y-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Higher Order Component Example</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        This is a simple HOC example that adds logging to a greeting component.
        Check the console to see the log when the component renders.
      </p>
      
      <div className="p-4 border rounded bg-white dark:bg-gray-800">
        <LoggedGreeting name="World" />
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Key points about HOCs:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>They take a component and return a new enhanced component</li>
          <li>They allow for code reuse and separation of concerns</li>
          <li>They don&apos;t modify the original component, they compose with it</li>
        </ul>
      </div>
    </div>
  );
};

export default HocExample;

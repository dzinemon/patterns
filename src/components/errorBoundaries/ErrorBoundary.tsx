"use client";

import React, { Component, ErrorInfo, ReactNode, useState } from 'react';

// Error boundary component
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default fallback UI
      return (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-md border border-red-200 dark:border-red-800">
          <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
            Something went wrong
          </h3>
          <p className="text-red-600 dark:text-red-300">
            {this.state.error?.message || 'An error occurred in this component'}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// A component that will throw an error
const BuggyCounter: React.FC = () => {
  const [counter, setCounter] = useState(0);
  
  const handleClick = () => {
    setCounter(prevCounter => prevCounter + 1);
  };
  
  // Simulated error when counter reaches 5
  if (counter === 5) {
    throw new Error('I crashed when counter reached 5!');
  }
  
  return (
    <div className="text-center">
      <p className="text-xl mb-2">{counter}</p>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment Counter {counter === 4 ? '(Will Crash at 5)' : ''}
      </button>
    </div>
  );
};

// Custom fallback component that takes the error details
interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const Fallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-md border border-red-200 dark:border-red-800">
    <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
      Oops! An error occurred
    </h3>
    <p className="text-red-600 dark:text-red-300 mb-4">
      {error.message}
    </p>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Reset Counter
    </button>
  </div>
);

// Function to create a custom error boundary with a reset handler
function withCustomFallback<P extends object>(Component: React.ComponentType<P>) {
  return function WithErrorBoundary(props: P) {
    const [key, setKey] = useState(0);
    
    const resetErrorBoundary = () => {
      // Increment the key to force a re-mount of the component
      setKey(prevKey => prevKey + 1);
    };
    
    return (
      <ErrorBoundary
        key={key}
        fallback={
          <Fallback
            error={new Error('Component crashed!')}
            resetErrorBoundary={resetErrorBoundary}
          />
        }
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

// The main error boundary example component
const ErrorBoundaryExample: React.FC = () => {
  const SafeBuggyCounter = withCustomFallback(BuggyCounter);
  
  return (
    <div className="space-y-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Error Boundary Example</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        This example demonstrates React Error Boundaries that catch errors in components.
      </p>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="font-medium mb-2">Basic Error Boundary</h3>
          <p className="text-sm mb-4">
            Click the button until it reaches 5, and the error boundary will catch the error.
          </p>
          <ErrorBoundary>
            <BuggyCounter />
          </ErrorBoundary>
        </div>
        
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="font-medium mb-2">With Custom Fallback</h3>
          <p className="text-sm mb-4">
            This version uses a custom fallback UI and can reset itself.
          </p>
          <SafeBuggyCounter />
        </div>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md text-sm">
        <p>Key points about Error Boundaries:</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
          <li>Catch errors in component trees</li>
          <li>Display fallback UI instead of crashing</li>
          <li>Can log errors centrally</li>
          <li>Can recover from errors</li>
          <li>Only work for component errors, not event handlers or async code</li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorBoundaryExample;

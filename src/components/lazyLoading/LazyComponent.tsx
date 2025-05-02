"use client";

import React, { Suspense, lazy, useState } from 'react';

// Using a more appropriate type instead of empty interface
type HeavyComponentProps = Record<string, never>; // or {} as const if you truly need an empty object type

// Simulated heavy component that will be lazy loaded
// In a real app, this would be imported from a separate file
const HeavyComponent = lazy(() => 
  // Simulate delay to demonstrate loading state
  new Promise<{ default: React.ComponentType<HeavyComponentProps> }>(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium mb-4">Heavy Component Loaded!</h3>
            <p className="mb-4">
              This component was loaded lazily only when needed.
              In a real app, this could be a complex data visualization,
              a rich text editor, or any other heavy component.
            </p>
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 w-20 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        )
      });
    }, 1500); // 1.5 second delay
  })
);

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center animate-pulse">
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
    <div className="flex gap-2 flex-wrap">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-20 w-20 rounded-md bg-gray-200 dark:bg-gray-700"
        ></div>
      ))}
    </div>
  </div>
);


// The main lazy loading example component
const LazyLoadingExample: React.FC = () => {
  const [showComponent, setShowComponent] = useState(false);
  
  return (
    <div className="space-y-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Lazy Loading Example</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        This example demonstrates React&apos;s lazy loading capabilities with Suspense.
      </p>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
        <p className="mb-4">
          Lazy loading allows you to defer loading components until they&apos;re actually
          needed, reducing the initial bundle size and improving performance.
        </p>
        
        <button
          onClick={() => setShowComponent(!showComponent)}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showComponent ? 'Hide' : 'Load'} Heavy Component
        </button>
      </div>
      
      {showComponent && (
        <Suspense fallback={<LoadingFallback />}>
          <HeavyComponent />
        </Suspense>
      )}
      
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md text-sm">
        <p>Key points about lazy loading:</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
          <li>Reduces initial bundle size</li>
          <li>Improves initial load performance</li>
          <li>Shows a fallback UI during loading with Suspense</li>
          <li>Loads components only when they&apos;re needed</li>
          <li>Great for code-splitting large applications</li>
        </ul>
      </div>
    </div>
  );
};

export default LazyLoadingExample;

"use client";

import React, { useState, Suspense, lazy } from "react";
import Link from "next/link";

// Lazy load the component
const LazyComponent = lazy(() => 
  // Simulate a delay to demonstrate loading state
  new Promise<{ default: React.ComponentType }>(resolve => 
    setTimeout(() => resolve(import("@/components/lazyLoading/LazyComponent")), 1500)
  )
);

export default function LazyLoadingPattern() {
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);
  
  const loadComponent = () => {
    setIsComponentLoaded(true);
  };
  
  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <Link href="/" className="text-blue-500 hover:text-blue-700 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to patterns
          </Link>
        </nav>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-4">Lazy Loading Pattern</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Lazy loading is a technique that defers loading of non-critical resources at page load time.
              Instead, these resources are loaded only when needed. In React, this is achieved through
              <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-600 rounded">React.lazy()</code> and
              <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-600 rounded">Suspense</code> which
              allow you to render a loading indicator while waiting for components to load.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Click the button below to load a component that is imported with <code>React.lazy()</code>.
                  You&apos;ll see a loading indicator while the component is being fetched.
                </p>
                
                {!isComponentLoaded ? (
                  <div className="text-center py-4">
                    <button
                      onClick={loadComponent}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Load Component
                    </button>
                  </div>
                ) : (
                  <Suspense fallback={
                    <div className="flex items-center justify-center h-40">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  }>
                    <LazyComponent />
                  </Suspense>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
                <code>{`// In your page file (e.g., LazyLoadingPage.tsx)
import React, { useState, Suspense, lazy } from "react";

// Lazy load the component
const LazyComponent = lazy(() => import("@/components/LazyComponent"));

export default function LazyLoadingPage() {
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);
  
  const loadComponent = () => {
    setIsComponentLoaded(true);
  };
  
  return (
    <div>
      {!isComponentLoaded ? (
        <button onClick={loadComponent}>
          Load Component
        </button>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
}

// LazyComponent.tsx
import React from "react";

const LazyComponent = () => {
  return (
    <div>
      <h2>Lazy Loaded Component</h2>
      <p>This component was loaded only when needed!</p>
      {/* Heavy component content goes here */}
    </div>
  );
};

export default LazyComponent;`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Key Benefits</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Reduced initial bundle size for faster page loads</li>
              <li>Components are loaded only when they&apos;re actually needed</li>
              <li>Better performance for large applications with many components</li>
              <li>Code splitting across multiple smaller bundles</li>
              <li>Improved user experience with loading indicators</li>
              <li>Reduced memory usage by loading only what&apos;s necessary</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
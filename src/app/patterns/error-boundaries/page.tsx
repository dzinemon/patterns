"use client";

import React from "react";
import Link from "next/link";
import ErrorBoundaryExample from "@/components/errorBoundaries/ErrorBoundary";

export default function ErrorBoundariesPattern() {
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
          <h1 className="text-3xl font-bold mb-4">Error Boundaries Pattern</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Error boundaries are React components that catch JavaScript errors anywhere in their
              child component tree, log those errors, and display a fallback UI instead of crashing
              the whole application. Error boundaries only catch errors in the components below them
              in the tree and can&apos;t recover from their own errors.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Starting from React 16, errors that were not caught by any error boundary will result
              in unmounting of the whole React component tree, so it&apos;s important to use error boundaries
              to provide a better user experience.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300">
                Below is a component that will throw an error when its counter reaches 5.
                The error boundary catches the error and displays a fallback UI.
              </p>
              
              {/* Using the full ErrorBoundaryExample component which already includes error boundaries */}
              <ErrorBoundaryExample />
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
                <code>{`// ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Called when an error is thrown in a child component
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to trigger fallback UI
    return { hasError: true, error };
  }

  // Log the error to an error reporting service
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    // You could also log to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-700 mb-2">
            Something went wrong
          </h3>
          <p className="text-red-600 mb-4">
            {this.state.error?.message}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Try Again
          </button>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

// Usage:
// <ErrorBoundary>
//   <ComponentThatMightThrow />
// </ErrorBoundary>`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Key Benefits</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Prevent the entire application from crashing due to errors in components</li>
              <li>Display meaningful error messages and fallback UI to users</li>
              <li>Log errors for debugging and monitoring</li>
              <li>Isolate errors to specific parts of the UI</li>
              <li>Allow for recovery without full page reload</li>
              <li>Create better user experience when things go wrong</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
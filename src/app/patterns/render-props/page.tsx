"use client";

import React from "react";
import Link from "next/link";
import {
  MouseTracker,
  MousePointerIndicator,
} from "@/components/renderProps/MouseTracker";

export default function RenderPropsPattern() {
  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to patterns
          </Link>
        </nav>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-4">Render Props Pattern</h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The Render Props pattern is a technique for sharing code between
              React components using a prop whose value is a function. A
              component with a render prop takes a function that returns a React
              element and calls it instead of implementing its own render logic.
              This pattern provides a powerful way to share stateful logic while
              keeping components flexible and reusable.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                The example below shows a MouseTracker component that tracks the
                mouse position and shares that data through a render prop. Move
                your mouse over the area to see it in action.
              </p>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <MouseTracker>
                  {(mousePosition) => (
                    <div className="relative p-4 bg-gray-50 dark:bg-gray-700 h-full w-full">
                      <p className="mb-4">Move your mouse in this area!</p>
                      <div
                        className="absolute h-2 w-2 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: mousePosition.x - 10,
                          top: mousePosition.y - 10,
                        }}
                      />
                      <p className="absolute bottom-4">
                        Mouse position: ({mousePosition.x.toFixed(0)},{" "}
                        {mousePosition.y.toFixed(0)})
                      </p>
                    </div>
                  )}
                </MouseTracker>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Alternative Syntax</h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                The same component can also be used with an explicit render
                prop:
              </p>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <MouseTracker
                  render={(mousePosition) => (
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 text-center">
                      <p>The mouse coordinates are:</p>
                      <p className="font-mono font-bold mt-2">
                        x: {mousePosition.x.toFixed(0)}, y:{" "}
                        {mousePosition.y.toFixed(0)}
                      </p>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                The same component can also be used with an explicit render
                prop:
              </p>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden relative">
                <MouseTracker
                  render={(position) => (
                    <MousePointerIndicator position={position} />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
                <code>{`// MouseTracker.tsx
import React, { useState, ReactNode } from 'react';

// Type for mouse position
type MousePosition = {
  x: number;
  y: number;
};

// Props type for the MouseTracker component
type MouseTrackerProps = {
  render?: (position: MousePosition) => ReactNode;
  children?: (position: MousePosition) => ReactNode;
};

export const MouseTracker: React.FC<MouseTrackerProps> = ({ render, children }) => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setPosition({ x, y });
  };
  
  return (
    <div onMouseMove={handleMouseMove}>
      {render ? render(position) : children ? children(position) : null}
    </div>
  );
};

// Usage with children function:
// <MouseTracker>
//   {(mousePosition) => (
//     <p>Mouse position: {mousePosition.x}, {mousePosition.y}</p>
//   )}
// </MouseTracker>

// Usage with render prop:
// <MouseTracker 
//   render={(mousePosition) => (
//     <p>Mouse position: {mousePosition.x}, {mousePosition.y}</p>
//   )}
// />
`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Key Benefits</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Flexible sharing of stateful logic between components</li>
              <li>Component composition rather than inheritance</li>
              <li>
                Clear separation between the provider of data and how it is
                rendered
              </li>
              <li>
                Easier testing as logic and rendering can be tested separately
              </li>
              <li>Avoids prop drilling and unnecessary component hierarchy</li>
              <li>
                Supports multiple patterns (children as function or explicit
                render prop)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

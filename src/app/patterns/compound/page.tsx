"use client";

import React from "react";
import Link from "next/link";

export default function CompoundPattern() {
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
          <h1 className="text-3xl font-bold mb-4">
            Compound Component Pattern
          </h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The Compound Component pattern is used to create components that
              work together to form a cohesive UI element. This pattern allows
              for more flexible component composition while keeping related
              state and logic encapsulated. Each component in the group shares
              an implicit state and can communicate with one another.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Link
                href="/patterns/compound/accordion"
                className="p-3 bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition text-center"
              >
                <div className="font-medium">Accordion</div>
              </Link>
              <Link
                href="/patterns/compound/card"
                className="p-3 bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition text-center"
              >
                <div className="font-medium">Card</div>
              </Link>

              <Link
                href="/patterns/compound/dropdown"
                className="p-3 bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition text-center"
              >
                <div className="font-medium">Dropdown</div>
              </Link>
              <Link
                href="/patterns/compound/menu"
                className="p-3 bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition text-center"
              >
                <div className="font-medium">Menu</div>
              </Link>
              <Link
                href="/patterns/compound/select"
                className="p-3 bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition text-center"
              >
                <div className="font-medium">Select</div>
              </Link>
              <Link
                href="/patterns/compound/tabs"
                className="p-3 bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition text-center"
              >
                <div className="font-medium">Tabs</div>
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Key Benefits</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Flexible component composition with a clear parent-child
                relationship
              </li>
              <li>
                Shared implicit state between components without prop drilling
              </li>
              <li>Better encapsulation of related logic and state</li>
              <li>Improved readability with a more declarative API</li>
              <li>
                Components that work together cohesively but can be customized
                individually
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

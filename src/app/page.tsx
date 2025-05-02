"use client";

import React from "react";
import Image from "next/image";
import PatternLink from "@/components/common/PatternLink";

// Pattern info with descriptions
const patterns = [
  {
    id: "representational",
    name: "Representational Component",
    description: "Components that focus on rendering UI without managing state",
    path: "/patterns/representational"
  },
  {
    id: "compound",
    name: "Compound Component",
    description: "Components that work together to form a cohesive UI pattern",
    path: "/patterns/compound"
  },
  {
    id: "hoc",
    name: "Higher Order Component",
    description: "Functions that take a component and return a new enhanced component",
    path: "/patterns/hoc"
  },
  {
    id: "render-props",
    name: "Render Props",
    description: "Sharing code between components using props whose value is a function",
    path: "/patterns/render-props"
  },
  {
    id: "controlled",
    name: "Controlled Component",
    description: "Components where form data is handled by React component state",
    path: "/patterns/controlled"
  },
  {
    id: "uncontrolled",
    name: "Uncontrolled Component",
    description: "Components that maintain their own internal state using refs",
    path: "/patterns/uncontrolled"
  },
  {
    id: "context-api",
    name: "Context API",
    description: "Sharing state across components without prop drilling",
    path: "/patterns/context-api"
  },
  {
    id: "hooks",
    name: "Hooks",
    description: "Functions that let you use state and lifecycle features in functional components",
    path: "/patterns/hooks"
  },
  {
    id: "custom-hooks",
    name: "Custom Hooks",
    description: "Extracting component logic into reusable functions",
    path: "/patterns/custom-hooks"
  },
  {
    id: "portals",
    name: "Portals",
    description: "Rendering elements outside the React DOM hierarchy",
    path: "/patterns/portals"
  },
  {
    id: "lazy-loading",
    name: "Lazy Loading",
    description: "Loading components only when they are needed",
    path: "/patterns/lazy-loading"
  },
  {
    id: "error-boundaries",
    name: "Error Boundaries",
    description: "Catching JavaScript errors in UI components",
    path: "/patterns/error-boundaries"
  },
];

export default function Home() {
  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center mb-4 sm:mb-0">
            <Image
              className="dark:invert mr-4"
              src="/next.svg"
              alt="Next.js logo"
              width={120}
              height={30}
              priority
            />
            <h1 className="text-2xl font-bold">React Patterns Guide</h1>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href="https://reactjs.org/docs/getting-started.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              React Docs
            </a>
            <a
              href="https://github.com/facebook/react"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              GitHub
            </a>
          </div>
        </header>
        
        <main>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="max-w-2xl mb-10">
              <h1 className="text-3xl font-bold mb-6">Modern React Patterns</h1>
              <p className="mb-6">
                This interactive guide demonstrates modern React patterns with practical examples.
                Click on any pattern to see it in action with code samples.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patterns.map((pattern) => (
                <PatternLink 
                  key={pattern.id}
                  href={pattern.path}
                  title={pattern.name}
                  description={pattern.description}
                  isCard={true}
                />
              ))}
            </div>
          </div>
        </main>
        
        <footer className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Modern React Patterns Guide - Built with Next.js
          </p>
        </footer>
      </div>
    </div>
  );
}

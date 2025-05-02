"use client";

import React from "react";
import Link from "next/link";
import PersonList from "@/components/representational/PersonList";

export default function RepresentationalPattern() {
  const persons = [
    { 
      id: 1, 
      name: "John Doe", 
      role: "Developer",
      email: "john.doe@example.com",
      avatarUrl: "https://avatars.githubusercontent.com/u/12345678"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      role: "Designer",
      email: "jane.smith@example.com",
      avatarUrl: "https://avatars.githubusercontent.com/u/23456789"
    },
    { 
      id: 3, 
      name: "Bob Johnson", 
      role: "Product Manager",
      email: "bob.johnson@example.com",
      avatarUrl: "https://avatars.githubusercontent.com/u/34567890"
    },
  ];

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
          <h1 className="text-3xl font-bold mb-4">Representational Component Pattern</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Representational components (also known as presentational components) are focused solely 
              on rendering UI elements based on the props they receive. They don&apos;t manage state 
              or handle business logic, making them highly reusable and easy to test.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium mb-4">Person List Component</h3>
              <PersonList persons={persons} />
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
                <code>{`// PersonList.tsx
import React from 'react';
import Image from 'next/image';

// Person type definition
type Person = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
};

// Person card component
const PersonCard: React.FC<{ person: Person }> = ({ person }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4">
      <Image 
        width={48}
        height={48}
        src={person.avatarUrl} 
        alt={person.name} 
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h3 className="text-lg font-semibold">{person.name}</h3>
        <p className="text-gray-500 dark:text-gray-300">{person.role}</p>
        <p className="text-sm text-gray-400">{person.email}</p>
      </div>
    </div>
  );
};

// Representational component - just renders data, no state or logic
const PersonList: React.FC<{ persons: Person[] }> = ({ persons }) => {
  return (
    <div className="space-y-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Representational Component Example</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        This component is purely representational - it just renders data without any state or logic.
      </p>
      {persons.map(person => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
};`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Key Benefits</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Improved separation of concerns</li>
              <li>Enhanced reusability across different parts of the application</li>
              <li>Easier to test as they&apos;re pure functions of their props</li>
              <li>More maintainable codebase with clear component responsibilities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
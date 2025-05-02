"use client";

import React from "react";
import Link from "next/link";
import Card from "@/components/compound/Card";

export default function CardPatternPage() {
  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <Link href="/patterns/compound" className="text-blue-500 hover:text-blue-700 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Compound Components
          </Link>
        </nav>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-4">Card Compound Component</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The Card compound component is a flexible container with standardized sections like
              header, body, footer, and image. It allows for consistent styling while providing
              flexibility in content arrangement.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <Card.Image src="/next.svg" alt="Card Image" className="bg-slate-100" />
                  <Card.Header>
                    <h3 className="text-lg font-semibold">Card Title</h3>
                  </Card.Header>
                  <Card.Body>
                    <p>This is the card content. It can contain any React elements.</p>
                  </Card.Body>
                  <Card.Footer>
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Action
                      </button>
                    </div>
                  </Card.Footer>
                </Card>
                
                <Card>
                  <Card.Header>
                    <h3 className="text-lg font-semibold">Another Card</h3>
                  </Card.Header>
                  <Card.Body>
                    <p>Cards can be composed in different ways, with or without certain sections.</p>
                    <p className="mt-2">This flexibility is the beauty of compound components.</p>
                  </Card.Body>
                  <Card.Footer>
                    <div className="flex justify-between">
                      <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Submit
                      </button>
                    </div>
                  </Card.Footer>
                </Card>

                <Card>
                  <Card.Image src="/file.svg" alt="Card Image" className="bg-slate-100" />
                  <Card.Header>
                    <h3 className="text-lg font-semibold">File Title</h3>
                  </Card.Header>
                  <Card.Body>
                    <p>
                      This is the card content, it can contain any React elements.
                    </p>
                  </Card.Body>
                  
                </Card>
                
                <Card>
                  <Card.Image src="/globe.svg" alt="Card Image" className="bg-slate-100" />
                  <Card.Header>
                    <h3 className="text-lg font-semibold">Card with Globe Title</h3>
                  </Card.Header>
                  <Card.Body>
                    <p>
                      This is the card content. It can contain any React elements.
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
                <code>{`// Card.tsx
import React, { ReactNode } from 'react';
import Image from 'next/image';

// Main Card component
type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className = '' }) => {
  return (
    <div className={\`bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden \${className}\`}>
      {children}
    </div>
  );
};

// Header component
const Header = ({ children, className = '' }) => {
  return (
    <div className={\`px-6 py-4 border-b border-gray-200 dark:border-gray-700 \${className}\`}>
      {children}
    </div>
  );
};

// Body component
const Body = ({ children, className = '' }) => {
  return (
    <div className={\`px-6 py-4 \${className}\`}>
      {children}
    </div>
  );
};

// Footer component
const Footer = ({ children, className = '' }) => {
  return (
    <div className={\`px-6 py-4 border-t border-gray-200 dark:border-gray-700 \${className}\`}>
      {children}
    </div>
  );
};

// Image component
const CardImage = ({ src, alt, className = '' }) => {
  return (
    <div className={\`w-full \${className}\`}>
      <Image
        src={src} 
        alt={alt} 
        width={500}
        height={300}
        sizes="(max-width: 768px) 100vw, 500px"
        className="object-cover"
      />
    </div>
  );
};

// Attach sub-components to Card
Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
Card.Image = CardImage;

export default Card;`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Modular design with separate components for header, body, footer, and image</li>
              <li>Consistent styling across all card instances</li>
              <li>Flexible composition - use only the parts you need</li>
              <li>Clean separation of concerns between different sections</li>
              <li>Easy to customize styles for individual card sections</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
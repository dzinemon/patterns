"use client";

import React, { useState } from "react";
import Link from "next/link";
import UncontrolledForm from "@/components/controlled/UncontrolledForm";

export default function UncontrolledComponentPattern() {
  const [submittedData, setSubmittedData] = useState<null | {
    name: string;
    email: string;
    message: string;
  }>(null);

  const handleSubmit = (formData: { name: string; email: string; message: string }) => {
    setSubmittedData(formData);
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
          <h1 className="text-3xl font-bold mb-4">Uncontrolled Component Pattern</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Uncontrolled components in React are form elements that maintain their own internal state.
              Instead of using React state to track input values, uncontrolled components rely on refs
              to directly access the DOM element values when needed. This approach is similar to traditional HTML form handling.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-medium mb-4">Uncontrolled Form</h3>
                <UncontrolledForm onSubmit={handleSubmit} />
              </div>
              
              {submittedData && (
                <div className="p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
                  <h3 className="font-medium mb-2 text-green-800 dark:text-green-200">Form Submitted!</h3>
                  <p><strong>Name:</strong> {submittedData.name}</p>
                  <p><strong>Email:</strong> {submittedData.email}</p>
                  <p><strong>Message:</strong> {submittedData.message}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
                <code>{`// UncontrolledForm.tsx
import React, { useRef } from "react";

interface UncontrolledFormProps {
  onSubmit: (formData: {
    name: string;
    email: string;
    message: string;
  }) => void;
}

export const UncontrolledForm: React.FC<UncontrolledFormProps> = ({ onSubmit }) => {
  // Create refs for form elements
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Access current DOM values directly using refs
    if (nameRef.current && emailRef.current && messageRef.current) {
      const formData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        message: messageRef.current.value,
      };
      
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          defaultValue=""
          className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block mb-1 text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          defaultValue=""
          className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
          required
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block mb-1 text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          ref={messageRef}
          defaultValue=""
          rows={4}
          className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
          required
        />
      </div>
      
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Key Benefits</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Simpler implementation for basic forms</li>
              <li>Lower overhead—no state updates on every keystroke</li>
              <li>Direct integration with non-React code</li>
              <li>Works well with file inputs and other native inputs</li>
              <li>Useful for forms that need minimal interaction before submission</li>
              <li>Better performance for large forms with many inputs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
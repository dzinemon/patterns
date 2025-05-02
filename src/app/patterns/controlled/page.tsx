"use client";

import React, { useState } from "react";
import Link from "next/link";
import ControlledForm from "@/components/controlled/ControlledForm";

export default function ControlledComponentPattern() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submittedData, setSubmittedData] = useState<null | {
    name: string;
    email: string;
    message: string;
  }>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData({ ...formData });
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
          <h1 className="text-3xl font-bold mb-4">Controlled Component Pattern</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              In a controlled component, form data is handled by a React component&apos;s state.
              The component renders a form, but the form&apos;s state lives in the React component&apos;s state
              and is updated through callbacks like onChange. This gives you complete control over the form&apos;s behavior.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-medium mb-4">Controlled Form</h3>
                <ControlledForm 
                  values={formData}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                />
              </div>
              
              {submittedData && (
                <div className="p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
                  <h3 className="font-medium mb-2 text-green-800 dark:text-green-200">Form Submitted!</h3>
                  <p><strong>Name:</strong> {submittedData.name}</p>
                  <p><strong>Email:</strong> {submittedData.email}</p>
                  <p><strong>Message:</strong> {submittedData.message}</p>
                </div>
              )}
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
                <h3 className="font-medium mb-2 text-blue-800 dark:text-blue-200">Current State Value</h3>
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
                <code>{`// ControlledForm.tsx
import React from "react";

interface ControlledFormProps {
  values: {
    name: string;
    email: string;
    message: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ControlledForm: React.FC<ControlledFormProps> = ({
  values,
  onChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={onChange}
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
          name="email"
          value={values.email}
          onChange={onChange}
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
          name="message"
          value={values.message}
          onChange={onChange}
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
              <li>Complete control over form inputs and their values</li>
              <li>Instant access to input values for validation or conditional rendering</li>
              <li>Ability to enforce input formats and transformations</li>
              <li>Synchronized UI state with form data</li>
              <li>Predictable form behavior and easier testing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
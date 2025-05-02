"use client";

import React, { useRef, useState } from 'react';

// Define props interface
interface UncontrolledFormProps {
  onSubmit?: (formData: { name: string; email: string; message: string }) => void;
}

// Uncontrolled form example
const UncontrolledForm: React.FC<UncontrolledFormProps> = ({ onSubmit }) => {
  // Refs for form fields
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  
  // State to track if form has been submitted
  const [submitted, setSubmitted] = useState(false);
  // State to show current values after submission
  const [formData, setFormData] = useState<Record<string, string> | null>(null);
  
  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Gather values from refs
    const data = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
      message: messageRef.current?.value || ''
    };
    
    console.log('Form submitted with values:', data);
    setFormData(data);
    setSubmitted(true);
    
    // Call the onSubmit prop if provided
    if (onSubmit) {
      onSubmit(data);
    }
    
    // Reset form after 2 seconds
    setTimeout(() => {
      if (nameRef.current) nameRef.current.value = '';
      if (emailRef.current) emailRef.current.value = '';
      if (messageRef.current) messageRef.current.value = '';
      setSubmitted(false);
      setFormData(null);
    }, 2000);
  };
  
  return (
    <div className="space-y-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Uncontrolled Component Example</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        This form demonstrates uncontrolled components using refs to access input values directly from the DOM.
      </p>
      
      {submitted ? (
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-md text-green-700 dark:text-green-300">
          Thank you! Your form has been submitted.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="uncontrolled-name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="uncontrolled-name"
              name="name"
              ref={nameRef}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
              defaultValue="John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="uncontrolled-email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="uncontrolled-email"
              name="email"
              ref={emailRef}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
              defaultValue="john@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="uncontrolled-message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="uncontrolled-message"
              name="message"
              ref={messageRef}
              rows={3}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
              defaultValue="Default message here"
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      )}
      
      {formData && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <h3 className="text-sm font-medium mb-2">Submitted Form Data:</h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default UncontrolledForm;

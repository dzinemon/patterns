"use client";

import React from "react";
import Link from "next/link";
import Select from "@/components/compound/Select";

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
];
const sizes = [
  { value: "xs", label: "XS" },
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "XL" },
];
const colors = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "purple", label: "Purple" },
];


export default function SelectPatternPage() {
  const handleChange = (value: string) => {
    console.log(`Selected value: ${value}`);
  };

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
          <h1 className="text-3xl font-bold mb-4">Select Compound Component</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The Select compound component creates a custom dropdown menu that allows users to choose 
              from a list of options. It provides a more flexible alternative to the native select 
              element with better styling control and customization options.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-64 mb-10">
                <Select>
                  <Select.Label>Select a country</Select.Label>
                  <Select.Trigger placeholder="Choose a country" />
                  <Select.Options>
                    {countries.map((country) => (
                      <Select.Option key={country.value} value={country.value}>
                        {country.label}
                      </Select.Option>
                    ))}
                  </Select.Options>
                </Select>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="w-32">
                  <Select onChange={handleChange}>
                    <Select.Label>Size</Select.Label>
                    <Select.Trigger />
                    <Select.Options>
                      {sizes.map((size) => (
                        <Select.Option key={size.value} value={size.value}>
                          {size.label}
                        </Select.Option>
                      ))}
                    </Select.Options>
                  </Select>
                </div>
                
                <div className="w-32">
                  <Select>
                    <Select.Label>Color</Select.Label>
                    <Select.Trigger />
                    <Select.Options>
                      {colors.map((color) => (
                        <Select.Option key={color.value} value={color.value}>
                          {color.label}
                        </Select.Option>
                      ))}
                    </Select.Options>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
             
              </pre>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Customizable trigger and options with full styling control</li>
              <li>Support for default values and change callbacks</li>
              <li>Click-outside behavior to automatically close the dropdown</li>
              <li>Visual highlighting of the selected option</li>
              <li>Accessible labeling with semantic structure</li>
              <li>Controlled interaction between components via React Context</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
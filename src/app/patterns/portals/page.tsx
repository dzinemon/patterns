"use client";

import React, { useState } from "react";
import Link from "next/link";
import Modal from "@/components/portals/Modal";

export default function PortalsPattern() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
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
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative">
          <h1 className="text-3xl font-bold mb-4">Portals Pattern</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Portals provide a first-class way to render children into a DOM node that exists
              outside the DOM hierarchy of the parent component. This is especially useful for
              components like modals, tooltips, and floating menus, which need to visually &quot;break out&quot;
              of their container&apos;s layout constraints while maintaining their position in the React component tree.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-center py-8">
                <p className="mb-4">
                  Click the button below to open a modal dialogue. The modal will render outside of this container
                  using React&apos;s createPortal API, even though it&apos;s part of this component&apos;s render tree.
                </p>
                <button
                  onClick={openModal}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Open Modal
                </button>
              </div>

              {/* The modal component uses createPortal to render outside the DOM hierarchy */}
              <Modal 
                title="React Portals Example"
                isOpen={isModalOpen} 
                onClose={closeModal}
              >
                <p>
                  This modal is rendered using React Portals. Even though it&apos;s a child component
                  in the React tree, it&apos;s actually mounted to a different part of the DOM.
                  This prevents issues with stacking contexts, z-index, and overflow properties.
                </p>
              </Modal>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Code Implementation</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="overflow-x-auto text-sm">
                <code>{`// Modal.tsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // State to track if we're in the browser
  const [mounted, setMounted] = useState(false);
  
  // Mount state on client side only
  useEffect(() => {
    setMounted(true);
    
    // When modal is open, disable body scrolling
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    // Cleanup - re-enable scrolling
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Don't render anything on server or if modal is closed
  if (!mounted || !isOpen) return null;
  
  // Use createPortal to render outside of component hierarchy
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose} />
      
      {/* Modal */}
      <div className="z-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between p-4 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose}>×</button>
        </div>
        
        {/* Body */}
        <div className="p-4">{children}</div>
        
        {/* Footer */}
        <div className="p-4 border-t flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Key Benefits</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Render content outside the DOM hierarchy of the parent component</li>
              <li>Avoid CSS issues with z-index, stacking contexts, and overflow</li>
              <li>Maintain React&apos;s event propagation and context through the virtual DOM tree</li>
              <li>Better accessibility for modal dialogs and popovers</li>
              <li>Cleaner code organization by keeping related components together</li>
              <li>Ideal for modals, tooltips, floating menus, and popovers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
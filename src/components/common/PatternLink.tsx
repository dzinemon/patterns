"use client";

import React from 'react';
import Link from 'next/link';

type PatternLinkProps = {
  href: string;
  title: string;
  description?: string;
  isCard?: boolean;
  backLink?: boolean;
  className?: string;
};

/**
 * A common component for pattern links that can be used as cards on the home page
 * or as simple links with optional descriptions elsewhere
 */
const PatternLink: React.FC<PatternLinkProps> = ({
  href,
  title,
  description,
  isCard = false,
  backLink = false,
  className = "",
}) => {
  if (backLink) {
    return (
      <Link href={href} className={`text-blue-500 hover:text-blue-700 flex items-center ${className}`}>
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {title}
      </Link>
    );
  }

  if (isCard) {
    return (
      <Link 
        href={href}
        className={`block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow ${className}`}
      >
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        {description && <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>}
        <span className="text-blue-500 inline-flex items-center">
          Learn more
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    );
  }

  return (
    <Link 
      href={href}
      className={`text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 ${className}`}
    >
      {title}
      {description && <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">— {description}</span>}
      <svg className="w-3 h-3 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
};

export default PatternLink;
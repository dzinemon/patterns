"use client";

import React, { ReactNode } from 'react';
import Image from 'next/image';

// Main Card component
type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> & {
  Header: React.FC<HeaderProps>;
  Body: React.FC<BodyProps>;
  Footer: React.FC<FooterProps>;
  Image: React.FC<ImageProps>;
} = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

// Header component
type HeaderProps = {
  children: ReactNode;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

// Body component
type BodyProps = {
  children: ReactNode;
  className?: string;
};

const Body: React.FC<BodyProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

// Footer component
type FooterProps = {
  children: ReactNode;
  className?: string;
};

const Footer: React.FC<FooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

// Image component
type ImageProps = {
  src: string;
  alt: string;
  className?: string;
};

const CardImage: React.FC<ImageProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={`w-full aspect-2/1 ${className}`}>
      <Image
        src={src} 
        width={1200}
        height={800}
        alt={alt} 
        className="object-contain object-center w-full h-full p-4"
      />
    </div>
  );
};

// Attach sub-components to Card
Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
Card.Image = CardImage;

export default Card;
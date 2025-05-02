"use client";

import React, { useState, ReactNode } from 'react';

// Type for mouse position
type MousePosition = {
  x: number;
  y: number;
};

// Props type for the MouseTracker component
type MouseTrackerProps = {
  render?: (position: MousePosition) => ReactNode;
  children?: (position: MousePosition) => ReactNode;
};

// Mouse tracker component using render props pattern
export const MouseTracker: React.FC<MouseTrackerProps> = ({ render, children }) => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setPosition({
      x,
      y
    });
  };
  
  return (
    <div 
      className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 h-64 flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {render ? render(position) : children ? children(position) : null}
    </div>
  );
};

// An example component that uses the mouse position
export const MousePointerIndicator: React.FC<{ position: MousePosition }> = ({ position }) => {
  return (
    <div className="text-center">
      <p>Move your mouse inside this box</p>
      <p className="mt-2 font-mono">
        Current mouse position: ({position.x}, {position.y})
      </p>
    </div>
  );
};

// Example usage component
export const RenderPropsExample: React.FC = () => {
  return (
    <div className="space-y-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Render Props Example</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        This component demonstrates the render props pattern by tracking the mouse position
        and passing it to a child component through a render function.
      </p>
      
      <MouseTracker 
        render={(position) => <MousePointerIndicator position={position} />}
      />
    </div>
  );
};


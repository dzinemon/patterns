

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
};

export default PersonList;

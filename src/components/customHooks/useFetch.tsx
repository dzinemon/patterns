"use client";

import { useState, useEffect } from 'react';

// Simulated API function
const fetchUser = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { id: 1, name: 'Jane Doe', email: 'jane@example.com' };
};

export function useFetch<T>(fetchFunction: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]);

  return { data, loading, error };
}

// Sample component using the hook
export const UserProfile = () => {
  const { data: user, loading, error } = useFetch(fetchUser);

  if (error) return <div className="text-red-500">Error: {error.message}</div>;
  if (loading) return <div className="text-gray-500">Loading user data...</div>;
  
  return (
    <div className="p-4 border rounded">
      {user ? (
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export { fetchUser };
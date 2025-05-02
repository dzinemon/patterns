"use client";

import React from "react";
import { useFetch } from "@/components/customHooks/useFetch";
import PatternLink from "@/components/common/PatternLink";

import Accordion from "@/components/compound/Accordion";

// Simulated API functions
const fetchUser = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    id: 1,
    name: "Jane Doe",
    email: "jane@example.com",
    role: "Developer",
  };
};

const fetchPosts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return [
    {
      id: 1,
      title: "Understanding React Hooks",
      body: "A deep dive into React hooks...",
    },
    {
      id: 2,
      title: "Custom Hooks Pattern",
      body: "How to create reusable logic with custom hooks...",
    },
    {
      id: 3,
      title: "Advanced useFetch Techniques",
      body: "Optimizing data fetching in React applications...",
    },
  ];
};

// User Profile component using useFetch
const UserProfile = () => {
  const { data: user, loading, error } = useFetch(fetchUser);

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-700">
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
          <span className="text-gray-500 dark:text-gray-300">
            Loading user data...
          </span>
        </div>
      ) : (
        user && (
          <div>
            <h3 className="font-medium text-lg">{user.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Role: {user.role}
            </p>
          </div>
        )
      )}
    </div>
  );
};

// Posts List component using the same useFetch hook
const PostsList = () => {
  const { data: posts, loading, error } = useFetch(fetchPosts);

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-700">
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
          <span className="text-gray-500 dark:text-gray-300">
            Loading posts...
          </span>
        </div>
      ) : (
        <div>
          <h3 className="font-medium text-lg mb-3">Recent Posts</h3>
          {posts && posts.length > 0 ? (
            <ul className="space-y-3">
              {posts.map((post) => (
                <li key={post.id} className="border-b pb-2">
                  <h4 className="font-medium">{post.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {post.body}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No posts found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default function UseFetchExamples() {
  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <PatternLink
            href="/patterns/custom-hooks"
            title="Back to Custom Hooks"
            backLink={true}
          />
        </nav>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-4">
            useFetch Custom Hook Examples
          </h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The <code>useFetch</code> hook is a custom hook that abstracts the
              common pattern of fetching data, handling loading states, and
              managing errors. This hook can be reused across components to
              fetch different types of data while maintaining consistent
              behavior and state management.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              Example 1: User Profile
            </h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  This example uses <code>useFetch</code> to retrieve user data:
                </p>
                <UserProfile />

                <Accordion>
                  <Accordion.Item id="user-profile" className="mt-4">
                    <Accordion.Header>Code for UserProfile</Accordion.Header>
                    <Accordion.Content>
                    <pre className="overflow-x-auto text-sm">
                        <code>{`
const UserProfile = () => {
  const { data: user, loading, error } = useFetch(fetchUser);

  if (error) return <div className="text-red-500">Error: {error.message}</div>;
  
  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-700">
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
          <span className="text-gray-500 dark:text-gray-300">Loading user data...</span>
        </div>
      ) : (
        user && (
          <div>
            <h3 className="font-medium text-lg">{user.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Role: {user.role}</p>
          </div>
        )
      )}
    </div>
  );
};
                      `}</code>
                      </pre>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              Example 2: Posts List
            </h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  This example uses the same <code>useFetch</code> hook to
                  retrieve a list of posts:
                </p>
                <PostsList />
                <Accordion>
                  <Accordion.Item id="posts-list" className="mt-4">
                    <Accordion.Header>Code for PostsList</Accordion.Header>
                    <Accordion.Content>
                      <pre className="overflow-x-auto text-sm">
                        <code>{`
const PostsList = () => {
  const { data: posts, loading, error } = useFetch(fetchPosts);

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-700">
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
          <span className="text-gray-500 dark:text-gray-300">
            Loading posts...
          </span>
        </div>
      ) : (
        <div>
          <h3 className="font-medium text-lg mb-3">Recent Posts</h3>
          {posts && posts.length > 0 ? (
            <ul className="space-y-3">
              {posts.map((post) => (
                <li key={post.id} className="border-b pb-2">
                  <h4 className="font-medium">{post.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {post.body}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No posts found</p>
          )}
        </div>
      )}
    </div>
  );
};
                        `}</code>
                          
                          </pre>
                          </Accordion.Content>
                    </Accordion.Item>
                  </Accordion>

              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Implementation</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <pre className="overflow-x-auto text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded">
                <code>{`// useFetch.tsx
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
}`}</code>
              </pre>

              <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md">
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                  Key Points
                </h3>
                <ul className="list-disc pl-5 text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>
                    The hook accepts a fetch function as a parameter, making it
                    reusable for different data sources
                  </li>
                  <li>It handles three states: loading, error, and data</li>
                  <li>
                    Uses TypeScript generics to handle different data types
                  </li>
                  <li>Properly cleans up state between re-renders</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Usage Pattern</h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <pre className="overflow-x-auto text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded">
                <code>{`// Component using useFetch
const MyComponent = () => {
  const { data, loading, error } = useFetch(myFetchFunction);

  if (error) return <div>Error: {error.message}</div>;
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {/* Render data here */}
    </div>
  );
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

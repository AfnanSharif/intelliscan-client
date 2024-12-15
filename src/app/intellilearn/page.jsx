'use client';
import Image from 'next/image';
import { useState } from 'react';
import Logo from '@/images/logos/intellilearn.png';
import backgroundImage from '@/images/background-features.jpg';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Use the NEXT_PUBLIC_API_URL environment variable
  const apiUrl = "https://intellilearn-74jh2.ondigitalocean.app";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${apiUrl}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ query: query }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text();
      setResults(data);
      setShowResults(true);
    } catch (err) {
      console.error('Fetch error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowResults(false);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center p-5 text-center">
      {/* Background Image */}
      <Image
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        src={backgroundImage}
        alt="Background"
        layout="fill"
        quality={100}
        style={{ filter: 'blur(20px)' }}
      />

      {/* Search Bar and Logo at the Top */}
      {!showResults ? (
        <div className="flex flex-col items-center justify-center w-full mt-8">
          <h1 className="text-5xl font-bold mt-40 mb-4" style={{ fontFamily: "Arial, sans-serif" }}>
            <div className="bg-white py-3 px-6 rounded-full shadow-lg flex justify-center items-center">
              <span className="text-gray-800 font-bold">INTELLI</span>
              <span className="text-blue-800 font-bold">LEARN</span>
            </div>
          </h1>
          <p className="text-white mt-4 max-w-2xl text-lg font-medium">
            IntelliLearn is a cutting-edge platform that empowers developers, students, and coding enthusiasts by providing relevant learning resources. With a single search, IntelliLearn curates YouTube tutorials, GitHub repositories, and Google search results for any code-related content.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="relative w-[70%] max-w-4xl mt-5 gap-4">
            <input
              type="text"
              id="query"
              name="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
              className="w-full rounded-full bg-white bg-opacity-100 p-4 pr-12 text-center text-lg text-gray-800 outline-none shadow-lg transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your search query..."
              style={{ paddingRight: '40px' }}
            />
            {/* Search Icon inside Input */}
            <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-start overflow-y-auto mt-8">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="mb-8 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Back to Search
          </button>

          {/* Full-Width Results Container */}
          <div className="w-full h-[75vh] overflow-y-auto p-8 text-center">
            {/* Results Heading */}
            <h2 className="text-4xl font-bold text-white mb-6">Search Results</h2>

            {/* Results Content */}
            <div
              className="text-lg text-white leading-relaxed font-semibold space-y-4 text-center"
              dangerouslySetInnerHTML={{ __html: results }}
            />
          </div>
        </div>
      )}

      {/* Loading Animation */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 rounded-full bg-blue-500 animate-pulse mr-2"></div>
          <div className="h-6 w-6 rounded-full bg-blue-500 animate-pulse mr-2"></div>
          <div className="h-6 w-6 rounded-full bg-blue-500 animate-pulse"></div>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500 text-lg">{error}</p>}
    </div>
  );
}

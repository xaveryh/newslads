import React from 'react';
import './index.css';
import NewsSection from './components/NewsSection';
import TopSection from './components/TopSection';

export default function App() {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4">
        <p className="text-xs font-bold">NewsLads.com</p>
        <nav className="space-x-2">
          <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800">
            Home
          </button>
          <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800">
            Search
          </button>
        </nav>
      </header>
    
      <TopSection />
      <NewsSection />
    </div>
  );
}

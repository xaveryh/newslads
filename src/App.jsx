import React from 'react';
import './index.css';
import NewsSection from './components/NewsSection';
import TopSection from './components/TopSection';


export default function App() {
  return (
    <div className='font-sans text-gray-900'>
      {/* Navbar */}
      <header className='flex justify-between items-center p-4 shadow-md bg-white'>
        <h1 className='text-xl font-bold'>NewsLads.com</h1>
        <nav>
          <button className='p-2 bg-gray-100 rounded hover:bg-gray-200'>Home</button>
        </nav>
      </header>
    
      <TopSection />
      <NewsSection />
    </div>
  );
}
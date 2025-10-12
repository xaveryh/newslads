import React from 'react';

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

      {/* Top Section */}
      <section className='text-center py-16 bg-gray-50'>
        <h2 className='text-4xl font-bold mb-4'>Welcome!</h2>
        <p className='text-lg mb-6'>See what's new with NewsLads!</p>
        <button className='bg-black text-white px-6 py-2 rounded hover:bg-gray-800'>Search</button>
      </section>
    </div>
  );
}
import React from 'react';
import logo from './assets/logo.png';
import home_button from './assets/home_button.png';
import './index.css';

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

      {/* Hero Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-row md:flex-row items-center justify-between gap-10">
          
          {/* Left side */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-7xl font-extrabold mb-4">Welcome!</h1>
            <p className="text-lg mb-6">See what’s newest with NewsLads!</p>
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
              Search
            </button>
          </div>

          {/* Right side */}
          <div className="flex-1">
            <img
              src={logo}
              alt="NewsLads Logo"
              className="w-[500px] h-auto mx-auto md:mx-0"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

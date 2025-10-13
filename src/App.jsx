import React from 'react';
import './index.css';
import NavBar from './components/NavBar';
import TopSection from './components/TopSection';
import NewsSection from './components/NewsSection';
import NewsSection1 from './components/NewsSection1';
import ReadNext from './components/ReadNext';

export default function App() {
  return (
    <div className='font-sans text-gray-900'>
      <NavBar />
      <TopSection />
      <NewsSection />
      <NewsSection1 />
      <ReadNext />
    </div>
  );
}
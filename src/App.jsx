import React from 'react';
import './index.css';
import NavBar from './components/NavBar';
import NewsSection from './components/NewsSection';
import TopSection from './components/TopSection';


export default function App() {
  return (
    <div className='font-sans text-gray-900'>
      <NavBar />
      <TopSection />
      <NewsSection />
    </div>
  );
}
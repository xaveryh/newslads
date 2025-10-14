import React from 'react';
import NavBar from '../components/NavBar';
import TopSection from '../components/TopSection';
import LatestSection from '../components/LatestSection';
import CategorySection from '../components/CategorySection';
import ReadNext from '../components/ReadNext';
import FooterSection from '../components/FooterSection';

export default function HomePage() {
  return (
    <div className='font-sans text-gray-900'>
      <NavBar />
      <TopSection />
      <LatestSection />
      <CategorySection />
      <ReadNext />
      <FooterSection />
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
];

export default function CategorySection() {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-white" id="category-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Browsing the Category</h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((cat) => (
            <button
              id={cat + "-button"}
              key={cat}
              onClick={() => handleClick(cat)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium py-3 px-5 rounded-lg transition"
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { fetchNewsBySearch } from '../utils/newsApi';
import NavBar from '../components/NavBar';
import FooterSection from '../components/FooterSection';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const results = await fetchNewsBySearch(query);
    setArticles(results);
    setLoading(false);
  };

  return (
    <div className='font-sans text-gray-900'>
      <NavBar />
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="flex mb-8">
            <input
              type="text"
              placeholder="Search news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-r-md hover:bg-gray-800"
            >
              Search
            </button>
          </form>

          {loading ? (
            <p>Loading...</p>
          ) : articles.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {articles.map((article, index) => (
                <Link
                  key={index}
                  to="/article"
                  state={{ article }}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition"
                >
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-base font-bold mb-1 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{article.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <FooterSection />
    </div>
  );
}

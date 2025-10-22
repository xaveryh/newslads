import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNewsByCategory } from '../utils/newsApi';
import NavBar from '../components/NavBar';
import FooterSection from '../components/FooterSection';

const countryOptions = [
  { label: 'Australia', uri: 'http://en.wikipedia.org/wiki/Australia' },
  { label: 'United Kingdom', uri: 'http://en.wikipedia.org/wiki/United_Kingdom' },
  { label: 'United States', uri: 'http://en.wikipedia.org/wiki/United_States' },
  { label: 'Canada', uri: 'http://en.wikipedia.org/wiki/Canada' },
  { label: 'Cambodia', uri: 'http://en.wikipedia.org/wiki/Cambodia' },
];

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [articles, setArticles] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(countryOptions[0].uri);
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA', { timeZone: 'Australia/Melbourne' }));
  const [isLoading, setIsLoading] = useState(false);

  const loadFilteredNews = async () => {
    try {
      setIsLoading(true);
      const data = await fetchNewsByCategory({
        category: categoryName,
        lang: 'eng',
        countryUri: selectedRegion,
        date: selectedDate,
        count: 12,
      });
      setArticles(data);
    } catch (error) {
      console.error('Failed to load filtered news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFilteredNews();
  }, [categoryName]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow px-6 md:px-24 lg:px-40 py-8 space-y-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 capitalize">{categoryName} News</h2>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-8">
            <label className="flex flex-col text-sm font-medium text-gray-700">
              Region:
              <select
                className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                {countryOptions.map((option) => (
                  <option key={option.uri} value={option.uri}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col text-sm font-medium text-gray-700">
              Date:
              <input
                type="date"
                className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </label>

            <button
              className="bg-black text-white px-6 py-2 rounded-2xl hover:bg-gray-800 mr-2"
              onClick={loadFilteredNews}
            >
              Apply Filters
            </button>
          </div>

          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : articles.length === 0 ? (
            <p className="text-gray-500">No news available for selected filters.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3" id="category-articles-container">
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
                      className="w-full h-40 object-cover"
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
      </main>

      <FooterSection />
    </div>
  );
}

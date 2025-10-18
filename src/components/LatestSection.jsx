import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopHeadlines } from '../utils/newsApi';

export default function NewsSection() {
  const [articles, setArticles] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchTopHeadlines({ country: 'us', pageSize: 10 });
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          console.error('Unexpected API response:', data);
        }
      } catch (err) {
        console.error('Failed to fetch top headlines:', err);
      }
    };

    loadNews();
  }, []);

  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Latest Headlines</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {Array.isArray(articles) &&
            articles
              .slice(0, showAll ? articles.length : 3)
              .map((article, index) => (
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

        {articles.length > 3 && (
          <div className="mt-8 text-left">
            <button
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded-2xl"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? 'Show less' : 'Show more...'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

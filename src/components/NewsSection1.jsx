import React, { useEffect, useState } from 'react';
import { fetchNewsByCategory } from '../utils/newsApi';
import newsImage from '../assets/news_image.png';
import { Link } from 'react-router-dom';

const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];

export default function NewsSection1() {
  const [newsData, setNewsData] = useState({});
  const [showAll, setShowAll] = useState({});

  useEffect(() => {
    const fetchInitial = async () => {
      const data = {};
      for (const category of categories) {
        try {
          const articles = await fetchNewsByCategory(category, 'us', 10);
          data[category] = articles;
        } catch (err) {
          console.error(`Error fetching ${category} news:`, err);
        }
      }
      setNewsData(data);
    };

    fetchInitial();
  }, []);

  const toggleShow = (category) => {
    setShowAll((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <section className="px-6 py-12">
      <h2 className="text-2xl font-semibold mb-6">What’s new on NewsLads?</h2>

      {categories.map((category) => {
        const articles = newsData[category] || [];
        const isShowingAll = showAll[category];

        return (
          <div key={category} className="mb-10">
            <h3 className="font-bold capitalize mb-2">{category}</h3>

            <ul className="mb-2 text-gray-700">
              {articles.slice(0, isShowingAll ? articles.length : 3).map((article, idx) => (
                <li key={idx} className="mb-1">
                  <Link to="/article" state={{ article }} className="hover:underline">
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>

            {articles.length > 3 && (
              <button
                className="bg-gray-200 px-4 py-1 rounded-2xl text-sm hover:bg-gray-300"
                onClick={() => toggleShow(category)}
              >
                {isShowingAll ? 'Show less' : 'Show more...'}
              </button>
            )}
          </div>
        );
      })}
    </section>
  );
}

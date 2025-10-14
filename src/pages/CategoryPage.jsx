import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNewsByCategory } from '../utils/newsApi';
import NavBar from '../components/NavBar';
import FooterSection from '../components/FooterSection';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadCategoryNews = async () => {
      try {
        const data = await fetchNewsByCategory({ category: categoryName, country: 'us', pageSize: 10 });
        console.log("Fetched category data:", data);
        setArticles(data);
      } catch (error) {
        console.error('Failed to load category news:', error);
      }
    };

    loadCategoryNews();
  }, [categoryName]);

  return (
    <div className='font-sans text-gray-900'>
      <NavBar />

      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 capitalize">{categoryName} News</h2>

          {articles.length === 0 ? (
            <p className="text-gray-500">No news available in this category.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
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
                      className="w-full h-52 object-cover rounded-t-lg"
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

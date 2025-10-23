import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchNewsByKeyword } from "../utils/newsApi";

export default function ReadNext() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadKeywordNews = async () => {
      try {
        const data = await fetchNewsByKeyword("apple", 2);
        setArticles(data);
      }
      catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    loadKeywordNews();
  }, []);

  return (
    <section className="px-6 py-10">
      <h2 className="text-xl font-semibold mb-4">Read next</h2>

      <div className="grid grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <Link
            key={index}
            to="/article"
            state={{ article }}
            className="group flex flex-col"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="mt-3">
              <h3 className="text-sm font-bold leading-snug group-hover:underline">
                {article.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                {article.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

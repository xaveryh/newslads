import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FooterSection from "../components/FooterSection";
import NavBar from "../components/NavBar";
import { fetchNewsByCategory } from "../utils/newsApi";

export default function ArticlePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    if (!article) {
      navigate("/");
      return;
    }

    const loadRelated = async () => {
      try {
        const data = await fetchNewsByCategory({
          category: article.category || "general",
          count: 6,
        });

        const filtered = data.filter(a => a.title !== article.title);
        setRelatedArticles(filtered);
      }
      catch (err) {
        console.error("Failed to load related news:", err);
      }
    };

    loadRelated();
  }, [article, navigate]);

  if (!article)
    return null;

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toISOString().split("T")[0]
    : "Unknown Date";

  return (
    <div className="font-sans text-gray-900">
      <NavBar />
      <div className="px-6 md:px-24 lg:px-40 py-8 space-y-6">
        <h1 className="text-3xl font-bold leading-tight mb-4">{article.title}</h1>

        <p className="text-sm text-gray-500 italic" id="author-and-date">
          {article.author || "Unknown Author"}
          {" "}
          —
          {formattedDate}
        </p>

        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-40 object-cover"
          />
        )}

        <div className="prose max-w-none leading-relaxed text-gray-800 space-y-4">
          {article.content
            && article.content
              .replace(/\[\+\d+\schars\]/g, "")
              .split(/\n{2,}|(?<=\.)\s{2,}/)
              .map((paragraph, idx) => (
                <p key={idx} className="text-base text-gray-800 leading-7">
                  {paragraph.trim()}
                </p>
              ))}

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-blue-600 hover:text-blue-800 underline"
          >
            Read full article on original source →
          </a>
        </div>

        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Related articles or posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedArticles.map((item, index) => (
                <div
                  key={index}
                  onClick={() => navigate("/article", { state: { article: item } })}
                  className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-200"
                >
                  {item.urlToImage && (
                    <img
                      src={item.urlToImage}
                      alt={item.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <FooterSection />
    </div>
  );
}

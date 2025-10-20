import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/NavBar';
import Footer from '../components/FooterSection';
import { Link } from 'react-router-dom';

const RSSFeeds = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasFollowed, setHasFollowed] = useState(true);

  useEffect(() => {
    const fetchAllFeeds = async () => {
      const followedSources = JSON.parse(localStorage.getItem('followedRss')) || [];

      if (followedSources.length === 0) {
        setHasFollowed(false);
        setLoading(false);
        return;
      }

      setHasFollowed(true);
      setLoading(true);

      try {
        const responses = await Promise.all(
          followedSources.map(async (url) => {
            const response = await axios.get('https://api.rss2json.com/v1/api.json', {
              params: { rss_url: url },
            });
            return response.data.items;
          })
        );

        const allArticles = responses.flat().sort(
          (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
        );

        setArticles(allArticles);
      } catch (err) {
        console.error('Error fetching RSS feeds:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllFeeds();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Your News Feed</h2>

        {loading ? (
          <p>Loading your news...</p>
        ) : !hasFollowed ? (
          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">
              You haven’t followed any RSS channels yet.
            </p>
            <Link
              to="/rss"
              className="bg-black text-white px-6 py-2 rounded-2xl hover:bg-gray-800 mr-2"
            >
              Go to Channels
            </Link>
          </div>
        ) : articles.length === 0 ? (
          <p className="text-gray-600">No new articles found from your followed channels.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((article, index) => (
              <a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border rounded-lg p-4 hover:shadow-md transition bg-white"
              >
                {article.thumbnail && (
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold mb-1">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  {new Date(article.pubDate).toLocaleString()}
                </p>
                <p className="text-sm text-gray-800 line-clamp-3">
                  {article.description?.replace(/<[^>]+>/g, '')}
                </p>
              </a>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RSSFeeds;

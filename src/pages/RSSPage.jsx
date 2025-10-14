import React, { useEffect, useState } from 'react';
import { fetchRSSFeed } from '../utils/rssClients';
import NavBar from '../components/NavBar';
import Footer from '../components/FooterSection';

const RssPage = () => {
  const [rssItems, setRssItems] = useState([]);

  useEffect(() => {
    const loadFeed = async () => {
      const feedUrl = 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml';
      const items = await fetchRSSFeed(feedUrl);
      setRssItems(items);
    };
    loadFeed();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <NavBar />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 border-b pb-4">Latest News from RSS</h1>

        {rssItems.length === 0 ? (
          <p className="text-center text-gray-500">Loading feed...</p>
        ) : (
          <div className="space-y-6">
            {rssItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-6"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(item.pubDate).toLocaleString()}
                </p>
                {item.description && (
                  <p className="mt-3 text-gray-700 line-clamp-3">
                    {item.description.replace(/(<([^>]+)>)/gi, '').slice(0, 150)}...
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default RssPage;

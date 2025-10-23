import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/FooterSection";
import Header from "../components/NavBar";

const rssChannels = [
  {
    name: "BBC",
    url: "http://feeds.bbci.co.uk/news/rss.xml",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/BBC_Logo_2021.svg/560px-BBC_Logo_2021.svg.png?20230729093433",
  },
  {
    name: "CNN",
    url: "http://rss.cnn.com/rss/edition.rss",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg",
  },
  {
    name: "NYTimes",
    url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg",
  },
  {
    name: "The Verge",
    url: "https://www.theverge.com/rss/index.xml",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/The_Verge_Logo_2016.svg/220px-The_Verge_Logo_2016.svg.png?20161102144655",
  },
  {
    name: "Engadget",
    url: "https://www.engadget.com/rss.xml",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Engadget-logo.svg/120px-Engadget-logo.svg.png",
  },
  {
    name: "Wired",
    url: "https://www.wired.com/feed/rss",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Wired_logo.svg/512px-Wired_logo.svg.png?20240209182746",
  },
  {
    name: "TechCrunch",
    url: "http://feeds.feedburner.com/TechCrunch/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TechCrunch_logo.svg/180px-TechCrunch_logo.svg.png?20171108145816",
  },
  {
    name: "NPR News",
    url: "https://feeds.npr.org/1001/rss.xml",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/National_Public_Radio_logo.svg/159px-National_Public_Radio_logo.svg.png?20120509022502",
  },
];

function RSSPage() {
  const [followed, setFollowed] = useState(() => {
    const stored = localStorage.getItem("followedRss");
    return stored ? JSON.parse(stored) : [];
  });

  const toggleFollow = (url) => {
    const updated = followed.includes(url)
      ? followed.filter(item => item !== url)
      : [...followed, url];
    setFollowed(updated);
    localStorage.setItem("followedRss", JSON.stringify(updated));
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">RSS Channels</h1>
          <Link
            to="/feed"
            className="bg-black text-white px-6 py-2 rounded-2xl hover:bg-gray-800 mr-2"
            id="view-feed"
          >
            View My Feed
          </Link>
        </div>
        <div className="space-y-4" id="rss-channels">
          {rssChannels.map(channel => (
            <div
              key={channel.url}
              className="flex items-center justify-between border rounded p-4 bg-white shadow-md"
              id={`${channel.name}-channel`}
            >
              <div className="flex items-center space-x-4">
                <img src={channel.logo} alt={`${channel.name} logo`} className="w-10 h-10 object-contain" />
                <div>
                  <p className="font-semibold">{channel.name}</p>
                  <p className="text-sm text-gray-500">{channel.url}</p>
                </div>
              </div>
              <button
                onClick={() => toggleFollow(channel.url)}
                className={`px-6 py-2 rounded-2xl text-white transition ${
                  followed.includes(channel.url)
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                {followed.includes(channel.url) ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RSSPage;

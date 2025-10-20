import axios from "axios";

export async function fetchRSSFeed(rssUrl) {
  const proxyUrl = "https://api.rss2json.com/v1/api.json?rss_url=";

  try {
    const response = await axios.get(`${proxyUrl}${encodeURIComponent(rssUrl)}`);
    return response.data.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description,
    }));
  }
  catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
}

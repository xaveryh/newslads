import axios from 'axios';

export const fetchRssFromUrl = async (rssUrl) => {
    try {
        const res = await axios.get(`https://api.rss2json.com/v1/api.json`, {
            params: { rss_url: rssUrl },
        });
        return res.data.items;
    } catch (err) {
        console.error('Failed to fetch RSS feed:', err);
        return [];
    }
};
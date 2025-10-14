import axios from 'axios';

export const BASE_URL = 'https://newsapi.org/v2';
export const NEWS_API_KEY = '';

export const fetchTopHeadlines = async ({ country, category = 'general', pageSize = 10 } = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country,
        category,
        pageSize,
        apiKey: NEWS_API_KEY
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    return [];
  }
};

export const fetchNewsByCategory = async ({ category, country, pageSize = 3 }) => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country,
        category,
        pageSize,
        apiKey: NEWS_API_KEY
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    return [];
  }
};

export const fetchNewsByKeyword = async (keyword, pageSize = 4, sortBy = 'publishedAt') => {
  const url = `${BASE_URL}/everything?q=${encodeURIComponent(keyword)}&pageSize=${pageSize}&sortBy=${sortBy}&apiKey=${NEWS_API_KEY}`;
  const res = await axios.get(url);
  return res.data.articles;
};

export const fetchNewsBySearch = async (query, pageSize = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        pageSize,
        sortBy: 'publishedAt',
        language: 'en',
        apiKey: NEWS_API_KEY,
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};


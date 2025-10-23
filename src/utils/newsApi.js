import axios from "axios";

export const BASE_URL = "https://eventregistry.org/api/v1";
export const NEWS_API_AI_KEY = import.meta.env.VITE_NEWS_API_TOKEN;

async function callNewsApiAi(endpoint, params = {}) {
  console.log(import.meta.env);
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        apiKey: NEWS_API_AI_KEY,
        ...params,
      },
    });
    return response.data;
  }
  catch (error) {
    console.error(`Error calling NewsAPI.ai (${endpoint}):`, error.response?.data || error.message);
    return null;
  }
}

function normalizeArticle(article) {
  return {
    title: article.title || "",
    description: article.body || article.summary || "",
    content: article.body || "",
    url: article.url || "",
    urlToImage: article.image?.url || article.image || null,
    author: article.authors?.[0]?.name || article.source?.title || "Unknown Author",
    publishedAt: article.dateTimePub || article.date || null,
    category: article.concepts?.[0]?.label?.eng || "general",
  };
}

export async function fetchTopHeadlines({ keyword = "", lang = "eng", count = 10 } = {}) {
  try {
    const data = await callNewsApiAi("article/getArticles", {
      keyword,
      lang,
      articlesCount: count,
      sortBy: "date",
    });

    const articles = data?.articles?.results || [];
    return articles.map(normalizeArticle);
  }
  catch (error) {
    console.error("Error fetching top headlines:", error);
    return [];
  }
}

export async function fetchNewsByCategory({
  category,
  lang = "eng",
  count = 10,
  countryUri,
  date,
}) {
  try {
    const params = {
      keyword: category,
      lang,
      articlesCount: 50,
      sortBy: "date",
    };

    if (countryUri) {
      params.sourceLocationUri = countryUri;
    }

    if (date) {
      params.dateStart = date;
      params.dateEnd = date;
    }

    const data = await callNewsApiAi("article/getArticles", params);
    const articles = data?.articles?.results || [];

    return articles.slice(0, count).map(normalizeArticle);
  }
  catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    return [];
  }
}

export async function fetchNewsByKeyword(keyword, count = 5, sortBy = "date") {
  try {
    const data = await callNewsApiAi("article/getArticles", {
      keyword,
      articlesCount: count,
      sortBy,
    });

    const articles = data?.articles?.results || [];
    return articles.map(normalizeArticle);
  }
  catch (error) {
    console.error("Error fetching keyword news:", error);
    return [];
  }
}

export async function fetchNewsBySearch(query, count = 10) {
  try {
    const data = await callNewsApiAi("article/getArticles", {
      keyword: query,
      articlesCount: count,
      sortBy: "date",
      lang: "eng",
    });

    const articles = data?.articles?.results || [];
    return articles.map(normalizeArticle);
  }
  catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
}

export async function fetchAvailableCategories() {
  try {
    const data = await callNewsApiAi("concept/getConceptTypeList", {});
    return data?.conceptTypes || [];
  }
  catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

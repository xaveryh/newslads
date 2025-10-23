import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CategoryPage from "./CategoryPage";

jest.mock("../components/NavBar", () => () => <div data-testid="navbar" />);
jest.mock("../components/FooterSection", () => () => <div data-testid="footer" />);

const mockFetchNewsByCategory = jest.fn();
jest.mock("../utils/newsApi", () => ({
  fetchNewsByCategory: (...args) => mockFetchNewsByCategory(...args),
}));

let mockCategoryName = "technology";
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return { ...actual, useParams: () => ({ categoryName: mockCategoryName }) };
});

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[`/category/${mockCategoryName}`]}>
      <CategoryPage />
    </MemoryRouter>,
  );
}

describe("categoryPage", () => {
  beforeEach(() => {
    mockFetchNewsByCategory.mockReset();
    mockCategoryName = "technology";
  });

  it("fetches and lists articles for the category", async () => {
    const articles = [
      { title: "Tech Story One", description: "desc1", urlToImage: "https://img/1.jpg" },
      { title: "Tech Story Two", description: "desc2" },
    ];
    mockFetchNewsByCategory.mockResolvedValueOnce(articles);

    renderPage();

    expect(screen.getByRole("heading", { name: /technology\s+news/i })).toBeInTheDocument();

    expect(await screen.findByRole("link", { name: /tech story one/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /tech story two/i })).toHaveAttribute("href", "/article");

    expect(mockFetchNewsByCategory).toHaveBeenCalledWith(
      expect.objectContaining({
        category: "technology",
        countryUri: expect.stringContaining("wikipedia.org/wiki/"),
        date: expect.any(String),
        lang: expect.any(String),
        count: expect.any(Number),
      }),
    );
  });

  it("shows empty state for no articles", async () => {
    mockFetchNewsByCategory.mockResolvedValueOnce([]);

    renderPage();

    expect(
      await screen.findByText(/no news available for selected filters\./i),
    ).toBeInTheDocument();
  });

  it("re-fetches when the category param changes", async () => {
    mockFetchNewsByCategory.mockResolvedValueOnce([{ title: "Tech Story One" }]);
    const { rerender } = render(
      <MemoryRouter initialEntries={[`/category/${mockCategoryName}`]}>
        <CategoryPage />
      </MemoryRouter>,
    );

    await screen.findByRole("link", { name: /tech story one/i });

    mockCategoryName = "sports";
    mockFetchNewsByCategory.mockResolvedValueOnce([{ title: "Sports Story A" }]);

    rerender(
      <MemoryRouter initialEntries={[`/category/${mockCategoryName}`]}>
        <CategoryPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /sports\s+news/i })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: /sports story a/i })).toBeInTheDocument();

    expect(mockFetchNewsByCategory).toHaveBeenLastCalledWith(
      expect.objectContaining({
        category: "sports",
        countryUri: expect.any(String),
        date: expect.any(String),
        lang: expect.any(String),
        count: expect.any(Number),
      }),
    );
  });
});

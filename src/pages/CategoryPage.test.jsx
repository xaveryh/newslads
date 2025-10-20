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
  return {
    ...actual,
    useParams: () => ({ categoryName: mockCategoryName }),
  };
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

    expect(screen.getByRole("heading", { name: /technology news/i })).toBeInTheDocument();

    expect(await screen.findByRole("link", { name: /tech story one/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /tech story one/i })).toHaveAttribute("href", "/article");
    expect(screen.getByRole("link", { name: /tech story two/i })).toHaveAttribute("href", "/article");

    expect(mockFetchNewsByCategory).toHaveBeenCalledWith({
      category: "technology",
      country: "us",
      pageSize: 10,
    });
  });

  it("shows empty state when API returns no articles", async () => {
    mockFetchNewsByCategory.mockResolvedValueOnce([]);

    renderPage();

    expect(
      await screen.findByText(/no news available in this category\./i),
    ).toBeInTheDocument();
  });

  it("re-fetches when the category param changes", async () => {
    mockFetchNewsByCategory.mockResolvedValueOnce([
      { title: "Tech Story One", description: "desc1" },
    ]);
    const { rerender } = render(
      <MemoryRouter initialEntries={[`/category/${mockCategoryName}`]}>
        <CategoryPage />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("link", { name: /tech story one/i })).toBeInTheDocument();

    mockCategoryName = "sports";
    mockFetchNewsByCategory.mockResolvedValueOnce([
      { title: "Sports Story A", description: "sdesc" },
    ]);

    rerender(
      <MemoryRouter initialEntries={[`/category/${mockCategoryName}`]}>
        <CategoryPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /sports news/i })).toBeInTheDocument();

    expect(await screen.findByRole("link", { name: /sports story a/i })).toBeInTheDocument();

    expect(mockFetchNewsByCategory).toHaveBeenLastCalledWith({
      category: "sports",
      country: "us",
      pageSize: 10,
    });
  });
});

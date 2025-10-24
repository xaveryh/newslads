import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ArticlePage from "./ArticlePage";

jest.mock("../components/NavBar", () => () => <div data-testid="navbar" />);
jest.mock("../components/FooterSection", () => () => <div data-testid="footer" />);

const mockFetchNewsByCategory = jest.fn();
const mockFetchTopHeadlines = jest.fn();

jest.mock("../utils/newsApi", () => ({
  fetchNewsByCategory: (...args) => mockFetchNewsByCategory(...args),
  fetchTopHeadlines: (...args) => mockFetchTopHeadlines(...args),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

const mockArticle = {
  title: "Main Article",
  author: "Alice",
  content: "main content",
  url: "https://main",
  publishedAt: "2025-10-21",
  urlToImage: "main.jpg",
  category: "tech",
};

function renderWithArticle(article = mockArticle) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: "/article", state: { article } }]}>
      <ArticlePage />
    </MemoryRouter>,
  );
}

function renderWithNoArticleState() {
  return render(
    <MemoryRouter initialEntries={[{ pathname: "/article" }]}>
      <ArticlePage />
    </MemoryRouter>,
  );
}

describe("articlePage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockFetchNewsByCategory.mockReset();
  });

  it("renders main article content", async () => {
    mockFetchNewsByCategory.mockResolvedValueOnce([
      { title: "A1", description: "desc1" },
      { title: "A2", description: "desc2" },
    ]);

    renderWithArticle();

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByText(/Main Article/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/main content/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /read full article on original source/i }),
    ).toHaveAttribute("href", "https://main");

    expect(await screen.findByText("A2")).toBeInTheDocument();
  });

  it("renders related articles and navigates on click", async () => {
    mockFetchNewsByCategory.mockResolvedValueOnce([
      { title: "A1", description: "d1" },
      { title: "A2", description: "d2" },
    ]);

    renderWithArticle();

    const related = await screen.findByText("A2");
    await userEvent.click(related);

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/article", {
        state: { article: expect.objectContaining({ title: "A2" }) },
      }),
    );
  });

  it("returns null and redirects when no article is passed", async () => {
    const { container } = renderWithNoArticleState();
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/"));
    expect(container.firstChild).toBeNull();
  });
});

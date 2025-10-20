import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SearchPage from "./SearchPage";

jest.mock("../components/NavBar", () => () => <div data-testid="navbar" />);
jest.mock("../components/FooterSection", () => () => <div data-testid="footer" />);

const mockFetchNewsBySearch = jest.fn();
jest.mock("../utils/newsApi", () => ({
  fetchNewsBySearch: (...args) => mockFetchNewsBySearch(...args),
}));

function renderPage() {
  return render(
    <MemoryRouter>
      <SearchPage />
    </MemoryRouter>,
  );
}

describe("searchPage", () => {
  beforeEach(() => {
    mockFetchNewsBySearch.mockReset();
  });

  it("shows 'No results found.' initially", () => {
    renderPage();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByText(/no results found\./i)).toBeInTheDocument();
  });

  it("submits a query and renders results", async () => {
    const articles = [
      { title: "Result for hello", description: "desc", urlToImage: "https://img/1.jpg" },
      { title: "Another result", description: "more desc" },
    ];
    mockFetchNewsBySearch.mockResolvedValueOnce(articles);

    renderPage();

    await userEvent.type(screen.getByPlaceholderText(/search news/i), "hello");
    await userEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(
      await screen.findByRole("link", { name: /result for hello/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /result for hello/i })).toHaveAttribute("href", "/article");
    expect(screen.getByRole("link", { name: /another result/i })).toHaveAttribute("href", "/article");

    expect(mockFetchNewsBySearch).toHaveBeenCalledWith("hello");
  });

  it("shows 'No results found.' when the API returns an empty list", async () => {
    mockFetchNewsBySearch.mockResolvedValueOnce([]);

    renderPage();
    await userEvent.type(screen.getByPlaceholderText(/search news/i), "zzz");
    await userEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(await screen.findByText(/no results found\./i)).toBeInTheDocument();
  });
});

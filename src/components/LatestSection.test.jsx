import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LatestSection from "./LatestSection";

const mockFetchTopHeadlines = jest.fn();
jest.mock("../utils/newsApi", () => ({
  fetchTopHeadlines: (...args) => mockFetchTopHeadlines(...args),
}));

function renderSection() {
  return render(
    <MemoryRouter>
      <LatestSection />
    </MemoryRouter>,
  );
}

describe("latestSection", () => {
  beforeEach(() => {
    mockFetchTopHeadlines.mockReset();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("loads headlines and shows only 3 cards initially with a Show more button", async () => {
    const articles = [
      { title: "A1", description: "d1", urlToImage: "https://img/1.jpg" },
      { title: "A2", description: "d2" },
      { title: "A3", description: "d3" },
      { title: "A4", description: "d4" },
      { title: "A5", description: "d5" },
    ];
    mockFetchTopHeadlines.mockResolvedValueOnce(articles);

    renderSection();

    expect(screen.getByRole("heading", { name: /latest headlines/i })).toBeInTheDocument();

    expect(await screen.findByRole("link", { name: /a1/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /a1/i })).toHaveAttribute("href", "/article");
    expect(screen.getByRole("link", { name: /a2/i })).toHaveAttribute("href", "/article");
    expect(screen.getByRole("link", { name: /a3/i })).toHaveAttribute("href", "/article");
    expect(screen.queryByRole("link", { name: /a4/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /a5/i })).toBeNull();

    const toggleBtn = screen.getByRole("button", { name: /show more/i });
    expect(toggleBtn).toBeInTheDocument();
  });

  it("expands to show all items when clicking 'Show more...' and collapses back with 'Show less'", async () => {
    const articles = [
      { title: "A1", description: "d1" },
      { title: "A2", description: "d2" },
      { title: "A3", description: "d3" },
      { title: "A4", description: "d4" },
    ];
    mockFetchTopHeadlines.mockResolvedValueOnce(articles);

    renderSection();

    await screen.findByRole("link", { name: /a1/i });

    await userEvent.click(screen.getByRole("button", { name: /show more/i }));
    expect(screen.getByRole("link", { name: /a4/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show less/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /show less/i }));
    expect(screen.queryByRole("link", { name: /a4/i })).toBeNull();
    expect(screen.getByRole("button", { name: /show more/i })).toBeInTheDocument();
  });

  it("hides the toggle button when API returns 3 or fewer items", async () => {
    const articles = [
      { title: "Only 1", description: "d1" },
      { title: "Only 2", description: "d2" },
      { title: "Only 3", description: "d3" },
    ];
    mockFetchTopHeadlines.mockResolvedValueOnce(articles);

    renderSection();

    await screen.findByRole("link", { name: /only 1/i });

    expect(screen.getByRole("link", { name: /only 3/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /show more/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /show less/i })).toBeNull();
  });

  it("logs an error and renders no cards when API returns a non-array shape", async () => {
    mockFetchTopHeadlines.mockResolvedValueOnce({ articles: [] });

    renderSection();

    await screen.findByRole("heading", { name: /latest headlines/i });
    expect(console.error).toHaveBeenCalledWith(
      "Unexpected API response:",
      expect.objectContaining({ articles: [] }),
    );

    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.queryByRole("button", { name: /show more/i })).toBeNull();
  });
});

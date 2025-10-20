import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RSSPage from "./RSSPage";

jest.mock("../components/NavBar", () => () => <div data-testid="navbar" />);
jest.mock("../components/FooterSection", () => () => <div data-testid="footer" />);

const mockFetchRSSFeed = jest.fn();
jest.mock("../utils/rssClients", () => ({
  fetchRSSFeed: (...args) => mockFetchRSSFeed(...args),
}));

const FEED_URL = "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";

function renderPage() {
  return render(
    <MemoryRouter>
      <RSSPage />
    </MemoryRouter>,
  );
}

describe("rSSPage", () => {
  beforeEach(() => {
    mockFetchRSSFeed.mockReset();
  });

  it("shows loading then renders feed items", async () => {
    mockFetchRSSFeed.mockResolvedValueOnce([
      {
        title: "Top Headline",
        link: "https://example.com/top",
        pubDate: "2025-10-21T10:00:00Z",
        description: "Plain description text.",
      },
      {
        title: "Second Story",
        link: "https://example.com/second",
        pubDate: "2025-10-21T11:00:00Z",
        description: "<p>With <b>HTML</b> tags</p>",
      },
    ]);

    renderPage();

    expect(screen.getByText(/loading feed/i)).toBeInTheDocument();
    expect(mockFetchRSSFeed).toHaveBeenCalledWith(FEED_URL);

    const firstLink = await screen.findByRole("link", { name: /top headline/i });
    expect(firstLink).toHaveAttribute("href", "https://example.com/top");
    expect(screen.getByRole("link", { name: /second story/i })).toHaveAttribute(
      "href",
      "https://example.com/second",
    );

    await waitFor(() => {
      expect(screen.queryByText(/loading feed/i)).toBeNull();
    });
  });

  it("strips HTML and truncates description with ellipsis", async () => {
    mockFetchRSSFeed.mockResolvedValueOnce([
      {
        title: "HTML Story",
        link: "https://example.com/html",
        pubDate: "2025-10-21T12:00:00Z",
        description: "<div>Hello <b>world</b> & more</div>",
      },
    ]);

    renderPage();

    await screen.findByRole("link", { name: /html story/i });
    expect(screen.getByText(/hello world & more\.\.\.$/i)).toBeInTheDocument();
    expect(screen.queryByText(/<b>world<\/b>/i)).toBeNull();
  });

  it("keeps 'Loading feed...' when API returns an empty list", async () => {
    mockFetchRSSFeed.mockResolvedValueOnce([]);

    renderPage();

    await waitFor(() => expect(mockFetchRSSFeed).toHaveBeenCalledWith(FEED_URL));

    expect(screen.getByText(/loading feed/i)).toBeInTheDocument();

    expect(screen.queryByRole("link", { name: /./ })).toBeNull();
  });
});

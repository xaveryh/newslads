import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RSSPage from "./RSSPage";

jest.mock("../components/NavBar", () => () => <div data-testid="navbar" />);
jest.mock("../components/FooterSection", () => () => <div data-testid="footer" />);

function renderPage() {
  return render(
    <MemoryRouter>
      <RSSPage />
    </MemoryRouter>,
  );
}

describe("rSSPage (channels directory)", () => {
  it("shows heading and 'View My Feed' link", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: /rss channels/i })).toBeInTheDocument();
    const view = screen.getByRole("link", { name: /view my feed/i });
    expect(view).toHaveAttribute("href", "/feed");
  });

  it("renders all predefined channels with Follow buttons", () => {
    renderPage();

    const channels = [
      { name: "BBC", url: "http://feeds.bbci.co.uk/news/rss.xml" },
      { name: "CNN", url: "http://rss.cnn.com/rss/edition.rss" },
      { name: "NYTimes", url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml" },
      { name: "The Verge", url: "https://www.theverge.com/rss/index.xml" },
      { name: "Engadget", url: "https://www.engadget.com/rss.xml" },
      { name: "Wired", url: "https://www.wired.com/feed/rss" },
      { name: "TechCrunch", url: "http://feeds.feedburner.com/TechCrunch/" },
      { name: "NPR News", url: "https://feeds.npr.org/1001/rss.xml" },
    ];

    channels.forEach(({ name, url }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(url)).toBeInTheDocument();
      expect(screen.getAllByRole("button", { name: /follow/i }).length).toBeGreaterThanOrEqual(1);
    });
  });
});

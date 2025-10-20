import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ReadNext from "./ReadNext";

const mockFetchNewsByKeyword = jest.fn();
jest.mock("../utils/newsApi", () => ({
  fetchNewsByKeyword: (...args) => mockFetchNewsByKeyword(...args),
}));

function renderReadNext() {
  return render(
    <MemoryRouter>
      <ReadNext />
    </MemoryRouter>,
  );
}

describe("readNext", () => {
  beforeEach(() => {
    mockFetchNewsByKeyword.mockReset();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches keyword news on mount and renders articles", async () => {
    const articles = [
      {
        title: "Apple unveils new iPhone",
        description: "Latest iPhone model announced",
        urlToImage: "https://img.apple.com/iphone.jpg",
      },
      {
        title: "Apple’s AI push",
        description: "New machine learning updates",
      },
    ];
    mockFetchNewsByKeyword.mockResolvedValueOnce(articles);

    renderReadNext();

    expect(mockFetchNewsByKeyword).toHaveBeenCalledWith("apple", 2);

    const first = await screen.findByRole("link", {
      name: /apple unveils new iphone/i,
    });
    expect(first).toHaveAttribute("href", "/article");

    expect(screen.getByRole("link", { name: /apple’s ai push/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /read next/i })).toBeInTheDocument();
  });

  it("renders images only when urlToImage exists", async () => {
    mockFetchNewsByKeyword.mockResolvedValueOnce([
      {
        title: "Apple Event",
        description: "Some desc",
        urlToImage: "https://example.com/a.jpg",
      },
      {
        title: "No Image Article",
        description: "desc",
      },
    ]);

    renderReadNext();

    await screen.findByText(/apple event/i);
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(1);
    expect(imgs[0]).toHaveAttribute("src", "https://example.com/a.jpg");
  });

  it("handles API errors gracefully", async () => {
    mockFetchNewsByKeyword.mockRejectedValueOnce(new Error("Network error"));

    renderReadNext();

    await screen.findByRole("heading", { name: /read next/i });

    expect(console.error).toHaveBeenCalledWith(
      "Error fetching news:",
      expect.any(Error),
    );

    expect(screen.queryByRole("link")).toBeNull();
  });
});

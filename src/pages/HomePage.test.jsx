import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

jest.mock("../components/NavBar", () => () => <div data-testid="navbar" />);
jest.mock("../components/TopSection", () => () => <div data-testid="top" />);
jest.mock("../components/LatestSection", () => () => <div data-testid="latest" />);
jest.mock("../components/CategorySection", () => () => <div data-testid="category" />);
jest.mock("../components/ReadNext", () => () => <div data-testid="readnext" />);
jest.mock("../components/FooterSection", () => () => <div data-testid="footer" />);

describe("homePage", () => {
  it("renders all main sections", () => {
    render(<HomePage />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("top")).toBeInTheDocument();
    expect(screen.getByTestId("latest")).toBeInTheDocument();
    expect(screen.getByTestId("category")).toBeInTheDocument();
    expect(screen.getByTestId("readnext")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders sections in the expected order", () => {
    const { container } = render(<HomePage />);

    const order = Array.from(container.querySelectorAll("[data-testid]")).map(
      el => el.getAttribute("data-testid"),
    );

    expect(order).toEqual(["navbar", "top", "latest", "category", "readnext", "footer"]);
  });
});

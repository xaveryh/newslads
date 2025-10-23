import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategorySection from "./CategorySection";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

describe("categorySection", () => {
  beforeEach(() => mockNavigate.mockClear());

  it("renders heading and all category buttons with capitalized labels", () => {
    render(<CategorySection />);

    expect(
      screen.getByRole("heading", { name: /browse by category/i }),
    ).toBeInTheDocument();

    const expected = [
      "Business",
      "Entertainment",
      "General",
      "Health",
      "Science",
      "Sports",
      "Technology",
    ];

    expected.forEach((label) => {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    });
  });

  it("navigates to the selected category when a button is clicked", async () => {
    render(<CategorySection />);

    await userEvent.click(screen.getByRole("button", { name: "Science" }));
    expect(mockNavigate).toHaveBeenCalledWith("/category/science");

    await userEvent.click(screen.getByRole("button", { name: "Business" }));
    expect(mockNavigate).toHaveBeenCalledWith("/category/business");
  });
});

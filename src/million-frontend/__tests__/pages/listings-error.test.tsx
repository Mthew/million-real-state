import { render, screen, fireEvent } from "@testing-library/react";
import ListingsError from "@/app/listings/error";

describe("ListingsError Component", () => {
  const mockError = new Error("Test error message");
  const mockReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console.error to avoid cluttering test output
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("renders error message and components", () => {
    render(<ListingsError error={mockError} reset={mockReset} />);

    expect(screen.getByText("Something Went Wrong")).toBeTruthy();
    expect(
      screen.getByText(/We were unable to load the property listings/)
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: /try again/i })).toBeTruthy();
  });

  it("displays error icon", () => {
    const { container } = render(
      <ListingsError error={mockError} reset={mockReset} />
    );

    // Check for the AlertTriangle icon
    const alertIcon = container.querySelector("svg");
    expect(alertIcon).toBeTruthy();
  });

  it("calls reset function when Try Again button is clicked", () => {
    render(<ListingsError error={mockError} reset={mockReset} />);

    const tryAgainButton = screen.getByRole("button", { name: /try again/i });
    fireEvent.click(tryAgainButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("logs error to console on component mount", () => {
    render(<ListingsError error={mockError} reset={mockReset} />);

    expect(console.error).toHaveBeenCalledWith(
      "Listings Page Error:",
      mockError
    );
  });

  it("applies correct styling and layout", () => {
    const { container } = render(
      <ListingsError error={mockError} reset={mockReset} />
    );

    const errorContainer = container.querySelector(".bg-gray-50");
    expect(errorContainer).toBeTruthy();
    expect(errorContainer).toHaveClass("border-red-200");

    const mainContainer = container.querySelector(".container");
    expect(mainContainer).toBeTruthy();
  });

  it("renders responsive design classes", () => {
    const { container } = render(
      <ListingsError error={mockError} reset={mockReset} />
    );

    const errorContent = container.querySelector(".min-h-\\[400px\\]");
    expect(errorContent).toBeTruthy();
  });

  it("handles error with digest property", () => {
    const errorWithDigest = Object.assign(mockError, { digest: "abc123" });

    render(<ListingsError error={errorWithDigest} reset={mockReset} />);

    expect(console.error).toHaveBeenCalledWith(
      "Listings Page Error:",
      errorWithDigest
    );
  });
});

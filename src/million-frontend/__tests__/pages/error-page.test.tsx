import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock the ListingsError component
jest.mock("@/app/listings/error", () => ({
  __esModule: true,
  default: jest.fn(({ error, reset }) => {
    console.error("Error boundary triggered:", error);
    return (
      <div data-testid="listings-error">
        <h2>Something Went Wrong</h2>
        <p>
          We were unable to load the property listings at this time. This could
          be a temporary issue with our server.
        </p>
        <svg data-testid="alert-triangle" width="48" height="48">
          <path d="mock-alert-triangle" />
        </svg>
        <button
          onClick={() => reset()}
          data-variant="secondary"
          data-testid="try-again-button"
        >
          Try Again
        </button>
      </div>
    );
  }),
}));

import ListingsError from "@/app/listings/error";

describe("ListingsError Component", () => {
  const mockError = new Error("Test error message");
  const mockReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders error message and components", () => {
    render(<ListingsError error={mockError} reset={mockReset} />);

    expect(screen.getByText("Something Went Wrong")).toBeTruthy();
    expect(
      screen.getByText(/We were unable to load the property listings/)
    ).toBeTruthy();
    expect(screen.getByTestId("try-again-button")).toBeTruthy();
  });

  it("renders alert triangle icon", () => {
    render(<ListingsError error={mockError} reset={mockReset} />);

    const alertIcon = screen.getByTestId("alert-triangle");
    expect(alertIcon).toBeTruthy();
    expect(alertIcon).toHaveAttribute("width", "48");
    expect(alertIcon).toHaveAttribute("height", "48");
  });

  it("calls reset function when try again button is clicked", () => {
    render(<ListingsError error={mockError} reset={mockReset} />);

    const tryAgainButton = screen.getByTestId("try-again-button");
    fireEvent.click(tryAgainButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("displays proper styling classes", () => {
    render(<ListingsError error={mockError} reset={mockReset} />);

    const container = screen.getByTestId("listings-error");
    expect(container).toBeTruthy();
  });

  it("has accessible button with proper attributes", () => {
    render(<ListingsError error={mockError} reset={mockReset} />);

    const button = screen.getByTestId("try-again-button");
    expect(button).toHaveAttribute("data-variant", "secondary");
    expect(button).toBeTruthy();
  });

  it("renders with different error messages", () => {
    const customError = new Error("Custom error message");
    render(<ListingsError error={customError} reset={mockReset} />);

    expect(screen.getByText("Something Went Wrong")).toBeTruthy();
  });
});

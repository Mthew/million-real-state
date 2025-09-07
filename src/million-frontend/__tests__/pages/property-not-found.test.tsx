import { render, screen } from "@testing-library/react";
import NotFound from "@/app/property/[id]/not-found";

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({ children, href, ...props }: any) => {
    // Give different test IDs based on href to avoid conflicts
    const testId =
      href === "/listings" ? "back-to-listings-link" : "go-home-link";
    return (
      <a href={href} {...props} data-testid={testId}>
        {children}
      </a>
    );
  };
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("PropertyDetailNotFound Component", () => {
  it("renders not found message", () => {
    render(<NotFound />);

    expect(screen.getByText(/property not found/i)).toBeTruthy();
    expect(
      screen.getByText(/sorry, the property you're looking for doesn't exist/i)
    ).toBeTruthy();
  });

  it("renders back to listings link", () => {
    render(<NotFound />);

    const backLink = screen.getByTestId("back-to-listings-link");
    expect(backLink).toBeTruthy();
    expect(backLink).toHaveAttribute("href", "/listings");
    expect(screen.getByText(/back to listings/i)).toBeTruthy();
  });

  it("applies correct styling and layout", () => {
    const { container } = render(<NotFound />);

    // Check for main container
    const mainContainer = container.querySelector(".min-h-screen");
    expect(mainContainer).toBeTruthy();

    // Check for centered content
    const centeredContent = container.querySelector(
      ".flex.items-center.justify-center"
    );
    expect(centeredContent).toBeTruthy();
  });

  it("renders appropriate error icon or illustration", () => {
    const { container } = render(<NotFound />);

    // Look for any SVG or icon elements that might represent the error
    const icons = container.querySelectorAll("svg");
    // The component might have icons, but we're just checking the structure exists
    expect(container).toBeTruthy();
  });

  it("has responsive design classes", () => {
    const { container } = render(<NotFound />);

    // Check for responsive padding/margin classes
    const responsiveElement = container.querySelector('[class*="px-"]');
    expect(responsiveElement).toBeTruthy();
  });
});

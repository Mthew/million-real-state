import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PropertyCard } from "@/components/features/property-card";
import { mockProperties } from "../__mocks__/mockData";

// Mock next/link
jest.mock("next/link", () => {
  const MockedLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid="property-link">
      {children}
    </a>
  );
  MockedLink.displayName = "MockedLink";
  return MockedLink;
});

// Mock next/image
jest.mock("next/image", () => {
  const MockedImage = ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} data-testid="property-image" />
  );
  MockedImage.displayName = "MockedImage";
  return MockedImage;
});

describe("PropertyCard Component", () => {
  const mockProperty = mockProperties[0];

  it("renders property information correctly", () => {
    render(<PropertyCard property={mockProperty} />);

    expect(screen.getByText("Luxury Manhattan Penthouse")).toBeTruthy();
    expect(screen.getByText("$5,000,000")).toBeTruthy();
  });

  it("renders property image with correct attributes", () => {
    render(<PropertyCard property={mockProperty} />);

    const image = screen.getByTestId("property-image");
    expect(image).toBeTruthy();
    expect(image).toHaveAttribute("alt", "Luxury Manhattan Penthouse");
    expect(image).toHaveAttribute("src", "/luxury-penthouse-manhattan.png");
  });

  it("renders as a clickable link to property detail page", () => {
    render(<PropertyCard property={mockProperty} />);

    const link = screen.getByTestId("property-link");
    expect(link).toBeTruthy();
    expect(link).toHaveAttribute("href", "/property/1");
  });

  it("displays formatted price correctly", () => {
    render(<PropertyCard property={mockProperty} />);

    // Should format the price as currency without decimals
    expect(screen.getByText("$5,000,000")).toBeTruthy();
  });

  it("handles property with fallback image", () => {
    const propertyWithoutImage = { ...mockProperty, imageUrl: "" };
    render(<PropertyCard property={propertyWithoutImage} />);

    const image = screen.getByTestId("property-image");
    expect(image).toHaveAttribute("src", "/placeholder.svg");
  });

  it("applies hover effects and animations", () => {
    const { container } = render(<PropertyCard property={mockProperty} />);

    const cardElement = container.querySelector(".group");
    expect(cardElement).toBeTruthy();

    const imageContainer = container.querySelector(".group-hover\\:scale-105");
    expect(imageContainer).toBeTruthy();
  });

  it("renders property details structure", () => {
    render(<PropertyCard property={mockProperty} />);

    // Check for beds, baths, sq ft info (currently hardcoded in component)
    expect(screen.getByText("4 Beds")).toBeTruthy();
    expect(screen.getByText("5 Baths")).toBeTruthy();
    expect(screen.getByText("4,390 Sq. Ft.")).toBeTruthy();
  });
});

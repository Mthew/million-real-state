import { render, screen } from "@testing-library/react";
import { PropertyCard } from "@/components/features/property-card";

// Mock the property data
const mockProperty = {
  id: "1",
  ownerId: "owner1",
  name: "Luxury Manhattan Penthouse",
  address: "123 Park Avenue, New York, NY",
  price: 5000000,
  imageUrl: "/luxury-penthouse-manhattan.png",
};

describe("PropertyCard Component - Working Tests", () => {
  it("renders property name correctly", () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText("Luxury Manhattan Penthouse")).toBeTruthy();
  });

  it("renders formatted price correctly", () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText("$5,000,000")).toBeTruthy();
  });

  it("renders as a clickable link", () => {
    render(<PropertyCard property={mockProperty} />);
    const link = screen.getByRole("link");
    expect(link).toBeTruthy();
    expect(link).toHaveAttribute("href", "/property/1");
  });

  it("renders property image with correct alt text", () => {
    render(<PropertyCard property={mockProperty} />);
    const image = screen.getByRole("img");
    expect(image).toBeTruthy();
    expect(image).toHaveAttribute("alt", "Luxury Manhattan Penthouse");
  });

  it("contains property details text", () => {
    render(<PropertyCard property={mockProperty} />);
    // These are hardcoded in the component currently
    expect(screen.getByText("4 Beds")).toBeTruthy();
    expect(screen.getByText("5 Baths")).toBeTruthy();
    expect(screen.getByText("4,390 Sq. Ft.")).toBeTruthy();
  });
});

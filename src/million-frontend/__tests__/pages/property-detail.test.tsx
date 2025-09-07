import { render, screen, waitFor } from "@testing-library/react";
import PropertyDetailPage from "@/app/property/[id]/page";
import { mockPropertyDetail } from "../__mocks__/mockData";
import { notFound } from "next/navigation";

// Mock the API function
jest.mock("@/lib/api", () => ({
  getPropertyById: jest.fn(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({ children, href, ...props }: any) => (
    <a href={href} {...props} data-testid="back-link">
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

// Mock next/image
jest.mock("next/image", () => {
  const MockImage = ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} data-testid="property-detail-image" />
  );
  MockImage.displayName = "MockImage";
  return MockImage;
});

// Mock the PropertyImageGallery component
jest.mock("@/components/features/Image-gallery", () => {
  const MockPropertyImageGallery = ({
    images,
    propertyName,
    fallbackImageUrl,
  }: any) => (
    <div data-testid="image-gallery">
      <span>Images: {images.length}</span>
      <span>Property: {propertyName}</span>
      <span>Fallback: {fallbackImageUrl}</span>
    </div>
  );
  MockPropertyImageGallery.displayName = "MockPropertyImageGallery";
  return { PropertyImageGallery: MockPropertyImageGallery };
});

const { getPropertyById } = require("@/lib/api");

describe("PropertyDetailPage", () => {
  const mockParams = { id: "1" };
  const mockSearchParams = {};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders property detail page with all information", async () => {
    getPropertyById.mockResolvedValue(mockPropertyDetail);

    const PropertyDetailComponent = await PropertyDetailPage({
      params: mockParams,
      searchParams: mockSearchParams,
    });

    render(PropertyDetailComponent);

    // Check basic property information
    expect(screen.getByText("Luxury Manhattan Penthouse")).toBeTruthy();
    expect(screen.getByText("$5,000,000")).toBeTruthy();
    expect(screen.getByText("123 Park Avenue, New York, NY")).toBeTruthy();
  });

  it("renders back navigation link", async () => {
    getPropertyById.mockResolvedValue(mockPropertyDetail);

    const PropertyDetailComponent = await PropertyDetailPage({
      params: mockParams,
      searchParams: mockSearchParams,
    });

    render(PropertyDetailComponent);

    const backLink = screen.getByTestId("back-link");
    expect(backLink).toBeTruthy();
    expect(backLink).toHaveAttribute("href", "/listings");
    expect(screen.getByText("Back to Listings")).toBeTruthy();
  });

  it("displays property details section", async () => {
    getPropertyById.mockResolvedValue(mockPropertyDetail);

    const PropertyDetailComponent = await PropertyDetailPage({
      params: mockParams,
      searchParams: mockSearchParams,
    });

    render(PropertyDetailComponent);

    expect(screen.getByText("Property Details")).toBeTruthy();
    expect(screen.getByText("LUX001")).toBeTruthy(); // Internal code
    expect(screen.getByText("2020")).toBeTruthy(); // Year built
  });

  it("displays owner information", async () => {
    getPropertyById.mockResolvedValue(mockPropertyDetail);

    const PropertyDetailComponent = await PropertyDetailPage({
      params: mockParams,
      searchParams: mockSearchParams,
    });

    render(PropertyDetailComponent);

    expect(screen.getByText("Owner Information")).toBeTruthy();
    expect(screen.getByText("John Smith")).toBeTruthy();
    expect(screen.getByText("100 Wall Street, New York, NY")).toBeTruthy();
  });

  it("displays sales history when traces exist", async () => {
    getPropertyById.mockResolvedValue(mockPropertyDetail);

    const PropertyDetailComponent = await PropertyDetailPage({
      params: mockParams,
      searchParams: mockSearchParams,
    });

    render(PropertyDetailComponent);

    expect(screen.getByText("Sales History")).toBeTruthy();
    expect(screen.getByText("Initial Sale")).toBeTruthy();
    expect(screen.getByText("$4,500,000")).toBeTruthy(); // Sale price
    expect(screen.getByText("$45,000")).toBeTruthy(); // Tax
  });

  it("does not display sales history when no traces exist", async () => {
    const propertyWithoutTraces = { ...mockPropertyDetail, traces: [] };
    getPropertyById.mockResolvedValue(propertyWithoutTraces);

    const PropertyDetailComponent = await PropertyDetailPage({
      params: mockParams,
      searchParams: mockSearchParams,
    });

    render(PropertyDetailComponent);

    expect(screen.queryByText("Sales History")).toBeFalsy();
  });

  it("renders image gallery with correct props", async () => {
    getPropertyById.mockResolvedValue(mockPropertyDetail);

    const PropertyDetailComponent = await PropertyDetailPage({
      params: mockParams,
      searchParams: mockSearchParams,
    });

    render(PropertyDetailComponent);

    const imageGallery = screen.getByTestId("image-gallery");
    expect(imageGallery).toBeTruthy();
    expect(screen.getByText("Images: 2")).toBeTruthy();
    expect(
      screen.getByText("Property: Luxury Manhattan Penthouse")
    ).toBeTruthy();
    expect(
      screen.getByText("Fallback: /luxury-penthouse-manhattan.png")
    ).toBeTruthy();
  });

  it("renders contact agent button", async () => {
    getPropertyById.mockResolvedValue(mockPropertyDetail);

    const PropertyDetailComponent = await PropertyDetailPage({
      params: mockParams,
      searchParams: mockSearchParams,
    });

    render(PropertyDetailComponent);

    expect(screen.getByRole("button", { name: /contact agent/i })).toBeTruthy();
  });

  it("formats dates correctly", async () => {
    getPropertyById.mockResolvedValue(mockPropertyDetail);

    const PropertyDetailComponent = await PropertyDetailPage({
      params: mockParams,
      searchParams: mockSearchParams,
    });

    render(PropertyDetailComponent);

    // Check that dates are formatted properly
    expect(screen.getByText(/January 14, 2023/)).toBeTruthy(); // Sale date
    expect(screen.getByText(/June 14, 1975/)).toBeTruthy(); // Owner birthday
  });

  it("formats prices correctly", async () => {
    getPropertyById.mockResolvedValue(mockPropertyDetail);

    const PropertyDetailComponent = await PropertyDetailPage({
      params: mockParams,
      searchParams: mockSearchParams,
    });

    render(PropertyDetailComponent);

    // Check currency formatting (no decimals)
    expect(screen.getByText("$5,000,000")).toBeTruthy();
    expect(screen.getByText("$4,500,000")).toBeTruthy();
    expect(screen.getByText("$45,000")).toBeTruthy();
  });

  it("calls notFound when property is not found", async () => {
    getPropertyById.mockRejectedValue(new Error("Property not found"));

    await expect(
      PropertyDetailPage({
        params: mockParams,
        searchParams: mockSearchParams,
      })
    ).rejects.toThrow();

    expect(notFound).toHaveBeenCalled();
  });

  it("handles API errors gracefully", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    getPropertyById.mockRejectedValue(new Error("API Error"));

    await expect(
      PropertyDetailPage({
        params: mockParams,
        searchParams: mockSearchParams,
      })
    ).rejects.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching property:",
      expect.any(Error)
    );
    expect(notFound).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("sorts sales history by date (most recent first)", async () => {
    const propertyWithMultipleTraces = {
      ...mockPropertyDetail,
      traces: [
        {
          id: "trace1",
          dateSale: "2022-01-15T00:00:00Z",
          name: "First Sale",
          value: 4000000,
          tax: 40000,
        },
        {
          id: "trace2",
          dateSale: "2023-06-20T00:00:00Z",
          name: "Recent Sale",
          value: 4500000,
          tax: 45000,
        },
      ],
    };

    getPropertyById.mockResolvedValue(propertyWithMultipleTraces);

    const PropertyDetailComponent = await PropertyDetailPage({
      params: mockParams,
      searchParams: mockSearchParams,
    });

    render(PropertyDetailComponent);

    // Check the sales history section directly
    const salesHistorySection = screen
      .getByText("Sales History")
      .closest("div");
    const salesHistoryText = salesHistorySection?.textContent || "";

    // The most recent sale should appear first
    const recentSaleIndex = salesHistoryText.indexOf("Recent Sale");
    const firstSaleIndex = salesHistoryText.indexOf("First Sale");

    // If Recent Sale appears first, its index should be less than First Sale
    expect(recentSaleIndex).toBeGreaterThan(-1);
    expect(firstSaleIndex).toBeGreaterThan(-1);
    expect(recentSaleIndex).toBeLessThan(firstSaleIndex);
  });

  it("applies correct responsive grid layout", async () => {
    getPropertyById.mockResolvedValue(mockPropertyDetail);

    const PropertyDetailComponent = await PropertyDetailPage({
      params: mockParams,
      searchParams: mockSearchParams,
    });

    const { container } = render(PropertyDetailComponent);

    const gridElement = container.querySelector(
      ".grid-cols-1.lg\\:grid-cols-3"
    );
    expect(gridElement).toBeTruthy();
  });
});

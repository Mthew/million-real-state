import { render, screen } from "@testing-library/react";
import ListingsLoading from "@/app/listings/loading";

// Mock the PropertyCardSkeleton component
jest.mock("@/components/features/property-card-skeleton", () => {
  const MockPropertyCardSkeleton = () => (
    <div data-testid="property-card-skeleton">Loading...</div>
  );
  MockPropertyCardSkeleton.displayName = "MockPropertyCardSkeleton";
  return { PropertyCardSkeleton: MockPropertyCardSkeleton };
});

describe("ListingsLoading Component", () => {
  it("renders loading skeletons", () => {
    render(<ListingsLoading />);

    // Should render multiple property card skeletons
    const skeletons = screen.getAllByTestId("property-card-skeleton");
    expect(skeletons).toHaveLength(8); // As per the component implementation
  });

  it("renders title and filter bar skeletons", () => {
    const { container } = render(<ListingsLoading />);

    // Check for animated skeleton elements
    const skeletonElements = container.querySelectorAll(".animate-pulse");
    expect(skeletonElements.length).toBeGreaterThan(0);

    // Check for title skeleton
    const titleSkeleton = container.querySelector(
      ".h-10.bg-gray-200.rounded.w-1\\/4"
    );
    expect(titleSkeleton).toBeTruthy();

    // Check for filter bar skeleton
    const filterSkeleton = container.querySelector(".h-16.bg-gray-200.rounded");
    expect(filterSkeleton).toBeTruthy();
  });

  it("applies correct grid layout", () => {
    const { container } = render(<ListingsLoading />);

    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toBeTruthy();
    expect(gridContainer).toHaveClass(
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4"
    );
  });

  it("applies correct spacing and padding", () => {
    const { container } = render(<ListingsLoading />);

    const mainContainer = container.querySelector(".container");
    expect(mainContainer).toBeTruthy();
    expect(mainContainer).toHaveClass("mx-auto", "px-4", "py-8");
  });

  it("renders skeleton elements with proper styling", () => {
    const { container } = render(<ListingsLoading />);

    // Check that skeleton elements have the right background and animation
    const skeletonElements = container.querySelectorAll(
      ".bg-gray-200.animate-pulse"
    );
    expect(skeletonElements.length).toBeGreaterThanOrEqual(2); // At least title and filter bar
  });

  it("maintains consistent spacing between elements", () => {
    const { container } = render(<ListingsLoading />);

    // Check for margin bottom on skeleton elements
    const titleSkeleton = container.querySelector(".mb-8");
    expect(titleSkeleton).toBeTruthy();
  });
});

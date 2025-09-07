import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PropertyList } from "@/components/features/property-list";
import { mockProperties } from "../__mocks__/mockData";

// Mock useRouter
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("PropertyList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders property cards when properties are provided", () => {
    render(<PropertyList properties={mockProperties} />);

    // Check if property names are rendered
    expect(screen.getByText("Luxury Manhattan Penthouse")).toBeInTheDocument();
    expect(screen.getByText("Beverly Hills Mansion")).toBeInTheDocument();
    expect(screen.getByText("Miami Beach Condo")).toBeInTheDocument();
  });

  it("renders correct number of property cards", () => {
    render(<PropertyList properties={mockProperties} />);

    // Should render 3 property cards
    const propertyCards = screen.getAllByRole("link");
    expect(propertyCards).toHaveLength(3);
  });

  it("renders empty state when no properties are provided", () => {
    render(<PropertyList properties={[]} />);

    expect(screen.getByText("No properties found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Please broaden your search criteria to find more properties."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Clear Filters")).toBeInTheDocument();
  });

  it("handles clear filters action in empty state", () => {
    render(<PropertyList properties={[]} />);

    const clearFiltersButton = screen.getByText("Clear Filters");
    fireEvent.click(clearFiltersButton);

    expect(mockPush).toHaveBeenCalledWith("/listings");
  });

  it("renders property cards in correct grid layout", () => {
    const { container } = render(<PropertyList properties={mockProperties} />);

    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toBeInTheDocument();

    // Verify it has the correct CSS grid classes
    expect(gridContainer).toHaveClass("grid");
    expect(gridContainer).toHaveClass("grid-cols-1");
  });

  it("applies correct CSS classes for responsive grid", () => {
    const { container } = render(<PropertyList properties={mockProperties} />);

    const gridElement = container.querySelector(".grid");
    expect(gridElement).toHaveClass(
      "grid-cols-1",
      "sm:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4"
    );
  });
});

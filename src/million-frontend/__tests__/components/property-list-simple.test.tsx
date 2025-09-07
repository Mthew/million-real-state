import { render, screen, fireEvent } from "@testing-library/react";
import { PropertyList } from "@/components/features/property-list";
import { mockProperties } from "../__mocks__/mockData";

describe("PropertyList Component", () => {
  it("renders property cards when properties are provided", () => {
    render(<PropertyList properties={mockProperties} />);

    // Check if property names are rendered
    expect(screen.getByText("Luxury Manhattan Penthouse")).toBeTruthy();
    expect(screen.getByText("Beverly Hills Mansion")).toBeTruthy();
    expect(screen.getByText("Miami Beach Condo")).toBeTruthy();
  });

  it("renders correct number of property cards", () => {
    render(<PropertyList properties={mockProperties} />);

    // Should render 3 property cards as links
    const propertyLinks = screen.getAllByRole("link");
    expect(propertyLinks).toHaveLength(3);
  });

  it("renders empty state when no properties are provided", () => {
    render(<PropertyList properties={[]} />);

    expect(screen.getByText("No properties found")).toBeTruthy();
    expect(
      screen.getByText(
        "Please broaden your search criteria to find more properties."
      )
    ).toBeTruthy();
    expect(screen.getByText("Clear Filters")).toBeTruthy();
  });

  it("handles clear filters action in empty state", () => {
    render(<PropertyList properties={[]} />);

    const clearFiltersButton = screen.getByText("Clear Filters");
    fireEvent.click(clearFiltersButton);

    // Check that router.push was called
    //@ts-ignore
    expect(global.mockRouter.push).toHaveBeenCalledWith("/listings");
  });

  it("displays formatted prices correctly", () => {
    render(<PropertyList properties={mockProperties} />);

    // Check that prices are formatted as currency
    expect(screen.getByText("$5,000,000")).toBeTruthy();
    expect(screen.getByText("$8,500,000")).toBeTruthy();
    expect(screen.getByText("$2,750,000")).toBeTruthy();
  });
});

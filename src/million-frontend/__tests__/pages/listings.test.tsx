import { render, screen, waitFor } from "@testing-library/react";
import ListingsPage from "@/app/listings/page";
import { mockProperties } from "../__mocks__/mockData";

// Mock the API function
jest.mock("@/lib/api", () => ({
  getProperties: jest.fn(),
}));

// Mock the components used in the listings page
jest.mock("@/components/features/filter-bar", () => {
  const MockFilterBar = () => <div data-testid="filter-bar">Filter Bar</div>;
  MockFilterBar.displayName = "MockFilterBar";
  return { FilterBar: MockFilterBar };
});

jest.mock("@/components/features/property-list", () => {
  const MockPropertyList = ({ properties }: { properties: any[] }) => (
    <div data-testid="property-list">
      Properties: {properties.length}
      {properties.map((property) => (
        <div key={property.id} data-testid={`property-${property.id}`}>
          {property.name}
        </div>
      ))}
    </div>
  );
  MockPropertyList.displayName = "MockPropertyList";
  return { PropertyList: MockPropertyList };
});

const { getProperties } = require("@/lib/api");

describe("ListingsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the listings page with properties", async () => {
    getProperties.mockResolvedValue(mockProperties);

    const searchParams = {};
    const ListingsPageComponent = await ListingsPage({ searchParams });

    render(ListingsPageComponent);

    expect(screen.getByTestId("filter-bar")).toBeTruthy();
    expect(screen.getByTestId("property-list")).toBeTruthy();
  });

  it("passes search parameters to the API correctly", async () => {
    getProperties.mockResolvedValue(mockProperties);

    const searchParams = {
      name: "Luxury",
      address: "Manhattan",
      minPrice: "1000000",
      maxPrice: "5000000",
    };

    await ListingsPage({ searchParams });

    expect(getProperties).toHaveBeenCalledWith(expect.any(URLSearchParams));

    // Check that the URLSearchParams contains the correct values
    const calledParams = getProperties.mock.calls[0][0];
    expect(calledParams.get("name")).toBe("Luxury");
    expect(calledParams.get("address")).toBe("Manhattan");
    expect(calledParams.get("minPrice")).toBe("1000000");
    expect(calledParams.get("maxPrice")).toBe("5000000");
  });

  it("handles empty search parameters", async () => {
    getProperties.mockResolvedValue(mockProperties);

    const searchParams = {};
    await ListingsPage({ searchParams });

    const calledParams = getProperties.mock.calls[0][0];
    expect(calledParams.toString()).toBe("");
  });

  it("filters out undefined search parameters", async () => {
    getProperties.mockResolvedValue(mockProperties);

    const searchParams = {
      name: "Test",
      address: undefined,
      minPrice: "",
      maxPrice: "1000000",
    };

    await ListingsPage({ searchParams });

    const calledParams = getProperties.mock.calls[0][0];
    expect(calledParams.get("name")).toBe("Test");
    expect(calledParams.has("address")).toBeFalsy();
    expect(calledParams.has("minPrice")).toBeFalsy();
    expect(calledParams.get("maxPrice")).toBe("1000000");
  });

  it("displays correct property count", async () => {
    getProperties.mockResolvedValue(mockProperties);

    const searchParams = {};
    const ListingsPageComponent = await ListingsPage({ searchParams });

    render(ListingsPageComponent);

    expect(screen.getByText("Showing 3 properties")).toBeTruthy();
  });

  it("handles singular property count", async () => {
    getProperties.mockResolvedValue([mockProperties[0]]);

    const searchParams = {};
    const ListingsPageComponent = await ListingsPage({ searchParams });

    render(ListingsPageComponent);

    expect(screen.getByText("Showing 1 property")).toBeTruthy();
  });

  it("handles empty properties list", async () => {
    getProperties.mockResolvedValue([]);

    const searchParams = {};
    const ListingsPageComponent = await ListingsPage({ searchParams });

    render(ListingsPageComponent);

    expect(screen.getByText("Showing 0 properties")).toBeTruthy();
    expect(screen.getByText("Properties: 0")).toBeTruthy();
  });

  it("applies correct layout and styling classes", async () => {
    getProperties.mockResolvedValue(mockProperties);

    const searchParams = {};
    const ListingsPageComponent = await ListingsPage({ searchParams });

    const { container } = render(ListingsPageComponent);

    // Check for proper responsive layout classes
    const mainElement = container.querySelector("main");
    expect(mainElement).toBeTruthy();
    expect(mainElement).toHaveClass("max-w-7xl", "mx-auto");
  });

  it("handles array search parameters correctly", async () => {
    getProperties.mockResolvedValue(mockProperties);

    const searchParams = {
      name: ["Luxury", "Penthouse"], // This could happen with multiple values
      address: "Manhattan",
    };

    await ListingsPage({ searchParams });

    const calledParams = getProperties.mock.calls[0][0];
    // Should handle array by taking the first value or joining them
    expect(calledParams.has("name")).toBeTruthy();
  });
});

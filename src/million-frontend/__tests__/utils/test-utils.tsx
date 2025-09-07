import { render, RenderOptions } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";

// Custom render function that includes common providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { ...options });

// Mock Next.js router
export const createMockRouter = (overrides = {}) => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  ...overrides,
});

// Mock Next.js search params
export const createMockSearchParams = (params: Record<string, string> = {}) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, value);
  });

  return {
    get: (key: string) => searchParams.get(key),
    has: (key: string) => searchParams.has(key),
    toString: () => searchParams.toString(),
  };
};

// Helper to wait for async operations
export const waitForLoadingToFinish = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

// Common test assertions
export const expectElementToHaveClasses = (
  element: Element,
  classes: string[]
) => {
  classes.forEach((className) => {
    expect(element).toHaveClass(className);
  });
};

// Helper to create mock API responses
export const createMockApiResponse = function <T>(
  data: T,
  delay = 0
): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const createMockApiError = (message: string, status = 500) => {
  const error = new Error(message) as any;
  error.status = status;
  return Promise.reject(error);
};

// Viewport testing utilities
export const setViewport = (width: number, height: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });

  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: height,
  });

  window.dispatchEvent(new Event("resize"));
};

// Mock intersection observer for image loading tests
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });

  window.IntersectionObserver = mockIntersectionObserver;
  return mockIntersectionObserver;
};

// Re-export everything from testing-library
export * from "@testing-library/react";

// Export custom render as default
export { customRender as render };

// Common test data generators
export const generateMockProperty = (overrides = {}) => ({
  id: "1",
  ownerId: "owner1",
  name: "Test Property",
  address: "123 Test Street",
  price: 1000000,
  imageUrl: "/test-image.jpg",
  ...overrides,
});

export const generateMockPropertyDetail = (overrides = {}) => ({
  id: "1",
  ownerId: "owner1",
  name: "Test Property Detail",
  address: "123 Test Street",
  price: 1000000,
  codeInternal: "TEST001",
  year: 2023,
  imageUrl: "/test-image.jpg",
  owner: {
    id: "owner1",
    name: "Test Owner",
    address: "456 Owner Street",
    photoUrl: "/owner.jpg",
    birthday: "1980-01-01T00:00:00Z",
  },
  images: [
    {
      id: "img1",
      fileUrl: "/test-image-1.jpg",
      isEnabled: true,
    },
  ],
  traces: [
    {
      id: "trace1",
      dateSale: "2023-01-01T00:00:00Z",
      name: "Test Sale",
      value: 900000,
      tax: 9000,
    },
  ],
  ...overrides,
});

import "@testing-library/jest-dom";
import React from "react";

// Mock Next.js router
const mockPush = jest.fn();
const mockBack = jest.fn();
const mockForward = jest.fn();
const mockRefresh = jest.fn();
const mockReplace = jest.fn();
const mockPrefetch = jest.fn();

const mockRouter = {
  push: mockPush,
  back: mockBack,
  forward: mockForward,
  refresh: mockRefresh,
  replace: mockReplace,
  prefetch: mockPrefetch,
};

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => ({
    get: jest.fn(() => null),
    has: jest.fn(() => false),
    toString: jest.fn(() => ""),
  }),
  usePathname: () => "",
  notFound: jest.fn(),
}));

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: function MockImage(props) {
    const { src, alt, ...otherProps } = props;
    return React.createElement("img", { src, alt, ...otherProps });
  },
}));

// Mock Next.js Link component
jest.mock("next/link", () => ({
  __esModule: true,
  default: function MockLink({ children, href, ...props }) {
    return React.createElement("a", { href, ...props }, children);
  },
}));

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Reset mocks before each test
beforeEach(() => {
  mockPush.mockClear();
  mockBack.mockClear();
  mockForward.mockClear();
  mockRefresh.mockClear();
  mockReplace.mockClear();
  mockPrefetch.mockClear();
});

// Make mocks available globally for tests
global.mockRouter = mockRouter;

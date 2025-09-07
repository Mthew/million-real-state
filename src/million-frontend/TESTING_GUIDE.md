# Next.js Testing Setup Guide

This document outlines the testing setup for the Million Real Estate frontend application.

## 🚀 What We've Accomplished

### 1. Jest Configuration for Next.js

- ✅ Installed and configured Jest with Next.js
- ✅ Added jest-environment-jsdom for DOM testing
- ✅ Set up @testing-library/react and @testing-library/jest-dom
- ✅ Created jest.config.js with Next.js integration
- ✅ Set up jest.setup.js with proper mocks

### 2. Test Structure Created

```
__tests__/
├── __mocks__/
│   └── mockData.ts           # Mock property data
├── components/
│   ├── property-list.test.tsx        # PropertyList component tests
│   ├── property-card.test.tsx        # PropertyCard component tests
│   ├── filter-bar.test.tsx          # FilterBar component tests
│   └── property-list-simple.test.tsx # Simplified working tests
├── pages/
│   ├── listings.test.tsx            # Listings page tests
│   ├── property-detail.test.tsx     # Property detail page tests
│   ├── listings-error.test.tsx      # Error page tests
│   ├── listings-loading.test.tsx    # Loading page tests
│   └── property-not-found.test.tsx  # 404 page tests
├── integration/
│   └── property-flow.test.tsx       # Integration tests
├── utils/
│   └── test-utils.tsx              # Testing utilities
└── setup.d.ts                     # TypeScript declarations
```

### 3. Testing Coverage

#### Component Tests Created:

- **PropertyList Component**: Tests for property rendering, empty states, filtering
- **PropertyCard Component**: Tests for property display, price formatting, navigation
- **FilterBar Component**: Tests for form inputs, filter application, search parameters
- **Error/Loading States**: Tests for error handling and loading skeletons

#### Page Tests Created:

- **Listings Page**: Tests for server-side rendering, search parameters, property display
- **Property Detail Page**: Tests for detailed view, image gallery, owner information
- **Error Pages**: Tests for 404 handling, error boundaries
- **Loading States**: Tests for skeleton screens and loading indicators

#### Integration Tests:

- **Complete Property Flow**: Tests the full user journey from listings to details
- **Error Handling**: Tests graceful degradation and error states
- **Responsive Design**: Tests component behavior across screen sizes

## 🛠️ Configuration Files

### package.json Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### jest.config.js

- Configured with Next.js integration using `next/jest`
- Set up module mapping for TypeScript path aliases
- Configured test environment and coverage settings

### jest.setup.js

- Mocks for Next.js navigation hooks (useRouter, useSearchParams)
- Mocks for Next.js Image and Link components
- Global mocks for browser APIs (ResizeObserver, IntersectionObserver)
- Test utilities and common setup

## 🧪 Test Examples

### Basic Component Test

```tsx
import { render, screen } from "@testing-library/react";
import { PropertyCard } from "@/components/features/property-card";

it("renders property information correctly", () => {
  const mockProperty = {
    id: "1",
    name: "Test Property",
    price: 1000000,
    // ... other properties
  };

  render(<PropertyCard property={mockProperty} />);

  expect(screen.getByText("Test Property")).toBeTruthy();
  expect(screen.getByText("$1,000,000")).toBeTruthy();
});
```

### Page Test with Server Components

```tsx
import { render, screen } from "@testing-library/react";
import ListingsPage from "@/app/listings/page";

it("renders listings page with properties", async () => {
  // Mock API response
  jest.mocked(getProperties).mockResolvedValue(mockProperties);

  const ListingsComponent = await ListingsPage({ searchParams: {} });
  render(ListingsComponent);

  expect(screen.getByText("Showing 3 properties")).toBeTruthy();
});
```

## 🎯 Key Features Tested

### Listings Page Tests

- ✅ Property display and filtering
- ✅ Search parameter handling
- ✅ Responsive grid layout
- ✅ Empty states and error handling
- ✅ Property count display

### Property Detail Page Tests

- ✅ Property information display
- ✅ Image gallery functionality
- ✅ Owner information section
- ✅ Sales history display
- ✅ Price and date formatting
- ✅ Navigation and error handling

### Component Tests

- ✅ FilterBar form functionality
- ✅ PropertyCard display and interactions
- ✅ PropertyList grid and empty states
- ✅ Loading skeleton components
- ✅ Error boundary components

## 🚨 Known Issues & Solutions

### 1. Next.js Hook Mocking

- **Issue**: React hooks need proper mocking in test environment
- **Solution**: Comprehensive mock setup in jest.setup.js

### 2. Server Component Testing

- **Issue**: Server components require different testing approach
- **Solution**: Test the rendered output after async resolution

### 3. TypeScript Integration

- **Issue**: Jest-DOM matchers need proper TypeScript declarations
- **Solution**: Custom type definitions in setup.d.ts

## 🏃‍♂️ Running Tests

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage
bun run test:coverage

# Run specific test file
bun run test property-list.test.tsx

# Run tests matching pattern
bun run test --testNamePattern="PropertyCard"
```

## 📊 Coverage Goals

Current coverage targets set in jest.config.js:

- Branches: 50%
- Functions: 50%
- Lines: 50%
- Statements: 50%

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid hook call" errors**: Ensure proper component mocking
2. **Module not found**: Check path aliases in jest.config.js
3. **async/await issues**: Use proper async test patterns
4. **Next.js specific errors**: Verify Next.js mocks are correctly set up

### Tips:

- Always clear mocks between tests using `beforeEach`
- Use data-testid attributes for reliable element selection
- Test user behavior, not implementation details
- Keep tests simple and focused on single responsibilities

## 🎉 Next Steps

To improve the testing setup further:

1. **Add MSW (Mock Service Worker)** for API mocking
2. **Set up Playwright** for E2E tests
3. **Add visual regression testing** with tools like Chromatic
4. **Implement accessibility testing** with @testing-library/jest-axe
5. **Add performance testing** for critical user paths
6. **Set up CI/CD pipeline** with automated test runs

The testing foundation is now solid and ready for continuous development and improvement!

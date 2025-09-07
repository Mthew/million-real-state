# Million Real Estate - Frontend

A premium, luxury real estate portal built with Next.js 15, delivering an elegant and sophisticated user experience for high-end property discovery. This application targets affluent property buyers and investors, providing an exclusive platform to browse and discover luxury real estate listings.

## 🌟 Overview

Million Real Estate is a mobile-first, responsive web application that showcases premium properties with a focus on visual storytelling and seamless user experience. The platform is designed around two key personas:

- **The Investor (Isabella)**: Data-driven professionals seeking valuable properties with clear financial metrics
- **The Dream Home Seeker (David)**: High-net-worth individuals looking for aesthetic, lifestyle-focused primary residences

### Key Features

- 🏠 **Property Listings**: Browse luxury properties with advanced filtering capabilities
- 📱 **Mobile-First Design**: Responsive design optimized for all device types
- 🖼️ **Immersive Gallery**: High-resolution property images with elegant presentation
- 🔍 **Advanced Filtering**: Filter by name, address, and price range
- ⚡ **Performance Optimized**: Built with Next.js 15 and modern optimization techniques
- 🎨 **Luxury Aesthetics**: Premium design with Playfair Display and Lato typography
- ♿ **Accessible**: WCAG 2.1 Level AA compliance
- 🧪 **Fully Tested**: Comprehensive test suite with Jest and React Testing Library

## 🏗️ Architecture

The application follows a clean, modular architecture based on four core pillars:

### 1. Separation of Concerns

```
/src
├── /app/                 # Next.js App Router - Pages & Routing
│   ├── /listings/        # Property listings page
│   ├── /property/[id]/   # Dynamic property details
│   ├── layout.tsx        # Root layout with header/footer
│   └── not-found.tsx     # Custom 404 page
├── /components/          # UI Components
│   ├── /ui/             # Atomic components (Button, Input, etc.)
│   └── /features/       # Composed components (FilterBar, PropertyCard)
├── /lib/                # Business Logic & Utilities
│   ├── api.ts           # Centralized API service
│   ├── utils.ts         # Helper functions
│   └── constants.ts     # Application constants
└── /types/              # TypeScript definitions
    └── index.ts         # API contracts & data types
```

### 2. Error Handling Strategy

- **API Errors**: Graceful error handling with user-friendly messages
- **404 Errors**: Custom not-found pages with navigation back to listings
- **Client Errors**: React Error Boundaries preventing app crashes

### 3. Mobile-First Responsive Design

- **Breakpoints**: Mobile (320px), Tablet (768px), Desktop (1024px), Wide (1440px)
- **Layout**: Adaptive grid system (1 column → 2 columns → 3+ columns)
- **Navigation**: Collapsible hamburger menu for mobile

### 4. Comprehensive Testing

- **Unit Tests**: Individual component testing
- **Integration Tests**: User flow and API interaction testing
- **Coverage**: 50%+ code coverage requirements

## 🛠️ Technology Stack

### Core Technologies

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://radix-ui.com/) + Custom Components
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Development & Testing

- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **Linting**: [ESLint](https://eslint.org/)
- **Package Manager**: [Bun](https://bun.sh/) or npm/yarn/pnpm
- **Icons**: [Lucide React](https://lucide.dev/)

### Performance & Optimization

- **Turbopack**: Enabled for faster development builds
- **Font Optimization**: Geist font family optimized with `next/font`
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- npm, yarn, pnpm, or bun package manager
- Git

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd million-real-state/src/million-frontend
   ```

2. **Install dependencies**:

   ```bash
   # Using bun (recommended)
   bun install

   # Or using npm
   npm install

   # Or using yarn
   yarn install

   # Or using pnpm
   pnpm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Configure your environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### Development

Start the development server:

```bash
# Using bun
bun dev

# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
# Build the application
bun run build

# Start production server
bun run start
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage report
bun run test:coverage

# Run specific test file
bun test PropertyCard.test.tsx

# Run tests matching a pattern
bun test --testNamePattern="should render property details"
```

### Test Structure

Tests are organized using the following patterns:

- **Unit Tests**: Located alongside components in `__tests__/components/`
- **Integration Tests**: Located in `__tests__/integration/`
- **Page Tests**: Located in `__tests__/pages/`
- **Utility Tests**: Located in `__tests__/utils/`

### Writing Tests

Example test structure:

```typescript
// __tests__/components/PropertyCard.test.tsx
import { render, screen } from "@testing-library/react";
import { PropertyCard } from "@/components/features/PropertyCard";

describe("PropertyCard", () => {
  it("should render property information correctly", () => {
    const mockProperty = {
      id: 1,
      name: "Luxury Villa",
      address: "123 Ocean Drive",
      price: 2500000,
      // ... other properties
    };

    render(<PropertyCard property={mockProperty} />);

    expect(screen.getByText("Luxury Villa")).toBeInTheDocument();
    expect(screen.getByText("123 Ocean Drive")).toBeInTheDocument();
    expect(screen.getByText("$2,500,000")).toBeInTheDocument();
  });
});
```

### Coverage Requirements

The project maintains the following coverage thresholds:

- **Branches**: 50%
- **Functions**: 50%
- **Lines**: 50%
- **Statements**: 50%

## 📋 Available Scripts

| Script          | Description                             |
| --------------- | --------------------------------------- |
| `dev`           | Start development server with Turbopack |
| `build`         | Build production application            |
| `start`         | Start production server                 |
| `lint`          | Run ESLint for code quality             |
| `test`          | Run Jest test suite                     |
| `test:watch`    | Run tests in watch mode                 |
| `test:coverage` | Generate coverage report                |

## 🎨 Design System

### Color Palette

- **Primary**: `#1A1A1A` (Charcoal) - Main text, dark backgrounds
- **Secondary**: `#F5F5F5` (Off-White) - Light backgrounds
- **Accent**: `#D4AF37` (Muted Gold) - CTAs, highlights
- **Neutral**: `#FFFFFF`, `#E0E0E0` - Text, borders, backgrounds

### Typography

- **Headings**: Playfair Display (elegant serif)
- **Body**: Lato (clean sans-serif)
- **System**: Geist (optimized display font)

### Component Library

The application uses a custom component library built on Radix UI primitives:

- **Atomic Components**: Button, Input, Skeleton, etc.
- **Composed Components**: PropertyCard, FilterBar, Header, etc.
- **Design Tokens**: Consistent spacing (8px scale), colors, and typography

## 🌐 API Integration

The frontend integrates with the Million Real Estate API:

### Endpoints Used

- `GET /api/properties` - Fetch property listings with filters
- `GET /api/properties/{id}` - Fetch individual property details

### Data Flow

1. **SWR** for data fetching and caching
2. **Zustand** for global state management
3. **React Hook Form + Zod** for form handling and validation

## 📱 Responsive Design

### Breakpoint Strategy

```css
/* Mobile First Approach */
.property-grid {
  grid-template-columns: 1fr; /* Mobile: 1 column */
}

@media (min-width: 768px) {
  .property-grid {
    grid-template-columns: 1fr 1fr; /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .property-grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
  }
}
```

## ♿ Accessibility

The application meets **WCAG 2.1 Level AA** standards:

- **Color Contrast**: 4.5:1 minimum ratio
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Compatible with modern screen readers
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 🔧 Configuration Files

### Important Configuration

- **Next.js Config**: `next.config.ts` - Next.js configuration
- **Tailwind Config**: `tailwind.config.ts` - Design system tokens
- **TypeScript Config**: `tsconfig.json` - TypeScript compiler options
- **Jest Config**: `jest.config.js` - Testing configuration
- **ESLint Config**: `eslint.config.mjs` - Code quality rules

## 📈 Performance

### Optimization Strategies

- **Image Optimization**: Automatic WebP conversion and lazy loading
- **Code Splitting**: Route-based automatic splitting
- **Turbopack**: Faster development builds
- **Font Optimization**: Preloaded and optimized fonts
- **Caching**: API response caching with SWR

### Performance Goals

- **LCP**: < 2.5 seconds (Largest Contentful Paint)
- **INP**: < 200ms (Interaction to Next Paint)
- **FPS**: 60fps consistent animation performance

## 🚨 Error Handling

### Error Boundaries

- **Global**: `app/error.tsx` - Catches all unhandled errors
- **Page-specific**: Individual error boundaries per route
- **API Errors**: Graceful error states with retry mechanisms

### Error Types Handled

1. **Network Errors**: API connectivity issues
2. **404 Errors**: Invalid property IDs or routes
3. **Validation Errors**: Form submission failures
4. **Runtime Errors**: Unexpected JavaScript errors

## 🔐 Environment Variables

### Required Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Optional Variables

```env
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
NEXT_PUBLIC_ENVIRONMENT=development
```

## 📚 Additional Resources

### Documentation

- [Architecture Specification](./doc/architecture-spect.md)
- [Testing Guide](./TESTING_GUIDE.md)
- [Testing Summary](./TESTING_SUMMARY.md)

### External Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://radix-ui.com/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 👥 Contributing

1. **Branch Naming**: Use descriptive names (e.g., `feat/property-detail-page`)
2. **Commits**: Follow conventional commit format
3. **Testing**: Ensure all tests pass before submitting PRs
4. **Code Quality**: Run linting and fix any issues

## 📄 License

This project is part of the Million Real Estate application suite. All rights reserved.

---

**Developed with ❤️ by Mthew**

For questions or support, please refer to the project documentation or contact the development team.

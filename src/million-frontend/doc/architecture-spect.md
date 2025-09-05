Excellent. Let's architect the frontend.

Based on our agreed-upon technology stack and the detailed requirements from the spec, here is a comprehensive conceptual architecture for the Million Real Estate frontend. This architecture is designed from the ground up to be **clean, efficient, responsive (mobile-first), and highly testable.**

---

### The Four Pillars of Our Frontend Architecture

We will structure our approach around four core pillars that directly address your requirements.

#### 1. Pillar 1: A Clean & Efficient Architecture (Separation of Concerns)

To keep our code modular, scalable, and easy to reason about, we will enforce a strict separation of concerns.

**A. Folder & File Structure:** Our directory structure is the physical manifestation of this separation.

```plaintext
/frontend
├── /app/                      # ROUTING & PAGES: Each folder is a route.
│   ├── /listings/             # Listings Page. Contains logic for fetching and displaying properties.
│   │   ├── loading.tsx        # Automatic loading UI (Skeleton Screens) via Next.js Suspense.
│   │   └── page.tsx           # The main page component (Server Component).
│   ├── /property/[id]/        # Dynamic route for Property Detail Page.
│   │   ├── error.tsx          # Page-specific error boundary.
│   │   └── page.tsx           # The detail page component.
│   ├── layout.tsx             # ROOT LAYOUT: Contains <Header>, <Footer>, shared UI.
│   └── not-found.tsx          # Custom 404 page for a premium feel.
│
├── /components/               # UI LAYER: Our bespoke component library.
│   ├── /ui/                   # 1. Atomic (Dumb) Components: Highly reusable, no business logic.
│   │   │  ├── Button.tsx
│   │   │  ├── Input.tsx
│   │   │  └── Skeleton.tsx
│   └── /features/             # 2. Composed (Smart) Components: Combine atomic components for specific features.
│       │  ├── FilterBar.tsx       # Manages filter state and user interaction.
│       │  └── PropertyCard.tsx    # Displays a single property summary.
│
├── /lib/                      # LOGIC & DATA LAYER: Non-UI code.
│   ├── api.ts                 # Centralized API service for all `fetch` calls to our backend.
│   ├── utils.ts               # General helper functions (e.g., format price).
│   └── constants.ts           # Site-wide constants.
│
├── /stores/                   # GLOBAL STATE LAYER (Zustand)
│   ├── useUIStore.ts          # State for global UI (e.g., mobile menu).
│   └── usePropertyStore.ts    # Client-side cache of fetched properties.
│
└── /types/                    # DATA CONTRACTS: TypeScript types for API responses.
    └── index.ts               # Defines `Property`, `Owner`, etc., to match backend DTOs.
```

#### 2. Pillar 2: A Robust Error Handling Strategy

We will handle errors gracefully at multiple levels to prevent user frustration and maintain a professional experience.

**A. API / Data Fetching Errors:**

- **Strategy:** When an API call fails, we will never show a broken page. Instead, we will display a user-friendly error message with a call to action.
- **Implementation:** Our data-fetching hooks (SWR) provide a built-in `error` state. We will use this to conditionally render a dedicated error component.
  ```tsx
  // Example in a page component
  const { data, error, isLoading } = useSWR("/api/properties", fetcher);
  if (error) return <ApiError onRetry={handleRetry} />;
  if (isLoading) return <PropertiesSkeleton />;
  return <PropertyListings data={data} />;
  ```

**B. "Not Found" (404) Errors:**

- **Strategy:** If a user navigates to a non-existent property (e.g., `/property/invalid-id`), we will show a custom, elegantly designed 404 page that guides them back to the main listings.
- **Implementation:** The Next.js App Router uses a special file. We will create a custom `app/not-found.tsx` component. In our server-side `fetch` calls, if the API returns a 404, we will call the `notFound()` function from Next.js to trigger this page.

**C. Unexpected Client-Side Errors (React Rendering Errors):**

- **Strategy:** If a component crashes due to an unexpected bug, we will prevent the entire page from dying. An "Error Boundary" will catch the crash and display a fallback UI.
- **Implementation:** The App Router uses an `error.tsx` file as a built-in error boundary. We will create a root `app/error.tsx` to handle global errors and optionally page-specific ones.

#### 3. Pillar 3: A Mobile-First Responsive Design

Our design will be built from the smallest screen up, ensuring a flawless experience on mobile before adapting to larger screens.

**A. Strategy:** We will use a "mobile-first" approach. Styles applied by default will target mobile, and we will use responsive modifiers to add or change styles for larger breakpoints.
**B. Implementation:** **Tailwind CSS** is perfectly suited for this.

- **Configuration:** In `tailwind.config.ts`, we will define our custom breakpoints from the spec (`tablet: '768px'`, `desktop: '1024px'`).
- **Class Application:** We will write our HTML with mobile-first classes, then add prefixed utilities for larger screens. This is clean and declarative.
  ```tsx
  // Example of the property grid layout
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {/* This defaults to a 1-column grid on mobile, becomes 2 columns
        on medium screens (md), and 3 columns on large screens (lg). */}
  </div>
  ```
- **Navigation:** The header will contain both the mobile "hamburger" icon and the full desktop navigation links, using Tailwind's responsive classes (`md:hidden`, `hidden md:flex`) to toggle their visibility at the correct breakpoint.

#### 4. Pillar 4: A Comprehensive Testing Strategy

We will build a test suite that provides high confidence in our application's correctness, from individual components to full user flows.

**A. Tools:**

- **Test Runner:** **Jest** (comes configured with Next.js).
- **Component Testing:** **React Testing Library (RTL)** for rendering components and simulating user interactions in a test environment.
- **API Mocking:** **Mock Service Worker (MSW)** to intercept API calls during tests and return predictable mock data. This allows us to test our pages and data-fetching hooks without hitting the real backend.

**B. Levels of Testing:**

1.  **Unit Tests (for `ui/` components):**

    - **Goal:** Verify that our small, reusable components render correctly and respond to props.
    - **Example Test:** "Does the `<Button>` component render its children text? Does it call the `onClick` handler when clicked?"

2.  **Integration Tests (for `features/` components and pages):**
    - **Goal:** Verify that multiple components work together correctly to fulfill a user story. This is our most valuable type of test.
    - **Example Test:** "When the `ListingsPage` renders:
      1. Does it initially show the `<PropertiesSkeleton />` loading state?
      2. Does it trigger an API call to `/api/properties` (intercepted by MSW)?
      3. Once the mock data is returned, does it render a list of `<PropertyCard />` components with the correct data?"

This architectural concept provides a clear, professional, and robust blueprint for building the Million Real Estate frontend. It directly addresses all requirements and sets us up for success.

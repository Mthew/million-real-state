import { create } from "zustand";
import { PropertySummary, PropertyDetail } from "@/types";

// Define the shape of our store's state
interface PropertyState {
  // A normalized cache of property summaries, keyed by their ID string.
  summaries: Record<string, PropertySummary>;

  // A cache for full property details, also keyed by ID.
  // We keep this separate from summaries to avoid mixing data shapes.
  details: Record<string, PropertyDetail>;

  // Metadata that can be derived from the listings fetch.
  minPrice: number | null;
  maxPrice: number | null;

  // Define the actions that can modify the state
  addPropertySummaries: (properties: PropertySummary[]) => void;
  addPropertyDetail: (property: PropertyDetail) => void;
  setPriceRangeFromSummaries: (properties: PropertySummary[]) => void;
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  // --- INITIAL STATE ---
  summaries: {},
  details: {},
  minPrice: null,
  maxPrice: null,

  // --- ACTIONS ---

  /**
   * Adds or updates a list of property summaries in the normalized cache.
   * This is the primary way to populate the store from the listings page.
   */
  addPropertySummaries: (properties) => {
    set((state) => {
      // Create a new object from the existing state to ensure immutability
      const newSummaries = { ...state.summaries };
      properties.forEach((prop) => {
        newSummaries[prop.id] = prop;
      });
      return { summaries: newSummaries };
    });
  },

  /**
   * Adds or updates a single full property detail in the cache.
   * This would be called after a successful fetch on the property detail page.
   */
  addPropertyDetail: (property) => {
    set((state) => ({
      details: {
        ...state.details,
        [property.id]: property,
      },
    }));
  },

  /**
   * A utility action to calculate and set the min/max price range
   * based on a list of fetched properties. Useful for initializing filter sliders.
   */
  setPriceRangeFromSummaries: (properties) => {
    if (properties.length === 0) return;

    // Use reduce to find the min and max price in a single pass
    const { min, max } = properties.reduce(
      (acc, prop) => ({
        min: Math.min(acc.min, prop.price),
        max: Math.max(acc.max, prop.price),
      }),
      { min: Infinity, max: -Infinity }
    );

    // Only update the state if the range has actually changed
    const currentState = get();
    if (currentState.minPrice !== min || currentState.maxPrice !== max) {
      set({ minPrice: min, maxPrice: max });
    }
  },
}));

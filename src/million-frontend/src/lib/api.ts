import { PropertySummary, PropertyDetail } from "@/types";
import { notFound } from "next/navigation";

// 1. Get the base URL from environment variables, with a fallback for safety.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("API_BASE_URL:", API_BASE_URL);
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}
/**
 * A generic fetch wrapper to handle common logic like setting the base URL,
 * handling non-ok responses, and parsing JSON.
 * @param endpoint The API endpoint to call (e.g., '/api/properties').
 * @param options Optional fetch options (method, headers, body, etc.).
 * @returns The JSON response.
 * @throws An ApiError if the response status is not ok (>= 400).
 */
async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, options);

    if (response.status === 404) {
      // If the API returns 404, trigger the not-found page
      notFound();
    }

    if (!response.ok) {
      const errorInfo = await response
        .json()
        .catch(() => ({ title: response.statusText }));

      throw new ApiError(
        errorInfo.title || "An unknown API error occurred",
        response.status
      );
    }

    // Handle cases where the response might be empty (e.g., a 204 No Content)
    const text = await response.text();
    return text ? JSON.parse(text) : (null as T);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Handle network errors (e.g., backend is down)
    throw new ApiError(
      error instanceof Error ? error.message : "A network error occurred",
      503
    );
  }
}

/**
 * Custom error class for API-related issues.
 * This allows us to easily identify and handle API errors in our components.
 */
export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}

// --- Endpoint-specific functions ---

/**
 * Fetches a list of properties, optionally applying filters.
 * @param params URLSearchParams containing filter criteria (name, address, minPrice, maxPrice).
 * @returns A promise that resolves to an array of PropertySummary objects.
 */
export const getProperties = (
  params: URLSearchParams
): Promise<PropertySummary[]> => {
  console.log("Fetching properties with params:", params.toString());
  return fetcher<PropertySummary[]>(`/Properties?${params.toString()}`);
};

/**
 * Fetches the full details for a single property by its ID.
 * @param id The ObjectId string of the property.
 * @returns A promise that resolves to a PropertyDetail object.
 */
export const getPropertyById = (id: string): Promise<PropertyDetail> => {
  return fetcher<PropertyDetail>(`/Properties/${id}`);
};

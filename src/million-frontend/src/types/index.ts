/**
 * Represents the detailed information for a single property owner.
 * Corresponds to the `OwnerDto` in the backend.
 */
export interface Owner {
  id: string; // Corresponds to the C# string (mapped from ObjectId)
  name: string;
  address: string;
  photoUrl: string;
  birthday: string; // ISO 8601 date string (e.g., "2024-05-10T14:30:00Z")
}

/**
 * Represents a single image associated with a property.
 * Corresponds to the `PropertyImageDto` in the backend.
 */
export interface PropertyImage {
  id: string; // Corresponds to the C# string (mapped from ObjectId)
  fileUrl: string;
  isEnabled: boolean;
}

/**
 * Represents a historical sales record for a property.
 * Corresponds to the `PropertyTraceDto` in the backend.
 */
export interface PropertyTrace {
  id: string; // Corresponds to the C# string (mapped from ObjectId)
  dateSale: string; // ISO 8601 date string
  name: string;
  value: number; // Corresponds to the C# decimal
  tax: number; // Corresponds to the C# decimal
}

/**
 * Represents the summarized property data used in listing grids.
 * Corresponds to the `PropertyDto` from the `GetPropertiesList` endpoint.
 */
export interface PropertySummary {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  price: number;
  imageUrl: string;
}

/**
 * Represents the full, detailed data for a single property, including
 * all its related collections (owner, images, traces).
 * Corresponds to the `PropertyDetailDto` from the `GetPropertyDetailById` endpoint.
 */
export interface PropertyDetail {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  imageUrl: string;

  // Nested related data, populated by the backend's aggregation pipeline
  owner: Owner;
  images: PropertyImage[];
  traces: PropertyTrace[];
}

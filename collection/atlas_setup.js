/*
 * MongoDB Atlas Setup Script for the MillionRealEstate Project
 *
 * How to run in Atlas:
 * 1. Connect to your Atlas cluster using the MongoDB Shell (mongosh).
 * 2. Ensure you are using the correct database with `use MillionRealEstate;`
 * 3. Load and run this script using the command: `load('path/to/your/atlas_setup.js')`
 */

// --- Configuration ---
const dbName = "MillionRealEstate";
print(`--- Setting up database: ${dbName} ---`);
db = db.getSiblingDB(dbName);

// --- Utility function to safely create collections with validation ---
const createCollectionWithValidation = (collectionName, validator) => {
  const collections = db.getCollectionNames();
  if (collections.includes(collectionName)) {
    print(`Collection '${collectionName}' already exists. Skipping creation.`);
  } else {
    print(`Creating collection '${collectionName}' with validation...`);
    db.createCollection(collectionName, { validator });
    print(`Collection '${collectionName}' created.`);
  }
};

// --- Schema Definitions (Validators) ---

const ownerSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["name", "address", "birthday"],
    properties: {
      name: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      address: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      photoUrl: { bsonType: "string", description: "must be a string (URL)" },
      birthday: {
        bsonType: "date",
        description: "must be a date and is required",
      },
    },
  },
};

const propertySchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["ownerId", "name", "address", "price", "codeInternal", "year"],
    properties: {
      ownerId: {
        bsonType: "uuid",
        description: "FK to Owner's Guid, required",
      },
      name: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      address: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      price: {
        bsonType: "decimal",
        description: "must be a decimal and is required",
      },
      codeInternal: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      year: {
        bsonType: "int",
        description: "must be an integer and is required",
      },
    },
  },
};

const propertyImageSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["propertyId", "fileUrl", "isEnabled"],
    properties: {
      propertyId: {
        bsonType: "uuid",
        description: "FK to Property's Guid, required",
      },
      fileUrl: {
        bsonType: "string",
        description: "must be a URL string and is required",
      },
      isEnabled: {
        bsonType: "bool",
        description: "must be a boolean and is required",
      },
    },
  },
};

const propertyTraceSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["propertyId", "dateSale", "name", "value", "tax"],
    properties: {
      propertyId: {
        bsonType: "uuid",
        description: "FK to Property's Guid, required",
      },
      dateSale: {
        bsonType: "date",
        description: "must be a date and is required",
      },
      name: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      value: {
        bsonType: "decimal",
        description: "must be a decimal and is required",
      },
      tax: {
        bsonType: "decimal",
        description: "must be a decimal and is required",
      },
    },
  },
};

// --- Create Collections ---
createCollectionWithValidation("Owners", ownerSchema);
createCollectionWithValidation("Properties", propertySchema);
createCollectionWithValidation("PropertyImages", propertyImageSchema);
createCollectionWithValidation("PropertyTraces", propertyTraceSchema);

// --- Create Indexes for Performance ---
print("\n--- Creating Indexes ---");
print("Creating indexes on 'Properties' collection...");
db.Properties.createIndex({ name: 1 }, { name: "idx_name" }); // For sorting and filtering by name
db.Properties.createIndex({ address: 1 }, { name: "idx_address" }); // For filtering by address
db.Properties.createIndex({ price: 1 }, { name: "idx_price" }); // For price range queries

print("Creating index on 'PropertyImages' collection...");
db.PropertyImages.createIndex(
  { propertyId: 1 },
  { name: "idx_propertyimages_propertyId" }
);

print("Creating index on 'PropertyTraces' collection...");
db.PropertyTraces.createIndex(
  { propertyId: 1 },
  { name: "idx_propertytraces_propertyId" }
);

print("Index creation complete.");

// --- Optional: Clear and Insert Sample Data ---
// Note: You might want to comment this section out if you only want to set up the schema.
print("\n--- Inserting Sample Data (clearing existing data first) ---");

// Owners
const owner1Id = UUID();
const owner2Id = UUID();

db.Owners.deleteMany({});
db.Owners.insertMany([
  {
    _id: owner1Id,
    name: "Isabella Sterling",
    address: "123 Investor Lane, Capital City",
    photoUrl: "https://example.com/isabella.jpg",
    birthday: new Date("1980-05-20T00:00:00Z"),
  },
  {
    _id: owner2Id,
    name: "David Beaumont",
    address: "456 Dreamer's Drive, Serenity Bay",
    photoUrl: "https://example.com/david.jpg",
    birthday: new Date("1975-11-15T00:00:00Z"),
  },
]);
print("Inserted 2 owners.");

// Properties
const property1Id = UUID();
const property2Id = UUID();
const property3Id = UUID();
db.Properties.deleteMany({});
db.Properties.insertMany([
  {
    _id: property1Id,
    ownerId: owner1Id,
    name: "The Skyline Penthouse",
    address: "789 High Street, Suite 5000, Metropolis",
    price: NumberDecimal("4500000.00"),
    codeInternal: "PH001",
    year: 2022,
  },
  {
    _id: property2Id,
    ownerId: owner2Id,
    name: "Oceanfront Villa",
    address: "101 Coastline Road, Paradise Cove",
    price: NumberDecimal("8250000.00"),
    codeInternal: "VF101",
    year: 2018,
  },
  {
    _id: property3Id,
    ownerId: owner1Id,
    name: "Downtown Loft",
    address: "222 Art District, Apt 3B, Metropolis",
    price: NumberDecimal("1800000.00"),
    codeInternal: "DL222",
    year: 2020,
  },
]);
print("Inserted 3 properties.");

// Property Images
db.PropertyImages.deleteMany({});
db.PropertyImages.insertMany([
  {
    _id: UUID(),
    propertyId: property1Id,
    fileUrl: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    isEnabled: true,
  },
  {
    _id: UUID(),
    propertyId: property1Id,
    fileUrl: "https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg",
    isEnabled: false,
  },
  {
    _id: UUID(),
    propertyId: property2Id,
    fileUrl: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    isEnabled: true,
  },
  {
    _id: UUID(),
    propertyId: property3Id,
    fileUrl: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    isEnabled: true,
  },
]);
print("Inserted 4 property images.");

// Property Traces
db.PropertyTraces.deleteMany({});
db.PropertyTraces.insertOne({
  _id: UUID(),
  propertyId: property2Id,
  dateSale: new Date("2023-01-10T00:00:00Z"),
  name: "Previous Sale to Investment Group",
  value: NumberDecimal("7500000.00"),
  tax: NumberDecimal("375000.00"),
});
print("Inserted 1 property trace.");

print("\n--- Database setup is complete. ---");

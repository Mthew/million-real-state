// Switch to (or create) the MillionRealEstate database
db = db.getSiblingDB("MillionRealEstate");

print("Switched to database 'MillionRealEstate'.");

// --- 1. Drop existing collections to ensure a clean slate ---
print("Dropping existing collections...");
db.properties.drop();
db.owners.drop();
db.propertyimages.drop();
db.propertytraces.drop();

// --- 2. Create Collections and Define Schemas/Validators (Optional but Recommended) ---
// MongoDB is schema-less, but defining validators enforces structure.

print("Creating 'owners' collection...");
db.createCollection("owners", {
  validator: {
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
        photoUrl: {
          bsonType: "string",
          description: "must be a string (URL)",
        },
        birthday: {
          bsonType: "date",
          description: "must be a date and is required",
        },
      },
    },
  },
});

print("Creating 'properties' collection...");
db.createCollection("properties", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["ownerId", "name", "address", "price", "codeInternal", "year"],
      properties: {
        ownerId: {
          bsonType: "string", // Storing Owner's Guid as a string
          description: "must be a string and is required",
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
  },
});

print("Creating 'propertyimages' collection...");
db.createCollection("propertyimages", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["propertyId", "fileUrl", "isEnabled"],
      properties: {
        propertyId: {
          bsonType: "string", // Storing Property's Guid as a string
          description: "must be a string and is required",
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
  },
});

print("Creating 'propertytraces' collection...");
db.createCollection("propertytraces", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["propertyId", "dateSale", "name", "value", "tax"],
      properties: {
        propertyId: {
          bsonType: "string",
          description: "must be a string and is required",
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
  },
});

// --- 3. Create Indexes for Performance ---
// This is one of the most important steps for a performant application.

print("Creating indexes on 'properties' collection...");
db.properties.createIndex({ name: "text", address: "text" }); // Text index for searching
db.properties.createIndex({ price: 1 }); // Index for price range queries

print("Creating index on 'propertyimages' collection...");
db.propertyimages.createIndex({ propertyId: 1 }); // To quickly find images for a property

print("Creating index on 'propertytraces' collection...");
db.propertytraces.createIndex({ propertyId: 1 }); // To quickly find traces for a property

print("Schema setup and indexing complete.");

// --- 4. Insert Sample Data ---
// We use UUIDs to match the Guid type in our C# domain.

print("Inserting sample data...");

// Owners
const owner1Id = UUID();
const owner2Id = UUID();
db.owners.insertOne({
  _id: owner1Id,
  name: "Isabella Sterling",
  address: "123 Investor Lane, Capital City",
  photoUrl: "https://example.com/isabella.jpg",
  birthday: new Date("1980-05-20T00:00:00Z"),
});
db.owners.insertOne({
  _id: owner2Id,
  name: "David Beaumont",
  address: "456 Dreamer's Drive, Serenity Bay",
  photoUrl: "https://example.com/david.jpg",
  birthday: new Date("1975-11-15T00:00:00Z"),
});

// Properties
const property1Id = UUID();
const property2Id = UUID();
const property3Id = UUID();

db.properties.insertOne({
  _id: property1Id,
  ownerId: owner1Id.toString(),
  name: "The Skyline Penthouse",
  address: "789 High Street, Suite 5000, Metropolis",
  price: NumberDecimal("4500000.00"),
  codeInternal: "PH001",
  year: 2022,
});

db.properties.insertOne({
  _id: property2Id,
  ownerId: owner2Id.toString(),
  name: "Oceanfront Villa",
  address: "101 Coastline Road, Paradise Cove",
  price: NumberDecimal("8250000.00"),
  codeInternal: "VF101",
  year: 2018,
});

db.properties.insertOne({
  _id: property3Id,
  ownerId: owner1Id.toString(),
  name: "Downtown Loft",
  address: "222 Art District, Apt 3B, Metropolis",
  price: NumberDecimal("1800000.00"),
  codeInternal: "DL222",
  year: 2020,
});

// Property Images
db.propertyimages.insertMany([
  {
    propertyId: property1Id.toString(),
    fileUrl: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    isEnabled: true,
  },
  {
    propertyId: property1Id.toString(),
    fileUrl: "https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg",
    isEnabled: false,
  },
  {
    propertyId: property2Id.toString(),
    fileUrl: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    isEnabled: true,
  },
  {
    propertyId: property3Id.toString(),
    fileUrl: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    isEnabled: true,
  },
]);

// Property Traces
db.propertytraces.insertOne({
  propertyId: property2Id.toString(),
  dateSale: new Date("2023-01-10T00:00:00Z"),
  name: "Previous Sale to Investment Group",
  value: NumberDecimal("7500000.00"),
  tax: NumberDecimal("375000.00"),
});

print("Sample data inserted successfully.");
print("Database 'MillionRealEstate' is ready.");

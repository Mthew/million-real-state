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
        bsonType: "objectId",
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
        bsonType: "objectId",
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
        bsonType: "objectId",
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

// --- Seeding Data ---
print("\n--- Inserting Sample Data (clearing existing data first) ---");

// --- Owners ---
db.Owners.deleteMany({});
const owners = [
  {
    _id: new ObjectId(),
    name: "Isabella Sterling",
    address: "123 Investor Lane, Capital City",
    photoUrl: "https://i.pravatar.cc/150?u=isabella",
    birthday: new Date("1980-05-20T00:00:00Z"),
  },
  {
    _id: new ObjectId(),
    name: "David Beaumont",
    address: "456 Dreamer's Drive, Serenity Bay",
    photoUrl: "https://i.pravatar.cc/150?u=david",
    birthday: new Date("1975-11-15T00:00:00Z"),
  },
  {
    _id: new ObjectId(),
    name: "Eleanor Vance",
    address: "789 Heritage Row, Old Town",
    photoUrl: "https://i.pravatar.cc/150?u=eleanor",
    birthday: new Date("1968-09-02T00:00:00Z"),
  },
  {
    _id: new ObjectId(),
    name: "Marcus Thorne",
    address: "101 Pinnacle Point, Summit Hills",
    photoUrl: "https://i.pravatar.cc/150?u=marcus",
    birthday: new Date("1985-02-18T00:00:00Z"),
  },
];
db.Owners.insertMany(owners);
print(`Inserted ${owners.length} owners.`);

// --- Properties ---
db.Properties.deleteMany({});
const properties = [
  {
    _id: new ObjectId(),
    ownerId: owners[0]._id,
    name: "The Skyline Penthouse",
    address: "789 High Street, Suite 5000, Metropolis",
    price: NumberDecimal("4500000.00"),
    codeInternal: "PH001",
    year: 2022,
  },
  {
    _id: new ObjectId(),
    ownerId: owners[1]._id,
    name: "Oceanfront Villa",
    address: "101 Coastline Road, Paradise Cove",
    price: NumberDecimal("8250000.00"),
    codeInternal: "VF101",
    year: 2018,
  },
  {
    _id: new ObjectId(),
    ownerId: owners[0]._id,
    name: "Downtown Loft",
    address: "222 Art District, Apt 3B, Metropolis",
    price: NumberDecimal("1800000.00"),
    codeInternal: "DL222",
    year: 2020,
  },
  {
    _id: new ObjectId(),
    ownerId: owners[2]._id,
    name: "The Heritage Manor",
    address: "45 Grand Oak Lane, Willow Creek",
    price: NumberDecimal("6700000.00"),
    codeInternal: "HM45",
    year: 1995,
  },
  {
    _id: new ObjectId(),
    ownerId: owners[3]._id,
    name: "Summit View Estate",
    address: "1 Peak Circle, Aspen Grove",
    price: NumberDecimal("12500000.00"),
    codeInternal: "SV01",
    year: 2021,
  },
  {
    _id: new ObjectId(),
    ownerId: owners[1]._id,
    name: "Lakeside Retreat",
    address: "88 Serene Water Way, Emerald Lake",
    price: NumberDecimal("3200000.00"),
    codeInternal: "LR88",
    year: 2005,
  },
  {
    _id: new ObjectId(),
    ownerId: owners[0]._id,
    name: "The Onyx Condominium",
    address: "1500 Financial Avenue, Unit 2501, Metropolis",
    price: NumberDecimal("2950000.00"),
    codeInternal: "OC2501",
    year: 2019,
  },
  {
    _id: new ObjectId(),
    ownerId: owners[2]._id,
    name: "Country side Estate",
    address: "99 Rolling Hills Dr, Green Valley",
    price: NumberDecimal("5100000.00"),
    codeInternal: "CE99",
    year: 2010,
  },
  {
    _id: new ObjectId(),
    ownerId: owners[3]._id,
    name: "The Glass House",
    address: "33 Modernist Path, Innovation City",
    price: NumberDecimal("9800000.00"),
    codeInternal: "GH33",
    year: 2023,
  },
  {
    _id: new ObjectId(),
    ownerId: owners[1]._id,
    name: "Secluded Beach Bungalow",
    address: "7 Hidden Shore, Sandy Point",
    price: NumberDecimal("1200000.00"),
    codeInternal: "SBB07",
    year: 1988,
  },
  {
    _id: new ObjectId(),
    ownerId: owners[0]._id,
    name: "The Ambassador Suite",
    address: "1 Global Plaza, Embassy Row",
    price: NumberDecimal("7500000.00"),
    codeInternal: "AS01",
    year: 2015,
  },
  {
    _id: new ObjectId(),
    ownerId: owners[2]._id,
    name: "The Artist's Studio",
    address: "5 Creative Alley, Soho District",
    price: NumberDecimal("950000.00"),
    codeInternal: "AS5",
    year: 2008,
  },
  {
    _id: new ObjectId(),
    ownerId: owners[3]._id,
    name: "Mountain Top Chalet",
    address: "42 Alpine Trail, Frost Peak",
    price: NumberDecimal("4800000.00"),
    codeInternal: "MTC42",
    year: 2012,
  },
  {
    _id: new ObjectId(),
    ownerId: owners[0]._id,
    name: "The Solaris Apartment",
    address: "300 Solstice Blvd, Apt 12A, Sun City",
    price: NumberDecimal("2100000.00"),
    codeInternal: "SA12A",
    year: 2017,
  },
  {
    _id: new ObjectId(),
    ownerId: owners[1]._id,
    name: "The River House",
    address: "1 Water's Edge, Riverbend",
    price: NumberDecimal("3600000.00"),
    codeInternal: "RH01",
    year: 2002,
  },
];
db.Properties.insertMany(properties);
print(`Inserted ${properties.length} properties.`);

// --- Property Images ---
db.PropertyImages.deleteMany({});
const propertyImages = [
  // Skyline Penthouse
  {
    propertyId: properties[0]._id,
    fileUrl:
      "https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg",
    isEnabled: true,
  },
  {
    propertyId: properties[0]._id,
    fileUrl: "https://images.pexels.com/photos/439284/pexels-photo-439284.jpeg",
    isEnabled: false,
  },
  // Oceanfront Villa
  {
    propertyId: properties[1]._id,
    fileUrl: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    isEnabled: true,
  },
  // Downtown Loft
  {
    propertyId: properties[2]._id,
    fileUrl: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    isEnabled: true,
  },
  // Heritage Manor
  {
    propertyId: properties[3]._id,
    fileUrl: "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg",
    isEnabled: true,
  },
  // Summit View Estate
  {
    propertyId: properties[4]._id,
    fileUrl: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
    isEnabled: true,
  },
  // Lakeside Retreat
  {
    propertyId: properties[5]._id,
    fileUrl:
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    isEnabled: true,
  },
  // The Onyx Condominium
  {
    propertyId: properties[6]._id,
    fileUrl: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    isEnabled: true,
  },
  // Countryside Estate
  {
    propertyId: properties[7]._id,
    fileUrl: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg",
    isEnabled: true,
  },
  // The Glass House
  {
    propertyId: properties[8]._id,
    fileUrl:
      "https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg",
    isEnabled: true,
  },
  // Secluded Beach Bungalow
  {
    propertyId: properties[9]._id,
    fileUrl: "https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg",
    isEnabled: true,
  },
  // The Ambassador Suite
  {
    propertyId: properties[10]._id,
    fileUrl: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg",
    isEnabled: true,
  },
  // The Artist's Studio
  {
    propertyId: properties[11]._id,
    fileUrl:
      "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
    isEnabled: true,
  },
  // Mountain Top Chalet
  {
    propertyId: properties[12]._id,
    fileUrl:
      "https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg",
    isEnabled: true,
  },
  // The Solaris Apartment
  {
    propertyId: properties[13]._id,
    fileUrl:
      "https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg",
    isEnabled: true,
  },
  // The River House
  {
    propertyId: properties[14]._id,
    fileUrl: "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg",
    isEnabled: true,
  },
  // Property 1: The Skyline Penthouse (ID: properties[0]._id)
  {
    _id: new ObjectId(),
    propertyId: properties[0]._id,
    fileUrl:
      "https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg",
    isEnabled: true,
  },
  {
    _id: new ObjectId(),
    propertyId: properties[1]._id,
    fileUrl: "https://images.pexels.com/photos/439284/pexels-photo-439284.jpeg",
    isEnabled: false,
  }, // Disabled image

  // Property 2: Oceanfront Villa (ID: properties[1]._id)
  {
    _id: new ObjectId(),
    propertyId: properties[14]._id,
    fileUrl: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    isEnabled: true,
  },

  // Property 3: Downtown Loft (ID: properties[2]._id)
  {
    _id: new ObjectId(),
    propertyId: properties[14]._id,
    fileUrl: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    isEnabled: true,
  },

  // Property 4: The Heritage Manor (ID: properties[3]._id)
  {
    _id: new ObjectId(),
    propertyId: properties[13]._id,
    fileUrl: "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg",
    isEnabled: true,
  },

  // Property 5: Summit View Estate (ID: properties[4]._id)
  {
    _id: new ObjectId(),
    propertyId: properties[12]._id,
    fileUrl: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
    isEnabled: true,
  },

  // Property 6: Lakeside Retreat (ID: properties[5]._id)
  {
    _id: new ObjectId(),
    propertyId: properties[11]._id,
    fileUrl:
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    isEnabled: true,
  },

  // Property 7: The Onyx Condominium (ID: properties[6]._id)
  {
    _id: new ObjectId(),
    propertyId: properties[10]._id,
    fileUrl: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    isEnabled: true,
  },
  {
    _id: new ObjectId(),
    propertyId: properties[9]._id,
    fileUrl:
      "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
    isEnabled: true,
  }, // Second enabled image

  // Property 8: Countryside Estate (ID: properties[7]._id)
  {
    _id: new ObjectId(),
    propertyId: properties[8]._id,
    fileUrl: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg",
    isEnabled: true,
  },

  // Property 9: The Glass House (ID: properties[8]._id)
  {
    _id: new ObjectId(),
    propertyId: properties[7]._id,
    fileUrl:
      "https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg",
    isEnabled: true,
  },

  // Property 10: Secluded Beach Bungalow (ID: properties[9]._id)
  {
    _id: new ObjectId(),
    propertyId: properties[6]._id,
    fileUrl: "https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg",
    isEnabled: true,
  },

  // Property 11: The Ambassador Suite (ID: properties[10]._id)
  {
    _id: new ObjectId(),
    propertyId: properties[5]._id,
    fileUrl: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg",
    isEnabled: true,
  },

  // Property 12: The Artist's Studio (ID: properties[11]._id)
  {
    _id: new ObjectId(),
    propertyId: properties[4]._id,
    fileUrl:
      "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
    isEnabled: true,
  },

  // Property 13: Mountain Top Chalet (ID: properties[12]._id)
  {
    _id: new ObjectId(),
    propertyId: properties[3]._id,
    fileUrl:
      "https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg",
    isEnabled: true,
  },

  // Property 14: The Solaris Apartment (ID: properties[13]._id)
  {
    _id: new ObjectId(),
    propertyId: properties[2]._id,
    fileUrl:
      "https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg",
    isEnabled: true,
  },

  // Property 15: The River House (ID: properties[14]._id)
  {
    _id: new ObjectId(),
    propertyId: properties[1]._id,
    fileUrl: "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg",
    isEnabled: true,
  },
];
// Add an _id to each image
propertyImages.forEach((img) => (img._id = new ObjectId()));
db.PropertyImages.insertMany(propertyImages);
print(`Inserted ${propertyImages.length} property images.`);

// --- Property Traces ---
db.PropertyTraces.deleteMany({});
const propertyTraces = [
  {
    _id: new ObjectId(),
    propertyId: properties[1]._id,
    dateSale: new Date("2021-01-10T00:00:00Z"),
    name: "Previous Sale to Investment Group",
    value: NumberDecimal("7500000.00"),
    tax: NumberDecimal("375000.00"),
  },
  {
    _id: new ObjectId(),
    propertyId: properties[4]._id,
    dateSale: new Date("2022-06-15T00:00:00Z"),
    name: "Acquired by Mountain Holdings LLC",
    value: NumberDecimal("11000000.00"),
    tax: NumberDecimal("550000.00"),
  },
  {
    _id: new ObjectId(),
    propertyId: properties[8]._id,
    dateSale: new Date("2023-03-20T00:00:00Z"),
    name: "Initial Purchase from Architect",
    value: NumberDecimal("8900000.00"),
    tax: NumberDecimal("445000.00"),
  },
  // Trace 1: For Oceanfront Villa (properties[1]) - A recent high-value sale.
  {
    _id: new ObjectId(),
    propertyId: properties[1]._id,
    dateSale: new Date("2022-03-15T00:00:00Z"),
    name: "Sale to Private Equity Firm",
    value: NumberDecimal("8000000.00"),
    tax: NumberDecimal("400000.00"),
  },

  // Traces 2 & 3: For The Heritage Manor (properties[3]) - Shows a sales history.
  {
    _id: new ObjectId(),
    propertyId: properties[3]._id,
    dateSale: new Date("1998-11-20T00:00:00Z"),
    name: "Original Purchase from Estate",
    value: NumberDecimal("2500000.00"),
    tax: NumberDecimal("125000.00"),
  },
  {
    _id: new ObjectId(),
    propertyId: properties[3]._id,
    dateSale: new Date("2015-07-01T00:00:00Z"),
    name: "Renovation Sale to Vance Family",
    value: NumberDecimal("5500000.00"),
    tax: NumberDecimal("275000.00"),
  },

  // Trace 4: For Summit View Estate (properties[4]) - The first sale from the developer.
  {
    _id: new ObjectId(),
    propertyId: properties[4]._id,
    dateSale: new Date("2021-08-10T00:00:00Z"),
    name: "Purchase from Summit Developers Inc.",
    value: NumberDecimal("11500000.00"),
    tax: NumberDecimal("575000.00"),
  },

  // Trace 5: For The Onyx Condominium (properties[6]) - A corporate acquisition.
  {
    _id: new ObjectId(),
    propertyId: properties[6]._id,
    dateSale: new Date("2020-02-25T00:00:00Z"),
    name: "Corporate Acquisition by Sterling Corp",
    value: NumberDecimal("2800000.00"),
    tax: NumberDecimal("140000.00"),
  },

  // Trace 6: For The Glass House (properties[8]) - An interesting backstory.
  {
    _id: new ObjectId(),
    propertyId: properties[8]._id,
    dateSale: new Date("2023-01-05T00:00:00Z"),
    name: "Initial Purchase from Architect's Firm",
    value: NumberDecimal("9500000.00"),
    tax: NumberDecimal("475000.00"),
  },

  // Traces 7 & 8: For Secluded Beach Bungalow (properties[9]) - Long history and appreciation.
  {
    _id: new ObjectId(),
    propertyId: properties[9]._id,
    dateSale: new Date("1995-04-12T00:00:00Z"),
    name: "Auction Purchase",
    value: NumberDecimal("350000.00"),
    tax: NumberDecimal("17500.00"),
  },
  {
    _id: new ObjectId(),
    propertyId: properties[9]._id,
    dateSale: new Date("2018-09-30T00:00:00Z"),
    name: "Resale to Beaumont Family",
    value: NumberDecimal("1100000.00"),
    tax: NumberDecimal("55000.00"),
  },

  // Trace 9: For The Artist's Studio (properties[11]) - Adds a different type of sale history.
  {
    _id: new ObjectId(),
    propertyId: properties[11]._id,
    dateSale: new Date("2014-11-05T00:00:00Z"),
    name: "Foreclosure Auction Sale",
    value: NumberDecimal("650000.00"),
    tax: NumberDecimal("32500.00"),
  },

  // Trace 10: For Mountain Top Chalet (properties[12]) - A non-traditional transfer.
  {
    _id: new ObjectId(),
    propertyId: properties[12]._id,
    dateSale: new Date("2019-05-22T00:00:00Z"),
    name: "Inheritance Transfer",
    value: NumberDecimal("3000000.00"),
    tax: NumberDecimal("150000.00"),
  },

  // Trace 11: For The River House (properties[14]) - A standard resale.
  {
    _id: new ObjectId(),
    propertyId: properties[14]._id,
    dateSale: new Date("2011-06-18T00:00:00Z"),
    name: "Sale by Riverbend Realty",
    value: NumberDecimal("2500000.00"),
    tax: NumberDecimal("125000.00"),
  },

  // Trace 12: For Skyline Penthouse (properties[0]) - First sale.
  {
    _id: new ObjectId(),
    propertyId: properties[0]._id,
    dateSale: new Date("2022-02-01T00:00:00Z"),
    name: "Off-Plan Purchase from Developer",
    value: NumberDecimal("4200000.00"),
    tax: NumberDecimal("210000.00"),
  },

  // Trace 13: For Downtown Loft (properties[2]) - A commercial-sounding sale.
  {
    _id: new ObjectId(),
    propertyId: properties[2]._id,
    dateSale: new Date("2021-12-10T00:00:00Z"),
    name: "Sale to Urban Properties Inc.",
    value: NumberDecimal("1750000.00"),
    tax: NumberDecimal("87500.00"),
  },

  // Trace 14: For Lakeside Retreat (properties[5])
  {
    _id: new ObjectId(),
    propertyId: properties[5]._id,
    dateSale: new Date("2016-08-20T00:00:00Z"),
    name: "Sale after renovations",
    value: NumberDecimal("2800000.00"),
    tax: NumberDecimal("140000.00"),
  },

  // Trace 15: For The Ambassador Suite (properties[10]) - A high-profile sale.
  {
    _id: new ObjectId(),
    propertyId: properties[10]._id,
    dateSale: new Date("2017-03-12T00:00:00Z"),
    name: "Diplomatic Sale to Foreign Consulate",
    value: NumberDecimal("7000000.00"),
    tax: NumberDecimal("350000.00"),
  },
];
db.PropertyTraces.insertMany(propertyTraces);
print(`Inserted ${propertyTraces.length} property traces.`);

print("\n--- Database setup is complete. ---");
// --- Seeding Data ---

# Million Real Estate - Database Configuration

This document provides comprehensive information about the MongoDB database schema, setup procedures, and maintenance tasks for the Million Real Estate application.

## 📋 Table of Contents

- [Database Overview](#-database-overview)
- [Database Schema](#-database-schema)
- [Connection Configuration](#-connection-configuration)
- [Database Setup](#-database-setup)
- [Seed Data](#-seed-data)
- [Database Operations](#-database-operations)
- [Performance Optimization](#-performance-optimization)
- [Troubleshooting](#-troubleshooting)

## 🗄️ Database Overview

The Million Real Estate application uses **MongoDB** as its primary database, designed to store luxury property listings, owner information, property images, and sales history. The database follows a document-based schema optimized for real estate data management.

### Key Features

- **Schema Validation**: JSON Schema validation for data integrity
- **Performance Indexes**: Optimized indexes for search and filtering
- **Rich Data Types**: Support for decimals, dates, and object references
- **Scalable Design**: Designed to handle large property datasets

### Database Name

- **Production**: `MillionRealEstate`
- **Development**: `MillionRealEstate`
- **Test**: `MillionRealEstate_Test`

## 🏗️ Database Schema

The database consists of four main collections with defined relationships:

### 1. Owners Collection

Stores information about property owners.

```javascript
// Schema Definition
{
  "_id": ObjectId,           // Primary key
  "name": String,           // Owner's full name (required)
  "address": String,        // Owner's address (required)
  "photoUrl": String,       // Profile photo URL (optional)
  "birthday": Date          // Date of birth (required)
}
```

**Validation Rules:**

- `name`: Must be a string, required
- `address`: Must be a string, required
- `photoUrl`: Must be a valid URL string, optional
- `birthday`: Must be a valid date, required

### 2. Properties Collection

Main collection storing property information.

```javascript
// Schema Definition
{
  "_id": ObjectId,           // Primary key
  "ownerId": ObjectId,      // Foreign key to Owners collection (required)
  "name": String,           // Property name (required)
  "address": String,        // Property address (required)
  "price": Decimal128,      // Property price (required)
  "codeInternal": String,   // Internal property code (required)
  "year": Int32            // Year built (required)
}
```

**Validation Rules:**

- `ownerId`: Must be a valid ObjectId referencing Owners collection
- `name`: Must be a string, required
- `address`: Must be a string, required
- `price`: Must be a decimal number, required
- `codeInternal`: Must be a unique string identifier, required
- `year`: Must be an integer, required

**Indexes:**

- `name`: For sorting and text search
- `address`: For location-based filtering
- `price`: For price range queries

### 3. PropertyImages Collection

Stores multiple images for each property.

```javascript
// Schema Definition
{
  "_id": ObjectId,           // Primary key
  "propertyId": ObjectId,   // Foreign key to Properties collection (required)
  "fileUrl": String,        // Image URL (required)
  "isEnabled": Boolean      // Visibility flag (required)
}
```

**Validation Rules:**

- `propertyId`: Must be a valid ObjectId referencing Properties collection
- `fileUrl`: Must be a valid URL string, required
- `isEnabled`: Must be a boolean value, required

**Indexes:**

- `propertyId`: For efficient property image retrieval

### 4. PropertyTraces Collection

Stores sales history and transaction records for properties.

```javascript
// Schema Definition
{
  "_id": ObjectId,           // Primary key
  "propertyId": ObjectId,   // Foreign key to Properties collection (required)
  "dateSale": Date,         // Sale date (required)
  "name": String,           // Transaction name/description (required)
  "value": Decimal128,      // Sale value (required)
  "tax": Decimal128         // Tax amount (required)
}
```

**Validation Rules:**

- `propertyId`: Must be a valid ObjectId referencing Properties collection
- `dateSale`: Must be a valid date, required
- `name`: Must be a string description, required
- `value`: Must be a decimal number, required
- `tax`: Must be a decimal number, required

**Indexes:**

- `propertyId`: For efficient property trace retrieval

## 🔌 Connection Configuration

### MongoDB Atlas (Cloud - Recommended for Production)

```bash
# Connection String
mongodb+srv://devthewai_db_user:K8cFPuk26vscyJN8@cluster0.q7l0tnb.mongodb.net/MillionRealEstate
```

**Atlas Configuration:**

- **Cluster**: `cluster0.q7l0tnb.mongodb.net`
- **Database**: `MillionRealEstate`
- **User**: `devthewai_db_user`
- **Authentication**: Username/Password

### Local MongoDB (Development)

```bash
# Local Connection String
mongodb://localhost:27017/MillionRealEstate
```

**Local Setup Requirements:**

1. Install MongoDB Community Server
2. Start MongoDB service
3. Database will be created automatically

### .NET Application Configuration

```json
// appsettings.json
{
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017/MillionRealEstate",
    "DatabaseName": "MillionRealEstate"
  }
}
```

```bash
# User Secrets (Development)
dotnet user-secrets set "MongoDbSettings:ConnectionString" "mongodb://localhost:27017/MillionRealEstate" --project src/Million.API
```

## 🚀 Database Setup

### Prerequisites

Before setting up the database, ensure you have:

- **MongoDB Shell (mongosh)**: [Install here](https://www.mongodb.com/docs/mongodb-shell/install/)
- **MongoDB Server**: Local installation or Atlas cluster access
- **Network Access**: Firewall/network configuration for database connection

### Initial Setup Steps

1. **Start MongoDB Service** (Local only):

   ```bash
   # Windows (as Administrator)
   net start MongoDB

   # macOS/Linux
   sudo systemctl start mongod
   # or
   brew services start mongodb/brew/mongodb-community
   ```

2. **Verify Connection**:

   ```bash
   # Test local connection
   mongosh mongodb://localhost:27017

   # Test Atlas connection
   mongosh "mongodb+srv://devthewai_db_user:K8cFPuk26vscyJN8@cluster0.q7l0tnb.mongodb.net/"
   ```

3. **Run Database Initialization**:

   ```bash
   # Navigate to project root
   cd million-real-state

   # Initialize database with schema and sample data
   mongosh mongodb://localhost:27017/MillionRealEstate collection/seed_setup.js
   ```

### Seed Script Execution

The `collection/seed_setup.js` script performs the following operations:

1. **Creates Database**: Initializes the `MillionRealEstate` database
2. **Creates Collections**: Sets up four main collections with validation
3. **Applies Schema Validation**: Enforces data integrity rules
4. **Creates Indexes**: Optimizes query performance
5. **Seeds Sample Data**: Inserts realistic property data

#### Running the Seed Script

```bash
# Method 1: Direct execution with mongosh
mongosh mongodb://localhost:27017/MillionRealEstate collection/seed_setup.js

# Method 2: Connect first, then load script
mongosh mongodb://localhost:27017/MillionRealEstate
# In mongosh console:
load('collection/seed_setup.js')

# Method 3: For Atlas (with authentication)
mongosh "mongodb+srv://devthewai_db_user:K8cFPuk26vscyJN8@cluster0.q7l0tnb.mongodb.net/MillionRealEstate" collection/seed_setup.js
```

#### Script Output

```
--- Setting up database: MillionRealEstate ---
Creating collection 'Owners' with validation...
Creating collection 'Properties' with validation...
Creating collection 'PropertyImages' with validation...
Creating collection 'PropertyTraces' with validation...

--- Creating Indexes ---
Creating indexes on 'Properties' collection...
Creating index on 'PropertyImages' collection...
Creating index on 'PropertyTraces' collection...
Index creation complete.

--- Inserting Sample Data ---
Inserted 4 owners.
Inserted 15 properties.
Inserted 31 property images.
Inserted 26 property traces.

--- Database setup is complete. ---
```

## 📊 Seed Data

The database is populated with realistic luxury real estate data:

### Sample Owners (4 records)

- **Isabella Sterling**: Investor persona, multiple properties
- **David Beaumont**: Dream home seeker, high-value properties
- **Eleanor Vance**: Heritage property owner
- **Marcus Thorne**: Modern property investor

### Sample Properties (15 records)

High-end properties with diverse characteristics:

- **Price Range**: $950K - $12.5M
- **Property Types**: Penthouses, villas, lofts, estates, chalets
- **Locations**: Urban, coastal, mountain, countryside
- **Years**: 1988 - 2023

### Sample Images (31+ records)

- High-quality property images from Pexels
- Multiple images per property
- Enabled/disabled states for testing

### Sample Transaction History (26+ records)

- Historical sales data
- Various transaction types
- Tax calculations
- Date ranges from 1995 to 2023

## 🔄 Database Operations

### Common Operations

#### View All Collections

```bash
mongosh mongodb://localhost:27017/MillionRealEstate
# In mongosh:
show collections
```

#### Query Examples

```javascript
// Find all properties
db.Properties.find().pretty();

// Find properties by price range
db.Properties.find({
  price: {
    $gte: NumberDecimal("2000000"),
    $lte: NumberDecimal("5000000"),
  },
}).pretty();

// Find properties with images
db.Properties.aggregate([
  {
    $lookup: {
      from: "PropertyImages",
      localField: "_id",
      foreignField: "propertyId",
      as: "images",
    },
  },
  { $match: { "images.isEnabled": true } },
]);
```

#### Reset Database

```bash
# Clear all data and re-seed
mongosh mongodb://localhost:27017/MillionRealEstate collection/seed_setup.js
```

#### Backup Database

```bash
# Export all collections
mongodump --host localhost:27017 --db MillionRealEstate --out backup/

# Restore from backup
mongorestore --host localhost:27017 --db MillionRealEstate backup/MillionRealEstate/
```

## ⚡ Performance Optimization

### Indexes

The database includes optimized indexes for common queries:

```javascript
// Properties collection indexes
db.Properties.createIndex({ name: 1 }, { name: "idx_name" });
db.Properties.createIndex({ address: 1 }, { name: "idx_address" });
db.Properties.createIndex({ price: 1 }, { name: "idx_price" });

// PropertyImages collection indexes
db.PropertyImages.createIndex(
  { propertyId: 1 },
  { name: "idx_propertyimages_propertyId" }
);

// PropertyTraces collection indexes
db.PropertyTraces.createIndex(
  { propertyId: 1 },
  { name: "idx_propertytraces_propertyId" }
);
```

### Query Optimization Tips

1. **Use Indexes**: Always query on indexed fields when possible
2. **Limit Results**: Use `.limit()` for pagination
3. **Project Fields**: Select only needed fields with `.project()`
4. **Aggregation Pipelines**: Use for complex queries joining collections

### Monitoring Performance

```javascript
// View execution stats
db.Properties.find({ price: { $gt: NumberDecimal("5000000") } }).explain(
  "executionStats"
);

// View active operations
db.currentOp();

// View database statistics
db.stats();
```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Connection Timeout

```bash
# Error: MongoNetworkTimeoutError
# Solution: Check MongoDB service status
mongosh --eval "db.runCommand('ping')"
```

#### 2. Authentication Failed

```bash
# Error: Authentication failed
# Solution: Verify credentials and connection string
mongosh "mongodb+srv://username:password@cluster.mongodb.net/database"
```

#### 3. Schema Validation Errors

```javascript
// Error: Document failed validation
// Solution: Check data types and required fields
db.runCommand({
  collMod: "Properties",
  validator: {
    /* updated schema */
  },
});
```

#### 4. Index Creation Issues

```javascript
// Error: Index already exists
// Solution: Drop and recreate index
db.Properties.dropIndex("idx_name");
db.Properties.createIndex({ name: 1 }, { name: "idx_name" });
```

#### 5. Seed Script Errors

```bash
# Error: Cannot load script
# Solution: Check file path and permissions
mongosh mongodb://localhost:27017/MillionRealEstate --file collection/seed_setup.js
```

### Maintenance Tasks

#### Regular Maintenance

```javascript
// Compact collections (reclaim space)
db.runCommand({ compact: "Properties" });

// Rebuild indexes
db.Properties.reIndex();

// Check collection statistics
db.Properties.stats();
```

#### Health Checks

```javascript
// Database health check
db.runCommand({ serverStatus: 1 });

// Check replica set status (if applicable)
rs.status();
```

## 📚 Additional Resources

### MongoDB Documentation

- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [MongoDB Shell (mongosh)](https://docs.mongodb.com/mongodb-shell/)
- [Schema Validation](https://docs.mongodb.com/manual/core/schema-validation/)

### Tools

- **MongoDB Compass**: GUI for database management
- **MongoDB Atlas**: Cloud database service
- **Robo 3T**: Third-party MongoDB GUI

### Best Practices

1. **Always use schema validation** for data integrity
2. **Create appropriate indexes** for query performance
3. **Regularly backup your database**
4. **Monitor database performance** and optimize queries
5. **Use connection pooling** in production applications

---

**For questions or issues, refer to the MongoDB documentation or contact the development team.**

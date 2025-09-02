# Million Real Estate - Backend API

This document provides all the necessary information to set up, run, and test the backend API for the Million Real Estate portal. This API is built with .NET 8, C#, and MongoDB, following Clean Architecture principles to ensure a robust, scalable, and maintainable system.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Configure Database](#2-configure-database)
  - [3. Configure User Secrets](#3-configure-user-secrets)
  - [4. Run the Application](#4-run-the-application)
- [Running the Database Setup Script](#running-the-database-setup-script)
- [API Endpoints & Documentation](#api-endpoints--documentation)
- [Running the Tests](#running-the-tests)
- [Running with Docker (Recommended)](#running-with-docker-recommended)

## Features

- **Property Listings**: Retrieve a list of all available properties.
- **Advanced Filtering**: Filter properties by name, address, and price range.
- **Detailed Property View**: Fetch a comprehensive view of a single property, including owner details, images, and sales history, in a single optimized query.
- **Clean Architecture**: A well-structured, decoupled codebase that separates concerns for high maintainability.
- **Optimized for Performance**: Utilizes MongoDB's aggregation pipeline for efficient data retrieval.

## Technology Stack

- **Framework**: .NET 8
- **Language**: C#
- **Database**: MongoDB
- **Architecture**: Clean Architecture, CQRS with MediatR
- **API Documentation**: Swagger (OpenAPI)
- **Testing**: NUnit, Moq, FluentAssertions, Mongo2Go

## Project Architecture

The solution is structured following the principles of Clean Architecture to create a separation of concerns:

- **`Million.Domain`**: Contains the core business entities and logic. It has no external dependencies.
- **`Million.Application`**: Implements the application's use cases (queries and commands) and defines interfaces for external services like repositories.
- **`Million.Infrastructure`**: Contains the implementation for external services, primarily the MongoDB data access layer.
- **`Million.Api`**: The presentation layer, which exposes the application's functionality via a RESTful API.
- **`Million.Api.Tests`**: Contains unit and integration tests for the API.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **.NET 8 SDK**: [Download here](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Visual Studio 2022**: [Download here](https://visualstudio.microsoft.com/vs/)
- **MongoDB**: Can be a local instance, a Docker container, or a MongoDB Atlas cluster.
- **mongosh**: The MongoDB Shell. [Installation Guide](https://www.mongodb.com/docs/mongodb-shell/install/)

## Getting Started

Follow these steps to get the backend up and running locally.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-repository-folder>
```

### 2. Configure Database

The application requires a connection to a MongoDB instance. The setup script will create the `MillionRealEstate` database and collections for you.

First, run the setup script to initialize your database with the correct schema, indexes, and sample data.

See the section [Running the Database Setup Script](#running-the-database-setup-script) below for detailed instructions.

### 3. Configure User Secrets

For local development, we use the .NET Secret Manager to handle the database connection string, keeping it out of the `appsettings.json` file.

1.  **Navigate to the API project directory** in your terminal:

    ```bash
    cd src/Million.Api
    ```

2.  **Initialize User Secrets** for the project:

    ```bash
    dotnet user-secrets init
    ```

3.  **Set the Connection String Secret**:
    Replace `<YOUR_MONGODB_CONNECTION_STRING>` with your actual connection string.

    _For a default local instance:_

    ```bash
    dotnet user-secrets set "MongoDbSettings:ConnectionString" "mongodb://localhost:27017/MillionRealEstate"
    ```

    _For MongoDB Atlas:_

    ```bash
    dotnet user-secrets set "MongoDbSettings:ConnectionString" "mongodb+srv://<user>:<password>@<cluster-url>/MillionRealEstate?retryWrites=true&w=majority"
    ```

The application is configured to automatically use this secret in your local development environment, overriding any value in `appsettings.json`.

### 4. Run the Application

You can now run the application from Visual Studio 2022:

1.  Open the `Million.sln` solution file in Visual Studio.
2.  Set `Million.Api` as the startup project (it should be the default).
3.  Press `F5` or the "Start" button to build and run the application.

The application will launch, and a browser window should open to the Swagger UI, where you can explore and interact with the API endpoints.

## Running the Database Setup Script

The database initialization script is located at `./collections/atlas_setup.js`. This script creates collections, defines schema validation, builds performance indexes, and seeds the database with sample data.

1.  **Open a new terminal or command prompt.**

2.  **Navigate to the script's directory:**

    ```bash
    cd path/to/your/project/collections
    ```

3.  **Run the script using `mongosh`**:

    _If connecting to a local MongoDB instance:_

    ```bash
    mongosh < atlas_setup.js
    ```

    _If connecting to MongoDB Atlas, you need to provide your connection string:_

    ```bash
    mongosh "mongodb+srv://<user>:<password>@<cluster-url>/MillionRealEstate" --file atlas_setup.js
    ```

After the script finishes, your database will be ready for the application.

## API Endpoints & Documentation

Once the application is running, API documentation is available via Swagger UI. Navigate to the root URL of the application in your browser (e.g., `https://localhost:7123/`) to view the interactive documentation.

Key endpoints include:

- `GET /api/properties`: Retrieves a list of properties with support for filtering.
- `GET /api/properties/{id}`: Retrieves the full details of a single property.

## Running the Tests

The solution includes a dedicated test project (`Million.Api.Tests`) with both unit and integration tests.

To run the tests:

1.  **From Visual Studio:**

    - Open the **Test Explorer** window (`Test > Test Explorer`).
    - Click the "Run All Tests" button.

2.  **From the .NET CLI:**
    - Navigate to the root directory of the solution.
    - Run the command:
      ```bash
      dotnet test
      ```

The integration tests use an in-memory MongoDB provider (`Mongo2Go`), so they do not require a running MongoDB instance and will not affect your local database. They run in complete isolation.

## Running with Docker (Recommended)

This is the easiest way to run the entire backend stack, including the MongoDB database, with a single command.

### Prerequisites for Docker

- **Docker Desktop**: [Install Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Build and Run the Containers

From the root directory of the solution (where the `docker-compose.yml` file is), run the following command:

```bash
docker-compose up --build
```

- `--build`: This flag tells Docker Compose to build the API image from your `Dockerfile` before starting the containers. You only need to use it the first time or after you make code changes.

This command will:

1.  Pull the official MongoDB image from Docker Hub.
2.  Build your Million.Api Docker image.
3.  Start both containers and connect them on a shared network.

You will see logs from both the API and the database in your terminal.

### 2. Initialize the Database (First-Time Setup)

After starting the containers, the MongoDB database will be running but empty. You need to run the setup script against the **Docker container**.

1.  **Open a new, separate terminal window.** (Leave the `docker-compose up` command running in the first one).

2.  **Run the setup script:**
    From the root of your project, execute the following `mongosh` command. It connects to the MongoDB instance running inside Docker (which we exposed on `localhost:27017`).

    ```bash
    mongosh "mongodb://localhost:27017/MillionRealEstate" --file ./collections/atlas_setup.js
    ```

Your database is now initialized and seeded with data.

### 3. Access the API

The API is now running and accessible on your host machine:

- **Swagger UI / API Documentation**: [http://localhost:8080](http://localhost:8080)
- **API Base URL**: `http://localhost:8080`

### 4. Stopping the Application

To stop the containers, go to the terminal where `docker-compose up` is running and press `Ctrl + C`.

To stop and remove the containers completely, you can run:

```bash
docker-compose down
```

_Note: Using `docker-compose down -v` will also remove the `mongodb_data` volume, deleting all your database data._

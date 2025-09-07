# Million Real Estate - Monorepo

A comprehensive, luxury real estate portal built with modern full-stack technologies. This monorepo contains both the frontend (Next.js 15) and backend (.NET 8) applications, designed to deliver an elegant and sophisticated experience for high-end property discovery and management.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Development Workflows](#-development-workflows)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Contributing](#-contributing)

## 🌟 Project Overview

Million Real Estate is a premium real estate portal targeting affluent property buyers and investors. The platform provides an exclusive experience for browsing and discovering luxury properties with a focus on visual storytelling and seamless user interaction.

### Key Features

- 🏠 **Premium Property Listings** - Browse luxury properties with advanced filtering
- 📱 **Mobile-First Design** - Responsive across all device types
- 🖼️ **Immersive Gallery** - High-resolution property imagery
- 🔍 **Advanced Search** - Filter by name, address, and price range
- ⚡ **High Performance** - Optimized for speed and scalability
- 🎨 **Luxury Aesthetics** - Premium design with sophisticated typography
- ♿ **Accessibility** - WCAG 2.1 Level AA compliance
- 🧪 **Fully Tested** - Comprehensive test coverage

### Target Personas

- **The Investor (Isabella)**: Data-driven professionals seeking valuable properties with clear financial metrics
- **The Dream Home Seeker (David)**: High-net-worth individuals looking for aesthetic, lifestyle-focused primary residences

## 🏗️ Architecture

The project follows a **Clean Architecture** approach with clear separation of concerns:

### Backend Architecture (.NET 8)

```
Million.API/              # Presentation Layer (Controllers, Middleware)
├── Controllers/          # API endpoints
├── Middleware/          # Cross-cutting concerns
└── Program.cs           # Application entry point

Million.Application/      # Application Layer (Use Cases, DTOs)
├── DTOs/                # Data Transfer Objects
├── Features/            # CQRS Commands/Queries with MediatR
├── Interfaces/          # Application contracts
└── Mappings/            # Object mappings

Million.Domain/           # Domain Layer (Entities, Business Rules)
├── Entities/            # Core business entities
├── CustomEntities/      # Domain-specific models
└── Exceptions/          # Domain exceptions

Million.Infrastructure/   # Infrastructure Layer (Data Access, External Services)
├── Persistence/         # MongoDB data access
└── Settings/            # Configuration settings
```

### Frontend Architecture (Next.js 15)

```
src/
├── app/                 # Next.js App Router (Pages & Routing)
├── components/          # UI Components
│   ├── ui/             # Atomic components
│   └── features/       # Composed components
├── lib/                # Business Logic & Utilities
├── stores/             # Global State (Zustand)
└── types/              # TypeScript definitions
```

### Data Flow

1. **Frontend** makes API requests to the .NET backend
2. **Controllers** receive requests and delegate to Application layer
3. **MediatR** handles CQRS commands/queries
4. **MongoDB** provides data persistence
5. **DTOs** ensure clean data contracts between layers

## 📁 Project Structure

```
million-real-state/                    # Monorepo root
├── 📄 package.json                   # Monorepo workspace configuration
├── 📄 docker-compose.yml             # Full-stack containerization
├── 📄 Million.sln                    # .NET solution file
├── 📄 bunfig.toml                    # Bun configuration
├── 📁 src/                           # Source code
│   ├── 📁 million-frontend/          # Next.js 15 frontend
│   │   ├── 📄 package.json
│   │   ├── 📁 src/
│   │   │   ├── 📁 app/              # App Router pages
│   │   │   ├── 📁 components/       # React components
│   │   │   ├── 📁 lib/              # Utilities & API
│   │   │   ├── 📁 stores/           # State management
│   │   │   └── 📁 types/            # TypeScript definitions
│   │   └── 📁 __tests__/            # Frontend tests
│   ├── 📁 Million.API/               # .NET 8 Web API
│   ├── 📁 Million.Application/       # Application layer
│   ├── 📁 Million.Domain/            # Domain layer
│   ├── 📁 Million.Infrastructure/    # Infrastructure layer
│   └── 📁 Million.API.Tests/         # Backend tests
├── 📁 doc/                           # Project documentation
│   ├── 📄 front-end-spec.md         # Frontend specifications
│   ├── 📄 prd.md                    # Product requirements
│   └── 📄 database-config.md        # Database setup
├── 📁 collection/                    # Database setup scripts
│   └── 📄 seed_setup.js             # MongoDB initialization
└── 📄 README.md                     # This file
```

## 🛠️ Technology Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://radix-ui.com/) + Custom Components
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

#### Frontend Screenshots

**Property Listings Page**
![Million Listings Page](million-listings-page.png)
_Responsive property listings with advanced filtering capabilities_

**Property Detail Page**
![Million Property Detail Page](million-property-detail-page.png)
_Immersive property detail view with gallery, owner information, and sales history_

### Backend

- **Framework**: .NET 8 Web API
- **Language**: C#
- **Database**: MongoDB
- **Architecture**: Clean Architecture with CQRS
- **Mediator**: [MediatR](https://github.com/jbogard/MediatR)
- **Testing**: NUnit + Moq + FluentAssertions
- **Documentation**: Swagger/OpenAPI

#### API Documentation

![Million API Documentation](million-api-docs.png)
_Comprehensive Swagger/OpenAPI documentation for all endpoints_

### Infrastructure

- **Package Manager**: [Bun](https://bun.sh/)
- **Containerization**: Docker + Docker Compose
- **Development**: Turbopack (Next.js)
- **Database Tools**: MongoDB Compass, mongosh

## 📋 Prerequisites

Before getting started, ensure you have the following installed:

### Required

- **Node.js 18+** (recommended: Node.js 20+)
- **Bun** - [Install Bun](https://bun.sh/docs/installation)
- **.NET 8 SDK** - [Download here](https://dotnet.microsoft.com/download/dotnet/8.0)
- **MongoDB** - [Local install](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Git** - [Download here](https://git-scm.com/)

### Optional (for Docker)

- **Docker Desktop** - [Install here](https://www.docker.com/products/docker-desktop/)

### Development Tools (Recommended)

- **Visual Studio 2022** or **VS Code**
- **MongoDB Compass** - GUI for MongoDB
- **Postman** or similar API testing tool

## 🚀 Quick Start

### Option 1: Full Docker Setup (Recommended)

The easiest way to run the entire application:

```bash
# 1. Clone the repository
git clone <repository-url>
cd million-real-state

# 2. Start all services (API + MongoDB)
docker-compose up --build

# 3. Initialize database (in a new terminal)
mongosh mongodb://localhost:27017/MillionRealEstate collection/seed_setup.js

# 4. Start frontend (in a new terminal)
bun run frontend:dev
```

**Access Points:**

- Frontend: http://localhost:3000
- API: http://localhost:8080
- MongoDB: mongodb://localhost:27017

### Option 2: Local Development Setup

For active development with hot reloading:

```bash
# 1. Clone and install dependencies
git clone <repository-url>
cd million-real-state
bun run install:all

# 2. Setup MongoDB (local or Atlas)
# Update connection string in src/Million.API/appsettings.json

# 3. Initialize database
mongosh mongodb://localhost:27017/MillionRealEstate collection/seed_setup.js

# 4. Start both frontend and backend
bun run dev:all

# Or start individually:
# Terminal 1: bun run frontend:dev
# Terminal 2: bun run api:dev
```

## 🔄 Development Workflows

### Available Commands

| Command                  | Description                              |
| ------------------------ | ---------------------------------------- |
| `bun run dev:all`        | Start both frontend and API concurrently |
| `bun run frontend:dev`   | Start Next.js development server         |
| `bun run api:dev`        | Start .NET API in development mode       |
| `bun run frontend:build` | Build frontend for production            |
| `bun run api:build`      | Build .NET API                           |
| `bun run api:test`       | Run backend tests                        |
| `bun run install:all`    | Install all dependencies                 |

### Frontend Development

```bash
# Navigate to frontend
cd src/million-frontend

# Install dependencies
bun install

# Start development server
bun run dev

# Run tests
bun test
bun run test:watch
bun run test:coverage

# Build for production
bun run build
bun run start
```

### Backend Development

```bash
# Build the solution
dotnet build Million.sln

# Run the API
dotnet run --project src/Million.API

# Run tests
dotnet test src/Million.API.Tests

# Watch mode (auto-restart)
dotnet watch run --project src/Million.API
```

### Database Management

```bash
# Initialize database with sample data
mongosh mongodb://localhost:27017/MillionRealEstate collection/seed_setup.js

# Connect to database
mongosh mongodb://localhost:27017/MillionRealEstate

# Reset database (run seed script again)
mongosh mongodb://localhost:27017/MillionRealEstate collection/seed_setup.js
```

## 🐳 Deployment

### Docker Production Deployment

```bash
# Build and start production containers
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Reset everything (including database)
docker-compose down -v
```

### Manual Production Deployment

```bash
# Build frontend
cd src/million-frontend
bun run build

# Build backend
dotnet publish src/Million.API -c Release -o publish

# Configure production environment variables
# Deploy to your hosting platform
```

## 📚 Documentation

This project includes comprehensive documentation to guide development and usage:

### 📋 Product Requirements Document ([prd.md](./doc/prd.md))

The complete product specification document that defines the goals, functional and non-functional requirements for the Million Real Estate portal. This document outlines:

- Project goals and business context
- Detailed functional requirements (property listings, filtering, detailed views)
- Technical requirements (.NET 8, MongoDB, Next.js, responsive design)
- User interface design goals and target personas
- Epic breakdown for development phases

### 🎨 Frontend Specification ([front-end-spec.md](./doc/front-end-spec.md))

A comprehensive UI/UX specification document that defines the user experience goals, design principles, and technical implementation details for the frontend application. This includes:

- Target user personas (The Investor & The Dream Home Seeker)
- Information architecture and user flows
- Responsive design strategy and breakpoints
- Component library specifications
- Branding guidelines and style guide (colors, typography, spacing)
- Accessibility requirements (WCAG 2.1 Level AA)
- Performance considerations and animation guidelines

### 🗄️ Database Configuration ([database-config.md](./doc/database-config.md))

Detailed information about the MongoDB database schema, setup, and configuration requirements.

### 📖 Component Documentation

- **Frontend**: [src/million-frontend/README.md](./src/million-frontend/README.md) - Detailed frontend architecture, testing, and development guide
- **Backend**: [src/Million.API/README.md](./src/Million.API/README.md) - Complete backend API documentation, endpoints, and testing guide

### 🏗️ Architecture Documentation

- **Frontend Architecture**: [src/million-frontend/doc/architecture-spect.md](./src/million-frontend/doc/architecture-spect.md) - Detailed frontend architectural decisions and patterns
- **Monorepo Setup**: [README_MONOREPO.md](./README_MONOREPO.md) - Bun workspace configuration and management

## 🧪 Testing

### Frontend Tests

```bash
cd src/million-frontend

# Run all tests
bun test

# Watch mode
bun run test:watch

# Coverage report
bun run test:coverage
```

### Backend Tests

```bash
# Run all backend tests
dotnet test src/Million.API.Tests

# Run with coverage
dotnet test src/Million.API.Tests --collect:"XPlat Code Coverage"

# Run specific test
dotnet test src/Million.API.Tests --filter "ClassName"
```

### Integration Testing

The project includes comprehensive integration tests that:

- Test complete user flows
- Validate API endpoints with real database operations
- Ensure frontend-backend integration works correctly

## 🌐 Environment Configuration

### Frontend Environment Variables

```bash
# src/million-frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend Configuration

```bash
# User Secrets (Development)
dotnet user-secrets set "MongoDbSettings:ConnectionString" "mongodb://localhost:27017/MillionRealEstate" --project src/Million.API
```

### Docker Environment

Environment variables are configured in `docker-compose.yml` for containerized deployment.

## 🤝 Contributing

### Development Workflow

1. **Create a feature branch**: `git checkout -b feat/feature-name`
2. **Make your changes** following the established patterns
3. **Write/update tests** for new functionality
4. **Ensure all tests pass**: `bun run test` and `dotnet test`
5. **Run linting**: `bun run lint`
6. **Commit with conventional commits**: `feat: add property filtering`
7. **Create pull request** with detailed description

### Code Standards

- **Frontend**: TypeScript, ESLint, Prettier
- **Backend**: C# coding conventions, XML documentation
- **Testing**: Minimum 50% code coverage
- **Documentation**: Update relevant README files

### Architecture Principles

- **Clean Architecture**: Maintain separation of concerns
- **SOLID Principles**: Follow SOLID design principles
- **DRY**: Don't repeat yourself
- **KISS**: Keep it simple and stupid
- **YAGNI**: You ain't gonna need it

## 📊 Performance Benchmarks

### Frontend Performance Goals

- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **Interaction to Next Paint (INP)**: < 200ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Contentful Paint (FCP)**: < 1.8 seconds

### Backend Performance Goals

- **API Response Time**: < 200ms for simple queries
- **Database Query Time**: < 100ms for filtered searches
- **Concurrent Users**: Support 1000+ concurrent requests

## 🔒 Security Considerations

- **API Security**: Input validation, sanitization
- **Database Security**: Connection string protection
- **Frontend Security**: XSS protection, secure headers
- **Environment Variables**: Sensitive data in environment variables only

## 📄 License

This project is part of the Million Real Estate application suite. All rights reserved.

## 📞 Support & Contact

For questions, issues, or contributions:

- **Developer**: [Mthew](mailto:dev.thew.ai@gmail.com)
- **Repository**: [GitHub](https://github.com/Mthew/million-real-state)
- **Documentation**: Check the `doc/` directory for detailed specifications

---

**Built with ❤️ using modern full-stack technologies**

_Last updated: September 2025_

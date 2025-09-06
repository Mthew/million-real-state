# Million Real Estate - Bun Monorepo Setup

This project is configured as a Bun-managed monorepo with both frontend (Next.js) and backend (.NET) components.

## 📁 Project Structure

```
million-real-state/                 # Monorepo root
├── package.json                   # Root package with workspace scripts
├── bunfig.toml                    # Bun configuration
├── bun.lock                       # Single lockfile for the monorepo
├── src/
│   ├── million-frontend/          # Next.js frontend
│   │   ├── package.json
│   │   └── ... (Next.js files)
│   ├── Million.API/               # .NET API
│   ├── Million.Application/       # Application layer
│   ├── Million.Domain/           # Domain layer
│   └── Million.Infrastructure/   # Infrastructure layer
└── ...
```

## 🚀 Available Commands

### Frontend Commands

```bash
# Development
bun run frontend:dev        # Start Next.js dev server (localhost:3000)
bun run frontend:build      # Build Next.js app for production
bun run frontend:start      # Start Next.js in production mode
bun run dev                 # Alias for frontend:dev

# Dependencies
cd src/million-frontend && bun install  # Install frontend dependencies
```

### Backend (.NET) Commands

```bash
bun run api:dev             # Start .NET API in development
bun run api:build           # Build .NET API
bun run api:test            # Run .NET API tests
```

### Combined Commands

```bash
bun run dev:all             # Start both frontend and API concurrently
bun run install:all         # Install all dependencies (root + frontend)
```

### Dependency Management

```bash
# Install root dependencies
bun install

# Install frontend dependencies
cd src/million-frontend && bun install

# Install everything at once
bun run install:all
```

## 🔧 Configuration Files

### Root `package.json`

- Defines workspace structure
- Contains unified scripts for the entire monorepo
- Manages shared dependencies

### `bunfig.toml`

- Bun-specific configuration
- Workspace definitions
- Global scripts

### Frontend `next.config.ts`

- Configured with `turbo.root` pointing to monorepo root
- Resolves workspace detection warnings

## 🏃‍♂️ Getting Started

1. **Install all dependencies:**

   ```bash
   bun run install:all
   ```

2. **Start development servers:**

   ```bash
   # Option 1: Start both frontend and API
   bun run dev:all

   # Option 2: Start individually
   bun run frontend:dev  # Terminal 1
   bun run api:dev      # Terminal 2
   ```

3. **Access applications:**
   - Frontend: http://localhost:3000
   - API: http://localhost:5000 (or configured port)

## 📦 Adding New Packages

### To Frontend:

```bash
cd src/million-frontend
bun add package-name
# or for dev dependencies
bun add -d package-name
```

### To Root (shared tools):

```bash
bun add -d package-name
```

## 🔄 Workspace Benefits

1. **Single Lock File**: All dependencies managed in one `bun.lock`
2. **Shared Dependencies**: Common packages deduplicated
3. **Unified Scripts**: Run commands from root directory
4. **Fast Installs**: Bun's speed across all packages
5. **Dependency Hoisting**: Automatic optimization

## 🛠 Tips & Best Practices

1. **Always run commands from root** for consistency
2. **Use `bun run dev:all`** for full-stack development
3. **Keep shared dependencies in root `package.json`**
4. **Use specific workspace commands** for individual services
5. **Leverage Bun's speed** for faster development cycles

## 🚨 Troubleshooting

### Next.js Workspace Warnings

If you see workspace root warnings, ensure `next.config.ts` has:

```typescript
turbo: {
  root: "../../", // Points to monorepo root
}
```

### Dependencies Not Found

Run `bun run install:all` to ensure all workspaces have dependencies installed.

### Port Conflicts

Make sure frontend (3000) and API (5000) don't conflict with running services.

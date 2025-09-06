# Bun Monorepo Commands Reference

## Frontend Commands

bun run frontend:dev # Start Next.js dev server
bun run frontend:build # Build Next.js app
bun run frontend:start # Start Next.js production server

## API Commands (.NET)

bun run api:dev # Start .NET API in development
bun run api:build # Build .NET API
bun run api:test # Run .NET API tests

## Combined Commands

bun run dev:all # Start both frontend and API concurrently
bun run install:all # Install all dependencies

## Workspace Commands

bun install # Install all workspace dependencies
bun --filter million-frontend run dev # Run specific workspace command
bun --cwd src/million-frontend install # Install deps in specific workspace

## Examples

bun run dev:all # Starts both Next.js and .NET API
bun run frontend:dev # Just the frontend
bun run api:dev # Just the API

# Stage 1: Build the application
# Use the official .NET SDK image as a build environment
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the solution file and all project files to restore dependencies
COPY ["Million.sln", "."]
COPY ["src/Million.Api/Million.Api.csproj", "src/Million.Api/"]
COPY ["src/Million.Application/Million.Application.csproj", "src/Million.Application/"]
COPY ["src/Million.Domain/Million.Domain.csproj", "src/Million.Domain/"]
COPY ["src/Million.Infrastructure/Million.Infrastructure.csproj", "src/Million.Infrastructure/"]
# If you have a test project, copy it too for restore caching
COPY ["tests/Million.Api.Tests/Million.Api.Tests.csproj", "tests/Million.Api.Tests/"]

# Restore NuGet packages for all projects
RUN dotnet restore "Million.sln"

# Copy the rest of the source code
COPY . .

# Publish the API project in Release configuration
WORKDIR "/src/src/Million.Api"
RUN dotnet publish "Million.Api.csproj" -c Release -o /app/publish --no-restore

# Stage 2: Create the final, smaller runtime image
# Use the official ASP.NET runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Expose the port the app will run on (default is 8080 for HTTP in .NET 8 containers)
EXPOSE 8080

# Copy the published output from the build stage
COPY --from=build /app/publish .

# Define the entry point for the container
ENTRYPOINT ["dotnet", "Million.Api.dll"]
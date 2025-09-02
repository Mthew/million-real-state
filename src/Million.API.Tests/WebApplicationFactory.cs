using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Million.Infrastructure.Persistence;
using Mongo2Go;

namespace Million.Api.Tests;

internal class MillionApiFactory : WebApplicationFactory<Program>
{
    internal MongoDbRunner Runner { get; } = MongoDbRunner.Start();

    protected override IHost CreateHost(IHostBuilder builder)
    {
        try
        {
            var contentRoot = GetContentRoot();

            Console.WriteLine($"--- DIAGNOSTIC INFO: Final Content Root Path Being Used ---");
            Console.WriteLine(contentRoot);
            Console.WriteLine("---------------------------------------------------------");

            if (Directory.Exists(contentRoot))
            {
                builder.UseContentRoot(contentRoot);
            }
            else
            {
                // If the directory doesn't exist, we must throw the exception to see it clearly.
                throw new DirectoryNotFoundException($"DIAGNOSIS: The calculated content root does not exist: {contentRoot}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("--- DIAGNOSTIC ERROR ---");
            Console.WriteLine($"An exception occurred during GetContentRoot: {ex.Message}");
            Console.WriteLine("----------------------");
            throw; // Re-throw the exception to fail the test
        }

        return base.CreateHost(builder);
    }

    private static string GetContentRoot()
    {
        var initialCurrentDir = Directory.GetCurrentDirectory();
        Console.WriteLine("--- DIAGNOSTIC INFO: Starting Path Calculation ---");
        Console.WriteLine($"Initial Directory.GetCurrentDirectory(): {initialCurrentDir}");

        var directory = new DirectoryInfo(initialCurrentDir);
        var searchCount = 0;

        while (directory != null && !directory.GetFiles("*.sln").Any() && searchCount < 10)
        {
            directory = directory.Parent;
            Console.WriteLine($"Navigated up to: {directory?.FullName}");
            searchCount++;
        }

        if (directory != null && directory.GetFiles("*.sln").Any())
        {
            var solutionFilePath = directory.GetFiles("*.sln").First().FullName;
            Console.WriteLine($"Found solution file at: {solutionFilePath}");

            var finalPath = Path.Combine(directory.FullName, "src", "Million.Api");
            Console.WriteLine($"Constructed final path: {finalPath}");
            return finalPath;
        }

        throw new DirectoryNotFoundException("DIAGNOSIS: Traversed up 10 directories and could not find a solution (.sln) file.");
    }

    // --- The rest of the class remains the same ---

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // --- CORRECTED CODE ---
            // Find ALL existing registrations for MongoDbContext and remove them.
            var dbContextDescriptors = services.Where(d =>
                d.ServiceType == typeof(MongoDbContext)).ToList();

            foreach (var descriptor in dbContextDescriptors)
            {
                services.Remove(descriptor);
            }

            // Find ALL existing registrations for MongoDbSettings and remove them.
            var dbSettingsDescriptors = services.Where(d =>
                d.ServiceType == typeof(Microsoft.Extensions.Options.IOptions<Infrastructure.Settings.MongoDbSettings>)).ToList();

            foreach (var descriptor in dbSettingsDescriptors)
            {
                services.Remove(descriptor);
            }
            // ----------------------

            // Now, with a clean slate, add our new singleton instance for the in-memory database.
            services.AddSingleton(new MongoDbContext(Runner.ConnectionString));
        });

        builder.UseEnvironment("Test");
    }

    protected override void Dispose(bool disposing)
    {
        if (disposing) Runner.Dispose();
        base.Dispose(disposing);
    }
}
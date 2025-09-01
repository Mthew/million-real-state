using Microsoft.OpenApi.Models;
using Million.Api.Middleware;
using Million.Application;
using Million.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// --- 1. Add services to the container (Dependency Injection) ---

// Register services from our other projects using the extension methods we created
builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration);

// Add API-specific services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new() { Title = "Million Real Estate API", Version = "v1" });
});

// Configure CORS for frontend communication
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // The default Next.js port
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddApplicationServices();



// --- 2. Build the application ---
var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

// --- 3. Configure the HTTP request pipeline (Middleware) ---

// Use custom global error handler at the top of the pipeline
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();



app.UseHttpsRedirection();

// Apply the CORS policy
app.UseCors("AllowFrontend");

app.UseAuthorization();

// Map controller routes
app.MapControllers();

// Run the application
app.Run();


//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.

//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

//app.UseAuthorization();

//app.MapControllers();

//app.Run();

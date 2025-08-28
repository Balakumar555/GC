using GC.World.API;
using GC.World.API.Data;
using Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// add services

builder.Services.AddScoped<IUser, UserRepo>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
                       builder => builder
                      .AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .WithMethods("GET", "PUT", "DELETE", "POST", "PATCH")
                      );
});

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "EAPI-CRM");
    c.RoutePrefix = string.Empty;
});
app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();

app.Run();
using API.Extensions;
using API.Middleware;
using API.SignalR;
using Application.Activities;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using FluentValidation.AspNetCore;
using Infrastructure.Photos;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Persistence;
using System;

namespace API
{
  public class Startup
  {
    private readonly IConfiguration _config;

    public Startup(IConfiguration config)
    {
      _config = config;
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      services.AddControllers(opt =>
      {
        // ovime ubacijemo zastitu na svaki path
        var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
        opt.Filters.Add(new AuthorizeFilter(policy));
      }).AddFluentValidation(config =>
      {
        config.RegisterValidatorsFromAssemblyContaining<Create>();
      });


      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
      });

      //services.AddDbContext<DataContext>(opt =>
      //{
      //  //opt.UseSqlite(_config.GetConnectionString("StringZaSpajanje"));   // SQLite
      //  opt.UseNpgsql(_config.GetConnectionString("StringZaSpajanje"));     // PostgreSQL
      //});


      services.AddDbContext<DataContext>(options =>
      {
        var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

        string connStr;

        // Depending on if in development or production, use either Heroku-provided
        // connection string, or development connection string from env var.
        if (env == "Development")
        {
          // Use connection string from file.
          connStr = _config.GetConnectionString("DefaultConnection");
        }
        else
        {
          // Use connection string provided at runtime by Heroku.
          var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

          // Parse connection URL to connection string for Npgsql
          connUrl = connUrl.Replace("postgres://", string.Empty);
          var pgUserPass = connUrl.Split("@")[0];
          var pgHostPortDb = connUrl.Split("@")[1];
          var pgHostPort = pgHostPortDb.Split("/")[0];
          var pgDb = pgHostPortDb.Split("/")[1];
          var pgUser = pgUserPass.Split(":")[0];
          var pgPass = pgUserPass.Split(":")[1];
          var pgHost = pgHostPort.Split(":")[0];
          var pgPort = pgHostPort.Split(":")[1];

          connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}; SSL Mode=Require; Trust Server Certificate=true";
        }

        // Whether the connection string came from the local development configuration file
        // or from the environment variable from Heroku, use it to set up your DbContext.
        options.UseNpgsql(connStr);
      });


      //
      services.AddCors(opt =>
        {
          opt.AddPolicy("CorsPolicy", policy =>
          {
            policy.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://localhost:3002");
          });
        });

      // bolja izvedba
      services.AddMediatR(typeof(List.Handler).Assembly);
      services.AddAutoMapper(typeof(MappingProfiles).Assembly);

      // Koji je user
      services.AddScoped<IUserAccessor, UserAccessor>();

      // Baratanje sa file
      services.AddScoped<IPhotoAccessor, PhotoAccessor>();

      ///
      /// Cloudinary za slike..
      services.Configure<CloudinarySettings>(_config.GetSection("Cloudinary"));

      services.AddSignalR();

      // KOnfiguriranje Identity servisa
      services.AddIdentityServices(_config);


    }

    // MIDDLEWARE
    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      // Moj middleware
      app.UseMiddleware<ExceptionMiddleware>();

      if (env.IsDevelopment())
      {
        // Ovaj opceniti middleware smo zamjenili sa svojim ExceptionMiddleware
        //app.UseDeveloperExceptionPage();

        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
      }




      // app.UseHttpsRedirection();

      app.UseRouting();

      // za REACT aplikaciju
      app.UseDefaultFiles();
      app.UseStaticFiles();

      // mora biti iza routing !!
      app.UseCors("CorsPolicy");

      app.UseAuthentication();

      app.UseAuthorization();
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
        endpoints.MapHub<ChatHub>("/chat");
        endpoints.MapFallbackToController("Index", "Fallback");
      });
    }
  }
}

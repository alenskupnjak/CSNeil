using API.Extensions;
using API.Middleware;
using Application.Activities;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Persistence;
using Microsoft.AspNetCore.Http;

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

      services.AddDbContext<DataContext>(opt =>
      {
        opt.UseSqlite(_config.GetConnectionString("StringZaSpajanje"));
      });

      //
      services.AddCors(opt =>
        {
          opt.AddPolicy("CorsPolicy", policy =>
          {
            policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3002");
          });
        });

      // bolja izvedba
      services.AddMediatR(typeof(List.Handler).Assembly);
      services.AddAutoMapper(typeof(MappingProfiles).Assembly);
      services.AddScoped<IUserAccessor, UserAccessor>();

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

      // mora biti iza routing !!
      app.UseCors("CorsPolicy");

      app.UseAuthentication();

      app.UseAuthorization();
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}

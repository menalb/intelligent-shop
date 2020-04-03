using System;
using System.Net.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Hosting;

using sentence_process.SentenceAnalyzer;

namespace sentence_process
{
    public class Startup
    {
        public Startup(IConfiguration configuration) => Configuration = configuration;

        public IConfiguration Configuration { get; }

        readonly string allowLocalDev = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.Configure<LUISSettings>(Configuration.GetSection("LUIS"));

            services.AddSingleton<LUISUriBuilder>(ctx => new LUISUriBuilder(ctx.GetService<IOptions<LUISSettings>>().Value));
            services.AddHttpClient<ISentenceAnalyzerService, LUISSentenceAnalyzerService>(BuildLuisHttpClient);

            services.AddCors(options =>
            {
                options.AddPolicy(
                    allowLocalDev,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(allowLocalDev);
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void BuildLuisHttpClient(IServiceProvider ctx, HttpClient client)
        {
            var config = ctx.GetService<IOptions<LUISSettings>>().Value;

            client.BaseAddress = new System.Uri(config.ApiEndpoint);
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", config.EndpointKey);
        }
    }
}

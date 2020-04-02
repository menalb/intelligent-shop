using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

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
            services.Configure<LUISSettings>(Configuration.GetSection("LUIS"));

            services.AddSingleton<LUISUriBuilder>(ctx => new LUISUriBuilder(ctx.GetService<IOptions<LUISSettings>>().Value));
            services.AddHttpClient<ISentenceAnalyzerService, LUISSentenceAnalyzerService>((ctx, client) =>
              {
                  var config = ctx.GetService<IOptions<LUISSettings>>().Value;

                  client.BaseAddress = new System.Uri(config.ApiEndpoint);
                  client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", config.EndpointKey);
              });

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

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(allowLocalDev);
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}

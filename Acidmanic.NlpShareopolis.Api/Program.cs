using Acidmanic.NlpShareopolis.Api;
using Acidmanic.NlpShareopolis.Api.Extensions;
using Acidmanic.NlpShareopolis.Api.Models;
using Acidmanic.NlpShareopolis.Domain.Data.Extensions;
using Acidmanic.NlpShareopolis.Domain.Extensions;
using Acidmanic.Utilities.Web;
using Acidmanic.Utilities.Web.Extensions;
using Microsoft.Extensions.Logging.LightWeight;

var wholeUniverseLogger = new ConsoleLogger().Shorten();

var builder = StaticServerConfigurator.CreateApplicationBuilderOnBinariesSpot();

var frontEndApplicationUrl = builder.Configuration["FrontEndApplicationPath"];

if (frontEndApplicationUrl == null)
{
    throw new Exception("Please set FrontEndApplicationPath in appSettings.json");
}

builder.ConfigureListening("Api:Endpoints", "Http", "Https");

// Add services to the container.

builder.Services.AddControllers().AddApplicationPart(WebUtilities.Assembly);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(AuthenticationConstants.DefaultScheme)
    .AddCookie(AuthenticationConstants.DefaultScheme)
    .AddGithub()
    .AddLinkedIn();

builder.Services.SetAfterLoginRedirectionUrl(frontEndApplicationUrl,frontEndApplicationUrl);

builder.Services.AddWebUtilitiesServices();

builder.Services.AddDomainServices();
builder.Services.AddDomainDataServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.ConfigureEnTierResolver();
app.ConfigureMeadow();

var frontEndApplication = new StaticServerConfigurator().ServeForAngular().UseLogger(wholeUniverseLogger);

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseCors(cp => cp.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

frontEndApplication.ConfigurePreRouting(app, app.Environment);

app.UseRouting();


app.UseAuthorization();

frontEndApplication.ConfigureMappings(app, app.Environment);

app.MapControllers();


app.Run();
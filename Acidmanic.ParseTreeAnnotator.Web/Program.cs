using Acidmanic.ParseTreeAnnotator.Web;
using Acidmanic.ParseTreeAnnotator.Web.Extensions;
using Acidmanic.ParseTreeAnnotator.Web.Utilities;
using Acidmanic.Utilities.Web.Extensions;
using Microsoft.Extensions.Logging.LightWeight;


var wholeUniverseLogger = new ConsoleLogger().Shorten();

var builder = WebApplication.CreateBuilder(args);

builder.ConfigureListening("Api:Endpoints","Http");

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var secrets = PropertyFile.ReadAllProperties("secret");

builder.Services.AddAuthentication("cookie")
    .AddCookie("cookie")
    .AddGithub(secrets["client_id"],secrets["client_secret"],"cookie");


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors(cp => cp.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.MapControllers();

app.RunAsync();

var frontEndApplication = new StaticServerApplicationBuilder().ServeForAnguler().UseLogger(wholeUniverseLogger).Build();

frontEndApplication.Run();
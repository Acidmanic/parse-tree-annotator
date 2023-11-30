using System.Reflection;
using Acidmanic.Utilities.Reflection.ObjectTree;
using Meadow.Configuration;
using Meadow.Contracts;
using Microsoft.Extensions.Configuration;

namespace Acidmanic.NlpShareopolice.Domain.Data;

public class MeadowConfigurationProvider : IMeadowConfigurationProvider
{

    private readonly IConfiguration _configuration;

    public MeadowConfigurationProvider(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public MeadowConfiguration GetConfigurations()
    {
        return new MeadowConfiguration
        {
            ConnectionString = _configuration["connectionString"],
            MacroPolicy = MacroPolicies.InterpretAtRuntime,
            BuildupScriptDirectory = "Scripts",
            MacroContainingAssemblies = new List<Assembly>
            {
                typeof(IMeadowDataAccessCore).Assembly,
                typeof(Meadow.Meadow.AnchorType).Assembly,
                typeof(MeadowConfiguration).Assembly,
                Assembly.GetEntryAssembly()!
            },
            TableNameProvider = new PluralDataOwnerNameProvider(),
            DatabaseFieldNameDelimiter = '_'
        };
    }
}
using System.Reflection;
using Acidmanic.Utilities.Reflection.ObjectTree;
using Meadow;
using Meadow.Configuration;
using Meadow.Contracts;
using Meadow.MySql;
using Microsoft.Extensions.Configuration;

namespace Acidmanic.NlpShareopolis.Domain.Data;

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
            MacroPolicy = MacroPolicies.UpdateScripts,
            BuildupScriptDirectory = "Scripts",
            MacroContainingAssemblies = new List<Assembly>
            {
                Meadow.Meadow.Anchor.GetMySqlMeadowAssembly(),
                Meadow.Meadow.Anchor.GetMeadowAssembly(),
                typeof(MeadowConfigurationProvider).Assembly,
                Assembly.GetEntryAssembly()!
            },
            TableNameProvider = new PluralDataOwnerNameProvider(),
            DatabaseFieldNameDelimiter = '_'
        };
    }
}
using Acidmanic.NlpShareopolis.Api.Dtos;
using Acidmanic.Utilities.Results;
using Newtonsoft.Json;

namespace Acidmanic.NlpShareopolis.Api.Services;

public class TreeBankService
{
    
    private static readonly string PostagModelFileNamePostFix = "-tags.json";

    private readonly string _modelDirectory;

    private bool _areBanksCached = false;

    private readonly List<PosTagBank> _cache = new List<PosTagBank>();

    private readonly object _cacheLock = new object(); 

    public TreeBankService()
    {
        _modelDirectory = Path.Combine("Resources", "Models");
    }


    public List<PosTagBank> ReadAllTreeBanksCached()
    {
        lock (_cacheLock)
        {
            if (!_areBanksCached)
            {
                _cache.AddRange(ReadAllTreeBanks());
            
                _areBanksCached = true;
            }
        }

        return _cache;
    }
    
    private List<PosTagBank> ReadAllTreeBanks()
    {
        var allBanks = new List<PosTagBank>();
        
        var allFilesInDirectory = Directory.EnumerateFiles(_modelDirectory);

        foreach (var file in allFilesInDirectory)
        {
            if (file.ToLower().EndsWith(PostagModelFileNamePostFix))
            {
                var bankRead = ReadTreeBankByFileName(file);

                if (bankRead)
                {
                    allBanks.Add(bankRead);
                }
            }
        }

        return allBanks;
    }

    public Result<PosTagBank> GetBankByLanguage(string languageShortName)
    {
        var banks = ReadAllTreeBanksCached();

        if (banks.FirstOrDefault(b => b.Language.ShortName == languageShortName) is { } foundBank)
        {

            return new Result<PosTagBank>().Succeed(foundBank);
        }

        return new Result<PosTagBank>().FailAndDefaultValue();
    }
    
    public Result<PosTagBank> ReadTreeBankByModelName(string modelName)
    {
        var fileName = Path.Combine(_modelDirectory, $"{modelName}{PostagModelFileNamePostFix}");

        return ReadTreeBankByFileName(fileName);
    }
    
    public Result<PosTagBank> ReadTreeBankByFileName(string fileName)
    {
        if (System.IO.File.Exists(fileName))
        {
            try
            {
                var json = System.IO.File.ReadAllText(fileName);

                var bank = JsonConvert.DeserializeObject<PosTagBank>(json);

                if (bank != null)
                {
                    return new Result<PosTagBank>(true, bank);
                }
            }
            catch (Exception _)
            {
                //
            }
        }

        return new Result<PosTagBank>().FailAndDefaultValue();
    }


    public List<string> GetAvailableModels()
    {
        var directory = new DirectoryInfo(_modelDirectory);

        var files = directory.GetFiles();

        var modelsAvailable = new List<string>();

        foreach (var file in files)
        {
            var fileName = file.Name;

            if (fileName.ToLower().EndsWith(PostagModelFileNamePostFix.ToLower()))
            {
                var modelName = fileName.Substring(0, fileName.Length - PostagModelFileNamePostFix.Length);

                modelsAvailable.Add(modelName);
            }
        }

        return modelsAvailable;
    }
}
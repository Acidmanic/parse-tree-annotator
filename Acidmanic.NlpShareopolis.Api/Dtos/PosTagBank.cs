using Acidmanic.NlpShareopolis.Api.Models;

namespace Acidmanic.NlpShareopolis.Api.Dtos;

public class PosTagBank
{
    public List<PosTag> Tags { get; set; }
    
    
   public LanguageDto Language { get; set; }
   
   public string BankName { get; set; }
   
   public string Id { get; set; }
    
}
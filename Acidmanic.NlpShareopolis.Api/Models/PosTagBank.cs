namespace Acidmanic.NlpShareopolis.Api.Models;

public class PosTagBank
{
    public List<PosTag> Tags { get; set; }
    
    
   public Language Language { get; set; }
   
   public string BankName { get; set; }
   
   public string Id { get; set; }
    
}
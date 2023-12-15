using Acidmanic.NlpShareopolis.Domain.Data.Requests.Models;
using Meadow;
using Meadow.Requests;

namespace Acidmanic.NlpShareopolis.Domain.Data.Requests;

public class ReadAvailableSentenceTaskLanguagesRequest:MeadowRequest<MeadowVoid,LanguageShell>
{
    public ReadAvailableSentenceTaskLanguagesRequest() : base(true) { }
}
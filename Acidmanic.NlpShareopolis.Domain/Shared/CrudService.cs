using EnTier;
using EnTier.Services;

namespace Acidmanic.NlpShareopolis.Domain.Shared;

public class CrudService<TEntity>:CrudService<TEntity,TEntity,Guid,Guid> where TEntity : class, new()
{
    public CrudService(EnTierEssence essence) : base(essence)
    {
    }
}
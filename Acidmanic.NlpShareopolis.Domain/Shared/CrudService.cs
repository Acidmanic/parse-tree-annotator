using EnTier;
using EnTier.Services;

namespace Acidmanic.NlpShareopolis.Domain.Shared;

public class CrudService<TEntity,TId>:CrudService<TEntity,TEntity,TId,TId> where TEntity : class, new()
{
    public CrudService(EnTierEssence essence) : base(essence)
    {
    }
}
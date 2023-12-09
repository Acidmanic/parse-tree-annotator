using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using EnTier;
using EnTier.Services;

namespace Acidmanic.NlpShareopolis.Domain.Shared;

public class CrudService<TEntity>:CrudService<TEntity,TEntity,Id,Id> where TEntity : class, new()
{
    public CrudService(EnTierEssence essence) : base(essence)
    {
    }
}
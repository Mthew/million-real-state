namespace Million.Domain.Exceptions;

public sealed class PropertyNotFoundException : NotFoundException
{
    public PropertyNotFoundException(string propertyId)
        : base($"The property with the ID '{propertyId}' was not found.")
    {
    }
}
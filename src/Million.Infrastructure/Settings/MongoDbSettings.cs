namespace Million.Infrastructure.Settings;

public class MongoDbSettings
{
    public const string SectionName = "MongoDbSettings";
    public string ConnectionString { get; set; } = string.Empty;
    public string DatabaseName { get; set; } = string.Empty;
    public string PropertiesCollectionName { get; set; } = string.Empty;
    public string OwnersCollectionName { get; set; } = string.Empty;
    public string PropertyImagesCollectionName { get; set; } = string.Empty;
    public string PropertyTracesCollectionName { get; set; } = string.Empty;
}
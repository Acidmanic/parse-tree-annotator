using System.Text;

namespace Acidmanic.ParseTreeAnnotator.Web.Utilities;

public class PropertyFile
{
    public static Dictionary<string, string> ReadAllProperties(string filePath)
    {
        var lines = File.ReadAllLines(filePath);

        var properties = new Dictionary<string, string>();

        foreach (var line in lines)
        {
            var st = line.IndexOf(":", StringComparison.Ordinal);

            if (st > 0)
            {
                var key = line.Substring(0, st).Trim();

                if (!string.IsNullOrEmpty(key.Trim()))
                {
                    var value = line.Substring(st + 1, line.Length - 1 - st).Trim();

                    properties.Add(key, value);
                }
            }
        }

        return properties;
    }


    public static void WriteAllProperties(string filePath, Dictionary<string, object> properties)
    {
        var sb = new StringBuilder();

        var sep = "";

        foreach (var property in properties)
        {
            sb.Append(sep).Append(property.Key).Append(": ").Append(property.Value.ToString());

            sep = "\n";
        }

        File.WriteAllText(filePath, sb.ToString());
    }
}
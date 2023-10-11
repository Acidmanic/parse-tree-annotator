



using OpenNlpCore;

var outputFolder = "Output";

if (!Directory.Exists(outputFolder))
{
    Directory.CreateDirectory(outputFolder);
}
OpenNlpApplication.Run();
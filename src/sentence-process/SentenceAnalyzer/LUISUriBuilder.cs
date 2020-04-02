using System.Web;

namespace sentence_process.SentenceAnalyzer
{
    public class LUISUriBuilder
    {
        private readonly LUISSettings _settings;
        public LUISUriBuilder(LUISSettings settings) => _settings = settings;

        public string Build(string sentence) =>
            $"{_settings.AppId}?{BuildQueryString(sentence)}";

        private static string BuildQueryString(string sentence)
        {
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // The "q" parameter contains the utterance to send to LUIS
            queryString["q"] = sentence;

            // These optional request parameters are set to their default values
            queryString["timezoneOffset"] = "0";
            queryString["verbose"] = "false";
            queryString["spellCheck"] = "false";
            queryString["staging"] = "false";
            return queryString.ToString();
        }

    }
}
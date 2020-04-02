using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;

namespace sentence_process.SenceAnalyzer
{
    public interface ISentenceAnalyzerService
    {
        Task<QueryResult> Analyze(string sentence);
    }
    public class SentenceAnalyzerService : ISentenceAnalyzerService
    {
        private readonly LUISSettings _settings;
        public SentenceAnalyzerService(LUISSettings settings)
        {
            _settings = settings;
        }

        public async Task<QueryResult> Analyze(string sentence)
        {
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // This app ID is for a public sample app that recognizes requests to turn on and turn off lights
            var luisAppId = _settings.AppId;
            var endpointKey = _settings.EndpointKey;

            // The request header contains your subscription key
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", endpointKey);

            // The "q" parameter contains the utterance to send to LUIS
            queryString["q"] = sentence;

            // These optional request parameters are set to their default values
            queryString["timezoneOffset"] = "0";
            queryString["verbose"] = "false";
            queryString["spellCheck"] = "false";
            queryString["staging"] = "false";
            var endpointUri = $"{_settings.ApiEndpoint + luisAppId}?{queryString}";
            var response = await client.GetAsync(endpointUri);

            var strResponseContent = await response.Content.ReadAsStringAsync();

            // Display the JSON result from LUIS
            Console.WriteLine(strResponseContent.ToString());
            return JsonConvert.DeserializeObject<QueryResult>(strResponseContent.ToString());
        }

    }
}
using System.Net.Http;
using System.Threading.Tasks;

using System.Text.Json;

namespace sentence_process.SentenceAnalyzer
{
    public class LUISSentenceAnalyzerService : ISentenceAnalyzerService
    {
        private readonly LUISUriBuilder _uriBuilder;
        private readonly HttpClient _httpClient;
        public LUISSentenceAnalyzerService(HttpClient client, LUISUriBuilder uriBuilder)
        {
            _uriBuilder = uriBuilder;
            _httpClient = client;
        }

        public async Task<QueryResult> Analyze(string sentence)
        {
            var response = await _httpClient.GetAsync(_uriBuilder.Build(sentence));

            var strResponseContent = await response.Content.ReadAsStringAsync();

            var options = new JsonSerializerOptions();
            options.PropertyNameCaseInsensitive = true;
            return JsonSerializer.Deserialize<QueryResult>(strResponseContent, options);
        }
    }
}
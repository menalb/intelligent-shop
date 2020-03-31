using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace sentence_process.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcessController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public async Task<QueryResult> Get(string sentence)
        {
            return await MakeRequest(sentence);
        }

        private async Task<QueryResult> MakeRequest(string sentence)
        {
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // This app ID is for a public sample app that recognizes requests to turn on and turn off lights
            var luisAppId = "";
            var endpointKey = "";

            // The request header contains your subscription key
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", endpointKey);

            // The "q" parameter contains the utterance to send to LUIS
            queryString["q"] = sentence;

            // These optional request parameters are set to their default values
            queryString["timezoneOffset"] = "0";
            queryString["verbose"] = "false";
            queryString["spellCheck"] = "false";
            queryString["staging"] = "false";
            //let baseUrl = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/8bde293e-b273-4b1b-b8fb-81c92ee3980c?verbose=true&timezoneOffset=-360&subscription-key=5556720e949043fbaee577144068c3ff";
            var endpointUri = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/" + luisAppId + "?" + queryString;
            var response = await client.GetAsync(endpointUri);

            var strResponseContent = await response.Content.ReadAsStringAsync();

            // Display the JSON result from LUIS
            Console.WriteLine(strResponseContent.ToString());
            return JsonConvert.DeserializeObject<QueryResult>(strResponseContent.ToString());
        }
    }

    public class QueryResult
    {
        public string Query { get; set; }
        [JsonProperty("topScoringIntent")]
        public Intent Intent { get; set; }
        public IEnumerable<Entity> Entities { get; set; }
    }
    public class Intent
    {
        [JsonProperty("intent")]
        public string Name { get; set; }
    }
    public class Entity
    {
        [JsonProperty("entity")]
        public string Name { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
    }

}

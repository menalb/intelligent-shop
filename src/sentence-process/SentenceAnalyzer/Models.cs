using System.Collections.Generic;
using Newtonsoft.Json;

namespace sentence_process.SentenceAnalyzer
{
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
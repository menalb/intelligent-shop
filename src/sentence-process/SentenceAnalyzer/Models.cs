using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace sentence_process.SentenceAnalyzer
{
    public class QueryResult
    {
        public string Query { get; set; }
        [JsonPropertyName("topScoringIntent")]
        public Intent Intent { get; set; }
        public IEnumerable<Entity> Entities { get; set; }
    }
    public class Intent
    {
        [JsonPropertyName("intent")]
        public string Name { get; set; }
    }
    public class Entity
    {
        [JsonPropertyName("entity")]
        public string Name { get; set; }
        [JsonPropertyName("type")]
        public string Type { get; set; }
    }
}
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using sentence_process.SentenceAnalyzer;

namespace sentence_process.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcessController : ControllerBase
    {
        private readonly ISentenceAnalyzerService _sentenceAnalyzer;

        public ProcessController(ISentenceAnalyzerService sentenceAnalyzer) =>
            _sentenceAnalyzer = sentenceAnalyzer;

        [HttpGet]
        public async Task<QueryResult> Get(string sentence) =>
            await MakeRequest(sentence);

        private async Task<QueryResult> MakeRequest(string sentence) =>
            await _sentenceAnalyzer.Analyze(sentence);

    }
}
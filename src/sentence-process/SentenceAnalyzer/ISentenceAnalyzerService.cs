using System.Threading.Tasks;

namespace sentence_process.SentenceAnalyzer
{
    public interface ISentenceAnalyzerService
    {
        Task<QueryResult> Analyze(string sentence);
    }
}
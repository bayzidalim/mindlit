import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import BookInput from '../components/BookInput';
import SummaryDisplay from '../components/SummaryDisplay';
import { booksAPI } from '../services/api';

function MindLitAI() {
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});
  const location = useLocation();

  const handleGenerateSummary = useCallback(async ({ bookName, authorName }) => {
    const cacheKey = `${bookName}-${authorName}`.toLowerCase();
    
    if (cache[cacheKey]) {
      setBookData(cache[cacheKey]);
      toast.success('Summary loaded from cache!');
      return;
    }

    setIsLoading(true);
    setError(null);
    setBookData(null);

    try {
      const response = await booksAPI.generate(bookName, authorName);
      const data = response.data;
      
      setBookData(data);
      toast.success('Book summary generated successfully!');
      
      setCache(prev => ({ ...prev, [cacheKey]: data }));
    } catch (err) {
      console.error('Error generating summary:', err);
      const errorMessage = err.response?.data?.error || 'Failed to generate book summary. Please try again.';
      setError(errorMessage);
      toast.error('Failed to generate summary');
    } finally {
      setIsLoading(false);
    }
  }, [cache]);

  useEffect(() => {
    document.title = 'MindLit AI - Generate Book Summaries | MindLit';
    if (location.state?.bookName && location.state?.authorName) {
      handleGenerateSummary({
        bookName: location.state.bookName,
        authorName: location.state.authorName
      });
    }
  }, [location.state, handleGenerateSummary]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            MindLit AI
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Generate book summaries, lessons, and flashcards powered by AI
          </p>
        </div>

        <BookInput onSubmit={handleGenerateSummary} isLoading={isLoading} />

        {error && (
          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          </div>
        )}

        {(bookData || isLoading) && (
          <div className="mt-12">
            <SummaryDisplay bookData={bookData} isLoading={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MindLitAI;

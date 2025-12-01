import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { suggestionsAPI } from '../services/api';
import BookCard from '../components/BookCard';
import LoadingSpinner from '../components/LoadingSpinner';

function BookSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Book Suggestions | MindLit';
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await suggestionsAPI.getAll();
      setSuggestions(response.data.suggestions || []);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      const errorMessage = 'Failed to load book suggestions. Please try again later.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Book Suggestions
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Discover recommended books to explore
          </p>
        </div>

        {loading && <LoadingSpinner text="Loading book suggestions..." />}

        {error && (
          <div className="max-w-md mx-auto">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between">
              <span>{error}</span>
              <button 
                className="ml-4 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-100 rounded transition-colors" 
                onClick={fetchSuggestions}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!loading && !error && suggestions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No book suggestions available at the moment.</p>
          </div>
        )}

        {!loading && !error && suggestions.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {suggestions.map((suggestion, index) => (
              <BookCard key={suggestion.id} book={suggestion} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookSuggestions;

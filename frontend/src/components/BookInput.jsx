import { useState } from 'react';

export default function BookInput({ onSubmit, isLoading }) {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!bookName.trim()) {
      newErrors.bookName = 'Book name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({ bookName: bookName.trim(), authorName: authorName.trim() });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="bookName" className="block text-sm font-medium text-gray-700 mb-2">
            Book Name
          </label>
          <input
            id="bookName"
            type="text"
            placeholder="Enter book name"
            className={`w-full px-4 py-3 border rounded-lg transition-all outline-none ${
              errors.bookName 
                ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                : 'border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent'
            }`}
            value={bookName}
            onChange={(e) => {
              setBookName(e.target.value);
              if (errors.bookName) {
                setErrors({ ...errors, bookName: '' });
              }
            }}
            disabled={isLoading}
          />
          {errors.bookName && (
            <p className="mt-1 text-sm text-red-600">{errors.bookName}</p>
          )}
        </div>

        <div>
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-2">
            Author Name <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input
            id="authorName"
            type="text"
            placeholder="Enter author name (optional)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-focus transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Summary'}
        </button>
      </form>
    </div>
  );
}

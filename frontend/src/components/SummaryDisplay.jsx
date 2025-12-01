import { useState } from 'react';
import FlashCard from './FlashCard';
import LoadingSpinner from './LoadingSpinner';

export default function SummaryDisplay({ bookData, isLoading }) {
  const [activeTab, setActiveTab] = useState('summary');

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 text-center">
        <LoadingSpinner text="Generating your book summary..." />
      </div>
    );
  }

  if (!bookData) {
    return null;
  }

  const tabs = [
    { id: 'summary', label: 'Summary' },
    { id: 'messages', label: 'Messages' },
    { id: 'lessons', label: 'Lessons' },
    { id: 'flashcards', label: 'Flashcards' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Summary</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{bookData.summary}</p>
          </div>
        );
      case 'messages':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Messages</h3>
            <div className="space-y-4">
              {bookData.messages?.map((message, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-50 text-primary rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'lessons':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Lessons</h3>
            <div className="space-y-3">
              {bookData.lessons?.map((lesson, index) => (
                <details key={index} className="group bg-gray-50 rounded-lg" open={index === 0}>
                  <summary className="cursor-pointer px-6 py-4 font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors list-none flex items-center justify-between">
                    <span>Lesson {index + 1}</span>
                    <svg 
                      className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4 pt-2">
                    <p className="text-gray-700 leading-relaxed">{lesson.content}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      case 'flashcards':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Flashcards</h3>
            <FlashCard flashcards={bookData.flashcards} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{bookData.bookName}</h2>
        <p className="text-lg text-gray-600">by {bookData.authorName}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8 bg-gray-50 p-2 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
}

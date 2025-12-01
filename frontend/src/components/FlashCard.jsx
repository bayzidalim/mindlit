import { useState } from 'react';

export default function FlashCard({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!flashcards || flashcards.length === 0) {
    return <p className="text-gray-600 text-center py-8">No flashcards available</p>;
  }

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-sm font-medium text-gray-600">
        Card {currentIndex + 1} of {flashcards.length}
      </div>

      <div 
        className="w-full max-w-lg h-80 cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={handleFlip}
      >
        <div 
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front of card */}
          <div 
            className="absolute w-full h-full bg-primary text-white rounded-2xl shadow-lg flex flex-col items-center justify-center text-center p-8"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="uppercase text-xs font-semibold tracking-wider mb-4 opacity-80">Question</p>
            <p className="text-2xl font-semibold leading-tight">{currentCard.question}</p>
          </div>

          {/* Back of card */}
          <div 
            className="absolute w-full h-full bg-gray-900 text-white rounded-2xl shadow-lg flex flex-col p-8 overflow-y-auto"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <p className="uppercase text-xs font-semibold tracking-wider mb-4 opacity-80 text-center">Answer</p>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-lg leading-relaxed text-left">{currentCard.answer}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500">Click card to flip</p>

      <div className="flex gap-3">
        <button
          onClick={handlePrevious}
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={flashcards.length <= 1}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={flashcards.length <= 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';

// Import book cover images
import atomicHabits from '../assets/Images/bookcovers/atomic-habits.png';
import cantHurtMe from '../assets/Images/bookcovers/can\'t-hurt-me.png';
import deepWork from '../assets/Images/bookcovers/deep-work.png';
import educated from '../assets/Images/bookcovers/educated.png';
import howToWinFriends from '../assets/Images/bookcovers/how-to-wind-friends-and-influence-people.png';
import mansSearch from '../assets/Images/bookcovers/mans-search-for-meaning.png';
import mindset from '../assets/Images/bookcovers/mindset-the-new-psychology-of-success.png';
import sapiens from '../assets/Images/bookcovers/sapiens-a-breif-history-of-humankind.png';
import startWithWhy from '../assets/Images/bookcovers/start-with-why.png';
import the5AMClub from '../assets/Images/bookcovers/the-5-am-club.png';
import theAlchemist from '../assets/Images/bookcovers/the-alchemist.png';
import theFourAgreements from '../assets/Images/bookcovers/the-four-agreements.png';
import theLeanStartup from '../assets/Images/bookcovers/the-lean-startup.png';
import thePowerOfNow from '../assets/Images/bookcovers/the-power-of-now.png';
import sevenHabits from '../assets/Images/bookcovers/the-7-habits-of-highly-effective-people.png';
import thinkingFastAndSlow from '../assets/Images/bookcovers/thinking-fast-and-slow.png';
import psychologyOfMoney from '../assets/Images/bookcovers/the-psychology-of-money.png';

// Map book titles to their cover images
const bookCoverMap = {
  'atomic habits': atomicHabits,
  'can\'t hurt me': cantHurtMe,
  'deep work': deepWork,
  'educated': educated,
  'how to win friends and influence people': howToWinFriends,
  'man\'s search for meaning': mansSearch,
  'mindset': mindset,
  'mindset: the new psychology of success': mindset,
  'sapiens: a brief history of humankind': sapiens,
  'sapiens': sapiens,
  'start with why': startWithWhy,
  'the 5 am club': the5AMClub,
  'the alchemist': theAlchemist,
  'the four agreements': theFourAgreements,
  'the lean startup': theLeanStartup,
  'the power of now': thePowerOfNow,
  'the seven habits of highly effective people': sevenHabits,
  'the 7 habits of highly effective people': sevenHabits,
  'thinking, fast and slow': thinkingFastAndSlow,
  'thinking fast and slow': thinkingFastAndSlow,
  'the psychology of money': psychologyOfMoney,
};

const BookCard = ({ book, index = 0 }) => {
  const navigate = useNavigate();

  const handleGenerateSummary = () => {
    navigate('/mindlit-ai', {
      state: {
        bookName: book.title,
        authorName: book.author,
      },
    });
  };

  // Get book cover image based on title
  const getCoverImage = () => {
    const normalizedTitle = book.title.toLowerCase().trim();
    return bookCoverMap[normalizedTitle];
  };

  const coverImage = getCoverImage();

  return (
    <div 
      className="group bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Book Cover Image */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`${book.title} cover`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen size={40} className="text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Book Details */}
      <div className="flex flex-col flex-grow p-3">
        <div className="flex-grow">
          <h3 className="text-base font-bold text-gray-900 mb-0.5 line-clamp-2 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-xs text-gray-500 mb-2">by {book.author}</p>
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{book.description}</p>
        </div>
        
        <button
          onClick={handleGenerateSummary}
          className="mt-3 w-full px-3 py-2 text-xs font-medium text-white bg-primary rounded-lg hover:bg-primary-focus transition-colors flex items-center justify-center gap-2 group-hover:gap-3"
        >
          Generate Summary
          <ArrowRight size={14} className="transition-all" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;

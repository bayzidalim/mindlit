import { useNavigate } from 'react-router-dom';
import { BookOpen, Zap, Award } from 'lucide-react';
import BookCard from '@/components/BookCard';
import heroImage from '@/assets/Images/hero-illustration.png';

const features = [
  {
    icon: <BookOpen size={24} />,
    title: 'AI-Powered Summaries',
    description: 'Get the essence of any book in minutes with intelligent AI-generated summaries.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Interactive Flashcards',
    description: 'Reinforce key concepts with interactive flashcards for better retention.',
  },
  {
    icon: <Award size={24} />,
    title: 'Actionable Insights',
    description: 'Extract key lessons and actionable insights to apply in your daily life.',
  },
];

const featuredBooks = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'An easy and proven way to build good habits and break bad ones.',
  },
  {
    id: 2,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    description: 'Timeless lessons on wealth, greed, and happiness.',
  },
  {
    id: 3,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    description: 'A groundbreaking narrative of humanity\'s creation and evolution.',
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-24 sm:pt-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
              Unlock Knowledge,
              <br />
              <span className="text-primary">Instantly</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed mb-10">
              MindLit uses AI to summarize books, create interactive flashcards, and deliver key insights—helping you learn more in less time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/mindlit-ai')}
                className="px-8 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary-focus transition-colors shadow-sm"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/book-suggestions')}
                className="px-8 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Browse Books
              </button>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="mt-20 mb-[-30px] max-w-5xl mx-auto">
            <div className="relative w-full bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 p-4 sm:p-4">
              <img 
                src={heroImage} 
                alt="Every day brings new knowledge - Learning illustration" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-2 sm:py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              A Better Way to Read
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              MindLit provides the tools you need to absorb information efficiently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div 
                key={feature.title} 
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-50 text-primary rounded-xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Featured Books
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Explore summaries and insights from these popular titles.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => navigate('/book-suggestions')}
              className="px-8 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary-focus transition-colors shadow-sm"
            >
              Explore All Books
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

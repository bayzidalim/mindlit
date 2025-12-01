# Implementation Plan

- [x] 1. Initialize project structure and dependencies
  - Create frontend and backend directories
  - Initialize React + Vite project in frontend folder with Tailwind CSS
  - Initialize Node.js/Express project in backend folder
  - Install all required dependencies for both frontend and backend
  - Configure Tailwind CSS and set up shadcn/ui
  - Create .env.example files for environment variables
  - _Requirements: 8.1, 8.4, 9.1, 9.2_

- [x] 2. Set up backend database and core configuration
  - [x] 2.1 Create SQLite database schema
    - Write database initialization script with all tables (users, books, messages, lessons, flashcards, suggestions)
    - Implement database connection module in config/database.js
    - Create schema.js with table creation queries
    - _Requirements: 8.5, 1.2_
  
  - [x] 2.2 Implement authentication utilities
    - Create JWT token generation and verification functions
    - Implement password hashing with bcrypt
    - Create authentication middleware for protected routes
    - _Requirements: 1.3, 1.4_
  
  - [x] 2.3 Set up Express server with middleware
    - Configure Express server with CORS, JSON parsing, and error handling
    - Set up centralized error handler middleware
    - Configure environment variables loading
    - _Requirements: 8.2, 8.3_

- [x] 3. Implement authentication API endpoints
  - [x] 3.1 Create user registration endpoint
    - Implement POST /api/auth/register route
    - Add input validation for username, email, and password
    - Hash password and store user in database
    - Generate and return JWT token
    - _Requirements: 1.1, 1.2_
  
  - [x] 3.2 Create user login endpoint
    - Implement POST /api/auth/login route
    - Validate credentials against database
    - Generate and return JWT token on success
    - _Requirements: 1.3_
  
  - [x] 3.3 Create user verification endpoint
    - Implement GET /api/auth/me route with auth middleware
    - Return current user information from token
    - _Requirements: 1.4_

- [x] 4. Implement Gemini AI service integration
  - [x] 4.1 Create Gemini AI service module
    - Set up Google Generative AI SDK with API key
    - Create function to generate book summary from book name and author
    - Create function to generate key messages (5-7 messages)
    - Create function to generate lessons (5-7 lessons)
    - Create function to generate flashcards (minimum 5 cards with questions and answers)
    - Implement error handling and retry logic for API failures
    - _Requirements: 3.1, 4.1, 4.2, 5.1_
  
  - [x] 4.2 Create prompt engineering for optimal AI responses
    - Design prompts to get structured responses from Gemini
    - Implement response parsing to extract summary, messages, lessons, and flashcards
    - Add validation for AI response structure
    - _Requirements: 3.1, 4.1, 4.2, 5.1_

- [x] 5. Implement book generation and retrieval API endpoints
  - [x] 5.1 Create book generation endpoint
    - Implement POST /api/books/generate route with auth middleware
    - Validate book name and author name inputs
    - Check if book already exists for user in database
    - Call Gemini AI service to generate content
    - Store book, messages, lessons, and flashcards in database
    - Return complete book data with all generated content
    - _Requirements: 2.1, 2.2, 2.4, 3.1, 3.3, 4.1, 4.2, 5.1, 5.5_
  
  - [x] 5.2 Create book history endpoint
    - Implement GET /api/books/history route with auth middleware
    - Query database for all books belonging to authenticated user
    - Join with messages, lessons, and flashcards tables
    - Return aggregated book data
    - _Requirements: 3.5_
  
  - [x] 5.3 Create single book retrieval endpoint
    - Implement GET /api/books/:id route with auth middleware
    - Verify book belongs to authenticated user
    - Retrieve book with all related data
    - _Requirements: 3.5_

- [x] 6. Implement book suggestions API endpoints
  - [x] 6.1 Create suggestions retrieval endpoint
    - Implement GET /api/suggestions route
    - Query database for all book suggestions
    - Return suggestions list
    - _Requirements: 7.2_
  
  - [x] 6.2 Create suggestions creation endpoint
    - Implement POST /api/suggestions route with auth middleware
    - Validate title, author, and description inputs
    - Store suggestion in database
    - _Requirements: 7.1_
  
  - [x] 6.3 Seed initial book suggestions
    - Create seed script with 10-15 popular book suggestions
    - Include title, author, and brief description for each
    - _Requirements: 7.1, 7.3_

- [x] 7. Set up frontend routing and authentication context
  - [x] 7.1 Configure React Router
    - Set up React Router with routes for Home, MindLit AI, Book Suggestions, Login, Register
    - Implement protected route wrapper for authenticated pages
    - _Requirements: 6.2, 8.2_
  
  - [x] 7.2 Create authentication context
    - Implement AuthContext with login, logout, and checkAuth methods
    - Store JWT token in localStorage
    - Provide authentication state to entire app
    - Handle token expiration and automatic logout
    - _Requirements: 1.4, 1.5_
  
  - [x] 7.3 Create API service module
    - Set up Axios instance with base URL and interceptors
    - Add request interceptor to attach JWT token to headers
    - Add response interceptor to handle authentication errors
    - Create API functions for all backend endpoints
    - _Requirements: 8.2_

- [x] 8. Implement authentication UI components
  - [x] 8.1 Create Login page
    - Build login form with email and password fields using shadcn/ui Input components
    - Implement form validation
    - Add submit handler that calls login API
    - Store token and update AuthContext on success
    - Display error messages for failed login
    - Add link to registration page
    - Style with Tailwind CSS
    - _Requirements: 1.3, 9.1, 9.2, 9.5_
  
  - [x] 8.2 Create Register page
    - Build registration form with username, email, password, and confirm password fields
    - Implement client-side validation for password match
    - Add submit handler that calls register API
    - Auto-login after successful registration
    - Display error messages for validation failures
    - Add link to login page
    - Style with Tailwind CSS
    - _Requirements: 1.1, 1.2, 9.1, 9.2, 9.5_

- [x] 9. Implement navigation component
  - Create Navbar component with three navigation links
  - Implement active link highlighting using React Router
  - Add user info display when authenticated
  - Add logout button that clears token and redirects to login
  - Implement responsive mobile menu with hamburger icon
  - Style with Tailwind CSS and shadcn/ui components
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 9.1, 9.2, 9.3, 9.4_

- [x] 10. Implement Home page
  - Create Home page component with welcome message and app description
  - Add call-to-action buttons to navigate to MindLit AI
  - Display featured book suggestions or recent summaries
  - Style with Tailwind CSS using modern layout (hero section, feature cards)
  - Ensure responsive design for all screen sizes
  - _Requirements: 6.2, 9.1, 9.2, 9.3, 9.4_

- [x] 11. Implement MindLit AI page and components
  - [x] 11.1 Create BookInput component
    - Build form with book name and author name input fields using shadcn/ui
    - Implement form validation to ensure both fields are filled
    - Add submit button with loading state
    - Display error messages for validation failures
    - Style with Tailwind CSS
    - _Requirements: 2.1, 2.2, 2.3, 9.1, 9.2, 9.5_
  
  - [x] 11.2 Create SummaryDisplay component
    - Create sections for Summary, Messages, Lessons, and Flashcards
    - Implement tabbed or accordion interface using shadcn/ui Tabs or Accordion
    - Display summary text in readable format
    - Display messages and lessons as structured lists or cards
    - Add loading indicator while content is being generated
    - Style with Tailwind CSS
    - _Requirements: 3.2, 4.3, 4.4, 9.1, 9.2, 9.4_
  
  - [x] 11.3 Create FlashCard component
    - Build interactive flashcard with flip animation
    - Display question on front, answer on back
    - Add click handler to flip card
    - Implement navigation buttons (previous/next)
    - Add progress indicator showing current card number
    - Style with Tailwind CSS and custom animations
    - _Requirements: 5.2, 5.3, 5.4, 9.1, 9.2, 9.4_
  
  - [x] 11.4 Integrate components in MindLit AI page
    - Create MindLitAI page component
    - Add BookInput component at the top
    - Display loading state while generating content
    - Show SummaryDisplay with all sections after generation
    - Handle errors and display user-friendly messages
    - Implement caching to avoid regenerating same book
    - _Requirements: 2.4, 2.5, 3.4, 9.3_

- [x] 12. Implement Book Suggestions page
  - [x] 12.1 Create BookCard component
    - Build card component displaying book title, author, and description
    - Add "Generate Summary" button
    - Implement click handler to navigate to MindLit AI with pre-filled book info
    - Style with shadcn/ui Card component and Tailwind CSS
    - _Requirements: 7.3, 7.4, 9.1, 9.2_
  
  - [x] 12.2 Create BookSuggestions page
    - Fetch book suggestions from API on component mount
    - Display suggestions in responsive grid layout
    - Render BookCard for each suggestion
    - Add loading state while fetching
    - Handle errors gracefully
    - Style with Tailwind CSS grid system
    - _Requirements: 7.1, 7.2, 9.1, 9.2, 9.3_

- [x] 13. Implement error handling and loading states
  - Create reusable error message component with shadcn/ui Alert
  - Create loading spinner component
  - Add error boundaries for React components
  - Implement toast notifications for success/error messages using shadcn/ui Toast
  - Add retry functionality for failed API calls
  - _Requirements: 3.4, 9.5_

- [x] 14. Add responsive design and polish
  - Ensure all pages are responsive on mobile, tablet, and desktop
  - Test navigation on different screen sizes
  - Add smooth transitions and animations
  - Implement consistent spacing and typography
  - Add favicon and page titles
  - Optimize images and assets
  - _Requirements: 9.3, 9.4_

- [ ] 15. Integration and end-to-end testing
  - Test complete user registration and login flow
  - Test book summary generation with real Gemini API
  - Test flashcard navigation and flip animations
  - Test navigation between all pages
  - Verify JWT token persistence across page refreshes
  - Test error scenarios (invalid credentials, API failures, network errors)
  - Verify responsive design on multiple devices
  - _Requirements: All requirements_

# Requirements Document

## Introduction

MindLit is a web application that leverages AI to provide book summaries, key messages, lessons, and flashcards to help users learn from books efficiently. The system consists of a frontend and backend architecture, uses Gemini AI for content generation, implements JWT-based authentication, and stores data in a local SQLite database.

## Glossary

- **MindLit System**: The complete web application including frontend and backend components
- **User**: An authenticated individual who interacts with the MindLit System
- **Book Request**: User input containing book name and author name
- **AI Summary**: Generated content including book summary, messages, lessons, and flashcards
- **Gemini AI Service**: External AI API used for content generation
- **Authentication Service**: JWT-based system for user identity verification
- **Database**: SQLite local database for storing user and book data
- **Navigation Menu**: UI component with Home, MindLit AI, and Our Book Suggestions sections

## Requirements

### Requirement 1

**User Story:** As a user, I want to register and log in to the system, so that I can access personalized book summaries and save my progress

#### Acceptance Criteria

1. THE MindLit System SHALL provide a registration interface that accepts username, email, and password
2. WHEN a user submits valid registration credentials, THE Authentication Service SHALL create a new user account in the Database
3. WHEN a user submits valid login credentials, THE Authentication Service SHALL generate a JWT token
4. THE MindLit System SHALL store the JWT token and include it in subsequent requests to protected endpoints
5. WHEN a JWT token expires or is invalid, THE MindLit System SHALL redirect the user to the login page

### Requirement 2

**User Story:** As a user, I want to input a book name and author name, so that I can receive AI-generated insights about the book

#### Acceptance Criteria

1. THE MindLit System SHALL provide input fields for book name and author name on the MindLit AI page
2. WHEN a user submits a Book Request with both book name and author name, THE MindLit System SHALL validate that both fields contain text
3. IF either the book name or author name field is empty, THEN THE MindLit System SHALL display an error message to the user
4. WHEN a valid Book Request is submitted, THE MindLit System SHALL send the request to the backend for processing
5. WHILE the AI Summary is being generated, THE MindLit System SHALL display a loading indicator to the user

### Requirement 3

**User Story:** As a user, I want to receive a comprehensive summary of the book, so that I can understand the main content without reading the entire book

#### Acceptance Criteria

1. WHEN the backend receives a valid Book Request, THE Gemini AI Service SHALL generate a book summary
2. THE MindLit System SHALL display the generated summary in a readable format on the results page
3. THE MindLit System SHALL store the generated summary in the Database associated with the book and user
4. IF the Gemini AI Service fails to generate content, THEN THE MindLit System SHALL display an error message to the user
5. THE MindLit System SHALL retrieve previously generated summaries from the Database when the same book is requested again

### Requirement 4

**User Story:** As a user, I want to see the key messages and lessons from the book, so that I can understand the main takeaways and apply them to my life

#### Acceptance Criteria

1. WHEN the backend receives a valid Book Request, THE Gemini AI Service SHALL generate key messages from the book
2. WHEN the backend receives a valid Book Request, THE Gemini AI Service SHALL generate lessons from the book
3. THE MindLit System SHALL display the messages and lessons in separate, clearly labeled sections
4. THE MindLit System SHALL format the messages and lessons as structured lists or cards for easy reading
5. THE MindLit System SHALL store the messages and lessons in the Database

### Requirement 5

**User Story:** As a user, I want to receive flashcards based on the book content, so that I can review and memorize key concepts effectively

#### Acceptance Criteria

1. WHEN the backend receives a valid Book Request, THE Gemini AI Service SHALL generate flashcards with questions and answers
2. THE MindLit System SHALL display flashcards in an interactive format where users can flip between question and answer
3. THE MindLit System SHALL generate a minimum of 5 flashcards per book
4. THE MindLit System SHALL allow users to navigate between flashcards using next and previous controls
5. THE MindLit System SHALL store the flashcards in the Database

### Requirement 6

**User Story:** As a user, I want to navigate between different sections of the website, so that I can access various features and information

#### Acceptance Criteria

1. THE MindLit System SHALL display a Navigation Menu with three options: Home, MindLit AI, and Our Book Suggestions
2. WHEN a user clicks on a Navigation Menu item, THE MindLit System SHALL navigate to the corresponding page
3. THE MindLit System SHALL highlight the active Navigation Menu item to indicate the current page
4. THE Navigation Menu SHALL be accessible from all pages in the application
5. THE MindLit System SHALL use Tailwind CSS for styling the Navigation Menu

### Requirement 7

**User Story:** As a user, I want to see book suggestions, so that I can discover new books to read and learn from

#### Acceptance Criteria

1. THE MindLit System SHALL display a list of book suggestions on the Our Book Suggestions page
2. THE MindLit System SHALL retrieve book suggestions from the Database
3. THE MindLit System SHALL display each book suggestion with title, author, and a brief description
4. WHEN a user clicks on a book suggestion, THE MindLit System SHALL allow the user to generate an AI Summary for that book
5. THE MindLit System SHALL use Tailwind CSS components for displaying book suggestions in a visually appealing layout

### Requirement 8

**User Story:** As a system administrator, I want the application to have a separate frontend and backend architecture, so that the system is maintainable and scalable

#### Acceptance Criteria

1. THE MindLit System SHALL organize code into separate frontend and backend directories
2. THE frontend SHALL communicate with the backend through RESTful API endpoints
3. THE backend SHALL expose API endpoints for authentication, book summary generation, and data retrieval
4. THE frontend SHALL be built using modern JavaScript framework with Tailwind CSS
5. THE backend SHALL use SQLite as the Database for local data storage

### Requirement 9

**User Story:** As a user, I want the website to have a modern and responsive design, so that I can use it comfortably on different devices

#### Acceptance Criteria

1. THE MindLit System SHALL use Tailwind CSS for all styling
2. THE MindLit System SHALL use a modern Tailwind CSS component library for UI elements
3. THE MindLit System SHALL be responsive and adapt to different screen sizes
4. THE MindLit System SHALL maintain consistent styling across all pages
5. THE MindLit System SHALL provide visual feedback for user interactions such as button clicks and form submissions

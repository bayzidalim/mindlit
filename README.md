# MindLit

AI-powered book summaries, lessons, and flashcards application.

## Project Structure

```
mindlit/
├── frontend/          # React + Vite + Tailwind CSS
├── backend/           # Node.js + Express + SQLite
└── .kiro/            # Kiro specs and configuration
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your configuration:
   - `JWT_SECRET`: Your JWT secret key
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `PORT`: Server port (default: 3000)

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` if needed:
   - `VITE_API_URL`: Backend API URL (default: http://localhost:3000)

4. Start the development server:
   ```bash
   npm run dev
   ```

## Technology Stack

### Frontend
- React 18
- Vite
- Tailwind CSS v4
- shadcn/ui components
- React Router
- Axios

### Backend
- Node.js
- Express
- SQLite3
- JWT Authentication
- bcrypt
- Google Generative AI (Gemini)

## Development

- Backend runs on `http://localhost:3000`
- Frontend runs on `http://localhost:5173`

## Features

- User authentication (register/login)
- AI-powered book summaries
- Key messages and lessons extraction
- Interactive flashcards
- Book suggestions
- Responsive design
# mindlit

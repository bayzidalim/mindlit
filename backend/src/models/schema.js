import db from '../config/database.js';

// SQL queries for creating tables
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

const createBooksTable = `
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    book_name TEXT NOT NULL,
    author_name TEXT NOT NULL,
    summary TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`;

const createMessagesTable = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    order_index INTEGER,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
  )
`;

const createLessonsTable = `
  CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    order_index INTEGER,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
  )
`;

const createFlashcardsTable = `
  CREATE TABLE IF NOT EXISTS flashcards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INTEGER,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
  )
`;

const createSuggestionsTable = `
  CREATE TABLE IF NOT EXISTS suggestions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

// Initialize database with all tables
export const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(createUsersTable, (err) => {
        if (err) {
          console.error('Error creating users table:', err);
          return reject(err);
        }
        console.log('Users table created or already exists');
      });

      db.run(createBooksTable, (err) => {
        if (err) {
          console.error('Error creating books table:', err);
          return reject(err);
        }
        console.log('Books table created or already exists');
      });

      db.run(createMessagesTable, (err) => {
        if (err) {
          console.error('Error creating messages table:', err);
          return reject(err);
        }
        console.log('Messages table created or already exists');
      });

      db.run(createLessonsTable, (err) => {
        if (err) {
          console.error('Error creating lessons table:', err);
          return reject(err);
        }
        console.log('Lessons table created or already exists');
      });

      db.run(createFlashcardsTable, (err) => {
        if (err) {
          console.error('Error creating flashcards table:', err);
          return reject(err);
        }
        console.log('Flashcards table created or already exists');
      });

      db.run(createSuggestionsTable, (err) => {
        if (err) {
          console.error('Error creating suggestions table:', err);
          return reject(err);
        }
        console.log('Suggestions table created or already exists');
        resolve();
      });
    });
  });
};

export default {
  initializeDatabase
};

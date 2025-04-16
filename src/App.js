import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import { getBooks, reserveBook } from './services/mockBookService';
import './App.css';

/**
 * Main App component: Sets up routing and manages global book state.
 */
function App() {
  const [allBooks, setAllBooks] = useState([]); // Holds the master list of books
  const [isLoading, setIsLoading] = useState(true); // Tracks initial loading state
  const [error, setError] = useState(null); // Holds error message if initial load fails

  // Function to fetch initial book data
  const fetchInitialBooks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getBooks();
      setAllBooks(data);
    } catch (err) {
      console.error("App: Failed to fetch initial books:", err);
      setError(err.message || "Failed to load books.");
    } finally {
      setIsLoading(false);
    }
  }, []); // useCallback ensures stable function identity

  // Fetch books when the component mounts
  useEffect(() => {
    fetchInitialBooks();
  }, [fetchInitialBooks]); // Dependency array includes the stable fetch function

  // Handler for book reservation attempts
  const handleReserve = useCallback(async (bookId) => {
    console.log(`App: User attempting to reserve book ID: ${bookId}`);
    const bookToReserve = allBooks.find(book => book.id === bookId);

    if (!bookToReserve || !bookToReserve.available) {
        alert(bookToReserve ? "This book is already reserved." : "Book not found.");
        return;
    }

    // Optimistic UI Update: Change state immediately for better UX
    setAllBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === bookId ? { ...book, available: false } : book
      )
    );

    try {
      // Call the mock service
      const response = await reserveBook(bookId);
      alert(response.message); // Show success message
      // Note: No notification system implemented yet
    } catch (err) {
      console.error("App: Reservation failed:", err);
      alert(`Reservation failed: ${err.message}`);
      // Rollback UI change if API call failed
      setAllBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === bookId ? { ...book, available: true } : book
        )
      );
    }
  }, [allBooks]); // Depends on allBooks to find the book

  return (
    <Router> {/* Provides routing context */}
      <div className="App">
        <Navbar /> {/* Consistent navigation */}
        <main className="container"> {/* Main content area */}
          <Routes> {/* Defines application routes */}
            {/* Home Page: Search and Book List */}
            <Route
              path="/"
              element={
                <HomePage
                  books={allBooks}
                  onReserve={handleReserve}
                  isLoading={isLoading}
                  error={error}
                />
              }
            />
            {/* User Profile Page (for Members) */}
            <Route path="/profile" element={<UserProfilePage />} />
            {/* Admin Dashboard Page (for Staff) */}
            <Route path="/admin" element={<AdminDashboardPage />} />
            {/* Catch-all 404 Not Found Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        {/* Footer could be added here */}
      </div>
    </Router>
  );
}

export default App;

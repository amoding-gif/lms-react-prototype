import React, { useState, useMemo } from 'react';
import SearchForm from '../components/SearchForm';
import BookList from '../components/BookList';
import '../App.css';

/**
 * HomePage: Displays search form and filtered book list.
 * Target Audience: Library Members (and general visitors).
 * Features: Book Search, Book Display.
 * @param {object} props - Props from App.js.
 * @param {Array} props.books - Master list of all books.
 * @param {function} props.onReserve - Handler for book reservation.
 * @param {boolean} props.isLoading - Loading state for initial book fetch.
 * @param {string|null} props.error - Error message from initial book fetch.
 */
function HomePage({ books, onReserve, isLoading, error }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter books based on search term (title, author, genre)
  // useMemo optimizes performance by caching the result
  const filteredBooks = useMemo(() => {
    if (!searchTerm) {
      return books; // Show all books if no search term
    }
    const lowerCaseQuery = searchTerm.toLowerCase();
    return books.filter(book =>
      book.title.toLowerCase().includes(lowerCaseQuery) ||
      book.author.toLowerCase().includes(lowerCaseQuery) ||
      book.genre.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchTerm, books]); // Recalculate only if searchTerm or books change

  // Update search term state when SearchForm submits
  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />

      {/* Display loading indicator */}
      {isLoading && <p className="loading">Loading books...</p>}

      {/* Display error message if initial fetch failed */}
      {error && <p className="error">Error loading books: {error}</p>}

      {/* Display book list if not loading and no error */}
      {!isLoading && !error && (
        <BookList books={filteredBooks} onReserve={onReserve} />
      )}
    </div>
  );
}

export default HomePage;

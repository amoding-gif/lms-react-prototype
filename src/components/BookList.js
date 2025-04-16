import React from 'react';
import BookItem from './BookItem';
import '../App.css';

/**
 * Renders a list of BookItem components.
 * @param {object} props - Component props.
 * @param {Array} props.books - Array of book objects to display.
 * @param {function} props.onReserve - Function to pass down to each BookItem for handling reservations.
 */
function BookList({ books, onReserve }) {
  // Display message if no books match the search criteria
  if (!books || books.length === 0) {
    return <p className="info-message" style={{textAlign: 'center'}}>No books found matching your criteria.</p>;
  }

  // Map over the books array and render a BookItem for each
  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem key={book.id} book={book} onReserve={onReserve} />
      ))}
    </ul>
  );
}

export default BookList;

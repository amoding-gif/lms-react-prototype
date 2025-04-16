// src/components/BookItem.js

import React from 'react';
import '../App.css'; // We will add image styles here later

/**
 * Displays details for a single book, including an image, and a button to reserve it.
 * @param {object} props - Component props.
 * @param {object} props.book - The book object { id, title, author, genre, available, imageUrl }.
 * @param {function} props.onReserve - Callback function to call when the reserve button is clicked (passes book.id).
 */
function BookItem({ book, onReserve }) {

  const handleReserveClick = () => {
    if (book.available) {
      onReserve(book.id); // Call parent's reserve handler
    }
  };

  return (
    <li className="book-item">
      {/* --- Add Book Cover Image --- */}
      {/* Conditionally render the image only if imageUrl exists */}
      {book.imageUrl && (
        <img
          src={book.imageUrl}
          alt={`Cover of ${book.title}`}
          className="book-cover-image" // Add a class for styling
        />
      )}

      {/* Book details */}
      <div> {/* Keep details grouped */}
        <h3>{book.title}</h3>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p>
          <strong>Status:</strong>
          <span className={book.available ? 'status-available' : 'status-reserved'}>
            {book.available ? ' Available' : ' Reserved'}
          </span>
        </p>
      </div>

      {/* Reserve button */}
      <button
        onClick={handleReserveClick}
        disabled={!book.available} // Disable if already reserved
        aria-label={book.available ? `Reserve ${book.title}` : `${book.title} is currently reserved`}
      >
        {book.available ? 'Reserve Book' : 'Reserved'}
      </button>
    </li>
  );
}

export default BookItem;

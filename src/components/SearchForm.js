import React, { useState } from 'react';
import '../App.css';

/**
 * Search form component allowing users to search books by title, author, or genre.
 * @param {object} props - Component props.
 * @param {function} props.onSearch - Callback function triggered with the search query on form submission.
 */
function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    onSearch(query); // Trigger search in parent component
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        placeholder="Search by title, author, or genre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search library books"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;

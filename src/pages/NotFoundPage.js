import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

/**
 * NotFoundPage: Displayed for invalid URL paths.
 */
function NotFoundPage() {
  return (
    <div className="page-container" style={{ textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you requested could not be found.</p>
      <Link to="/" className='nav-link' style={{ color: '#007bff', display: 'inline-block', marginTop: '20px', padding: '10px 15px', border: '1px solid #007bff', borderRadius: '4px' }}>
        Return to Home Page
      </Link>
    </div>
  );
}

export default NotFoundPage;

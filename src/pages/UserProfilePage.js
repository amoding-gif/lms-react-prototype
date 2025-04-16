import React, { useState, useEffect } from 'react';
import { getUserProfile, getUserReservations } from '../services/mockBookService';
import '../App.css';

/**
 * UserProfilePage: Placeholder for users to view their details and reservations.
 * Target Audience: Library Members.
 * Features: User Profile (view reservations, borrowing history - placeholder).
 */
function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile and reservation data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate fetching for a specific logged-in user (e.g., 'user1')
        const userId = 'user1';
        const [profileData, reservationData] = await Promise.all([
            getUserProfile(userId),
            getUserReservations(userId)
        ]);
        setUser(profileData);
        setReservations(reservationData);
      } catch (err) {
        console.error("Error fetching user profile data:", err);
        setError(err.message || "Failed to load profile information.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // Run only once on mount

  return (
    <div className="page-container">
      <h2>My Profile</h2>

      {isLoading && <p className="loading">Loading your profile...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!isLoading && !error && user && (
        <>
          <section>
            <h3>Account Details</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Member ID:</strong> {user.memberId}</p>
          </section>

          <section>
            <h3>My Reservations</h3>
            {reservations.length > 0 ? (
              <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                {reservations.map(book => (
                  <li key={`res-${book.id}`} style={{ marginBottom: '10px' }}>
                    <strong>{book.title}</strong> by {book.author} <br />
                    <small>Reserved On: {book.reservedOn} - Status: {book.status}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="info-message">You currently have no books reserved.</p>
            )}
          </section>

          <section>
            <h3>Borrowing History</h3>
            {/* Placeholder for future implementation */}
            <p className="info-message">Your past borrowing history will be displayed here.</p>
          </section>
        </>
      )}
       {!isLoading && !error && !user && (
           <p className="info-message">Could not load user profile data. Please try again later.</p>
       )}
    </div>
  );
}

export default UserProfilePage;

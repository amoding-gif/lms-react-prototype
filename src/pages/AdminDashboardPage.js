import React, { useState, useEffect } from 'react';
import {
    getBooks,
    adminGetAllUsers,
    adminGetAllReservations,
    adminAddBook, // Assuming you might add a form later
    adminUpdateReservationStatus // For managing reservations
} from '../services/mockBookService';
import '../App.css';

/**
 * AdminDashboardPage: Placeholder for staff to manage books, users, and reservations.
 * Target Audience: Library Staff.
 * Features: Admin Dashboard (manage books, reservations, user accounts - placeholders).
 */
function AdminDashboardPage() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all necessary admin data on component mount
  const fetchAdminData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch data concurrently
        const [usersData, booksData, reservationsData] = await Promise.all([
          adminGetAllUsers(),
          getBooks(), // Use getBooks for the list to manage
          adminGetAllReservations()
        ]);
        setUsers(usersData);
        setBooks(booksData);
        setReservations(reservationsData);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError(err.message || "Failed to load admin dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    fetchAdminData();
  }, []); // Run only once on mount

  // Placeholder handlers for admin actions
  const handleAddBookClick = () => alert("Add New Book form not implemented yet.");
  const handleEditBookClick = (bookId) => alert(`Edit Book ${bookId} form not implemented yet.`);
  const handleManageUserClick = (userId) => alert(`Manage User ${userId} options not implemented yet.`);
  const handleUpdateReservation = async (reservationId, newStatus) => {
      alert(`Attempting to update reservation ${reservationId} to ${newStatus}...`);
      try {
          const result = await adminUpdateReservationStatus(reservationId, newStatus);
          alert(result.message);
          // Re-fetch data to reflect changes (simple approach for mock)
          fetchAdminData();
      } catch (err) {
          alert(`Failed to update reservation: ${err.message}`);
      }
  };


  return (
    <div className="page-container">
      <h2>Admin Dashboard</h2>
      <p className="info-message">Tools for managing library resources and users.</p>

      {isLoading && <p className="loading">Loading dashboard data...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!isLoading && !error && (
        <>
          {/* Book Management */}
          <section>
            <h3>Book Management</h3>
            <button onClick={handleAddBookClick} style={{ marginBottom: '15px' }}>Add New Book</button>
            <h4>Catalogue:</h4>
            {books.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {books.map(book => (
                  <li key={`book-mng-${book.id}`} style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span><strong>{book.title}</strong> ({book.available ? 'Available' : 'Reserved'})</span>
                    <button onClick={() => handleEditBookClick(book.id)} style={{ marginLeft: '10px' }}>Edit</button>
                  </li>
                ))}
              </ul>
            ) : <p>No books in catalogue.</p>}
          </section>

          {/* Reservation Management */}
          <section>
            <h3>Reservation Management</h3>
             {reservations.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {reservations.map(res => (
                  <li key={res.reservationId} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                    <span><strong>{res.bookTitle}</strong> reserved by {res.userName} (User ID: {res.userId})</span><br/>
                    <small>Reserved On: {res.reservedOn} - Current Status: {res.status}</small><br/>
                    {/* Example actions */}
                    <button onClick={() => handleUpdateReservation(res.reservationId, 'Checked Out')} style={{ marginRight: '5px', marginTop: '5px', fontSize: '0.9em' }}>Mark Checked Out</button>
                    <button onClick={() => handleUpdateReservation(res.reservationId, 'Cancelled')} style={{ marginRight: '5px', marginTop: '5px', fontSize: '0.9em' }}>Cancel Reservation</button>
                  </li>
                ))}
              </ul>
            ) : <p>No active reservations.</p>}
          </section>

          {/* User Account Management */}
          <section>
            <h3>User Account Management</h3>
             {users.length > 0 ? (
               <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.map(user => (
                  <li key={`user-mng-${user.userId}`} style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{user.name} ({user.email}) - ID: {user.memberId}</span>
                     <button onClick={() => handleManageUserClick(user.userId)} style={{ marginLeft: '10px' }}>Manage</button>
                  </li>
                ))}
              </ul>
            ) : <p>No users found.</p>}
          </section>
        </>
      )}
    </div>
  );
}

export default AdminDashboardPage;

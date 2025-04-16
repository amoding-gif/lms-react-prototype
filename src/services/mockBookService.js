// Mock data store - Simulates a database table
let mockBooks = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", available: true },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", available: false },
    { id: 3, title: "1984", author: "George Orwell", genre: "Dystopian", available: true },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", available: true },
    { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", available: false },
    { id: 6, title: "Brave New World", author: "Aldous Huxley", genre: "Dystopian", available: true },
    { id: 7, title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Classic", available: true },
    { id: 8, title: "Moby Dick", author: "Herman Melville", genre: "Adventure", available: true },
    { id: 9, title: "War and Peace", author: "Leo Tolstoy", genre: "Historical Fiction", available: false },
    { id: 10, title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy", available: true },
  ];
  
  // Simulate network delay helper function
  const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  /**
   * Fetches all books. Simulates an API call.
   * @returns {Promise<Array>} A promise resolving with a deep copy of the books array.
   */
  export const getBooks = async () => {
    console.log("Mock Service: Fetching all books...");
    await simulateDelay(800);
    console.log("Mock Service: Returning books.");
    return JSON.parse(JSON.stringify(mockBooks)); // Return deep copy
  };
  
  /**
   * Reserves a book by ID. Simulates an API call.
   * Modifies the availability in the mock data store.
   * @param {number} bookId The ID of the book to reserve.
   * @returns {Promise<object>} A promise resolving with success message or rejecting with an error.
   */
  export const reserveBook = async (bookId) => {
    console.log(`Mock Service: Attempting to reserve book ID: ${bookId}`);
    await simulateDelay(500);
  
    const bookIndex = mockBooks.findIndex(book => book.id === bookId);
  
    if (bookIndex === -1) {
      console.error(`Mock Service: Book ${bookId} not found.`);
      throw new Error("Book not found.");
    }
  
    const book = mockBooks[bookIndex];
  
    if (!book.available) {
      console.log(`Mock Service: Book ${bookId} is already reserved.`);
      throw new Error(`"${book.title}" is currently unavailable.`);
    }
  
    // Update the book's availability in our mock store
    mockBooks[bookIndex] = { ...book, available: false };
    console.log(`Mock Service: Book ${bookId} reserved successfully.`);
    // Simulate successful API response
    return { success: true, message: `Book "${book.title}" reserved successfully!` };
    // NOTE: Notifications are not implemented here, only the reservation status change.
  };
  
  // --- Mock Functions for User Profile (Placeholder) ---
  /**
   * Fetches mock profile data for a user.
   * @param {string} userId - Mock user ID.
   * @returns {Promise<object>} Mock user profile data.
   */
  export const getUserProfile = async (userId) => {
      await simulateDelay(600);
      console.log(`Mock Service: Fetching profile for user ${userId}`);
      // In real app, fetch based on logged-in user context
      return { userId: userId, name: "Alex Reader", email: "alex.reader@example.com", memberId: "LIBMEMBER-001" };
  };
  
  /**
   * Fetches mock reservations for a user.
   * @param {string} userId - Mock user ID.
   * @returns {Promise<Array>} Mock list of reserved books for the user.
   */
  export const getUserReservations = async (userId) => {
      await simulateDelay(700);
      console.log(`Mock Service: Fetching reservations for user ${userId}`);
      // Simple mock: return all currently reserved books (in real app, filter by userId)
      const userReservedBooks = mockBooks.filter(book => !book.available);
      return userReservedBooks.map(book => ({
          ...book,
          reservedOn: new Date(Date.now() - Math.random() * 1000 * 3600 * 24 * 5).toLocaleDateString(), // Mock date within last 5 days
          status: "Ready for Pickup" // Mock status
      }));
  };
  
  // --- Mock Functions for Admin Dashboard (Placeholder) ---
  /**
   * Fetches a mock list of all users for admin view.
   * @returns {Promise<Array>} Mock list of users.
   */
  export const adminGetAllUsers = async () => {
      await simulateDelay(900);
      console.log("Mock Service: Admin fetching all users");
      return [
          { userId: 'user1', name: "Alex Reader", email: "alex.reader@example.com", memberId: "LIBMEMBER-001" },
          { userId: 'user2', name: "Sam Researcher", email: "sam.researcher@example.com", memberId: "LIBMEMBER-002" },
          { userId: 'user3', name: "Casey Student", email: "casey.student@example.com", memberId: "LIBMEMBER-003" },
      ];
  };
  
  /**
   * Fetches a mock list of all reservations for admin view.
   * @returns {Promise<Array>} Mock list of all reservations.
   */
  export const adminGetAllReservations = async () => {
      await simulateDelay(850);
      console.log("Mock Service: Admin fetching all reservations");
      // Simple mock: return all reserved books with mock user info
      const allReservedBooks = mockBooks.filter(book => !book.available);
      const users = await adminGetAllUsers(); // Get mock users to assign reservations
      return allReservedBooks.map((book, index) => ({
          reservationId: `RES-${book.id}`,
          bookTitle: book.title,
          bookId: book.id,
          userId: users[index % users.length].userId, // Assign to users cyclically
          userName: users[index % users.length].name,
          reservedOn: new Date(Date.now() - Math.random() * 1000 * 3600 * 24 * 7).toLocaleDateString(), // Mock date within last 7 days
          status: (Math.random() > 0.5) ? "Ready for Pickup" : "Processing" // Mock status
      }));
  };
  
  /**
   * Placeholder for admin updating book details.
   * @param {object} bookData - Updated book data.
   * @returns {Promise<object>} Success message.
   */
  export const adminUpdateBook = async (bookData) => {
      await simulateDelay(500);
      console.log("Mock Service: Admin updating book", bookData);
      const index = mockBooks.findIndex(b => b.id === bookData.id);
      if (index !== -1) {
          mockBooks[index] = { ...mockBooks[index], ...bookData };
          return { success: true, message: `Book "${bookData.title}" updated.` };
      } else {
          throw new Error("Book not found for update.");
      }
  };
  
  /**
   * Placeholder for admin adding a new book.
   * @param {object} newBookData - Data for the new book (title, author, genre).
   * @returns {Promise<object>} The newly added book with an ID.
   */
  export const adminAddBook = async (newBookData) => {
      await simulateDelay(600);
      console.log("Mock Service: Admin adding new book", newBookData);
      const newId = Math.max(...mockBooks.map(b => b.id), 0) + 1;
      const newBook = { ...newBookData, id: newId, available: true }; // New books are available
      mockBooks.push(newBook);
      return { success: true, book: newBook, message: `Book "${newBook.title}" added successfully.` };
  };
  
  /**
   * Placeholder for admin managing a reservation (e.g., mark as complete).
   * @param {string} reservationId - The ID of the reservation.
   * @param {string} newStatus - The new status.
   * @returns {Promise<object>} Success message.
   */
  export const adminUpdateReservationStatus = async (reservationId, newStatus) => {
      await simulateDelay(400);
      console.log(`Mock Service: Admin updating reservation ${reservationId} to status ${newStatus}`);
      // In a real app, find the reservation and update its status in the database.
      // Here, we don't have a separate reservations list in the mock, so just return success.
      // If the status is 'Checked Out' or 'Cancelled', we might update the book's availability.
      const bookId = parseInt(reservationId.split('-')[1]); // Extract book ID from mock reservationId
      if (newStatus === 'Checked Out' || newStatus === 'Cancelled' || newStatus === 'Expired') {
           const bookIndex = mockBooks.findIndex(book => book.id === bookId);
           if (bookIndex !== -1 && !mockBooks[bookIndex].available) {
               mockBooks[bookIndex].available = true; // Make book available again
               console.log(`Mock Service: Book ${bookId} availability updated due to reservation status change.`);
           }
      }
      return { success: true, message: `Reservation ${reservationId} status updated to ${newStatus}.` };
  };
  
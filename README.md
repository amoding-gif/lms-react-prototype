# Library Management System (LMS) - React Prototype

## Project Description

This project is a React-based web application prototype for a Library Management System (LMS) for the Local Community Library. It provides an online platform for users to interact with library resources.

## Target Audience

- **Library Members:** Students, researchers, and general readers.
- **Library Staff:** For managing books, reservations, and user accounts.

## Key Features Implemented (Prototype Stage)

1.  **Book Search:** (Functional) Users can search the library catalogue by book **title**, **author**, or **genre** on the homepage.
2.  **Book Reservation:** (Functional - Mock) Users can click a button to reserve an available book. The status updates visually, and a confirmation alert is shown. _Notifications are a future enhancement._ This uses mock data simulation.
3.  **User Profiles:** (Placeholder Page) A dedicated `/profile` route exists for **Library Members** to eventually manage their reservations and view borrowing history. Currently shows mock data.
4.  **Admin Dashboard:** (Placeholder Page) A dedicated `/admin` route exists for **Library Staff** to eventually manage books, reservations, and user accounts. Currently shows mock data and placeholders for functionality.

## Technologies Used

- React (v18+)
- React Router DOM (v6+)
- JavaScript (ES6+)
- CSS3
- Mock Service (`/src/services/mockBookService.js`)

## Setup and Running

1.  **Prerequisites:** Node.js and npm (or yarn).
2.  **Install Dependencies:** Navigate to the `lms-react-prototype` directory in your terminal and run `npm install`.
3.  **Run:** In the same terminal, run `npm start`. The application will open at `http://localhost:3000`.

## Project Structure

- `public/`: Static assets.
- `src/`: Source code.
  - `components/`: Reusable UI parts.
  - `pages/`: Route-specific components.
  - `services/`: Data simulation.
  - `App.js`: Main component with routing.
  - `index.js`: Entry point.
  - `*.css`: Styles.

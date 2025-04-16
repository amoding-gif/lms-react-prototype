import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // NavLink for active styling
import '../App.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          <h1>Community Library</h1>
        </Link>
      </div>
      <div className="navbar-links">
        {/* Use NavLink to automatically add 'active' class to the current route's link */}
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>My Profile</NavLink>
        <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Admin Dashboard</NavLink>
        {/* Add Login/Logout button placeholder later */}
      </div>
    </nav>
  );
}

export default Navbar;

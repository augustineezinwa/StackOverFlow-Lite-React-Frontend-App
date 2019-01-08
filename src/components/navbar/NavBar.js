import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <div className="nav" id="navbar">
    <div className="nav-header">
      <div className="nav-title">
        StackOverFlow-Lite
      </div>
    </div>
    <div className="nav-btn">
      <label htmlFor="nav-check">
        <span />
        <span />
        <span />
      </label>
    </div>
    <input type="checkbox" id="nav-check" />
    <div className="nav-links">
      <NavLink to="/" id="homeLink">Home</NavLink>
      <NavLink to="/ask" id="askLink">AskQuestion</NavLink>
      <NavLink to="/profile" id="profileLink">My Profile</NavLink>

      <div className="search-bar">
        <input id="searchBox" type="search" />
        {' '}
        <button type="button" id="searchButton">Search</button>
      </div>

      <NavLink to="/signup" id="signupLink">signup</NavLink>
      <NavLink to="/login" id="loginLink">login</NavLink>
      <NavLink to="/logout" id="logoutLink">Logout</NavLink>
    </div>
  </div>
);

export default NavBar;

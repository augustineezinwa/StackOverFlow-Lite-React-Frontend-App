import React from 'react';

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
      <a href="/#" id="homeLink">Home</a>
      <a href="/#ask" id="askLink">AskQuestion</a>
      <a href="/#profile" id="profileLink">My Profile</a>

      <div className="search-bar">
        <input id="searchBox" type="search" />
        {' '}
        <button type="button" id="searchButton">Search</button>
      </div>

      <a href="/#signup" id="signupLink">signup</a>
      <a href="/#login" id="loginLink">login</a>
      <a href="/#logout" id="logoutLink">Logout</a>
    </div>
  </div>
);

export default NavBar;

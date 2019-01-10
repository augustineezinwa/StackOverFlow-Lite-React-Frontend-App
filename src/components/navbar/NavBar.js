import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { authUserLogout } from '../../actions/authUserActions';
export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { logOutUser } = this.props;
    logOutUser();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
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
          <NavLink to="/profile" id="profileLink" style={{ display: `${!isLoggedIn ? 'none' : ''} ` }}>My Profile</NavLink>

          <div className="search-bar">
            <input id="searchBox" type="search" />
            {' '}
            <button type="button" id="searchButton">Search</button>
          </div>

          <NavLink to="/signup" id="signupLink" style={{ display: `${isLoggedIn ? 'none' : ''} ` }}>signup</NavLink>
          <NavLink to="/login" id="loginLink" style={{ display: `${isLoggedIn ? 'none' : ''} ` }}>login</NavLink>
          <NavLink to="" id="logoutLink" style={{ display: `${isLoggedIn ? 'block' : ''} ` }} onClick={this.handleLogout}>Logout</NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

const mapActionToProps = {
  logOutUser: authUserLogout
}

export default connect(mapStateToProps, mapActionToProps)(NavBar);

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { authUserLogout } from '../../actions/authUserActions';
export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.navRef = React.createRef();
    this.navCheckRef = React.createRef();
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick(e) {
    const nav = this.navRef.current;
    const check = this.navCheckRef.current;
    if (!nav || !check || !check.checked) return;
    if (!nav.contains(e.target)) {
      check.checked = false;
    }
  }

  handleLogout() {
    const { logOutUser } = this.props;
    logOutUser();
  }

  render() {
    const { isLoggedIn, isDarkMode, onThemeToggle } = this.props;
    return (
      <div className="nav" id="navbar" ref={this.navRef}>
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
        <input type="checkbox" id="nav-check" ref={this.navCheckRef} />
        <div className="nav-links">
          <NavLink to="/" id="homeLink">Home</NavLink>
          <NavLink to="/ask" id="askLink">AskQuestion</NavLink>
          <NavLink to="/profile" id="profileLink" style={{ display: `${!isLoggedIn ? 'none' : ''} ` }}>My Profile</NavLink>
          <div className="theme-toggle-wrapper">
            <label className="theme-toggle-label" htmlFor="theme-toggle">
              Dark mode
            </label>
            <label className="theme-switch" htmlFor="theme-toggle">
              <input
                id="theme-toggle"
                type="checkbox"
                checked={isDarkMode}
                onChange={onThemeToggle}
              />
              <span className="theme-slider" />
            </label>
          </div>

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

NavBar.defaultProps = {
  isDarkMode: false,
  onThemeToggle: () => {}
};

export default connect(mapStateToProps, mapActionToProps)(NavBar);

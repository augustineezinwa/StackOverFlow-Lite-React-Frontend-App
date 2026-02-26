import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authUserLogout } from '../../actions/authUserActions';
import { fetchQuestions } from '../../actions/fetchQuestionsActions';

function getSearchFromLocation(location) {
  if (!location || !location.search) return '';
  const params = new URLSearchParams(location.search);
  return params.get('search') || '';
}

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: getSearchFromLocation(props.location)
    };
    this.navRef = React.createRef();
    this.navCheckRef = React.createRef();
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNavItemClick = this.handleNavItemClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const nextSearch = getSearchFromLocation(this.props.location);
    if (getSearchFromLocation(prevProps.location) !== nextSearch) {
      this.setState({ searchInput: nextSearch });
    }
  }

  handleSearchChange(e) {
    this.setState({ searchInput: e.target.value });
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    const { history, fetchAllQuestions } = this.props;
    const { searchInput } = this.state;
    const query = (searchInput || '').trim();
    const searchParams = query ? `?search=${encodeURIComponent(query)}` : '';
    history.push(`/${searchParams}`);
    fetchAllQuestions({ limit: 10, search: query || undefined });
    this.handleNavItemClick();
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

  handleNavItemClick() {
    const check = this.navCheckRef.current;
    if (check && check.checked) {
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
          <NavLink to="/" id="homeLink" onClick={this.handleNavItemClick}>Home</NavLink>
          <NavLink to="/ask" id="askLink" onClick={this.handleNavItemClick}>AskQuestion</NavLink>
          <NavLink to="/profile" id="profileLink" style={{ display: `${!isLoggedIn ? 'none' : ''} ` }} onClick={this.handleNavItemClick}>My Profile</NavLink>
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

          <form className="search-bar" onSubmit={this.handleSearchSubmit}>
            <input
              id="searchBox"
              type="search"
              value={this.state.searchInput}
              onChange={this.handleSearchChange}
              placeholder="Search questions…"
              aria-label="Search questions"
            />
            <button type="submit" id="searchButton">Search</button>
          </form>

          <NavLink to="/signup" id="signupLink" style={{ display: `${isLoggedIn ? 'none' : ''} ` }} onClick={this.handleNavItemClick}>signup</NavLink>
          <NavLink to="/login" id="loginLink" style={{ display: `${isLoggedIn ? 'none' : ''} ` }} onClick={this.handleNavItemClick}>login</NavLink>
          <NavLink
            to=""
            id="logoutLink"
            style={{ display: `${isLoggedIn ? 'block' : ''} ` }}
            onClick={() => {
              this.handleLogout();
              this.handleNavItemClick();
            }}
          >
            Logout
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

const mapActionToProps = {
  logOutUser: authUserLogout,
  fetchAllQuestions: fetchQuestions
};

NavBar.defaultProps = {
  isDarkMode: false,
  onThemeToggle: () => {}
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(NavBar));

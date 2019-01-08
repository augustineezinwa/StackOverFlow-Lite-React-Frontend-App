import React, { Component, Fragment } from 'react';
import '../public/styles/nav.scss';
import '../public/styles/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
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
        <div id="notificationDisplay" className="notification" />

        <div id="pageDisplay">
          <div className="container image-background" style={{ margin: '0 auto' }}>

            <div className="row">

              <div className="col mt-10">
                <h1 style={{ color: '#FFFFFF', textAlign: 'center' }}>Welcome to StackOverFlow-Lite</h1>
              </div>

            </div>

          </div>

          <div className="container dashboardfooter " id="dashBoardTitle"><h3>Trending Questions</h3></div>

          <div id="questionsDisplay">
            <div className="container">
              <div className="row no-questions">

                <div className="alignCardWidth">
                  <div className="card">
                    <div className="container">
                      <div className="row mt-4 pd-1">
                        <div className="col-2">
                          <div className="symbol-display">
                            <div className="alignSymbol">!</div>
                          </div>

                        </div>
                        <div className="col-5">
                          <div className="question">No Questions yet!  &nbsp; Refresh page  </div>

                        </div>
                      </div>

                      <div className="col" style={{ textAlign: 'right' }}>
                        <span />
                        <span />
                        <a href="/">
                          <button type="answer">Refresh</button>
                        </a>

                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>


        <div id="modalDisplay" />


        <div className="container footer" id="footer">
          &copy 2018 StackOverFlow-Lite

        </div>
      </Fragment>
    );
  }
}

export default App;

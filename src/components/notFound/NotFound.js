import React, { Component, Fragment } from 'react';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
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
                        <div className="question">We cant find the page you are looking for </div>

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

      </Fragment>
    );
  }
}

export default NotFound;

import React, { Fragment } from 'react';

const AskPage = () => (
  <Fragment>

    <div className="container image-background ask-bg">

      <div className="row">

        <div className="col adjust">
          <h1 className="header">Welcome to StackOverFlow-Lite</h1>
        </div>
        <div className="col">
          <div className="login-box">
            <h2>Ask A Question</h2>
            <form className="" method="POST">
              <label htmlFor="title"><b>Enter Question Title</b></label>
              <input type="text" id="questionTitle" />

              <label htmlFor="password"><b>Describe your Question</b></label>
              <textarea className="mt-2 txtarea pd-2" id="questionDescription" />

              <button type="submit" id="askButton">
                {' '}
                <span id="askNotification">Ask</span>
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  </Fragment>
);

export default AskPage;

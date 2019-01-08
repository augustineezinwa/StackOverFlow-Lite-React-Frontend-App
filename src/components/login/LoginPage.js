import React, { Fragment } from 'react';

const LoginPage = () => (
  <Fragment>
    <div className="container image-background ask-bg" style={{ margin: '0 auto' }}>
      <div className="row">
        <div className="col" style={{ marginTop: '18%' }}>
          <h1 style={{ color: 'white', textAlign: 'center' }}>Welcome to StackOverFlow-Lite</h1>
        </div>
        <div className="col">
          <div className="login-box">
            <h2>Login</h2>
            <form className="" method="POST">
              <label htmlFor="email"><b>Enter Email</b></label>
              <input type="text" name="email" id="email" />

              <label htmlFor="password"><b>Enter password</b></label>
              <input type="password" name="password" id="password" />

              <button type="submit" id="loginButton">
                <span id="loginNotification">
                Login
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
    <div className="container " style={{ backgroundColor: '#f1f1f1' }} />
  </Fragment>
);

export default LoginPage;

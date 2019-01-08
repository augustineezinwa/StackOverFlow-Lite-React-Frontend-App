import React, { Fragment } from 'react';

const SignupPage = () => (
  <Fragment>
    <div className="container image-background ask-bg " id="ask-bg" style={{ margin: '0 auto' }}>
      <div className="row">

        <div className="col" style={{ marginTop: '18%' }}>
          <h1 style={{ color: 'white', textAlign: 'center', zIndex: 10 }}>Welcome to StackOverFlow-Lite</h1>
        </div>
        <div className="col">
          <div className="login-box">
            <h2>Signup</h2>
            <form className="" method="POST">
              <label htmlFor="email"><b>Enter Full Name</b></label>
              <input type="text" name="fullName" id="fullName" />
              <span id="goodFullName"><i className="fa fa-check" /></span>
              <div id="nameNotificationError" />

              <label htmlFor="email"><b>Enter Email</b></label>
              <input type="text" name="email" id="email" />
              <span id="goodEmail"><i className="fa fa-check" /></span>
              <div id="emailNotificationError" />

              <label htmlFor="password"><b>Enter password</b></label>
              <input type="password" name="password" id="password" />
              <span id="goodPassword"><i className="fa fa-check" /></span>
              <div id="passwordNotificationError" />

              <label htmlFor="password"><b>Confirm password</b></label>
              <input type="password" name="password" id="confirmPassword" />
              <span id="goodConfirmPassword"><i className="fa fa-check" /></span>
              <div id="confirmPasswordNotificationError" />

              <button type="" id="signupButton">
                {' '}
                <span id="signupNotification">Signup</span>
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>

    <div className="container " style={{ backgroundColor: '#f1f1f1' }} />

  </Fragment>
);

export default SignupPage;

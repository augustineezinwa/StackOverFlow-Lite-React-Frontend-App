import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authUserActions';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history, login } = this.props;
    const { email, password } = this.state;
    login(email, password, history);
  }


  render() {
    const { email, password } = this.state;
    const { isLoggedIn, history } = this.props;
    if (isLoggedIn) history.push('/');
    return (

      <Fragment>
        <div className="ask-page container image-background ask-bg" style={{ margin: '0 auto' }}>
          <div className="row ask-page-row">
            <div className="col adjust ask-page-welcome">
              <div className="auth-hero">
                <h1 className="auth-hero-title">
                  Pick up where your questions left off.
                </h1>
                <p className="auth-hero-subtitle">
                  Sign in to track your questions, follow expert answers, and never lose the solutions that matter to you.
                </p>
              </div>
            </div>
            <div className="col ask-page-form-col">
              <div className="login-box ask-page-box">
                <h2>Login</h2>
                <form className="" method="POST" onSubmit={this.handleSubmit}>
                  <label htmlFor="email"><b>Enter Email</b></label>
                  <input type="text" name="email" id="email" value={email} onChange={this.handleChange} />

                  <label htmlFor="password"><b>Enter password</b></label>
                  <input type="password" name="password" id="password" value={password} onChange={this.handleChange} />

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
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

const mapActionsToProps = {
  login: loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(LoginPage);

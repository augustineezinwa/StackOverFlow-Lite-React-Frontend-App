import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { authUser } from '../../actions/authUserActions';

export class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullNameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFieldState = this.updateFieldState.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      fullNameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: ''
    });
    const { history, signupUser } = this.props;
    const {
      fullName, email, password, confirmPassword
    } = this.state;
    const [firstName, ...lastName] = fullName.split(' ');
    signupUser(firstName, lastName.join(' '), email, password, confirmPassword, history);
  }

  componentDidUpdate(prevProps) {
    const { message } = this.props;
    if ((prevProps.message !== message) && message) {
      if (message.includes('name')) this.updateFieldState('fullNameError', message);
      if (message.includes('email')) this.updateFieldState('emailError', message);
      if (message.includes('password') && !message.includes('confirm')) this.updateFieldState('passwordError', message);
      if (message.includes('confirm')) this.updateFieldState('confirmPasswordError', message);
    }
  }

  updateFieldState(name, message) {
    return this.setState({ [name]: message });
  }

  render() {
    const { history, isLoggedIn } = this.props;
    const {
      fullName,
      email,
      password,
      confirmPassword,
      fullNameError,
      emailError,
      passwordError,
      confirmPasswordError
    } = this.state;
    if (isLoggedIn) history.push('/');
    return (
      <Fragment>
        <div className="ask-page container image-background ask-bg" id="ask-bg" style={{ margin: '0 auto' }}>
          <div className="row ask-page-row">

            <div className="col adjust ask-page-welcome" style={{ marginTop: '18%' }}>
              <div className="auth-hero">
                <h1 className="auth-hero-title" style={{ zIndex: 10 }}>
                  Get answers faster. Grow every day.
                </h1>
                <p className="auth-hero-subtitle">
                  Join StackOverFlow-Lite to ask focused questions, get clear answers, and build a searchable library of what you’ve learned.
                </p>
              </div>
            </div>
            <div className="col ask-page-form-col">
              <div className="login-box ask-page-box">
                <h2>Signup</h2>
                <form className="" method="POST" onSubmit={this.handleSubmit}>
                  <label htmlFor="email"><b>Enter Full Name</b></label>
                  <input type="text" name="fullName" id="fullName" style={{ borderColor: fullNameError ? 'red' : '' }} value={fullName} onChange={this.handleChange} />
                  <span id="goodFullName"><i className="fa fa-check" /></span>
                  <div id="nameNotificationError" />

                  <label htmlFor="email"><b>Enter Email</b></label>
                  <input type="text" name="email" id="email" style={{ borderColor: emailError ? 'red' : '' }} value={email} onChange={this.handleChange} />
                  <span id="goodEmail"><i className="fa fa-check" /></span>
                  <div id="emailNotificationError" />

                  <label htmlFor="password"><b>Enter password</b></label>
                  <input type="password" name="password" id="password" style={{ borderColor: passwordError ? 'red' : '' }} value={password} onChange={this.handleChange} />
                  <span id="goodPassword"><i className="fa fa-check" /></span>
                  <div id="passwordNotificationError" />

                  <label htmlFor="password"><b>Confirm password</b></label>
                  <input type="password" name="confirmPassword" id="confirmPassword" style={{ borderColor: confirmPasswordError ? 'red' : '' }} value={confirmPassword} onChange={this.handleChange} />
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
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  message: state.notifications.message
});

const mapActionsToProp = {
  signupUser: authUser
};

export default connect(mapStateToProps, mapActionsToProp)(SignupPage);

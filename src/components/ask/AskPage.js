import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { postAQuestion } from '../../actions/postAQuestionAction';

class AskPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionTitle: '',
      questionDescription: ''
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const { history, postQuestion } = this.props;
    const { questionDescription, questionTitle } = this.state;
    postQuestion(questionTitle, questionDescription, history);
  }


  render() {
    const { questionDescription, questionTitle } = this.state;
    return (
  <Fragment>

    <div className="container image-background ask-bg">

      <div className="row">

        <div className="col adjust">
          <h1 className="header">Welcome to StackOverFlow-Lite</h1>
        </div>
        <div className="col">
          <div className="login-box">
            <h2>Ask A Question</h2>
            <form className="" method="POST" onSubmit={this.handleOnSubmit}>
              <label htmlFor="title"><b>Enter Question Title</b></label>
              <input type="text" id="questionTitle" name="questionTitle" value={questionTitle} onChange={this.handleChange} />

              <label htmlFor="password"><b>Describe your Question</b></label>
              <textarea className="mt-2 txtarea pd-2" id="questionDescription" style={{ fontSize: '1em' }} name="questionDescription" value={questionDescription} onChange={this.handleChange} />

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
  }
}

const mapActionToProps = {
  postQuestion: postAQuestion
};

export default connect(null, mapActionToProps)(AskPage);

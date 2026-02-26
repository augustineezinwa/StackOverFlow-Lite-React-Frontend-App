import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postAQuestion } from '../../actions/postAQuestionAction';
import PhotoUploadField from '../common/PhotoUploadField';
import RichTextEditor from '../common/RichTextEditor';

class AskPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionTitle: '',
      questionDescription: '',
      imageUrl: ''
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDescriptionChange(html) {
    this.setState({ questionDescription: html });
  }

  handleImageUpload(imageUrl) {
    this.setState({ imageUrl });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const { history, postQuestion } = this.props;
    const { questionDescription, questionTitle, imageUrl } = this.state;
    postQuestion(questionTitle, questionDescription, imageUrl, history);
  }


  render() {
    const { questionDescription, questionTitle } = this.state;
    return (
      <Fragment>

        <div className="ask-page container image-background ask-bg">

          <div className="row ask-page-row">
            <div className="col adjust ask-page-welcome">
              <h1 className="header ask-page-title">Welcome to StackOverFlow-Lite</h1>
            </div>
            <div className="col ask-page-form-col">
              <div className="login-box ask-page-box">
                <h2>Ask A Question</h2>
                <form className="" method="POST" onSubmit={this.handleOnSubmit}>
                  <label htmlFor="title"><b>Enter Question Title</b></label>
                  <input type="text" id="questionTitle" name="questionTitle" value={questionTitle} onChange={this.handleChange} />

                  <label htmlFor="questionDescription"><b>Describe your Question</b></label>
                  <RichTextEditor
                    value={questionDescription}
                    placeholder="Describe your question… You can add bold, lists, and images."
                    onChange={this.handleDescriptionChange}
                    minHeight={180}
                  />

                  <div className="mt-2">
                    <PhotoUploadField
                      label="Attach cover photo (optional)"
                      onUploadComplete={this.handleImageUpload}
                    />
                  </div>

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

AskPage.propTypes = {
  history: PropTypes.object.isRequired,
  postQuestion: PropTypes.func.isRequired
};

export default connect(null, mapActionToProps)(AskPage);

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postAQuestion } from '../../actions/postAQuestionAction';
import PhotoUploadField from '../common/PhotoUploadField';
import RichTextEditor from '../common/RichTextEditor';

const CATEGORIES_URL = `${process.env.APP_BASE_URL || ''}/categories`;

function parseCategoriesResponse(data) {
  if (data.data && Array.isArray(data.data.categories)) return data.data.categories;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.categories)) return data.categories;
  return [];
}

class AskPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionTitle: '',
      questionDescription: '',
      imageUrl: '',
      categories: [],
      categoryId: '',
      categoriesLoading: true
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  componentDidMount() {
    fetch(CATEGORIES_URL)
      .then(res => res.json())
      .then((data) => {
        const list = parseCategoriesResponse(data);
        this.setState({ categories: list, categoriesLoading: false });
      })
      .catch(() => {
        this.setState({ categories: [], categoriesLoading: false });
      });
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
    const {
      questionDescription, questionTitle, imageUrl, categoryId
    } = this.state;
    const sendCategoryId = (categoryId != null && String(categoryId).trim() !== '')
      ? String(categoryId).trim()
      : '';
    postQuestion(questionTitle, questionDescription, imageUrl, history, sendCategoryId);
  }


  render() {
    const {
      questionDescription,
      questionTitle,
      categories,
      categoryId,
      categoriesLoading
    } = this.state;
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

                  <div className="ask-page-category-row">
                    <label htmlFor="askPageCategory"><b>Select Category</b></label>
                    <select
                      id="askPageCategory"
                      name="categoryId"
                      value={categoryId}
                      onChange={this.handleChange}
                      disabled={categoriesLoading}
                      className="ask-page-category-select"
                    >
                      <option value="">General</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name || cat.title || cat.slug || 'Category'}
                        </option>
                      ))}
                    </select>
                  </div>

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

import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAQuestion } from '../../actions/fetchAQuestionAction';
import { fetchUsers } from '../../actions/fetchUsersActions';
import { postAnswer } from '../../actions/postAnswerAction';
import AnswerList from './AnswerList';
import RichTextEditor from '../common/RichTextEditor';
import findData from '../../utils/findData';

export class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: ''
    };

    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match, fetchQuestion, fetchAllUserData, history
    } = this.props;
    fetchQuestion(match.params.questionId, history);
    fetchAllUserData();
  }

  componentDidUpdate(prevProps) {
    const {
      answers, match, fetchQuestion, fetchAllUserData, history
    } = this.props;
    if ((prevProps.answers !== answers) && answers) {
      fetchQuestion(match.params.questionId, history);
      fetchAllUserData();
    }
  }

  handleAnswerChange(html) {
    this.setState({ answer: html });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const { match, postAnAnswer } = this.props;
    const { answer } = this.state;
    const textOnly = (answer || '').replace(/<[^>]*>/g, '').trim();
    if (!textOnly) return;
    postAnAnswer(match.params.questionId, answer);
  }

  render() {
    const { answer } = this.state;
    const { match, question, users } = this.props;
    if (question.answers && users.length) {
      const calcVotes = (votes) => {
        let i = 0;
        question.answers.forEach((x) => { i += x[votes]; });
        return i;
      };
      return (
        <Fragment>
          <div className="container question-background ">
            <div className="row ">
              <div className="col">
                <div className="question-card">
                  <h2>{question.questionTitle}</h2>
                  <div className="underline">&nbsp;</div>
                  <div className="question-detail-body">
                    {(question.questionDescription || '').trim().startsWith('<')
                      ? (
                        <div
                          className="rich-text-content"
                          dangerouslySetInnerHTML={{ __html: question.questionDescription }}
                        />
                      )
                      : (
                        <span className="rich-text-content">{question.questionDescription}</span>
                      )}
                    <div className="question-detail-votes-row">
                      <span className="question-detail-vote-item">
                        {calcVotes('upvotes')}
                        {' '}
                        upvotes
                      </span>
                      <span className="question-detail-vote-item">
                        {calcVotes('downvotes')}
                        {' '}
                        downvotes
                      </span>
                    </div>
                    <div className="mt-4 ft question-detail-asked-by">
                      Asked by
                      {' '}
                      {findData(users, 'id', question.userId, 'fullName')}
                      {' '}
                      &nbsp;
                      {' '}
                      <span className="darkgray">{question.time}</span>
                    </div>
                  </div>

                  {(question.imageUrl || question.image_url) && (
                    <div className="question-detail-image-wrap">
                      <img
                        src={question.imageUrl || question.image_url}
                        alt=""
                        className="question-detail-image"
                      />
                    </div>
                  )}

                  <div>&nbsp;</div>
                  <div className="underline">&nbsp;</div>

                  <div className="">
                    {' '}
                    <h3>
                      {question.answers ? question.answers.length : 0}
                      {' '}
                      {question.answers.length > 1 ? 'Answers' : 'Answer' }
                    </h3>
                  </div>

                  <div className="underline">&nbsp;</div>

                  {question.answers && (
                    question.answers.map((x) => {
                      const answerUser = users.find(u => u.id != null && +u.id === +x.userId);
                      const authorName = answerUser ? (answerUser.fullName || answerUser.name || '') : '';
                      const authorPhoto = answerUser
                        ? (answerUser.photo || answerUser.photoUrl || answerUser.profilePhoto || '')
                        : '';
                      return (
                        <AnswerList
                          key={x.id}
                          questionId={match.params.questionId}
                          answerId={x.id}
                          answer={x.answer}
                          upvotes={x.upvotes}
                          downvotes={x.downvotes}
                          time={x.time}
                          date={x.date}
                          name={authorName}
                          authorPhotoUrl={authorPhoto}
                        />
                      );
                    })
                  )}

                  <div>&nbsp;</div>
                  <div>&nbsp;</div>

                  <form className="add-answer-form" method="POST" onSubmit={this.handleOnSubmit}>

                    <label htmlFor="answer" className="add-answer-label"><b>Add an answer</b></label>
                    <RichTextEditor
                      value={answer}
                      placeholder="Write your answer… You can use bold, lists, and insert images."
                      onChange={this.handleAnswerChange}
                      minHeight={140}
                    />

                    <button type="submit"> Add</button>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </Fragment>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  question: state.question.data,
  users: state.users.data,
  answers: state.answers.data
});

const mapActionsToProps = {
  fetchQuestion: fetchAQuestion,
  fetchAllUserData: fetchUsers,
  postAnAnswer: postAnswer
};


QuestionPage.propTypes = {
  question: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  fetchAllUserData: PropTypes.func.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(QuestionPage);

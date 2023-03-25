import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAQuestion } from '../../actions/fetchAQuestionAction';
import { fetchUsers } from '../../actions/fetchUsersActions';
import { postAnswer } from '../../actions/postAnswerAction';
import AnswerList from './AnswerList';
import findData from '../../utils/findData';

export class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: ''
    };

    this.handleChange = this.handleChange.bind(this);
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

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const { match, postAnAnswer } = this.props;
    const { answer } = this.state;
    postAnAnswer(match.params.questionId, answer);
  }

  render() {
    const { answer } = this.state;
    const { question, users } = this.props;
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
                  <div className="row">
                    <div className="col-5">
                      {question.questionDescription}
                      <div className="mt-4 ft">
                        Asked by
                        {' '}
                        {findData(users, 'id', question.userId, 'fullName')}
                        {' '}
                        &nbsp;
                        {' '}
                        <span className="darkgray">{question.time}</span>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="row">
                        <div className="col">
                          {calcVotes('upvotes')}
                          {' '}
                          upvotes

                        </div>
                        <div className="col">
                          {calcVotes('downvotes')}
                          {' '}
                          downvotes
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>&nbsp;</div>
                  <div className="underline;">&nbsp;</div>

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
                    question.answers.map(x => (
                      <AnswerList
                      key={x.id}
                      answer={x.answer}
                      upvotes={x.upvotes}
                      downvotes={x.downvotes}
                      time={x.time}
                      date={x.date}
                      name={findData(users, 'id', x.userId, 'fullName')}
                     />
                    ))
                  )}

                  <div>&nbsp;</div>
                  <div>&nbsp;</div>

                  <form className="" method="POST" onSubmit={this.handleOnSubmit}>

                    <label htmlFor="password"><b>Add an answer</b></label>
                    <textarea 
                    className="mt-2 txtarea" name="answer"
                     required style={{ fontSize: '1em', padding: '1em' }}
                      onChange={this.handleChange} value={answer} />

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

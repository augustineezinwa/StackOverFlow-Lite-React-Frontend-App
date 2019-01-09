import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAQuestion } from '../../actions/fetchAQuestionAction';
import { fetchUsers } from '../../actions/fetchUsersActions';
import AnswerList from './AnswerList';
import findData from '../../utils/findData';

export class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { match, fetchQuestion, fetchAllUserData, history } = this.props;
    fetchQuestion(match.params.questionId, history);
    fetchAllUserData();
  }


  render() {
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

                  <form className="">

                    <label htmlFor="password"><b>Add an answer</b></label>
                    <textarea className="mt-2 txtarea" required style={{ fontSize: '1em', padding: '1em' }} />

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
  users: state.users.data
});

const mapActionsToProps = {
  fetchQuestion: fetchAQuestion,
  fetchAllUserData: fetchUsers,
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

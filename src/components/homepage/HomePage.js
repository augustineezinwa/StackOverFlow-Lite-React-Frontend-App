import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';
import { fetchQuestions } from '../../actions/fetchQuestionsActions';

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleCount: 8
    };
    this.pageSize = 8;
    this.loadMoreQuestions = this.loadMoreQuestions.bind(this);
  }

  componentDidMount() {
    const { fetchAllQuestions } = this.props;
    fetchAllQuestions();
  }

  loadMoreQuestions() {
    this.setState(prevState => ({
      visibleCount: prevState.visibleCount + this.pageSize
    }));
  }

  render() {
    const { questions } = this.props;
    const { visibleCount } = this.state;
    const visibleQuestions = questions.slice(0, visibleCount);
    const hasMoreQuestions = visibleCount < questions.length;

    return (
      <Fragment>
        <div id="pageDisplay">
          <div className="container image-background" style={{ margin: '0 auto' }}>

            <div className="row">

              <div className="col mt-10">
                <h1 style={{ color: '#FFFFFF', textAlign: 'center' }}>Welcome to StackOverFlow-Lite</h1>
              </div>

            </div>

          </div>

          <div className="container dashboardfooter " id="dashBoardTitle"><h3>Trending Questions</h3></div>

          <div id="questionsDisplay">

            {
              !questions.length && (
                <div className="container">
                  <div className="row no-questions">

                    <div className="alignCardWidth">
                      <div className="card">
                        <div className="container">
                          <div className="row mt-4 pd-1">
                            <div className="col-2">
                              <div className="symbol-display">
                                <div className="alignSymbol">!</div>
                              </div>

                            </div>
                            <div className="col-5">
                              <div className="question">No Questions yet!  &nbsp; Refresh page  </div>

                            </div>
                          </div>

                          <div className="col" style={{ textAlign: 'right' }}>
                            <span />
                            <span />
                            <a href="/">
                              <button type="answer">Refresh</button>
                            </a>

                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )
            }
            {
              !!questions.length && (
                <Fragment>
                  <div
                    id="main-fish"
                    className="maincont"
                     >
                    {visibleQuestions.map(x => (
                      <div className="question-grid-item" key={x.id}>
                        <QuestionCard
                          key={x.id}
                          questionTitle={x.questionTitle}
                          questionId={x.id}
                          answerNumber={x.numberOfAnswers}
                          totalUpVotes={x.upvotes}
                          totalDownVotes={x.downvotes} />
                      </div>
                    ))}
                  </div>
                  {hasMoreQuestions && (
                    <div className="container" style={{ textAlign: 'center', padding: '1rem 0' }}>
                      <button type="button" onClick={this.loadMoreQuestions}>
                        Load more
                      </button>
                    </div>
                  )}
                  {!hasMoreQuestions && !!questions.length && (
                    <div className="container" style={{ textAlign: 'center', padding: '1rem' }}>
                      No more questions.
                    </div>
                  )}
                </Fragment>
              )
            }


          </div>
        </div>
      </Fragment>
    );
  }
}


export const mapStateToProps = state => ({
  questions: state.questions.data
});

const mapActionsToProps = {
  fetchAllQuestions: fetchQuestions
};


HomePage.propTypes = {
  fetchAllQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
};


export default connect(mapStateToProps, mapActionsToProps)(HomePage);

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const QuestionCard = ({
  questionId, questionTitle, answerNumber,
  totalUpVotes, totalDownVotes
}) => {
  let newQuestionTitle;
  if (questionTitle.length > 2000) {
    newQuestionTitle = `${questionTitle.substr(0, 88)} ...`;
  }
  let answerNumberDisplay = `${answerNumber} Answer`;
  if (answerNumber > 1) answerNumberDisplay = `${answerNumber} Answers`;
  return (
    <div className="col">
      <div className="card">
        <div className="container">
          <div className="row mt-4 pd-1">
            <div className="col-2">
              <div className="symbol-display">
                <div className="alignSymbol">{questionTitle.substr(0, 1)}</div>
              </div>

            </div>
            <div className="col-full">
              <div className="question lh-1">{newQuestionTitle || questionTitle}</div>

            </div>
          </div>
          <div className="row mt-2 pd-1">
            <div className="col">
              {' '}
              <span>{answerNumberDisplay}</span>
            </div>
            <div className="col">
              <span>
                {' '}
                <i className="fas fa-thumbs-up" />
              </span>
              &nbsp;
              {' '}
              {totalUpVotes}
              <span />
            </div>
            <div className="col">
              <span>
                {' '}
                <i className="fas fa-thumbs-down " />
              </span>
              &nbsp;
              {' '}
              {totalDownVotes}
              <span />
            </div>
            <div className="col">
              <span />
              <span />
              <NavLink to={`/question/${questionId}`}>
                <button className="viewButton" key={questionId} type="answer">View</button>

              </NavLink>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

QuestionCard.propTypes = {
  questionId: PropTypes.number.isRequired,
  questionTitle: PropTypes.string.isRequired,
  answerNumber: PropTypes.number.isRequired,
  totalDownVotes: PropTypes.number.isRequired,
  totalUpVotes: PropTypes.number.isRequired

};

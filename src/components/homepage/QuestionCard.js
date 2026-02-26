import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class AvatarWithFallback extends React.Component {
  state = { failed: false };

  onError = () => this.setState({ failed: true });

  render() {
    const { photoUrl, initial } = this.props;
    const { failed } = this.state;
    if (failed || !photoUrl) {
      return <div className="alignSymbol">{initial}</div>;
    }
    return (
      <img
        src={photoUrl}
        alt=""
        className="question-list-card-avatar-img"
        onError={this.onError}
      />
    );
  }
}

AvatarWithFallback.propTypes = {
  photoUrl: PropTypes.string.isRequired,
  initial: PropTypes.string.isRequired
};

const QuestionCard = ({
  questionId, questionTitle, answerNumber,
  totalUpVotes, totalDownVotes, imageUrl, photoUrl, askerName,
  isOwner, onPin, onArchive
}) => {
  let newQuestionTitle;
  if (questionTitle && questionTitle.length > 2000) {
    newQuestionTitle = `${questionTitle.substr(0, 88)} ...`;
  }
  let answerNumberDisplay = `${answerNumber} Answer`;
  if (answerNumber > 1) answerNumberDisplay = `${answerNumber} Answers`;
  const hasPhotoUrl = photoUrl && typeof photoUrl === 'string' && photoUrl.trim().length > 0;
  const askerInitial = askerName && askerName.trim()
    ? askerName.trim().charAt(0).toUpperCase()
    : null;
  const titleInitial = questionTitle && questionTitle.trim()
    ? questionTitle.trim().charAt(0).toUpperCase()
    : '?';
  const initial = askerInitial || titleInitial;
  const hasCoverImage = imageUrl && imageUrl.trim();

  function handlePin(e) {
    e.preventDefault();
    e.stopPropagation();
    if (onPin) onPin(questionId);
  }

  function handleArchive(e) {
    e.preventDefault();
    e.stopPropagation();
    if (onArchive) onArchive(questionId);
  }

  return (
    <div className="question-grid-col">
      <div className={`card question-list-card${hasCoverImage ? ' question-list-card-has-image' : ''}`}>
        <div className="question-list-card-actions">
          {onPin && (
            <button
              type="button"
              className="question-list-card-action question-list-card-action-pin"
              onClick={handlePin}
              aria-label="Pin question"
            >
              <i className="fas fa-thumbtack" aria-hidden="true" />
            </button>
          )}
          {isOwner && onArchive && (
            <button
              type="button"
              className="question-list-card-action question-list-card-action-archive"
              onClick={handleArchive}
              aria-label="Archive question"
            >
              <i className="fas fa-archive" aria-hidden="true" />
            </button>
          )}
        </div>
        {hasCoverImage && (
          <>
            <div
              className="question-list-card-bg"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="question-list-card-overlay" />
          </>
        )}
        <div className="question-list-card-content container">
          <div className="row question-list-card-row1">
            <div className="question-list-card-avatar-col">
              <div className="symbol-display">
                {!hasPhotoUrl ? (
                  <div className="alignSymbol">{initial}</div>
                ) : (
                  <AvatarWithFallback photoUrl={photoUrl.trim()} initial={initial} />
                )}
              </div>
            </div>
            {askerName && askerName.trim() && (
              <div className="question-list-card-name">{askerName.trim()}</div>
            )}
          </div>
          <div className="row question-list-card-row2">
            <div className="question-list-card-question">{newQuestionTitle || questionTitle}</div>
          </div>
          <div className="row question-list-card-row3">
            <div className="question-list-card-meta">
              <span>{answerNumberDisplay}</span>
              <span>
                <i className="fas fa-thumbs-up" />
                {' '}
                {totalUpVotes}
              </span>
              <span>
                <i className="fas fa-thumbs-down" />
                {' '}
                {totalDownVotes}
              </span>
            </div>
            <NavLink to={`/question/${questionId}`} className="question-list-card-view-wrap">
              <button className="viewButton" key={questionId} type="answer">View</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

QuestionCard.propTypes = {
  questionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  questionTitle: PropTypes.string.isRequired,
  answerNumber: PropTypes.number.isRequired,
  totalDownVotes: PropTypes.number.isRequired,
  totalUpVotes: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  photoUrl: PropTypes.string,
  askerName: PropTypes.string,
  isOwner: PropTypes.bool,
  onPin: PropTypes.func,
  onArchive: PropTypes.func
};

QuestionCard.defaultProps = {
  imageUrl: '',
  photoUrl: '',
  askerName: '',
  isOwner: false,
  onPin: null,
  onArchive: null
};

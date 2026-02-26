import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAnswerWithComments, postComment } from '../../actions/answerCommentsActions';
import AnswerAvatar from './AnswerAvatar';

/**
 * One answer with expandable comments and add-comment.
 * GET /questions/:questionId/answers/:answerId for comments;
 * POST /questions/:questionId/answers/:answerId/comments to add.
 */
class AnswerList extends Component {
  state = {
    expanded: false,
    comments: [],
    loadingComments: false,
    commentText: '',
    submittingComment: false,
    commentsFetched: false
  };

  loadComments = () => {
    const { questionId, answerId } = this.props;
    const { loadingComments } = this.state;
    if (!questionId || !answerId || loadingComments) return;
    this.setState({ loadingComments: true });
    fetchAnswerWithComments(questionId, answerId).then(({ comments }) => {
      this.setState({
        comments: comments || [],
        loadingComments: false,
        commentsFetched: true
      });
    });
  };

  toggleComments = () => {
    const { expanded, commentsFetched } = this.state;
    const next = !expanded;
    this.setState({ expanded: next });
    if (next && !commentsFetched) this.loadComments();
  };

  handleCommentChange = (e) => {
    this.setState({ commentText: e.target.value.trim() ? e.target.value : '' });
  };

  handleSubmitComment = (e) => {
    e.preventDefault();
    const { questionId, answerId, dispatch } = this.props;
    const { commentText, submittingComment } = this.state;
    const text = (commentText || '').replace(/<[^>]*>/g, '').trim();
    if (!text || submittingComment || !questionId || !answerId) return;
    this.setState({ submittingComment: true });
    postComment(questionId, answerId, text, dispatch).then((result) => {
      const ok = result && result.ok;
      this.setState({ submittingComment: false, commentText: '' });
      if (ok) {
        this.setState((prev) => {
          const next = { expanded: true, commentsFetched: true };
          if (result.comment && typeof result.comment === 'object') {
            next.comments = [...(prev.comments || []), result.comment];
          } else if (result.comment) {
            next.comments = [...(prev.comments || []), { comment: result.comment }];
          }
          return next;
        });
        this.loadComments();
      }
    });
  };

  render() {
    const {
      answer, upvotes, downvotes, time, date, id, name, authorPhotoUrl
    } = this.props;
    const {
      expanded, comments, loadingComments, commentText, submittingComment,
      commentsFetched
    } = this.state;

    const isHtml = (answer || '').trim().startsWith('<');
    const commentCount = comments.length;
    let viewCommentsLabel = 'View comments';
    if (expanded) viewCommentsLabel = 'Hide comments';
    else if (commentsFetched) viewCommentsLabel = `View ${commentCount} comment${commentCount !== 1 ? 's' : ''}`;

    const answerInitial = (name && String(name).trim().charAt(0).toUpperCase()) || '?';
    const hasAnswerPhoto = authorPhotoUrl && typeof authorPhotoUrl === 'string' && authorPhotoUrl.trim().length > 0;

    return (
      <Fragment>
        <div className="answer-list-row" key={id}>
          <div className="answer-list-body">
            {isHtml
              ? (
                <div
                  className="rich-text-content answer-body-content"
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              )
              : (
                <span className="rich-text-content answer-body-content">{answer}</span>
              )}

            {/* Row 2: upvote · downvote (Quora-like, above Answered by) */}
            <div className="answer-votes-row">
              <span className="answer-vote-item">
                <i className="fas fa-thumbs-up answer-vote-icon" aria-hidden="true" />
                {upvotes}
              </span>
              <span className="answer-vote-item">
                <i className="fas fa-thumbs-down answer-vote-icon" aria-hidden="true" />
                {downvotes}
              </span>
            </div>

            {/* Row 3: avatar + Answered by Name · time + View comments */}
            <div className="answer-meta-row">
              <AnswerAvatar
                photoUrl={hasAnswerPhoto ? authorPhotoUrl : ''}
                initial={answerInitial}
                size="medium"
              />
              <div className="answer-meta-info">
                <span className="answer-meta-by">
                  Answered by
                  {' '}
                  <span className="answer-meta-name">{name}</span>
                  <span className="answer-meta-sep"> · </span>
                  <span className="answer-meta-time">
                    {time}
                    {' '}
                    {date}
                  </span>
                </span>
              </div>
              <button
                type="button"
                className="answer-view-comments-btn"
                onClick={this.toggleComments}
                aria-expanded={expanded}
              >
                {viewCommentsLabel}
              </button>
            </div>

            {/* Add comment */}
            <div className="answer-add-comment-wrap">
              <form onSubmit={this.handleSubmitComment} className="answer-add-comment-form">
                <input
                  type="text"
                  className="answer-add-comment-input"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={this.handleCommentChange}
                  aria-label="Add a comment"
                />
                <button
                  type="submit"
                  className="answer-add-comment-submit"
                  disabled={!commentText.trim() || submittingComment}
                >
                  {submittingComment ? '…' : 'Comment'}
                </button>
              </form>
            </div>

            {/* Expandable comments list */}
            {expanded && (
              <div className="answer-comments-list-wrap">
                {loadingComments ? (
                  <div className="answer-comments-loading">
                    <span className="answer-comments-spinner" aria-hidden="true" />
                    Loading comments…
                  </div>
                ) : (
                  <ul className="answer-comments-list">
                    {comments.length === 0 && (
                      <li className="answer-comments-empty">No comments yet.</li>
                    )}
                    {comments.map((c, idx) => {
                      const commentedBy = c.commentedBy || c.userName || c.fullName || c.createdBy || c.userFullName || c.author || '';
                      const text = c.comment != null ? c.comment : (c.body || c.text || c.content || '');
                      const commentPhoto = c.photoUrl || c.photo || c.userPhotoUrl || c.profilePhoto || '';
                      const commentInitial = (commentedBy && String(commentedBy).trim().charAt(0).toUpperCase()) || '?';
                      return (
                        <li key={c.id || c.commentId || `c-${idx}`} className="answer-comment-item">
                          <AnswerAvatar
                            photoUrl={commentPhoto}
                            initial={commentInitial}
                            size="small"
                          />
                          <div className="answer-comment-content">
                            {commentedBy && (
                              <span className="answer-comment-author">{commentedBy}</span>
                            )}
                            <span className="answer-comment-text">{text}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="answer-list-divider" />
      </Fragment>
    );
  }
}

AnswerList.propTypes = {
  questionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  answer: PropTypes.string,
  upvotes: PropTypes.number,
  downvotes: PropTypes.number,
  time: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  authorPhotoUrl: PropTypes.string,
  dispatch: PropTypes.func
};

AnswerList.defaultProps = {
  questionId: null,
  answerId: null,
  answer: '',
  upvotes: 0,
  downvotes: 0,
  time: '',
  date: '',
  id: null,
  name: '',
  authorPhotoUrl: '',
  dispatch: () => {}
};

export default connect()(AnswerList);

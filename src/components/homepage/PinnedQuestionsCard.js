import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPinnedQuestions, pinOrUnpinQuestion } from '../../actions/pinnedQuestionsActions';

class PinnedQuestionsCard extends Component {
  componentDidMount() {
    this.props.fetchPinnedQuestions();
  }

  handleUnpin = (e, questionId) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.pinOrUnpinQuestion(questionId, false);
  };

  render() {
    const { pinnedQuestions } = this.props;
    const list = Array.isArray(pinnedQuestions.data) ? pinnedQuestions.data : [];

    return (
      <aside className="pinned-questions-card sidebar-card" aria-label="Pinned questions">
        <div className="sidebar-card-inner pinned-questions-card-inner">
          <div className="sidebar-card-header">
            <i className="fas fa-thumbtack pinned-questions-icon" aria-hidden="true" />
            <h3 className="sidebar-card-title">Pinned</h3>
          </div>
          <div className="pinned-questions-list">
            {list.length > 0 ? (
              list.map((q) => (
                <div key={q.id} className="pinned-questions-item-wrap">
                  <NavLink to={`/question/${q.id}`} className="pinned-questions-item">
                    <span className="pinned-questions-item-text">
                      {q.questionTitle && q.questionTitle.length > 60
                        ? `${q.questionTitle.trim().substr(0, 60)}…`
                        : (q.questionTitle || q.title || 'Question')}
                    </span>
                  </NavLink>
                  <button
                    type="button"
                    className="pinned-questions-item-unpin"
                    onClick={(e) => this.handleUnpin(e, q.id)}
                    aria-label="Unpin question"
                  >
                    <i className="fas fa-times" aria-hidden="true" />
                  </button>
                </div>
              ))
            ) : (
              <p className="pinned-questions-empty">No pinned questions yet.</p>
            )}
          </div>
        </div>
      </aside>
    );
  }
}

PinnedQuestionsCard.propTypes = {
  pinnedQuestions: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        questionTitle: PropTypes.string,
        title: PropTypes.string
      })
    ),
    error: PropTypes.string
  }).isRequired,
  fetchPinnedQuestions: PropTypes.func.isRequired,
  pinOrUnpinQuestion: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  pinnedQuestions: state.pinnedQuestions || { data: [], error: null }
});

const mapDispatchToProps = {
  fetchPinnedQuestions,
  pinOrUnpinQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(PinnedQuestionsCard);

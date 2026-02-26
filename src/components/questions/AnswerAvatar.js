import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Small circle avatar for answer/comment author. Fallback to initial letter.
 */
class AnswerAvatar extends Component {
  state = { failed: false };

  onError = () => this.setState({ failed: true });

  render() {
    const { photoUrl, initial, size = 'medium' } = this.props;
    const { failed } = this.state;
    const showInitial = failed || !photoUrl || (typeof photoUrl === 'string' && !photoUrl.trim());
    const initialChar = (initial && String(initial).charAt(0).toUpperCase()) || '?';

    return (
      <div className={`answer-avatar answer-avatar--${size}`}>
        {showInitial ? (
          <span className="answer-avatar-initial" aria-hidden="true">{initialChar}</span>
        ) : (
          <img
            src={photoUrl}
            alt=""
            className="answer-avatar-img"
            onError={this.onError}
          />
        )}
      </div>
    );
  }
}

AnswerAvatar.propTypes = {
  photoUrl: PropTypes.string,
  initial: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium'])
};

AnswerAvatar.defaultProps = {
  photoUrl: '',
  initial: '?',
  size: 'medium'
};

export default AnswerAvatar;

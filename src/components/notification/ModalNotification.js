import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class ModalNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { message, isLoading } = this.props;
    const show = isLoading;

    return (
      <div
        id="modalDisplay"
        className="app-loader-overlay"
        style={{ display: show ? 'flex' : 'none' }}
      >
        <div className="app-loader-content">
          <div className="app-loader-spinner" aria-hidden="true">
            <i className="fas fa-spinner fa-pulse" />
          </div>
          <p className="app-loader-message">{message}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.loaders.message,
  isLoading: state.loaders.isLoading,
});

ModalNotification.propTypes = {
  message: PropTypes.string,
  isLoading: PropTypes.bool,
};

ModalNotification.defaultProps = {
  message: '',
  isLoading: false,
};

export default connect(mapStateToProps)(ModalNotification);

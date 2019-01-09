import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sendNotification from '../../actions/notificationsActions';

export class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    const { status, turnOffNotification } = this.props;
    if (prevProps.status !== status && status) {
      setTimeout(() => turnOffNotification(false, ''), 3000);
    }
  }

  render() {
    const { message, status } = this.props;
    const shouldDisplay = status ? 'block' : 'none';

    return (
      <div id="notificationDisplay" className="notification" style={{ display: shouldDisplay || 'none' }}>
        {message}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.notifications.message,
  status: state.notifications.status
});

const mapActionsToProps = {
  turnOffNotification: sendNotification
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  turnOffNotification: PropTypes.func.isRequired
};


export default connect(mapStateToProps, mapActionsToProps)(Notification);

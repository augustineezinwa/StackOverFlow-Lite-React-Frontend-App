import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ModalNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { message, isLoading } = this.props;
    const shouldDisplay = isLoading ? 'block' : 'none';

    return (
      <div id="modalDisplay" style={{ display: shouldDisplay || 'none' }}>
        <div className="container modal">
          <div className="row">
            <div className="col" />
            <div className="col">
              <div className="card">
                <div className="container">
                  <div className="row mt-4 pd-1">
                    <div className="col-2">
                      <div className="symbol-display">
                        <div className="alignSymbol"><span><i className="fas fa-spinner fa-pulse"></i></span></div>
                      </div>

                    </div>
                    <div className="col-5">
                      <div className="question">{message}</div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="col" />
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.loaders.message,
  isLoading: state.loaders.isLoading
});
export default connect(mapStateToProps)(ModalNotification);

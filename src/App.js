import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import NotFound from './components/notFound/NotFound';
import Footer from './components/footer/Footer';
import NavBar from './components/navbar/NavBar';
import Notification from './components/notification/Notification';
import ModalNotification from './components/notification/ModalNotification';
import store from './store/store';
import routeTable from './routeTable';
import '../public/styles/nav.scss';
import '../public/styles/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <NavBar />
            <Notification />
            <ModalNotification />
            <div id="pageDisplay">
              <Switch>
                {
                  routeTable.map(targetRoute => (
                    <Route
                      exact={targetRoute.exact}
                      path={targetRoute.path}
                      key={targetRoute.path}
                      component={targetRoute.component}
                    />
                  ))
                }
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;

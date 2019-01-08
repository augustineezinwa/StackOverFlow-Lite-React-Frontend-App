import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from './components/notFound/NotFound';
import Footer from './components/footer/Footer';
import NavBar from './components/navbar/NavBar';
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
      <Router>
        <Fragment>
          <NavBar />
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
    );
  }
}

export default App;

import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import NotFound from './components/notFound/NotFound';
import Footer from './components/footer/Footer';
import NavBarComponent from './components/navbar/NavBar';
import NotificationComponent from './components/notification/Notification';
import ModalNotificationComponent from './components/notification/ModalNotification';
import store from './store/store';
import routeTable from './routeTable';
import '../public/styles/nav.scss';
import '../public/styles/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    const preferredTheme = localStorage.getItem('theme');
    const supportsColorScheme = typeof window !== 'undefined' && window.matchMedia;
    const systemPrefersDark = supportsColorScheme
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
    this.state = {
      isDarkMode: preferredTheme ? preferredTheme === 'dark' : systemPrefersDark,
      hasStoredPreference: !!preferredTheme
    };
    this.colorSchemeQuery = null;
    this.handleThemeToggle = this.handleThemeToggle.bind(this);
    this.handleSystemThemeChange = this.handleSystemThemeChange.bind(this);
  }

  componentDidMount() {
    const { isDarkMode } = this.state;
    document.body.classList.toggle('dark-mode', isDarkMode);
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (this.colorSchemeQuery.addEventListener) {
        this.colorSchemeQuery.addEventListener('change', this.handleSystemThemeChange);
      } else {
        this.colorSchemeQuery.addListener(this.handleSystemThemeChange);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isDarkMode, hasStoredPreference } = this.state;
    if (prevState.isDarkMode !== isDarkMode) {
      document.body.classList.toggle('dark-mode', isDarkMode);
    }
    if (hasStoredPreference) {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  }

  componentWillUnmount() {
    if (this.colorSchemeQuery) {
      if (this.colorSchemeQuery.removeEventListener) {
        this.colorSchemeQuery.removeEventListener('change', this.handleSystemThemeChange);
      } else {
        this.colorSchemeQuery.removeListener(this.handleSystemThemeChange);
      }
    }
  }

  handleThemeToggle() {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
      hasStoredPreference: true
    }));
  }

  handleSystemThemeChange(event) {
    const { hasStoredPreference } = this.state;
    if (!hasStoredPreference) {
      this.setState({ isDarkMode: event.matches });
    }
  }

  render() {
    const { isDarkMode } = this.state;
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <NavBarComponent isDarkMode={isDarkMode} onThemeToggle={this.handleThemeToggle} />
            <NotificationComponent />
            <ModalNotificationComponent />
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

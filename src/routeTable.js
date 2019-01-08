import HomePage from './components/homepage/HomePage';
import LoginPage from './components/login/LoginPage';
import SignupPage from './components/signup/SignupPage';

const routeTable = [
  {
    path: '/',
    component: HomePage,
    exact: true
  },
  {
    path: '/login',
    component: LoginPage,
    exact: true
  },
  {
    path: '/signup',
    component: SignupPage,
    exact: true
  }
];

export default routeTable;

import HomePage from './components/homepage/HomePage';
import LoginPage from './components/login/LoginPage';
import SignupPage from './components/signup/SignupPage';
import QuestionPage from './components/questions/QuestionPage';

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
  },
  {
    path: '/question',
    component: QuestionPage,
    exact: true
  }
];

export default routeTable;

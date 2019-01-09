import HomePage from './components/homepage/HomePage';
import LoginPage from './components/login/LoginPage';
import SignupPage from './components/signup/SignupPage';
import QuestionPage from './components/questions/QuestionPage';
import ProfilePage from './components/profile/ProfilePage';
import AskPage from './components/ask/AskPage';

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
    path: '/question/:questionId',
    component: QuestionPage,
    exact: true
  },
  {
    path: '/profile',
    component: ProfilePage,
    exact: true

  },
  {
    path: '/ask',
    component: AskPage,
    exact: true

  }
];

export default routeTable;

import HomePage from './components/homepage/HomePage';
import LoginPage from './components/login/LoginPage';

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
  }
];

export default routeTable;

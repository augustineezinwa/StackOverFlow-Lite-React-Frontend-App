import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from '../../../../src/components/login/LoginPage';

test('LoginPage tests', () => {
  const loginPageComponent = shallow(<LoginPage />);
  expect(loginPageComponent).toMatchSnapshot();
});

import React from 'react';
import { shallow } from 'enzyme';
import SignupPage from '../../../../src/components/signup/SignupPage';

test('SignupPage tests', () => {
  const signupPageComponent = shallow(<SignupPage />);
  expect(signupPageComponent).toMatchSnapshot();
});

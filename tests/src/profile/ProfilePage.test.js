import React from 'react';
import { shallow } from 'enzyme';
import ProfilePage from '../../../src/components/profile/ProfilePage';

test('Profile page tests', () => {
  const profilePageComponent = shallow(<ProfilePage />);
  expect(profilePageComponent).toMatchSnapshot();
});

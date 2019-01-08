import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../../../src/components/homepage/HomePage';

test('App tests', () => {
  const homePageComponent = shallow(<HomePage />);
  expect(homePageComponent).toMatchSnapshot();
});

import React from 'react';
import { shallow } from 'enzyme';
import { NavBar } from '../../../../src/components/navbar/NavBar';

test('Navbar login tests', () => {
  const navBarComponent = shallow(<NavBar isLoggedIn={true} />);
  expect(navBarComponent).toMatchSnapshot();
});

test('Navbar logout tests', () => {
  const navBarComponent = shallow(<NavBar isLoggedIn={false} />);
  expect(navBarComponent).toMatchSnapshot();
});

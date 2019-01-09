import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../../../../src/components/navbar/NavBar';

test('Navbar tests', () => {
  const navBarComponent = shallow(<NavBar />);
  expect(navBarComponent).toMatchSnapshot();
});


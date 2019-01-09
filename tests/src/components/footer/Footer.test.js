import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../../src/components/footer/Footer';

test('App tests', () => {
  const footerComponent = shallow(<Footer />);
  expect(footerComponent).toMatchSnapshot();
});

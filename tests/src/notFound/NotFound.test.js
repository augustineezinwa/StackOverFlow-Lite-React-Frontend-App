import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../../src/components/notFound/NotFound';

test('NotFound tests', () => {
  const notFoundComponent = shallow(<NotFound />);
  expect(notFoundComponent).toMatchSnapshot();
});

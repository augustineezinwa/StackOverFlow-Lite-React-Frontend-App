import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/App';

test('App tests', () => {
  const appComponent = shallow(<App />);
  expect(appComponent).toMatchSnapshot();
});

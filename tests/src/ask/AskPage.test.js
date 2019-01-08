import React from 'react';
import { shallow } from 'enzyme';
import AskPage from '../../../src/components/ask/AskPage';

test('AskPage tests', () => {
  const askpageComponent = shallow(<AskPage />);
  expect(askpageComponent).toMatchSnapshot();
});

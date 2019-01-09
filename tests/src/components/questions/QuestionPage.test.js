import React from 'react';
import { shallow } from 'enzyme';
import QuestionPage from '../../../../src/components/questions/QuestionPage';

test('Question page tests', () => {
  const questionPageComponent = shallow(<QuestionPage />);
  expect(questionPageComponent).toMatchSnapshot();
});

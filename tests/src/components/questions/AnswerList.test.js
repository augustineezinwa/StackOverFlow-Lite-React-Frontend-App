import React from 'react';
import { shallow } from 'enzyme';
import AnswerList from '../../../../src/components/questions/AnswerList';

const props = {
  answer: 'hello, this is the answer',
  upvotes: 10,
  downvotes: 10,
  time: '10:20 GMT',
  data: '2nd Jan 2020',
  id: 1,
  name: 'emeka'
};

test('AnswerList should render props', () => {
  const shallowedComponent = shallow(<AnswerList {...props} />);
  expect(shallowedComponent).toMatchSnapshot();
});

import React from 'react';
import { shallow } from 'enzyme';

import QuestionCard from '../../../../src/components/homepage/QuestionCard';

const setup = () => {
  const props = {
    questionId: 1,
    questionTitle: 'hello, how are you',
    answerNumber: 1,
    totalUpVotes: 20,
    totalDownVotes: 10
  };

  const shallowedComponent = shallow(<QuestionCard {...props} />);

  return { shallowedComponent, props }
};

test('QuestionCard snapshots', () => {
  const { shallowedComponent } = setup();
  expect(shallowedComponent).toMatchSnapshot();
});

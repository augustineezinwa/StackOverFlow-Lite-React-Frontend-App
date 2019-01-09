import React from 'react';
import { shallow } from 'enzyme';
import { HomePage } from '../../../../src/components/homepage/HomePage';

const setup = (data) => {
  const props = {
    questions: data,
    fetchAllQuestions: jest.fn()
  };
  const shallowedComponent = shallow(<HomePage {...props} />);
  return { props, shallowedComponent };
};

test('HomePage first snapshot tests', () => {
  const { shallowedComponent } = setup([]);
  expect(shallowedComponent).toMatchSnapshot();
});


test('HomePage first snapshot tests', () => {
  const { shallowedComponent } = setup([{
    id: 4,
    questionTitle: 'any questions today',
    questionDescription: 'I need questions , so guys feel free to do so, aight',
    answers: [],
    numberOfAnswers: 0,
    upvotes: 0,
    downvotes: 0,
    time: '23:00:16 GMT+0000 (UTC)',
    date: 'Sat Jan 05 2019',
    userId: 5
  }]);
  expect(shallowedComponent).toMatchSnapshot();
});

test('test componentDidMount of homePage', () => {
  const { shallowedComponent, props } = setup([]);
  const { fetchAllQuestions } = props;
  const shallowInstance = shallowedComponent.instance();
  shallowInstance.componentDidMount();
  expect(fetchAllQuestions).toHaveBeenCalled();
});

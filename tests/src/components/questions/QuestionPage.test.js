import React from 'react';
import { shallow } from 'enzyme';
import { QuestionPage } from '../../../../src/components/questions/QuestionPage';

const setup = () => {
  const props = {
    match: {
      params: {
        articleId: 1
      }
    },
    fetchQuestion: jest.fn(),
    fetchAllUserData: jest.fn(),
    history: {
      push: jest.fn()
    },
    question: {
      id: 4,
      questionTitle: 'any questions today',
      questionDescription: 'I need questions , so guys feel free to do so, aight',
      answers: [
        {
          id: 1,
          answer: 'wow. okay',
          upvotes: 0,
          downvotes: 0,
          approved: false,
          numberOfComments: 0,
          comments: [],
          time: '22:58:14 GMT+0000 (UTC)',
          date: 'Sat Jan 05 2019',
          userId: 5,
          questionId: 1
        }
      ],
      numberOfAnswers: 0,
      upvotes: 0,
      downvotes: 0,
      time: '23:00:16 GMT+0000 (UTC)',
      date: 'Sat Jan 05 2019',
      userId: 5
    },
    users: [{
      id: 2,
      fullName: 'not name',
      jobRole: 'Update your job role',
      company: 'Update your company name',
      photo: 'image-url',
      numberOfAnswers: 0,
      earnedUpvotes: 0,
      earnedDownvotes: 0,
      numberOfQuestions: 1,
      time: '18:04:29 GMT+0000 (UTC)',
      date: 'Sun Nov 18 2018'
    },
    {
      id: 5,
      fullName: 'Aef Badmus',
      jobRole: 'UI/UX Specialist',
      company: 'MartianJS',
      photo: 'https://x.yx.z',
      numberOfAnswers: 1,
      earnedUpvotes: 0,
      earnedDownvotes: 0,
      numberOfQuestions: 1,
      time: '22:57:39 GMT+0000 (UTC)',
      date: 'Sat Jan 05 2019'
    }
    ]
  };

  const shallowedQuestionPageComponent = shallow(<QuestionPage {...props} />);

  return { shallowedQuestionPageComponent, props };
};

test('Question page tests', () => {
  const { props } = setup()
  const questionPageComponent = shallow(<QuestionPage { ...props} />);
  expect(questionPageComponent).toMatchSnapshot();
});

test('QuestionPage second snapshot', () => {
  const { shallowedQuestionPageComponent } = setup();
  expect(shallowedQuestionPageComponent).toMatchSnapshot();
});

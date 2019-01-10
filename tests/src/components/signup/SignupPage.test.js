import React from 'react';
import { shallow } from 'enzyme';
import { SignupPage } from '../../../../src/components/signup/SignupPage';

const setup = (message = '', isLoggedIn = false) => {
  const props = {
    history: {
      push: jest.fn()
    },
    signupUser: jest.fn(),
    message,
    isLoggedIn
  };
  const shallowedComponent = shallow(<SignupPage {...props} />);

  return { shallowedComponent, props };
};
test('SignupPage tests', () => {
  const { shallowedComponent } = setup('hello', true);
  expect(shallowedComponent).toMatchSnapshot();
});

test('SignupPage tests', () => {
  const { shallowedComponent } = setup('hello', false);
  expect(shallowedComponent).toMatchSnapshot();
});

test('SignupPage componentDidUpdate', () => {
  const { shallowedComponent } = setup('enter valid name', true);
  const prevProps = {
    message: 'email'
  };
  const shallowInstance = shallowedComponent.instance();
  shallowInstance.updateFieldState = jest.fn();
  shallowInstance.componentDidUpdate(prevProps);
  expect(shallowInstance.updateFieldState).toHaveBeenCalled();
});

test('SignupPage componentDidUpdate', () => {
  const { shallowedComponent } = setup('enter password', false);
  const prevProps = {
    message: ''
  };
  const shallowInstance = shallowedComponent.instance();
  shallowInstance.updateFieldState = jest.fn();
  shallowInstance.componentDidUpdate(prevProps);
  expect(shallowInstance.updateFieldState).toHaveBeenCalled();
});

test('SignupPage componentDidUpdate', () => {
  const { shallowedComponent } = setup('enter confirm password', false);
  const prevProps = {
    message: ''
  };
  const shallowInstance = shallowedComponent.instance();
  shallowInstance.updateFieldState = jest.fn();
  shallowInstance.componentDidUpdate(prevProps);
  expect(shallowInstance.updateFieldState).toHaveBeenCalled();
});

test('testing SignupPage componentDidUpdate', () => {
  const { shallowedComponent } = setup('enter email', false);
  const prevProps = {
    message: ''
  };
  const shallowInstance = shallowedComponent.instance();
  shallowInstance.updateFieldState = jest.fn();
  shallowInstance.componentDidUpdate(prevProps);
  expect(shallowInstance.updateFieldState).toHaveBeenCalled();
});

test('testing SignupPage updateFieldState', () => {
  const { shallowedComponent } = setup('', false);
  const shallowedInstance = shallowedComponent.instance();
  shallowedComponent.updateFieldState = jest.fn();
  shallowedInstance.updateFieldState('emailError', 'hello');
  expect(shallowedComponent.state('emailError')).toBe('hello');
});


test('testing SignupPage handleSubmit', () => {
  const { shallowedComponent, props } = setup('', false);
  const shallowedInstance = shallowedComponent.instance();
  shallowedComponent.handleSubmit = jest.fn();
  const { signupUser } = props;
  const e = {
    preventDefault: jest.fn()
  };
  shallowedInstance.handleSubmit(e);
  expect(signupUser).toHaveBeenCalled();
});

test('testing SignupPage handleChange', () => {
  const { shallowedComponent } = setup('', false);
  const shallowedInstance = shallowedComponent.instance();
  shallowedComponent.handleChange = jest.fn();
  const e = {
    preventDefault: jest.fn(),
    target: {
      name: 'fullName',
      value: 'emeka'
    }
  };
  shallowedInstance.handleChange(e);
  expect(e.preventDefault).toHaveBeenCalled();
});

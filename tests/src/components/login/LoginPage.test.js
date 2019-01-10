import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../../../src/components/login/LoginPage';

const setup = (isLoggedIn = false) => {
  const props = {
    login: jest.fn(),
    isLoggedIn,
    history: {
      push: jest.fn()
    }
  }

  const shallowedComponent = shallow(<LoginPage {...props } />);
  return { shallowedComponent, props }
};

test('LoginPage tests', () => {
  const { shallowedComponent } = setup();
  expect(shallowedComponent).toMatchSnapshot();
});

test('testing LoginPage handleSubmit', () => {
  const { shallowedComponent, props } = setup(false);
  const shallowedInstance = shallowedComponent.instance();
  shallowedComponent.handleSubmit = jest.fn();
  const { login } = props;
  const e = {
    preventDefault: jest.fn()
  };
  shallowedInstance.handleSubmit(e);
  expect(login).toHaveBeenCalled();
});

test('testing LoginPage handleSubmit', () => {
  const { shallowedComponent, props } = setup(true);
  const shallowedInstance = shallowedComponent.instance();
  const e = {
    preventDefault: jest.fn(),
    target: {
      name: 'email',
      value: 'ezinwa'
    }
  }

  shallowedInstance.handleChange(e);
  expect(e.preventDefault).toHaveBeenCalled();
});

test('testing LoginPage handleChange', () => {
  const { shallowedComponent, props } = setup(true);
  const shallowedInstance = shallowedComponent.instance();
  const { history } = props;
  const e = {
    preventDefault: jest.fn(),
    target: {
      name: 'email',
      value: 'ezinwa'
    }
  };
  shallowedInstance.handleChange(e);
  expect(history.push).toHaveBeenCalled();
});

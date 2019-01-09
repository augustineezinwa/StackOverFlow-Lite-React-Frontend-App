import React from 'react';
import { shallow } from 'enzyme';
import { Notification } from '../../../../src/components/notification/Notification';


const setup = (status = false) => {
  const props = {
    status,
    turnOffNotification: jest.fn()
  }

  const shallowedComponent = shallow(<Notification {...props} />)
  return { props, shallowedComponent }
}

test('Notifications tests', () => {
  const { shallowedComponent } = setup(false);
  expect(shallowedComponent).toMatchSnapshot();
});

test('ComponentDidUpdate', () => {
  const { shallowedComponent, props } = setup(true);
  const { turnOffNotification } = props;
  const shallowInstance = shallowedComponent.instance();
  const prevProps = {
    status: false
  }
  shallowInstance.componentDidUpdate(prevProps);
  expect(turnOffNotification).not.toHaveBeenCalled();
});

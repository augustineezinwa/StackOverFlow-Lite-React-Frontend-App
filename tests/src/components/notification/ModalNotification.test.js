import React from 'react';
import { shallow } from 'enzyme';
import { ModalNotification } from '../../../../src/components/notification/ModalNotification';


const setup = (isLoading = false, message = '') => {
  const props = {
    isLoading,
    message
  }

  const shallowedComponent = shallow(<ModalNotification {...props} />)
  return { props, shallowedComponent }
}

test('Modal Notifications tests', () => {
  const { shallowedComponent } = setup(false, 'hello');
  expect(shallowedComponent).toMatchSnapshot();
});


test('Modal Notifications second snapshot tests', () => {
  const { shallowedComponent } = setup(true, '');
  expect(shallowedComponent).toMatchSnapshot();
});

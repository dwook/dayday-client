/**
 * @jest-environment jsdom
 */

import React from 'react';
import 'react-native';
import 'jest-enzyme';

import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AppContext} from '../src/Provider';
import 'jest-styled-components';
import 'styled-components-test-utils/lib/jest';

import Modal from '../components/Modal';

configure({adapter: new Adapter(), disableLifecycleMethods: true});

jest.mock('react-native-voice', () => {});

describe('Modal Component', () => {
  it('should match to snapshot', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders ContentWrap', () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{modalTop: 0, selectedDiary: {good: '', bad: '', plan: ''}}}>
        <Modal />
      </AppContext.Provider>,
    );
    expect(wrapper.find('ContentWrap')).toHaveLength(1);
  });
});

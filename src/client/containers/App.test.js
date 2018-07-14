import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';

import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'
import { configure as enzymeConfigure, mount, shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

const mockStore = configureMockStore();
enzymeConfigure({ adapter: new EnzymeAdapter() });

test('[EXAMPLE TEST] Two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('[EXAMPLE TEST] Home page rendered', () => {
  const store = mockStore({});
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter initialEntries={[ '/' ]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  //tree = component.toJSON();
  //expect(tree).toMatchSnapshot();
});

test('[EXAMPLE TEST] Application render proper H1 header', () => {
  const store = mockStore({});
  const component = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[ '/' ]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
  const h1 = component.find('h1');
  console.log(h1.debug());
  expect(h1.text()).toEqual('App');
});

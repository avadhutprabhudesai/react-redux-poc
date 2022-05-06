import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Humans from './Humans';
import Tasks from './Tasks';

export default function ReduxToolkit() {
  return (
    <Provider store={store}>
      <div className="rtk-container">
        <Humans />
        <Tasks />
      </div>
    </Provider>
  );
}

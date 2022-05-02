import React, { useEffect, useState } from 'react';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { decrement, increment, set } from './actions';
import { connectStore, hookStore } from './store';
import useCounter from './use-counter';
import ConnectCounter from './ConnectCounter';
import HooksCounter from './HooksCounter';

export default function ReactRedux() {
  return (
    <div className="splitter">
      <Provider store={hookStore}>
        <HooksCounter />
      </Provider>
      <Provider store={connectStore}>
        <ConnectCounter />
      </Provider>
    </div>
  );
}

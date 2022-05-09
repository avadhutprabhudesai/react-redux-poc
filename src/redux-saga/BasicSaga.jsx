import React from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Button, Segment, SegmentGroup } from 'semantic-ui-react';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    inc: (state) => {
      state.count += 1;
    },
    dec: (state) => {
      state.count -= 1;
    },
    set: (state, action) => {
      state.count = action.payload;
    },
  },
});

function* watchCounterActions() {
  yield takeEvery('INCREMENT', workerInc);
  yield takeEvery('DECREMENT', workerDec);
}

function* workerInc() {
  yield put({ type: 'counter/inc' });
}
function* workerDec() {
  yield put({ type: 'counter/dec' });
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(watchCounterActions);

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <div className="saga__container">
      <h2>Basic Saga</h2>
      <h1>{count}</h1>
      <div>
        <Button onClick={() => dispatch({ type: 'INCREMENT' })}>Inc</Button>
        <Button onClick={() => dispatch({ type: 'DECREMENT' })}>Dec</Button>
      </div>
    </div>
  );
}

export default function BasicSaga() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

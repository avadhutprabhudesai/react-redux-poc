import React, { useState } from 'react';
import { Button, Divider, Loader } from 'semantic-ui-react';
import createSagaMiddleware from 'redux-saga';
import { take, put, fork, call, takeEvery } from 'redux-saga/effects';
import { produce } from 'immer';
import { createStore, applyMiddleware } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

const TAKE_AND_PUT = 'TAKE_AND_PUT';
const USER_REQ = 'USER_REQ';
const USER_FETCHED = 'USER_FETCHED';
const USER_ERROR = 'USER_ERROR';
const TASK_INITIATED = 'TASK_INITIATED';
const TASK_FINISHED = 'TASK_FINISHED';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const reducer = produce((state, action) => {
  state.loading = false;
  state.error = null;
  if (action.type === TAKE_AND_PUT) {
    state.data = action.payload;
  }
  if (action.type === USER_REQ) {
    state.loading = true;
    state.data = null;
  }
  if (action.type === USER_FETCHED) {
    state.data = action.payload;
  }
  if (action.type === USER_ERROR) {
    state.error = action.payload;
  }
  if (action.type === TASK_INITIATED || action.type === TASK_FINISHED) {
    state.data = action.payload;
  }
});

function* takeAndPutSaga() {
  yield take('TAKE');
  yield put({
    type: TAKE_AND_PUT,
    payload:
      "takeAndPutSaga captured action {type: 'TAKE'} and dispatched {type: 'TAKE_AND_PUT'}",
  });
}

function* callSaga() {
  yield take('FETCH');
  yield put({ type: USER_REQ });
  try {
    const user = yield call(() =>
      fetch('https://randomuser.me/api/')
        .then((data) => data.json())
        .then(({ results: [user] }) => ({
          name: user.name.first,
          city: user.location.city,
          country: user.location.country,
        }))
    );
    yield put({
      type: USER_FETCHED,
      payload: `callSaga fetched data for user "${user.name.toUpperCase()}" from remote server`,
    });
  } catch (error) {
    yield put({
      type: USER_ERROR,
      payload: `callSaga failed to fetch data from remote server`,
    });
  }
}

function* forkSaga() {
  yield takeEvery('FORK', forkWorker);
  function* fn(timeout, payload) {
    yield call(
      () =>
        new Promise((res) =>
          setTimeout(() => {
            res();
          }, timeout)
        )
    );
    yield put({ type: TASK_FINISHED, payload });
  }

  function* forkWorker() {
    yield put({ type: TASK_INITIATED, payload: 'Task 1 initiated' });
    yield fork(fn, 5000, 'Task 1 completed');
    yield put({ type: TASK_INITIATED, payload: 'Task 2 initiated' });
    yield fork(fn, 3000, 'Task 2 completed');
    yield put({ type: TASK_INITIATED, payload: 'Task 3 initiated' });
    yield fork(fn, 2000, 'Task 3 completed');
  }
}

function* rootSaga() {
  yield fork(takeAndPutSaga);
  yield fork(callSaga);
  yield fork(forkSaga);
}
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

function EffectsList() {
  const { data, loading, error } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="saga__container">
      <h2>Effects</h2>
      <div className="effects">
        <Divider />
        <p>
          <b>take</b>
          <ul>
            <li>Accept an action pattern string an argument</li>
            <li>Suspend the generator till matching action is dispatched</li>
            <li>Resume the generator once matching action is dispatched</li>
          </ul>
        </p>
        <p>
          <b>put</b>
          <ul>
            <li>Accept an action</li>
            <li>Dispatch it to the reducer</li>
          </ul>
        </p>
        <Button onClick={() => dispatch({ type: 'TAKE' })}>
          TAKE is waiting!!!
        </Button>
        <Divider />
        <p>
          <b>call</b>
          <ul>
            <li>Accept a function which returns the promise</li>
            <li>Suspend the generator untill promise is fulfilled</li>
            <li>Resume the generator with the resolved value of the promise</li>
            <li>
              Blocking effect. Generator does not proceed until call() has
              yielded a value or error
            </li>
          </ul>
        </p>
        <Button onClick={() => dispatch({ type: 'FETCH' })}>
          Let me CALL it for ya
        </Button>
        <Divider />
        <p>
          <b>fork</b>
          <ul>
            <li>Accept a function which returns the promise</li>
          </ul>
        </p>
        <Button onClick={() => dispatch({ type: 'FORK' })}>Fork it down</Button>
      </div>
      <Loader active={loading} />
      {data && <h5>{data}</h5>}
      {error && <h5>{error}</h5>}
    </div>
  );
}

export default function Effects() {
  return (
    <Provider store={store}>
      <EffectsList />
    </Provider>
  );
}

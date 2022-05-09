import React, { useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Button, Form, SegmentGroup, Input, Loader } from 'semantic-ui-react';
import createSagaMiddleware from 'redux-saga';
import { put, takeLatest, call } from 'redux-saga/effects';
import { produce } from 'immer';
import { createStore, applyMiddleware } from 'redux';

const USER_REQUESTED = 'USER_REQUESTED';
const USER_FETCHED = 'USER_FETCHED';
const USER_ERROR = 'USER_ERROR';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const reducer = produce((state, action) => {
  if (action.type === USER_REQUESTED) {
    state.loading = true;
    state.error = null;
  }
  if (action.type === USER_ERROR) {
    state.loading = false;
    state.data = null;
    state.error = action.payload;
  }
  if (action.type === USER_FETCHED) {
    state.loading = false;
    state.error = null;
    state.data = action.payload;
  }
});

// create saga watcher and worker
function* watcher() {
  yield takeLatest('FETCH', worker);
}

function* worker(action) {
  try {
    yield put({ type: USER_REQUESTED });
    const user = yield call(fetchGithubUser, action.payload);
    if (user.message === 'Not Found') {
      throw Error('User not found');
    }
    yield put({ type: USER_FETCHED, payload: user });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
  }
}

function fetchGithubUser(username) {
  return fetch(`https://api.github.com/users/${username}`).then((data) =>
    data.json()
  );
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(sagaMiddleware)
);

// run saga watcher
sagaMiddleware.run(watcher);

function GithubSearch() {
  const [user, setUser] = useState('');
  const { data, loading, error } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    // dispatch action for saga
    dispatch({ type: 'FETCH', payload: user });
  };
  return (
    <div className="saga__container">
      <h2>Async Saga</h2>
      <Form onSubmit={handleSubmit} className="async-saga__form">
        <Input
          placeholder="Enter Github username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </Form>
      {loading && (
        <div className="async-saga__loader">
          <Loader active={loading}>Loading...</Loader>
        </div>
      )}
      {error && <h1>{error.message}</h1>}
      {data && (
        <div className="user">
          <img src={data.avatar_url} alt="avatar" className="user__avatar" />
          {data.name && <h2>{data.name}</h2>}
          {data.location && <p>{data.location}</p>}
          <p>
            {data.followers} follower(s), {data.following} following{' '}
          </p>
          {data.html_url && <a href={data.html_url}>Github Profile</a>}
        </div>
      )}
    </div>
  );
}

export default function AsyncSaga() {
  return (
    <Provider store={store}>
      <GithubSearch />
    </Provider>
  );
}

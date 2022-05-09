import React from 'react';
import BasicSaga from './BasicSaga';
import AsyncSaga from './AsyncSaga';
import Effects from './Effects';

/**
 * ToDo:
 * - redux-saga boilerplate with hello world saga
 * - redux-saga terminology
 * - async action with watcher worker sagas
 * - effects
 *   - take
 *   - call
 *   - put
 *   - fork
 *   - spawn
 *   - select
 *   - takeEvery
 *   - takeLatest
 *   - join
 *   - cancel
 *   - delay
 *   - throttle
 *   - debounce
 *   - retry
 *   - race
 *   - all
 * - patterns
 *
 */

export default function ReduxSaga() {
  return (
    <div className="saga__layout">
      {/* <AsyncSaga /> */}
      {/* <BasicSaga /> */}
      <Effects />
    </div>
  );
}

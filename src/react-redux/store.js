import { composeWithDevTools } from '@redux-devtools/extension';
import { createStore } from 'redux';

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  if (action.type === 'counter/inc') {
    return { ...state, count: state.count + 1 };
  }
  if (action.type === 'counter/dec') {
    return { ...state, count: state.count - 1 };
  }
  if (action.type === 'counter/set') {
    return { ...state, count: action.payload };
  }
  return state;
};

export const hookStore = createStore(reducer, composeWithDevTools());
export const connectStore = createStore(reducer, composeWithDevTools());

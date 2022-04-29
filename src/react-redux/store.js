import { createStore } from 'redux';

const initialState = {
  count: 0,
};

const enhancer =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

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

const store = createStore(reducer, enhancer);

export default store;

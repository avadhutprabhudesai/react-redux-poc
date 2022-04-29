export const INCREMENT = 'counter/inc';
export const DECREMENT = 'counter/dec';
export const SET = 'counter/set';

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const set = (val) => ({ type: SET, payload: val });

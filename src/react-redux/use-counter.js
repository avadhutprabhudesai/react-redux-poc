import { useSelector } from 'react-redux';
import { decrement, increment, set } from './actions';
import { useActions } from './use-actions';

const useCounter = () => {
  const count = useSelector(({ count }) => count);
  const counterActions = useActions({
    increment: increment,
    decrement: decrement,
    set: set,
  });

  return { count, ...counterActions };
};
export default useCounter;

import { useEffect, useState } from 'react';
import useCounter from './use-counter';

function HooksCounter() {
  const { count, increment, decrement, set } = useCounter();
  const [val, setVal] = useState(count);
  const handleSubmit = (e) => {
    e.preventDefault();
    set(val);
  };
  useEffect(() => {
    setVal(count);
  }, [count]);

  return (
    <div className="box">
      <h2>Hooks API</h2>
      <h1>{count}</h1>
      <div className="actions">
        <div className="buttons">
          <button className="button" onClick={increment}>
            Inc
          </button>
          <button className="button" onClick={() => set(0)}>
            Reset
          </button>
          <button className="button" onClick={decrement}>
            Dec
          </button>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <button className="button">Set</button>
        </form>
      </div>
    </div>
  );
}
export default HooksCounter;

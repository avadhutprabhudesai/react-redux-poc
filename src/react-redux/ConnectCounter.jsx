import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { decrement, increment, set } from './actions';

function ConnectCounter({ count, increment, decrement, set }) {
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
      <h2>Connect API</h2>
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
const mapStateToProps = (state) => ({
  count: state.count,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      increment: increment,
      decrement: decrement,
      set: set,
    },
    dispatch
  ),
});

// eslint-disable-next-line no-func-assign
ConnectCounter = connect(mapStateToProps, mapDispatchToProps)(ConnectCounter);

export default ConnectCounter;

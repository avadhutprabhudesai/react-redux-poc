import UseImmer from './UseImmer';
import UseStateImmer from './UseStateImmer';
import UseImmerReducer from './UseImmerReducer';
import UseReducerWithImmer from './UseReducerWithImmer';

export default function Immer() {
  return (
    <div className="immer">
      <div className="container">
        <h3>useState + Immer</h3>
        <UseStateImmer />
      </div>
      <div className="container">
        <h3>useImmer</h3>
        <UseImmer />
      </div>
      <div className="container">
        <h3>useReducer + Immer</h3>
        <UseReducerWithImmer />
      </div>
      <div className="container">
        <h3>useImmerReducer</h3>
        <UseImmerReducer />
      </div>
    </div>
  );
}

import { useDispatch, useSelector } from 'react-redux';
import { Segment, Select } from 'semantic-ui-react';
import { tipPercentageUpdated } from '../actions';
import {
  selectSubTotal,
  selectTipAmount,
  selectTipPercentage,
  selectTotal,
} from '../selectors';

export default function TipCalculator() {
  const dispatch = useDispatch();
  const tipPercentage = useSelector(selectTipPercentage);
  const subTotal = useSelector(selectSubTotal);
  const tip = useSelector(selectTipAmount);
  const total = useSelector(selectTotal);
  const handleChange = (e, { value }) => dispatch(tipPercentageUpdated(value));
  return (
    <div className="tip">
      <Select
        placeholder="Select tip percentage"
        onChange={handleChange}
        defaultValue={tipPercentage}
        options={[
          {
            key: '10',
            value: 10,
            text: '10%',
          },
          {
            key: '15',
            value: 15,
            text: '15%',
          },
          {
            key: '20',
            value: 20,
            text: '20%',
          },
        ]}
      />
      <Segment className="bill">
        <span className="label">Subtotal</span>
        <span className="amount">$ {subTotal}</span>
        <span className="label">Tip</span>
        <span className="amount">$ {tip}</span>
        <span className="label">Total</span>
        <span className="amount">$ {total}</span>
      </Segment>
    </div>
  );
}

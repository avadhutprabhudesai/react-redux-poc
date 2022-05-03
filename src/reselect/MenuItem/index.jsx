import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button, Input, Segment } from 'semantic-ui-react';
import { itemPriceUpdated, itemQuantityUpdated, itemRemoved } from '../actions';

export default function MenuItem({ id, name, price, quantity }) {
  const dispatch = useDispatch();
  return (
    <Segment className="menu-item">
      <h2>{name}</h2>
      <div className="edit">
        <Input
          label="$"
          type="number"
          onChange={(e) =>
            dispatch(itemPriceUpdated({ id, price: +e.target.value }))
          }
          value={price}
        />
        <Input
          label="@"
          type="number"
          onChange={(e) =>
            dispatch(itemQuantityUpdated({ id, quantity: +e.target.value }))
          }
          value={quantity}
        />
      </div>
      <div className="info">
        <h2>$ {(price * quantity) | 0}</h2>
        <Button
          size="tiny"
          negative
          onClick={() => dispatch(itemRemoved({ id }))}
        >
          Remove
        </Button>
      </div>
    </Segment>
  );
}

MenuItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
};

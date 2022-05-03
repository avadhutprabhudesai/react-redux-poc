import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input } from 'semantic-ui-react';
import { itemAdded } from '../actions';

const defaultItem = {
  name: '',
  price: 0,
};

export default function MenuForm() {
  const dispatch = useDispatch();
  const [item, setItem] = useState(() => defaultItem);
  const handleSubmit = () => {
    dispatch(itemAdded(item));
    setItem(defaultItem);
  };
  const handleChange = (e, { name, value }) => {
    setItem({
      ...item,
      [name]: value,
    });
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Input
            label="Name"
            onChange={handleChange}
            placeholder="Enter name"
            name="name"
            value={item.name}
          />
        </Form.Field>
        <Form.Field>
          <Input
            label="Price"
            onChange={handleChange}
            type="number"
            placeholder="Enter price"
            name="price"
            value={item.price}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

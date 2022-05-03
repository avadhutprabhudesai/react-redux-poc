import { useSelector } from 'react-redux';
import MenuItem from '../MenuItem';
import { selectItems } from '../selectors';

export default function MenuItems() {
  const items = useSelector(selectItems);
  return (
    <div className="items">
      {items.length ? (
        items.map((item) => <MenuItem key={item.id} {...item} />)
      ) : (
        <h3>Add items</h3>
      )}
    </div>
  );
}

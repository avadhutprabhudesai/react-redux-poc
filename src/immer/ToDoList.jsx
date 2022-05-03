import PropTypes from 'prop-types';
import { Checkbox, Icon, Segment } from 'semantic-ui-react';
export default function ToDoList({ items, onToggle, onRemove }) {
  return (
    items.length > 0 && (
      <Segment.Group>
        {items.map((item) => (
          <Segment
            key={item.id}
            size="mini"
            textAlign="left"
            className="list-item"
          >
            <Checkbox onChange={() => onToggle(item.id)} />
            <span className={item.isCompleted ? 'completed' : ''}>
              {item.title}
            </span>
            <Icon name="close" onClick={() => onRemove(item.id)} />
          </Segment>
        ))}
      </Segment.Group>
    )
  );
}

ToDoList.propTypes = {
  items: PropTypes.array,
  onRemove: PropTypes.func,
  onToggle: PropTypes.func,
};

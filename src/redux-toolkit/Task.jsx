import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import tasksSlice from './tasks-slice';
import { Segment, Checkbox } from 'semantic-ui-react';

export default function Task({ id, title, isCompleted, children }) {
  const dispatch = useDispatch();
  const handleToggle = (id, isCompleted) => {
    dispatch(
      tasksSlice.actions.toggle({
        id,
        isCompleted,
      })
    );
  };
  return (
    <Segment className="tasks__item">
      <div className="tasks__info">
        <Checkbox
          checked={isCompleted}
          onChange={(e, data) => handleToggle(id, data.checked)}
        />

        {title}
      </div>
      {children}
    </Segment>
  );
}

Task.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  isCompleted: PropTypes.bool,
  title: PropTypes.string,
};

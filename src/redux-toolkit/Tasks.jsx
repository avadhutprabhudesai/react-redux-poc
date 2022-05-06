import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHumanList, selectTasks } from './selector';
import tasksSlice from './tasks-slice';
import { Form, Input, Segment, Select } from 'semantic-ui-react';
import Task from './Task';

export default function Tasks() {
  const tasks = useSelector(selectTasks);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const humanList = useSelector(selectHumanList);
  const handleAssginedTo = (id, humanId) => {
    dispatch(
      tasksSlice.actions.assignTo({
        id,
        humanId,
      })
    );
  };
  const handleSubmit = () => {
    dispatch(tasksSlice.actions.add(title));
    setTitle('');
  };

  return (
    <div className="tasks">
      <h3>Tasks</h3>
      <Form onSubmit={handleSubmit}>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form>
      <Segment.Group>
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            isCompleted={task.isCompleted}
          >
            <Select
              placeholder="Assign human"
              options={humanList}
              onChange={(e, { value }) => handleAssginedTo(task.id, value)}
            />
          </Task>
        ))}
      </Segment.Group>
    </div>
  );
}

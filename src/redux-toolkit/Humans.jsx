import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHumans, selectTasks } from './selector';
import humansSlice from './humans-slice';
import { Form, Input, Segment } from 'semantic-ui-react';
import { filter } from 'ramda';
import Task from './Task';

export default function Humans() {
  const humans = useSelector(selectHumans);
  const tasks = useSelector(selectTasks);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const handleSubmit = () => {
    dispatch(humansSlice.actions.add(name));
    setName('');
  };
  return (
    <div className="humans">
      <h3>Humans</h3>
      <Form onSubmit={handleSubmit}>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Form>
      <Segment.Group>
        {humans.map((human) => (
          <Segment key={human.id}>
            <h4>{human.name}</h4>
            {human.taskIds.length > 0 && (
              <Segment.Group>
                {filter(({ id }) => human.taskIds.includes(id), tasks).map(
                  (task) => (
                    <Task
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      isCompleted={task.isCompleted}
                    />
                  )
                )}
              </Segment.Group>
            )}
          </Segment>
        ))}
      </Segment.Group>
    </div>
  );
}

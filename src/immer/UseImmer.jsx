import { Form, Input } from 'semantic-ui-react';
import { useImmer } from 'use-immer';
import ToDoList from './ToDoList';
import useId from './use-id';

export default function UseImmer() {
  const genId = useId();
  const [task, setTask] = useImmer('');
  const [items, setItems] = useImmer(() => [
    {
      id: genId(),
      title: 'Typescript',
      isCompleted: false,
    },
  ]);

  const handleSubmit = () => {
    setItems((draftState) => {
      draftState.push({
        id: genId(),
        title: task,
        isCompleted: false,
      });
    });
    setTask('');
  };

  const handleToggle = (id) => {
    setItems((draftState) => {
      const item = draftState.find((item) => item.id === id);
      item.isCompleted = !item.isCompleted;
    });
  };

  const handleRemove = (id) => {
    setItems((draftState) => {
      return draftState.filter((item) => item.id !== id);
    });
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input value={task} onChange={(e) => setTask(e.target.value)} />
      </Form>
      <ToDoList
        items={items}
        onToggle={handleToggle}
        onRemove={handleRemove}
      ></ToDoList>
    </>
  );
}

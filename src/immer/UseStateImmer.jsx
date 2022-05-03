import produce from 'immer';
import { useState } from 'react';
import { Form, Input } from 'semantic-ui-react';
import ToDoList from './ToDoList';
import useId from './use-id';

export default function UseStateImmer() {
  const genId = useId();
  const [task, setTask] = useState('');
  const [items, setItems] = useState(() => [
    {
      id: genId(),
      title: 'Get Milk',
      isCompleted: false,
    },
  ]);

  const handleSubmit = () => {
    setItems(
      produce((draftState) => {
        draftState.push({
          id: genId(),
          title: task,
          isCompleted: false,
        });
      })
    );
    setTask('');
  };

  const handleToggle = (id) => {
    setItems(
      produce((draftState) => {
        const item = draftState.find((item) => item.id === id);
        item.isCompleted = !item.isCompleted;
      })
    );
  };

  const handleRemove = (id) => {
    setItems(
      produce((draftState) => {
        return draftState.filter((item) => item.id !== id);
      })
    );
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

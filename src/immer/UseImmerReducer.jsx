import { useCallback } from 'react';
import { Form, Input } from 'semantic-ui-react';
import { useImmer, useImmerReducer } from 'use-immer';
import ToDoList from './ToDoList';
import useId from './use-id';

const ITEM_ADDED = 'ITEM_ADDED';
const ITEM_REMOVED = 'ITEM_REMOVED';
const ITEM_TOGGLE = 'ITEM_TOGGLE';

const reducer = (state, action) => {
  if (action.type === ITEM_ADDED) {
    state.push(action.payload);
  }
  if (action.type === ITEM_REMOVED) {
    return state.filter((item) => item.id !== action.payload.id);
  }
  if (action.type === ITEM_TOGGLE) {
    const item = state.find((item) => item.id === action.payload.id);
    item.isCompleted = !item.isCompleted;
  }
};

export default function UseImmerReducer() {
  const genId = useId();
  const [task, setTask] = useImmer('');

  const [items, dispatch] = useImmerReducer(reducer, [
    {
      id: genId(),
      title: 'Scotch',
      isCompleted: false,
    },
  ]);

  const handleSubmit = useCallback(() => {
    task &&
      dispatch({
        type: ITEM_ADDED,
        payload: {
          id: genId(),
          title: task,
          isCompleted: false,
        },
      });
    setTask('');
  }, [task]);

  const handleToggle = useCallback(
    (id) => {
      dispatch({
        type: ITEM_TOGGLE,
        payload: {
          id,
        },
      });
    },

    []
  );

  const handleRemove = useCallback((id) => {
    dispatch({
      type: ITEM_REMOVED,
      payload: {
        id,
      },
    });
  }, []);
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

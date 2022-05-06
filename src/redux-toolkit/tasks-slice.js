import { createSlice, nanoid } from '@reduxjs/toolkit';

const createTask = (title) => ({
  id: nanoid(),
  title,
  isCompleted: false,
  humanId: null,
});

const tasksSlice = createSlice({
  name: 'task',
  initialState: [
    createTask('Get milk'),
    createTask('Drop kids to school'),
    createTask('Walk dog'),
  ],
  reducers: {
    add: (state, action) => {
      state.push(createTask(action.payload));
    },
    toggle: (state, action) => {
      const task = state.find((task) => task.id === action.payload.id);
      task.isCompleted = action.payload.isCompleted;
    },
    assignTo: (state, action) => {
      const task = state.find((task) => task.id === action.payload.id);
      task.humanId = action.payload.humanId;
    },
  },
});

export default tasksSlice;

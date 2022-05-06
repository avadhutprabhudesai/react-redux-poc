import { createSlice, nanoid } from '@reduxjs/toolkit';
import tasksSlice from './tasks-slice';
import { without } from 'ramda';

const createHuman = (name) => ({
  id: nanoid(),
  name,
  taskIds: [],
});

const humansSlice = createSlice({
  name: 'humans',
  initialState: [
    createHuman('Alex'),
    createHuman('Smith'),
    createHuman('John'),
  ],
  reducers: {
    add: (state, action) => {
      state.push(createHuman(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(tasksSlice.actions.assignTo, (state, action) => {
      state.forEach((human) => {
        if (human.id !== action.payload.humanId) {
          human.taskIds = without([action.payload.id], human.taskIds);
        } else {
          human.taskIds.push(action.payload.id);
        }
      });
    });
  },
});

export default humansSlice;

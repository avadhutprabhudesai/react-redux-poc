import { configureStore } from '@reduxjs/toolkit';
import humansSlice from './humans-slice';
import tasksSlice from './tasks-slice';

const store = configureStore({
  reducer: {
    humans: humansSlice.reducer,
    tasks: tasksSlice.reducer,
  },
});

export default store;

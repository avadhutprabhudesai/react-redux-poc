import { createSelector } from 'reselect';

export const selectHumans = (state) => state.humans;
export const selectTasks = (state) => state.tasks;
export const selectHumanList = createSelector([selectHumans], (humans) =>
  humans.map((human) => ({
    key: human.id,
    value: human.id,
    text: human.name,
  }))
);

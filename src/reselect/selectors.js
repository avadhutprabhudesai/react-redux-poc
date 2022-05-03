import { createSelector } from 'reselect';

export const selectItems = (state) => state.items;

export const selectTipPercentage = (state) => state.tipPercentage;

export const selectSubTotal = createSelector([selectItems], (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

export const selectTipAmount = createSelector(
  [selectSubTotal, selectTipPercentage],
  (subTotal, tip) => {
    return +(subTotal * (tip / 100)).toFixed(2);
  }
);

export const selectTotal = createSelector(
  [selectSubTotal, selectTipAmount],
  (subTotal, tip) => {
    return +(subTotal + tip).toFixed(2);
  }
);

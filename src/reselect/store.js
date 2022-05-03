import { composeWithDevTools } from '@redux-devtools/extension';
import produce from 'immer';
import { createStore } from 'redux';
import {
  ITEM_ADDED,
  ITEM_PRICE_UPDATED,
  ITEM_QUANTITY_UPDATED,
  ITEM_REMOVED,
  TIP_PERCENTAGE_UPDATED,
} from './actions';

let uuid = 0;
const initialState = {
  items: [
    {
      id: uuid++,
      name: 'Ceasar Salad',
      price: 20,
      quantity: 1,
    },
  ],
  tipPercentage: 10,
};

const reducer = (state = initialState, action) => {
  if (action.type === ITEM_ADDED) {
    return produce(state, (draftState) => {
      draftState.items.push({
        id: uuid++,
        quantity: 1,
        ...action.payload,
      });
    });
  }

  if (action.type === ITEM_PRICE_UPDATED) {
    return produce(state, (draftState) => {
      const item = draftState.items.find(
        (item) => item.id === action.payload.id
      );
      item.price = action.payload.price;
    });
  }
  if (action.type === ITEM_QUANTITY_UPDATED) {
    return produce(state, (draftState) => {
      const item = draftState.items.find(
        (item) => item.id === action.payload.id
      );
      item.quantity = action.payload.quantity;
    });
  }
  if (action.type === TIP_PERCENTAGE_UPDATED) {
    return produce(state, (draftState) => {
      draftState.tipPercentage = action.payload;
    });
  }

  if (action.type === ITEM_REMOVED) {
    return produce(state, (draftState) => {
      draftState.items = draftState.items.filter(
        (item) => item.id !== action.payload.id
      );
    });
  }

  return state;
};

const tipStore = createStore(reducer, composeWithDevTools());

export default tipStore;

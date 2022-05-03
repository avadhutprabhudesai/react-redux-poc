import { composeWithDevTools } from '@redux-devtools/extension';
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
    return {
      ...state,
      items: [
        ...state.items,
        {
          id: uuid++,
          quantity: 1,
          ...action.payload,
        },
      ],
    };
  }

  if (action.type === ITEM_PRICE_UPDATED) {
    return {
      ...state,
      items: state.items.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            price: +action.payload.price,
          };
        }
        return item;
      }),
    };
  }
  if (action.type === ITEM_QUANTITY_UPDATED) {
    return {
      ...state,
      items: state.items.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: +action.payload.quantity,
          };
        }
        return item;
      }),
    };
  }
  if (action.type === TIP_PERCENTAGE_UPDATED) {
    return {
      ...state,
      tipPercentage: +action.payload,
    };
  }

  if (action.type === ITEM_REMOVED) {
    return {
      ...state,
      items: state.items.filter((item) => item.id !== action.payload.id),
    };
  }

  return state;
};

const tipStore = createStore(reducer, composeWithDevTools());

export default tipStore;

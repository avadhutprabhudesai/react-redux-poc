export const ITEM_ADDED = 'ITEM_ADDED';
export const ITEM_PRICE_UPDATED = 'ITEM_PRICE_UPDATED';
export const ITEM_QUANTITY_UPDATED = 'ITEM_QUANTITY_UPDATED';
export const ITEM_REMOVED = 'ITEM_REMOVED';
export const TIP_PERCENTAGE_UPDATED = 'TIP_PERCENTAGE_UPDATED';

export const itemAdded = ({ name, price }) => ({
  type: ITEM_ADDED,
  payload: {
    name,
    price: +price,
  },
});
export const itemRemoved = ({ id }) => ({
  type: ITEM_REMOVED,
  payload: {
    id,
  },
});

export const itemPriceUpdated = ({ id, price }) => ({
  type: ITEM_PRICE_UPDATED,
  payload: {
    id,
    price,
  },
});
export const itemQuantityUpdated = ({ id, quantity }) => ({
  type: ITEM_QUANTITY_UPDATED,
  payload: {
    id,
    quantity,
  },
});

export const tipPercentageUpdated = (tipPercentage) => ({
  type: TIP_PERCENTAGE_UPDATED,
  payload: tipPercentage,
});

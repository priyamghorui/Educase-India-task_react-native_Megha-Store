//Handel for add item in cart.
export function itemCart(item) {
  return {
    type: 'item_Cart',
    data: item,
  };
}
//Handel for remove item in cart.
export function itemCartRemove(item) {
  return {
    type: 'item_Cart_remove',
    data: item,
  };
}
//Handel after app restore from kill or background all store item will back to save in cart.
export function hydrateCart(item) {
  return {
    type: 'hydrateCart',
    data: item,
  };
}

const initialstate: any = [];
export const itemCartReducer = (state = initialstate, action: any) => {
  // console.log(">>",state,this);
  // Handel for add,remove and restore item in cart.
  switch (action.type) {
    case 'item_Cart':
      return [...state, action.data];
    case 'item_Cart_remove':
      // console.log(action.data);
      const dataAfterRemoveItem = state.filter(e => e.id != action.data.id);
      return dataAfterRemoveItem;
    case 'hydrateCart':
      console.log('<>', action.data);

      return action.data;
    default:
      return state;
  }
};

import { listCake } from "../../components/Content/OderFromOurBakery/ListCake";
import { createSlice, current } from "@reduxjs/toolkit";
const currentCart = JSON.parse(localStorage.getItem("cart"));

const cartSlice = createSlice({
  name: "cart",
  initialState: currentCart ?? [],
  reducers: {
    addCakeToCart: (state, action) => {
      const { cakeID, optionIndex } = action.payload;
      const currentCakeIndex = state.findIndex((item) => {
        return item.cakeID === cakeID && item.optionIndex === optionIndex;
      });

      const findCakeFromList = listCake.find((cake) => cake.id === cakeID);

      if (currentCakeIndex === -1) {
        const newItem = {
          cakeID,
          optionIndex,
          quantity: 1,
          total: findCakeFromList.price + findCakeFromList.option[optionIndex].priceOp,
        };
        const newCart = JSON.stringify([...state, newItem]);
        localStorage.setItem("cart", newCart);
        return [...state, newItem];
      } else {
        const currentItem = state[currentCakeIndex];
        const newItem = {
          ...currentItem,
          quantity: ++currentItem.quantity,
          total: currentItem.quantity * currentItem.total,
        };
        state[currentCakeIndex] = newItem;
        const newCart = JSON.stringify(state);
        localStorage.setItem("cart", newCart);
        return state;
      }
    },

    removeCakeFromCart: (state, action) => {
      const { id, option } = action.payload;
      const newCart = state.filter(
        (cake) => cake.cakeID !== id || cake.optionIndex !== option
      );
      const newCartToJSON = JSON.stringify(newCart);
      localStorage.setItem("cart", newCartToJSON);
      return newCart;
    },

    deleteAllCakeInCart: () => {
      localStorage.setItem("cart", "[]");
      return [];
    },
  },
});
export const { addCakeToCart, removeCakeFromCart, deleteAllCakeInCart } =
  cartSlice.actions;
export default cartSlice.reducer;

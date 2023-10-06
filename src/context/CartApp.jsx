import { createContext, useState } from "react";
import { listCake } from "../components/Content/OderFromOurBakery/ListCake";
export const CartContext = createContext(null);

const CartApp = ({ children }) => {
  const currentCart = JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState(() => currentCart ?? []);
  const [user, setUser] = useState(null);
  const addCakeToCart = (cakeID, optionIndex) => {
    const currentCakeIndex = cart.findIndex((item) => {
      return item.cakeID === cakeID && item.optionIndex === optionIndex;
    });
    const findCakeFromList = listCake.find((cake) => cake.id == cakeID);

    if (currentCakeIndex === -1) {
      const newItem = {
        cakeID,
        optionIndex,
        quantity: 1,
        total: findCakeFromList.price,
      };
      const newCart = JSON.stringify([...cart, newItem]);
      localStorage.setItem("cart", newCart);
      setCart((prevCart) => [...prevCart, newItem]);
    } else {
      const currentItem = cart[currentCakeIndex];
      const newItem = {
        ...currentItem,
        quantity: ++currentItem.quantity,
        total: currentItem.quantity * findCakeFromList.price,
      };
      cart[currentCakeIndex] = newItem;
      const newCart = JSON.stringify(cart);
      localStorage.setItem("cart", newCart);
      setCart([...cart]);
    }
  };

  const removeCakeFromCart = (id, option) => {
    const newCart = cart.filter(
      (cake) => cake.cakeID !== id || cake.optionIndex !== option
    );
    const newCartToJSON = JSON.stringify(newCart);
    localStorage.setItem("cart", newCartToJSON);
    setCart(newCart);
  };

  const deleteAllCakeInCart = () => {
    localStorage.setItem("cart", "[]");
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addCakeToCart,
        deleteAllCakeInCart,
        removeCakeFromCart,
        setUser,
        user
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartApp;

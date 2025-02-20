import { createContext, useState, useContext } from "react";
import CartModal from "./components/CartModal";

const itemContext = createContext();

function useValue() {
  const value = useContext(itemContext);
  return value;
}

function CustomItemContext({ children }) {
  const [total, setTotal] = useState(0);
  const [item, setItem] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

  const handleAdd = (product) => {

    const index = cart.findIndex((item) => item.id === product.id)
    if(index === -1){
      setCart([...cart, {...product,qty:1}])
      setTotal(total + product.price);
    } else {
      cart[index].qty++;
      setCart(cart);
      setTotal(total + cart[index].price);
    }
    setItem(item + 1);
    console.log(cart);
  };

  const handleRemove = (id) => { 
    const index = cart.findIndex((item) => item.id === id);
    if(index !== -1) {
      cart[index].qty--;
      setTotal(total-cart[index].price);
      setItem(item-1);
      if(cart[index].qty == 0) {
        cart.splice(index, 1);
      }
    }
    setCart(cart);
  };

  const clear = () => {
    setTotal(0);
    setItem(0);
    setCart([]);
  };

  const toggle = () => {
    setShowCart(!showCart);
  }

  return (
    <itemContext.Provider
      value={{ total, item, handleAdd, handleRemove, clear, toggle, cart }}
    >
      {showCart && <CartModal toggle={toggle} />}
      {children}
    </itemContext.Provider>
  );
}

export { useValue };
export default CustomItemContext;

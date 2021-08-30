import { RENTED } from "../../../../constants";
import Item from "./components/item";

import "./styles.scss";

const Cart = (props) => {
  const {
    products,
    onRemoveProductFromCart,
    onCheckoutProductFromCart,
    onCancelCheckoutProductFromCart,
    user: {
      data: { _id: userId },
    },
  } = props;
  console.log("CART products", products);

  const updatedProducts = products.filter((product) => {
    if (product.rentStatus === RENTED) {
      if (product.currentRenteeUserId === userId) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  });
  return (
    <div className='p-col cart__container'>
      {updatedProducts.map((product, index) => (
        <Item
          key={index}
          userId={userId}
          product={product}
          onRemoveProductFromCart={onRemoveProductFromCart}
          onCheckoutProductFromCart={onCheckoutProductFromCart}
          onCancelCheckoutProductFromCart={onCancelCheckoutProductFromCart}
        />
      ))}
    </div>
  );
};

export default Cart;

import Item from "./components/item";
import "./styles.scss";

const CartProductsCollection = (props) => {
  const {
    products,
    onRemoveProductFromCart,
    onCheckoutProductFromCart,
    onCancelCheckoutProductFromCart,
    onCancelOrderFromCurrentOrders,
    user: {
      data: { _id: userId },
    },
    view,
    currentPage,
  } = props;
  console.log("CART props", props);

  return (
    <div className='p-col cart__container'>
      {products.map((product, index) => (
        <Item
          key={index}
          userId={userId}
          product={product}
          view={view}
          currentPage={currentPage}
          onRemoveProductFromCart={onRemoveProductFromCart}
          onCheckoutProductFromCart={onCheckoutProductFromCart}
          onCancelCheckoutProductFromCart={onCancelCheckoutProductFromCart}
          onCancelOrderFromCurrentOrders={onCancelOrderFromCurrentOrders}
        />
      ))}
    </div>
  );
};

export default CartProductsCollection;

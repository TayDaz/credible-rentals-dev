import { Button } from "primereact/button";
import {
  PROCESSING,
  NOT_RENTED,
  RENTED,
  MY_ORDERS_PAGE,
  CART,
  MY_CURRENT_ORDERS,
} from "../../../../constants";

const CartActionButtons = (props) => {
  const {
    product,
    userId,
    currentPage,
    view,
    onRemoveProductFromCart,
    onCheckoutProductFromCart,
    onCancelCheckoutProductFromCart,
    onCancelOrderFromCurrentOrders,
  } = props;

  const handleOnRemoveProductFromCart = () => {
    onRemoveProductFromCart(product);
  };

  const handleOnCheckoutProductFromCart = () => {
    onCheckoutProductFromCart(product);
  };

  const handleOnCancelCheckoutProductFromCart = () => {
    onCancelCheckoutProductFromCart(product);
  };

  const handleOnCancelOrderFromCurrentOrders = () => {
    onCancelOrderFromCurrentOrders(product);
  };

  const { rentStatus, currentCheckedoutRenteeUserIds = [] } = product;

  const hasUserCheckedoutTheProduct =
    currentCheckedoutRenteeUserIds.includes(userId);

  console.log(
    "currentCheckedoutRenteeUserIds, userId",
    currentCheckedoutRenteeUserIds,
    userId
  );

  const viewMapBtns = {
    [MY_ORDERS_PAGE]: {
      [CART]: {
        showCancelBtn: rentStatus === PROCESSING && hasUserCheckedoutTheProduct,
        showDeleteBtn: rentStatus === RENTED || !hasUserCheckedoutTheProduct,
        showCheckoutBtn: !hasUserCheckedoutTheProduct && rentStatus !== RENTED,
      },
      [MY_CURRENT_ORDERS]: {
        showCancelCurrentOrderBtn: true,
      },
    },
  };

  const status = viewMapBtns[currentPage][view];

  return (
    <div className='p-d-flex buttons__container'>
      {status?.showDeleteBtn && (
        <div className='p-ml-1'>
          <Button label='Delete' onClick={handleOnRemoveProductFromCart} />
        </div>
      )}

      {status?.showCancelBtn && (
        <div className='p-ml-1'>
          <Button
            label='Cancel'
            onClick={handleOnCancelCheckoutProductFromCart}
          />
        </div>
      )}
      {status?.showCheckoutBtn && (
        <div className='p-ml-1'>
          <Button label='Checkout' onClick={handleOnCheckoutProductFromCart} />
        </div>
      )}
      {status?.showCancelCurrentOrderBtn && (
        <div className='p-ml-1'>
          <Button
            label='Cancel Order'
            onClick={handleOnCancelOrderFromCurrentOrders}
          />
        </div>
      )}
    </div>
  );
};

export default CartActionButtons;

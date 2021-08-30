import { Button } from "primereact/button";
import { PROCESSING, NOT_RENTED, RENTED } from "../../../../../../constants";

const CartActionButtons = (props) => {
  const {
    product,
    userId,
    onRemoveProductFromCart,
    onCheckoutProductFromCart,
    onCancelCheckoutProductFromCart,
  } = props;

  const { rentStatus, currentCheckedoutRenteeUserIds = [] } = product;

  let showDeleteBtn = true,
    showCheckoutBtn = true,
    showCancelBtn = true;

  const handleOnRemoveProductFromCart = () => {
    onRemoveProductFromCart(product);
  };

  const handleOnCheckoutProductFromCart = () => {
    onCheckoutProductFromCart(product);
  };

  const handleOnCancelCheckoutProductFromCart = () => {
    onCancelCheckoutProductFromCart(product);
  };

  const hasUserCheckedoutTheProduct = currentCheckedoutRenteeUserIds.find(
    (renteeUserId) => renteeUserId === userId
  );

  if (rentStatus === NOT_RENTED) {
    showCancelBtn = false;
  } else if (rentStatus === PROCESSING) {
    if (hasUserCheckedoutTheProduct) {
      showCheckoutBtn = false;
      showDeleteBtn = false;
    } else {
      showCancelBtn = false;
    }
  } else if (rentStatus === RENTED) {
    showCheckoutBtn = false;
    showCancelBtn = false;
  }

  return (
    <div className='p-d-flex buttons__container'>
      {showDeleteBtn && (
        <div className='p-ml-1'>
          <Button label='Delete' onClick={handleOnRemoveProductFromCart} />
        </div>
      )}

      {showCancelBtn && (
        <div className='p-ml-1'>
          <Button
            label='Cancel'
            onClick={handleOnCancelCheckoutProductFromCart}
          />
        </div>
      )}
      {showCheckoutBtn && (
        <div className='p-ml-1'>
          <Button label='Checkout' onClick={handleOnCheckoutProductFromCart} />
        </div>
      )}
    </div>
  );
};

export default CartActionButtons;

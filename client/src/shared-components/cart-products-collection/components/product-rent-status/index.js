import { Message } from "primereact/message";
import {
  CANCELLED_ORDERS,
  CART,
  MY_CURRENT_ORDERS,
  MY_ORDERS_PAGE,
  MY_PREVIOUS_ORDERS,
  PROCESSING,
  RENTED,
} from "../../../../constants";

const ProductRentStatus = (props) => {
  const { product, userId, currentPage, view } = props;
  const {
    rentStatus,
    currentRenteeUserId = null,
    currentCheckedoutRenteeUserIds = [],
  } = product;

  const viewMap = {
    [MY_ORDERS_PAGE]: {
      [CART]: {
        showStatus: true,
      },
      [MY_CURRENT_ORDERS]: {
        showStatus: false,
      },
      [MY_PREVIOUS_ORDERS]: {
        showStatus: false,
      },
      [CANCELLED_ORDERS]: {
        showStatus: false,
      },
    },
  };

  const status = viewMap[currentPage][view];

  const getProductRentStatus = () => {
    let component;
    if (rentStatus === RENTED && currentRenteeUserId !== userId) {
      component = <Message severity='warn' text='Rented Out' />;
    } else if (
      rentStatus === PROCESSING &&
      currentCheckedoutRenteeUserIds.includes(userId)
    ) {
      component = <Message severity='info' text='Processing' />;
    } else {
      component = null;
    }

    return component;
  };

  return (
    <div className='product-status'>
      {status.showStatus ? getProductRentStatus() : null}
    </div>
  );
};

export default ProductRentStatus;
